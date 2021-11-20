<template>
  <!-- v-if cause datas not received before user request -->
  <div id="user" v-if="user!==null" class="p-3 d-flex flex-column justify-content-start h-100">
    <h1>L'utilisateur</h1>
    <div class="rounded-3 bg-white p-3 d-flex flex-column">
      <div class="d-flex flex-column flex-wrap justify-content-center gap">
        <div class="d-flex flex-column">
          <UserProfile :user="user" />
          <div v-if="displayAdminOrOwnerButtons" class="d-flex justify-content-center w-100 gap my-2">
            <div v-on:click="displayModifyUser" class="btn btn-admin" title="Bouton de modification du compte utilisateur" type="button">Modifier</div>
            <div v-on:click="deleteUser" class="btn btn-admin" title="Bouton de suppression du compte utilisateur" type="button">Supprimer</div>
          </div>
        </div>
        <div class="content-card mx-3">{{ user.bio }}</div>
      </div>
      <div v-if="displayModifyForm" class="d-flex flex-wrap justify-content-center">
        <form v-on:submit.prevent="requestSelectorFileOrNot" class="p-2 p-sm-3 w-100">
          <div class="form-group my-2 d-flex flex-column w-100">
            <label for="new-username">Nom d'utilisateur</label>
            <input v-model="newUsername" id="new-username" name="new-username" class="form-control" placeholder="BLABLABLABLA..." />
          </div>
          <div class="form-group my-2 d-flex flex-column">
            <label for="new-bio">Bio</label>
            <textarea v-model="newBio" id="new-bio" name="new-bio" rows="5" class="form-control h-300" placeholder="BLABLABLABLA..." />
          </div>
          <div class="form-group my-2 mx-auto d-flex flex-row justify-content-center">
            <label for="new-file" class="form-label me-2">Image de profil</label>
            <input v-on:change="handleFileUpload" type="file" accept="image/*" id="new-file" name="Bouton de chargement de l'image de profil (optionnel)" title="Bouton de chargement de l'image de profil (optionnel)" />
          </div>
          <div class="form-group my-2 d-flex flex-row justify-content-center">
            <button type="submit" name="submit" class="btn me-2" title="Enregistrer les modifications du compte utilisateur">Enregistrer</button>
            <button v-on:click="displayModifyUser" name="reset" class="btn btn-admin" title="Annuler les modifications du compte utilisateur">Annuler</button>
          </div>
        </form>
      </div>
    </div>
    <div class="d-flex flex-column flex-nowrap p-0 h-100 w-100">
      <div class="m-auto d-flex flex-row flex-wrap justify-content-center gap my-3">
        <div v-on:click="displayMessagesSwitch()" class="btn" title="Voir les messages" type="button">Messages</div>
        <div v-on:click="displayCommentsSwitch()" class="btn" title="Voir les commentaires" type="button">Commentaires</div>
      </div>
      <div v-if="messages.length<1" class="text-center"><i>Cet utilisateur n'a pas encore écrit de message !</i></div>
      <div v-if="comments.length<1" class="text-center"><i>Cet utilisateur n'a pas encore écrit de commentaire !</i></div>
      <div class="mt-3 d-flex flex-row flex-wrap h-100 w-100 justify-content-center gap">
        <div v-if="displayMessages" class="d-flex flex-column gap">
          <CardMessage
            v-for="message in orderedMessages"
            :key="message.id"
            :message="message"
          />
        </div>
        <div v-if="displayComments" class="d-flex flex-column gap w-100">
          <CardComment
            v-for="comment in orderedComments"
            v-on:newCommentEvent="getOneUser"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService"

import CardMessage from '../messages/CardMessage.vue'
import CardComment from '../comments/CardComment.vue'
import LogoutService from '../services/LogoutService'
import UserProfile from '../helpers/UserProfile'

export default {
  name: 'User',
  components: {
    CardMessage,
    CardComment,
    UserProfile
  },
  data() {
    return {
      user: null,
      messages: null,
      comments: null,
      displayMessages: false,
      displayComments: false,
      displayAdminOrOwnerButtons: false,
      displayModifyForm: false,
      newUsername: "",
      newBio: ""
    }
  },
  computed: {
    orderedMessages: function() {
      const messages = this.messages;
      if(this.orderCrescent) {
        return messages.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateA - newDateB
        })
      } else {
        return messages.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateB - newDateA
        })
      }
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
    getOneUser: function () {
      UserDataService.getOne(this.$route.params.id)
      .then(response => {
        this.user = response.data;
        this.messages = this.user.Messages;
        this.comments = this.user.Comments;
        this.isAdminOrOwner();
        console.log(response.data);
      })
      .catch(error => {
        if (error.response.status == 401) {LogoutService()}
      });
    },
    displayMessagesSwitch() {
      this.displayMessages= !this.displayMessages;
      this.displayComments= false;
    },
    displayCommentsSwitch() {
      this.displayMessages= false;
      this.displayComments= !this.displayComments;
    },
    refreshList() {
      this.retrieveMessages();
      this.currentMessage = null;
      this.currentIndex = -1;
    },
    isAdminOrOwner: function() {
      if (localStorage.getItem('isAdmin') == 'true' ) {
        this.displayAdminOrOwnerButtons = true
      } else if (localStorage.getItem('userId') == this.user.id) {
        this.displayAdminOrOwnerButtons = true
      } else {
        this.displayAdminOrOwnerButtons = false
      }
    },
    displayModifyUser: function() {
      this.newUsername = this.user.username;
      this.newBio = this.user.bio;
      this.file = null;
      this.displayModifyForm = !this.displayModifyForm;
    },
    modifyUser: function () {
      UserDataService.modify(this.$route.params.id, {
        id: this.user.id,
        username: this.newUsername,
        bio: this.newBio
      })
      .then(() => {
        this.displayModifyForm = !this.displayModifyForm;
        this.user.username = this.newUsername;
        this.user.bio = this.newBio;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status == 401) {LogoutService()}
      })
    },
    handleFileUpload( event ){
      this.file = event.target.files[0]
      console.log('this.file : ', this.file);
    },
    modifyUserWithFile: function () {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("user", JSON.stringify({
        id: this.user.id,
        username : this.newUsername,
        bio : this.newBio
      }))
      UserDataService.modify(this.user.id, formData)
      .then(() => {
        this.displayModifyForm = !this.displayModifyForm;
        this.getOneUser();
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status == 401) {LogoutService()}
      })
    },
    requestSelectorFileOrNot: function () {
      console.log('requestSelectorFileOrNot this.file : ', this.file);
      if (this.file != null) {
        this.modifyUserWithFile()
      } else {
        this.modifyUser()
      }
    },
    deleteUser: function() {
      if(confirm("Voulez-vous vraiment supprimer ce compte ?")){
        UserDataService.delete(this.$route.params.id, {
          data: {
            id: this.user.id,
            userId: this.user.userId
          }
        })
        .then(() => {
          if(localStorage.getItem('userId') == this.user.id) {
            LogoutService()
          } else {
            this.$router.push({name: 'home'});
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 401) {LogoutService()}
        })
      }        
    }
  },
  mounted() {
    this.getOneUser()
  }
}
</script>

<style lang="scss" scoped>
</style>