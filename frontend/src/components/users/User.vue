<template>
  <!-- Attention, v-if car infos non récupérées au départ avant chargement de user -->
  <div v-if="user!==null" class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-column">
    <div class="d-flex flex-row">
      <!-- <div class="text-center w-30">
        <a href="#" class="text-decoration-none">
          <img :src="selectUserImage()" class="rounded-circle" width="50" alt="Image utilisateur"/>
          <p class="text-muted">{{ user.username }}</p>
        </a>
      </div> -->
      <UserProfile :user="user" />
      <div class="d-flex flex-column w-100 ps-3">
        <div class="d-flex flex-row flex-wrap justify-content-between">
          <h6 class="tertiary-color">{{ user.username }}</h6>
          <div class="d-flex flex-row flex-nowrap text-muted small">
          </div>
        </div>
        <p>{{ user.bio }}</p>
      </div>
    </div>
    <div class="message-cards d-flex flex-wrap justify-content-center">
      <div class="d-flex flex-row flex-nowrap p-0 h-100 m-auto">
        <div class="m-auto d-flex flex-column h-100">
          <div v-on:click="displayMessagesSwitch()" class="btn m-auto" title="Voir mes messages" type="button">Mes messages</div>
          <div v-on:click="displayCommentsSwitch()" class="btn m-auto" title="Voir mes commentaires" type="button">Mes commentaires</div>
          <div v-if="displayMessages">
            <CardMessage
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
            />
          </div>
          <div v-if="displayComments">
            <CardComment
              v-for="(comment, index) in comments"
              v-on:newCommentEvent="getOneUser"
              :key="index"
              :comment="comment"
            />
          </div>
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
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      user: null,
      messages: null,
      comments: null,
      displayMessages: false,
      displayComments: false,
    }
  },
  methods: {
    getOneUser: function () {
      UserDataService.getOne(this.$route.params.id)
      .then(response => {
        this.user = response.data;
        this.messages = this.user.Messages;
        this.comments = this.user.Comments;
        console.log(response.data);
      })
      .catch(error => {
        console.log("error :", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
    displayMessagesSwitch() {
      this.displayMessages= true;
      this.displayComments= false;
    },
    displayCommentsSwitch() {
      this.displayMessages= false;
      this.displayComments= true;
    },
    selectUserImage() {
      if(this.user.imageUrl === null) {
        return 'https://bootdey.com/img/Content/avatar/avatar3.png'
      } else {
        return this.user.imageUrl;
      }
    },
    refreshList() {
      this.retrieveMessages();
      this.currentMessage = null;
      this.currentIndex = -1;
    },
  },


  // getAllComments() {
  //   CommentDataService.getAll(this.$route.params.id)
  //   // CommentDataService.getAll({ params:{messageId : this.$route.params.id} })
  //   .then(response => {
  //     this.comments = response.data;
  //     console.log(response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // },
  // getAllLiking() {
  //   LikingDataService.getAll(localStorage.getItem('userId'))
  //   .then(response => {
  //     this.liking = response.data;
  //     console.log(response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // },
  mounted() {
    this.getOneUser()
  }
}
</script>

<style lang="scss" scoped>
</style>