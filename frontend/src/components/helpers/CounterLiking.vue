<template>
  <div class="d-flex flex-row flex-nowrap text-muted">
    <form v-on:submit.prevent="addLike" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn p-0" title="Enregistrer un nouveau like"><i class="far fa-thumbs-up"></i></button>
      <span class="numberOfLikes m-auto">{{ this.like }}</span>
    </form>
    <form v-on:submit.prevent="addDislike" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn p-0 m-auto" title="Enregistrer un nouveau like"><i class="far fa-thumbs-down"></i></button>
      <span class="numberOfDislikes m-auto">{{ this.dislike }}</span>
    </form>
  </div>
</template>

<script>
import LikingDataService from "../services/LikingDataService"
import { requestAuth } from '../../http-common'
import LogoutService from '../services/LogoutService'

export default {
  name: 'CounterLiking',
  props: [
    // 'likings',
    // 'message',
    'messageId'
  ],
  data() {
    return {
      likings: [],
      like: 0,
      dislike: 0,
      alreadyLiked: false,
      alreadyDisliked: false,
    }
  },
  methods: {
    getAllLiking() {
      LikingDataService.getAllFromMessage(this.messageId)
      .then( async response => {
        this.likings = await response.data;
        this.counterLiking();
        this.isAlreadyLiked();
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
    counterLiking() {
      this.like = 0;
      this.dislike = 0;
      this.likings.forEach( (liking) => {// Pas de forEach sur 0, mais ok pour []
        if (liking.value == 1) {
          this.like++
        } else if (liking.value == -1) {
          this.dislike++
        }
      });
    },
    isAlreadyLiked() {
      this.alreadyLiked = false;
      this.alreadyDisliked = false;
      this.likings.forEach( (liking) => {
        if (liking.userId == localStorage.getItem('userId')) {
          if (liking.value == 1)  {
            this.alreadyLiked = true
          } else if ((liking.value == -1)) {
            this.alreadyDisliked = true
          }
        }
      });
    },
    addLike: function () {
      if (!this.alreadyLiked) { // If not liked
        if (!this.alreadyDisliked) { // and if not disliked
          this.addLiking(1) // then add
        } else { // if disliked
          this.modifyLiking(1) // modify disliked to liked
        }
      } else { // If liked
        this.deleteLiking() // then delete A FAIRE ######################################
      }
    },
    addDislike: function () {
      if (!this.alreadyDisliked) { // If not disliked
        if (!this.alreadyLiked) { // and not liked
          this.addLiking(-1) // then add
        } else { // if liked
          this.modifyLiking(-1)
        }
      } else { // if disliked
        this.deleteLiking() // then delete ###############################################
      }
    },
    checkLikingFromUser: function () {
      let returnValue = -1;
      this.likings.forEach( (liking) => {
        if (liking.userId == localStorage.getItem('userId')) {
          returnValue = liking.id
        }
      });
      return returnValue;
    },
    addLiking: function (likeValue) {
      requestAuth().post('message/liking/add', {
        value : likeValue,
        messageId: this.message.id
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          this.getAllLiking();
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    modifyLiking: function (likeValue) {

      LikingDataService.update({
        value : likeValue,
        id: this.checkLikingFromUser(),
        userId: localStorage.getItem('userId')
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          this.getAllLiking();
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    // modifyLiking: function (likeValue) {
    //   console.log('message : ', this.message);
    //   console.log('like value : ', likeValue);
    //   LikingDataService.update({
    //     value : likeValue,
    //     id: this.checkLikingFromUser(),
    //     userId: this.localStorage.getItem('userId')
    //   })
    //   .then(async response => {
    //     const data = await response.data;
    //     if (response) {
    //       this.getAllLiking();
    //     } else {
    //       const error = data.message;
    //       return Promise.reject(error);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("error : ", error);
    //   })
    // },
  },
  created() {
    this.getAllLiking();
  },
  mounted() {
    // this.counterLiking();
    // this.isAlreadyLiked();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>