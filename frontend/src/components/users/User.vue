<template>
  <!-- Attention, v-if car infos non récupérées au départ avant chargement de user -->
  <div v-if="user!==null" class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-column">
    <div class="d-flex flex-row">
      <div class="text-center w-30">
        <a href="#" class="text-decoration-none">
          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
          <p class="text-muted">{{ user.username }}</p>
        </a>
      </div>
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
          <div v-on:click="displayMessagesSwitch()" class="m-auto" title="Voir mes messages" type="button">Mes messages</div>
          <div v-on:click="displayCommentsSwitch()" class="m-auto" title="Voir mes commentaires" type="button">Mes commentaires</div>
          <!-- <div v-on:click="displayLikingsSwitch()" class="m-auto" title="Voir mes messages" type="button">Mes préférés</div> -->
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
              :key="index"
              :comment="comment"
            />
          </div>
        </div>
      </div>
      <!-- <CardComment
        :class="{ active: index == currentIndex }" 
        v-for="(comment, index) in comments" 
        :key="index"
        :comment="comment"
      /> -->
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService"
// import MessageDataService from "../services/MessageDataService"
// import CommentDataService from "../services/CommentDataService"
// import LikingDataService from "../services/LikingDataService"
import CardMessage from '../messages/CardMessage.vue'
import CardComment from '../comments/CardComment.vue'
import LogoutService from '../services/LogoutService'

export default {
  name: 'User',
  components: {
    CardMessage,
    CardComment
  },
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      user: null,
      messages: null,
      comments: null,
      // likings: null,
      displayMessages: false,
      displayComments: false,
      // displayLikings: false
    }
  },
  methods: {
    getOneUser: function () {
      UserDataService.get(this.$route.params.id)
      .then(response => {
        this.user = response.data;
        this.messages = this.user.Messages;
        this.comments = this.user.Comments;
        // this.liking = this.user.Likings;
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
      // this.displayLikings= false
    },
    displayCommentsSwitch() {
      this.displayMessages= false;
      this.displayComments= true;
      // this.displayLikings= false
    },
  },
  // displayLikingsSwitch() {
  //   this.displayMessages= false;
  //   this.displayComments= false;
  //   this.displayLikings= true
  // },
  // getAllMessages() {
  //   MessageDataService.getAllFromUser(this.$route.params.id)
  //   // MessageDataService.getAll({ params:{messageId : this.$route.params.id} })
  //   .then(response => {
  //     this.messages = response.data;
  //     console.log(response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // },
  refreshList() {
    this.retrieveMessages();
    this.currentMessage = null;
    this.currentIndex = -1;
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