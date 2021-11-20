<template>
  <!-- Attention, v-if car infos non récupérées au départ avant chargement de message -->
  <div v-if="message !== null" id="message" class="h-100 w-100 d-flex flex-column gap">
    <h1>Le message</h1>
    <div class="page-container rounded-3 bg-white m-auto w-100 p-2 p-sm-3 d-flex flex-column">
      <div class="page-container-message d-flex flex-row flex-wrap gap">
        <div class="page-container-message-profile d-flex flex-column w-100">
          <div class="m-auto">
            <UserProfile :user="message.User"/>
          </div>
          <div v-if="displayAdminOrOwnerButtons" class="d-flex justify-content-center w-100 gap my-2">
            <div v-on:click="displayModifyMessage" class="btn btn-admin" title="Bouton de modification du message" type="button">Modifier</div>
            <div v-on:click="deleteMessage" class="btn btn-admin" title="Bouton de suppression du message" type="button">Supprimer</div>
          </div>
        </div>
        <div class="page-container-form m-auto w-100 d-flex flex-column justify-content-center" v-if="displayModifyForm">
          <h2>Modifier le message</h2>
          <form id="modify-message" class="d-flex flex-column gap" v-on:submit.prevent="requestSelectorFileOrNot">
            <div class="form-group d-flex flex-column">
              <label for="new-title">Titre du message</label>
              <input v-model="newTitle" id="new-title" name="new-title" class="form-control" maxlength="255" placeholder="Saisissez un titre (maximum 255 caractères)..." />
            </div>
            <div class="form-group d-flex flex-column">
              <label for="new-content">Contenu du message</label>
              <textarea v-model="newContent" id="new-content" name="new-content" rows="5" class="form-control h-300" placeholder="Saisissez le contenu de votre message..." />
            </div>
            <div class="form-group d-flex flex-row flex-wrap jusitfy-content-between w-100 gap">
              <input v-on:change="handleFileUpload" class="m-auto d-flex flex-row flex-wrap" type="file" accept="image/*" id="file" name="Ajouter une image" title="Ajouter une image" />
              <div class="d-flex flex-wrap flex-row gap m-auto">
                <button type="submit" name="submit" class="btn" title="Enregistrer un nouveau message">Enregistrer</button>
                <button v-on:click="displayModifyMessage" name="reset" class="btn btn-admin" title="Annuler la modification du commentaire">Annuler</button>
              </div>
            </div>
          </form>
        </div>
        <div class="page-container-message-content d-flex flex-row flex-wrap my-auto w-100 gap">
          <div class="page-container-message-content-top d-flex flex-row justify-content-between gap w-100">
            <h2 class="message-title tertiary-color">{{ message.title }}</h2>
            <CounterLiking :messageId="message.id"/>
          </div>
          <div class="page-container-message-content-bottom d-flex flex-column w-100 gap">
            <p class="page-container-message-content-date small m-0">{{ createdDate }}</p>
            <img class="page-container-message-content-image" v-if="this.message.imageUrl" :src="this.message.imageUrl" alt="Image utilisateur"/>
            <p class="page-container-message-content-text">{{ message.content }}</p>
          </div>
        </div>
      </div>
      <h2>Les commentaires</h2>
      <div class="gap mt-4 d-flex flex-wrap justify-content-center w-100">
        <AddComment v-on:newCommentEvent="getAllComments" />
      </div>
      <div v-if="comments" class="d-flex flex-column flex-nowrap h-100 h-100 w-100 p-0">
        <h3 class="text-center mt-4 mb-0">Tous les commentaires</h3>
        <nav class="nav nav-pills d-flex flex-row justify-content-end h-100 text-center small h-100 w-100 p-0">
            <p class="my-auto pe-3">Tri par date</p>
            <div class="my-auto d-flex flex-column h-100">
              <div v-on:click="orderCrescent = true" class="m-auto" title="Du plus ancien au plus récent" type="button"><i class="tertiary-color fas fa-caret-up mb-"></i></div>
              <div v-on:click="orderCrescent = false" class="m-auto" title="Du plus récent au plus ancien" type="button"><i class="tertiary-color fas fa-caret-down"></i></div>
            </div>
        </nav>
        <div class="gap d-flex flex-wrap justify-content-center">
          <hr/>
          <CardComment class="hr"
            v-for="(comment) in orderedComments" 
            v-on:newCommentEvent="getAllComments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
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
import UserProfile from '../helpers/UserProfile'

export default {
  name: 'Message',
  components: {
    AddComment,
    CardComment,
    CounterLiking,
    UserProfile
  },
  data() {
    return {
      message: null,
      comments: null,
      displayAdminOrOwnerButtons: false,
      displayModifyForm: false,
      orderCrescent: false,
      newTitle: "",
      newContent: ""
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
      MessageDataService.getOne(this.$route.params.id)
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
      this.newTitle = this.message.title;
      this.newContent = this.message.content;
      this.file = null;
      this.displayModifyForm = !this.displayModifyForm;
    },
    modifyMessage: function () {
      MessageDataService.modify(this.$route.params.id, {
        id: this.message.id,
        userId: this.message.userId,
        title: this.newTitle,
        content: this.newContent
      })
      .then(() => {
        this.displayModifyForm = !this.displayModifyForm;
        this.message.title = this.newTitle;
        this.message.content = this.newContent;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    handleFileUpload( event ){
      this.file = event.target.files[0]
      console.log('this.file : ', this.file);
    },
    modifyMessageWithFile: function () {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("message", JSON.stringify({
        id: this.message.id,
        userId: this.message.userId,
        title : this.newTitle,
        content : this.newContent
      }))
      MessageDataService.modify(this.$route.params.id, formData)
      .then(() => {
        this.displayModifyForm = !this.displayModifyForm;
        this.getOneMessage();
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    requestSelectorFileOrNot: function () {
      if (this.file != null) {
        this.modifyMessageWithFile()
      } else {
        this.modifyMessage()
      }
    },
    deleteMessage: function() {
      if(confirm("Voulez-vous vraiment supprimer ce message ?")){
        
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

<style lang="scss" scoped>
.message-title {
  font-size: 1.4em;
  text-align: left;
}
.page-container {
  &-message {
    &-image {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
}
.hr {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>