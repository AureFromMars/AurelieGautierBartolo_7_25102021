<template>
  <div class="d-flex flex-row flex-nowrap text-muted">
    <!-- <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span> -->
    <form v-on:submit.prevent="addLiking" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn p-0" title="Enregistrer un nouveau like"><i class="far fa-thumbs-up"></i></button>
      <span class="numberOfLikes m-auto">3</span>
    </form>
    <form v-on:submit.prevent="addLiking" class="d-flex ps-1 m-auto">
      <button type="submit" name="submit" class="btn p-0 m-auto" title="Enregistrer un nouveau like"><i class="far fa-thumbs-down"></i></button>
      <span class="numberOfDislikes m-auto">4</span>
    </form>
  </div>
</template>

<script>
import LikingDataService from "../services/LikingDataService"
import { requestAuth } from '../../http-common'

export default {
  name: 'CounterLiking',
  props: [
  ],
  data() {
    return {
      liking: null
    }
  },
  methods: {
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
    counterLike() {

    },
    counterDislike() {

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>