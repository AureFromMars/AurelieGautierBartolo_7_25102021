<template>
  <!-- Attention, v-if car infos non récupérées au départ avant chargement de message -->
  <div v-if="message!==null" class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-column">
    <div class="d-flex flex-row">
      <router-link :to="{name:'user', params: {id: this.message.userId}}" class="text-center w-30 text-decoration-none">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
        <p class="text-muted small">{{ message.User.username }}</p>
      </router-link>
      <div v-if="displayAdminOrOwnerButtons">
        <div v-on:click="displayModifyMessage" class="m-auto" title="Bouton de modification du message" type="button">Modifier</div>
        <div v-on:click="deleteMessage" class="m-auto" title="Bouton de suppression du message" type="button">Supprimer</div>
      </div>
      <div class="d-flex flex-column w-100 ps-3">
        <div class="d-flex flex-row flex-wrap justify-content-between">
          <h6 class="tertiary-color">{{ message.title }}</h6>
          <div class="d-flex flex-row flex-nowrap text-muted small">
            <CounterLiking :messageId="message.id"/>
          </div>
        </div>
        <p class="small">{{ createdDate }}</p>
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div v-if="displayModifyForm">
      <form v-on:submit.prevent="modifyMessage" class="p-2 p-sm-3">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-title">Titre du message</label>
          <input v-model="message.title" id="new-title" name="new-title" class="form-control" placeholder="Saisissez un titre court..." />
        </div>
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du message</label>
          <textarea v-model="message.content" id="new-content" name="new-content" class="form-control" placeholder="Saisissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <!-- <button v-on:click="uploadMessagePicture" name="upload" class="btn btn-primary" title="Ajouter une image">Ajouter un image</button> -->
          <button type="submit" name="submit" class="btn" title="Enregistrer un nouveau message">Enregistrer le message</button>
        </div>
      </form>
    </div>
    <div class="message-cards d-flex flex-wrap justify-content-center">
      <AddComment v-on:newCommentEvent="getAllComments" />
    </div>
    <nav class="nav nav-pills d-flex flex-row justify-content-end h-100 text-center small h-100 w-100 p-0">
        <p class="my-auto pe-3">Tri par date</p>
        <div class="my-auto d-flex flex-column h-100">
          <div v-on:click="orderCrescent = true" class="m-auto" title="Du plus ancien au plus récent" type="button"><i class="tertiary-color fas fa-caret-up mb-"></i></div>
          <div v-on:click="orderCrescent = false" class="m-auto" title="Du plus récent au plus ancien" type="button"><i class="tertiary-color fas fa-caret-down"></i></div>
        </div>
    </nav>
    <div class="message-cards d-flex flex-wrap justify-content-center">
      <CardComment
        v-for="(comment) in orderedComments" 
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import MessageDataService from "../services/MessageDataService"
import CommentDataService from "../services/CommentDataService"
import LikingDataService from "../services/LikingDataService"
import CounterLiking from "../helpers/CounterLiking"
import AddComment from '../comments/AddComment.vue'
import CardComment from '../comments/CardComment.vue'
import LogoutService from '../services/LogoutService'

export default {
  name: 'Message',
  components: {
    AddComment,
    CardComment,
    CounterLiking
  },
  data() {
    return {
      message: null,
      comments: null,
      displayAdminOrOwnerButtons: false,
      displayModifyForm: false,
      orderCrescent: false
    }
  },
  computed: {
    createdDate: function() {
      var t = this.message.createdAt.split(/[- T : .]/);
      var newDate = 'Créé le ' + t[2] + '/' + t[1] + '/' + t[0] + ' à ' + t[3] + 'h' + t[4];
      return newDate;
    },
    orderedComments: function() {
      const comments = this.comments;
      if(this.orderCrescent) {
        return comments.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateA - newDateB
        })
      } else {
        return comments.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateB - newDateA
        })
      }
    },
  },
  methods: {
    getOneMessage: function () {
      MessageDataService.get(this.$route.params.id)
      .then(response => {
        this.message = response.data;
        this.comments = this.message.Comments;
      })
      .then(() => {
        this.isAdminOrOwner();
      }) 
      .catch(error => {
        console.log("error :", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
    getAllComments() {
      CommentDataService.getAllFromMessage(this.$route.params.id)
      .then(response => {
        this.comments = response.data;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
    getAllLiking() {
      LikingDataService.getAll(localStorage.getItem('userId'))
      .then(response => {
        this.liking = response.data;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
    isAdminOrOwner: function() {
      if (localStorage.getItem('isAdmin') == 'true' ) {
        this.displayAdminOrOwnerButtons = true
      } else if (localStorage.getItem('userId') == this.message.userId) {
        this.displayAdminOrOwnerButtons = true
      } else {
        this.displayAdminOrOwnerButtons = false
      }
    },
    displayModifyMessage: function() {
      this.displayModifyForm = !this.displayModifyForm
    },
    modifyMessage: function () {
      MessageDataService.modify(this.$route.params.id, {
        id: this.message.id,
        userId: this.message.userId,
        title : this.message.title,
        content : this.message.content,
        imgUrl : this.message.imgUrl
      })
      .then(() => {
        console.log('before this.displayModifyForm : ', this.displayModifyForm )
        this.displayModifyForm = !this.displayModifyForm
        console.log('after this.displayModifyForm : ', this.displayModifyForm )
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    deleteMessage: function() {
      if(confirm("Vous-vous vraiment supprimer ce message ?")){
        
        MessageDataService.delete(this.$route.params.id, {
          data: {
            id: this.message.id,
            userId: this.message.userId
          }
        })
        .then(() => {
          this.$router.push({name: 'home'});
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 401) {LogoutService()}
        })
      }        
    }
  },
  mounted() {
    this.getOneMessage()
  }
}
</script>

<style lang="scss">

</style>