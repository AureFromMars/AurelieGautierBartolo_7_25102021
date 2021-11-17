<template>
  <div class="comment-card m-auto p-sm-3 p-2 d-flex flex-row w-100">
    <div class="d-flex flex-column w-20">
      <!-- <router-link v-if="this.$route.name != 'user'" :to="{name:'user', params: {id: this.comment.userId}}" class="text-center w-30 text-decoration-none">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
        <div>
          <p class="text-decoration-none tertiary-color mx-0 my-1 small fw-bold">{{ comment.User.username }}</p>
        </div>
      </router-link> -->
      <UserProfile :user="comment.user" class="m-auto"/>
      <div>
        <p class="text-decoration-none tertiary-color m-0 small">{{ createdDate }}</p>
        <p class="text-decoration-none tertiary-color m-0 small">{{ createdHour }}</p>
      </div>
      <div v-if="displayAdminOrOwnerButtons" class="d-flex flex-column">
        <div v-on:click="displayModifyComment" class="btn btn-admin w-100 mb-2" title="Bouton de modification du message" type="button">Modifier</div>
        <div v-on:click="deleteComment" class="btn btn-admin w-100" title="Bouton de suppression du message" type="button">Supprimer</div>
      </div>
    </div>
    <div v-if="displayModifyForm">
      <form v-on:submit.prevent="modifyComment" class="p-2 p-sm-3">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du commentaire</label>
          <textarea v-model="newcontent" id="new-content" name="new-content" class="form-control" placeholder="Saisissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <button type="submit" name="submit" class="btn btn-admin" title="Enregistrer la modiciation du commentaire">Enregistrer</button>
          <button v-on:click="displayModifyComment" name="reset" class="btn btn-admin" title="Annuler la modification du commentaire">Annuler</button>
        </div>
      </form>
    </div>
    <div v-else class="d-flex flex-column justify-content-between w-100 h-100 ps-3 m-auto">
      <p class="mb-2">{{ comment.content }}</p>
      <!-- <p class="small m-0 text-end">Le {{ createdDate }} à {{ createdHour }}</p> -->
    </div>
  </div>
</template>

<script>
import CommentDataService from "../services/CommentDataService"
import LogoutService from '../services/LogoutService'
import UserProfile from '../helpers/UserProfile'

export default {
  components: {
    UserProfile
  },
  name: 'CardComment',
  props: [
    'comment'
  ],
  data() {
    return {
      displayAdminOrOwnerButtons: false,
      displayModifyForm: false,
      newcontent: ""
    }
  },
  computed: {
    createdDate: function() {
      var t = this.comment.createdAt.split(/[- T : .]/);
      var newDate = t[2] + '/' + t[1] + '/' + t[0];
      return newDate;
    },
    createdHour: function() {
      var t = this.comment.createdAt.split(/[- T : .]/);
      const utcPlus1 = (parseInt(t[3]) + 1).toLocaleString('fr-FR', { minimumIntegerDigits: 2 })
      const newHour = utcPlus1 + 'h' + t[4];
      return newHour;
    }
  },
  methods: {
    isAdminOrOwner: function() {
      if (localStorage.getItem('isAdmin') == 'true' ) {
        this.displayAdminOrOwnerButtons = true
      } else if (localStorage.getItem('userId') == this.comment.userId) {
        this.displayAdminOrOwnerButtons = true
      } else {
        this.displayAdminOrOwnerButtons = false
      }
    },
    displayModifyComment: function() {
      this.newcontent = this.comment.content
      this.displayModifyForm = !this.displayModifyForm
    },
    modifyComment: function () {
      CommentDataService.modify( this.comment.id, {
        id: this.comment.id,
        userId: this.comment.userId,
        content: this.newcontent
      })
      .then(() => {
        this.displayModifyForm = !this.displayModifyForm;
        this.$emit('newCommentEvent');
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    deleteComment: function() {
      if(confirm("Vous-vous vraiment supprimer ce commentaire ?")){
        CommentDataService.delete(this.$route.params.id, {
          data: {
            id: this.comment.id,
            userId: this.comment.userId
          }
        })
        .then(() => {
          this.$emit('newCommentEvent');
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 401) {LogoutService()}
        })
      }        
    }
  },
  mounted() {
    this.isAdminOrOwner()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.comment-card {
  background-color: $LIGHT_GREY;
  border-radius: 30px 30px 30px 0;
};
</style>