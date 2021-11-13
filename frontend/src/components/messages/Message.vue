<template>
  <div v-if="message!==null" class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-column">
    <div class="d-flex flex-row">
      <div class="text-center w-30">
        <a href="#" class="text-decoration-none">
          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
          <p class="text-muted">{{ message.userId }}</p>
        </a>
      </div>
      <div class="d-flex flex-column w-100 ps-3">
        <div class="d-flex flex-row flex-wrap justify-content-between">
          <h6 class="tertiary-color">{{ message.title }}</h6>
          <div class="d-flex flex-row flex-nowrap text-muted small">
            <!-- <form v-on:submit.prevent="addLike" v-on:newLikingEvent="getAllLiking" class="p-2"> -->
            <CounterLiking/>
            <!-- <form v-on:submit.prevent="addLiking" class="p-2">
              <span class="numberOfLikes"></span>
              <button type="submit" name="submit" class="btn btn-primary" title="Enregistrer un nouveau like"><i class="far fa-thumbs-up"></i></button>
            </form>
            <form v-on:submit.prevent="addLiking" class="p-2">
              <span class="numberOfDislikes"></span>
              <button type="submit" name="submit" class="btn btn-primary" title="Enregistrer un nouveau like"><i class="far fa-thumbs-down"></i></button>
            </form> -->
          </div>
        </div>
        <p>{{ message.createdAt }}</p>
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div class="message-cards d-flex flex-wrap justify-content-center">
      <AddComment v-on:newCommentEvent="getAllComments" />
    </div>
    <div class="message-cards d-flex flex-wrap justify-content-center">
      <CardComment
        :class="{ active: index == currentIndex }" 
        v-for="(comment, index) in comments" 
        :key="index"
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
import { requestAuth } from '../../http-common'

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
      currentIndex: -1,
      // liking: null
    }
  },
  methods: {
    getOneMessage: function () {
      MessageDataService.get(this.$route.params.id)
      .then(response => {
        this.message = response.data;
        this.comments = this.message.Comments;
        console.log(response.data);
      })
      .catch(error => {
        console.log("error :", error);
      });
    },
    getAllComments() {
      CommentDataService.getAll(this.$route.params.id)
      // CommentDataService.getAll({ params:{messageId : this.$route.params.id} })
      .then(response => {
        this.comments = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    // refreshCommentList() {
    //   this.retrieveComments();//#############################
    //   this.currentComment = null;
    //   this.currentIndex = -1;
    // },
    // removeAllComments() {
    //   CommentDataService.deleteAll()
    //   .then(response => {
    //     console.log(response.data);
    //     this.refreshCommentList();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    // },
    // refreshLikingList() {
    //   this.retrieveLikings();// ###########################################
    //   this.currentLiking = null;
    //   this.currentIndex = -1;
    // },
    getAllLiking() {
      LikingDataService.getAll(localStorage.getItem('userId'))
      .then(response => {
        this.liking = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    addLike: function () {
      requestAuth().post('message/liking/add', {
        value : 1,
        messageId: this.$route.params.id
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          // this.$emit('newLikingEvent');
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
      })
    },
    addDislike: function () {
      requestAuth().post('message/liking/add', {
        value : -1,
        messageId: this.$route.params.id
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          // this.$emit('newLikingEvent');
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
      })
    },
    addLiking: function() {
      let userId = localStorage.getItem('userId');

      LikingDataService.getAll(userId)
      .then((response) => {
        // for (let i = 0; i < lenght; i++) {
        //   if(value[i] === 1) {
            console.log("coucou res : ", response.data);
        //   }
        // }
        // this.addLike();
        // this.addDislike();
      // })
      // .catch(error => {
      //   console.log("error :", error);
      });
    }
  },
  mounted() {
    this.getOneMessage()
    // this.getAllComments()
  }
}
      
</script>

<style lang="scss">

</style>