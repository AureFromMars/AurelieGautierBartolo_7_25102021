<template>
  <div class="d-flex flex-row flex-nowrap text-muted">
    <form v-on:submit.prevent="addLike" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn py-0 px-1 m-auto d-flex flex-row flex-nowrap h-100" title="Enregistrer un nouveau like">
        <i class="m-auto far fa-thumbs-up fa-sm"></i>
        <span class="m-auto ps-1 small">{{ this.like }}</span>
      </button>
    </form>
    <form v-on:submit.prevent="addDislike" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn py-0 px-1 m-auto d-flex flex-row flex-nowrap h-100" title="Enregistrer un nouveau like">
        <i class="m-auto far fa-thumbs-down fa-sm"></i>
        <span class="m-auto ps-1 small">{{ this.dislike }}</span>
      </button>
    </form>
  </div>
</template>

<script>
import LikingDataService from "../services/LikingDataService"
import LogoutService from '../services/LogoutService'

export default {
  name: 'CounterLiking',
  props: [
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
      this.likings.forEach( (liking) => {// No forEach for 0, but ok for []
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
        this.deleteLiking() // then delete
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
        this.deleteLiking() // then delete
      }
    },
    getLikingIdFromUser: function () {
      let returnValue = -1;
      this.likings.forEach( (liking) => {
        if (liking.userId == localStorage.getItem('userId')) {
          returnValue = liking.id
        }
      });
      return returnValue;
    },
    addLiking: function (likeValue) {
      LikingDataService.add({
        value : likeValue,
        messageId: this.messageId
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
      LikingDataService.modify({
        value : likeValue,
        id: this.getLikingIdFromUser(),
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
    deleteLiking: function() {
        LikingDataService.delete({
          data: {
            id: this.getLikingIdFromUser(),
            userId: localStorage.getItem('userId')
          }
        })
        .then(() => {
          this.getAllLiking()
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 401) {LogoutService()}
        })
    }
  },
  created() {
    this.getAllLiking();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>