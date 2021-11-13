<template>
<div id="card-message">
  <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
    <div class="text-center w-30">
      <a href="#" class="text-decoration-none">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
        <p class="text-muted">{{ message.userId }}</p>
      </a>
    </div>
    <!-- <div type="button" @click="getOneMessage" class="d-flex flex-column w-100 ps-3"> -->
    <div type="button" class="d-flex flex-column w-100 ps-3">
      <div class="d-flex flex-row flex-wrap justify-content-between">
        <h6 class="tertiary-color">{{ message.title }}</h6>
        <div class="d-flex flex-row flex-nowrap text-muted small">
          <span><i class="far fa-comment"></i> 3</span>
          <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span>
        </div>
      </div>
      <p>{{ message.createdAt }}</p>
      <p>{{ message.content }}</p>
    </div>
    <!-- <Message v-show="isModalVisible" @close="closeMessage" /> -->
  </div>
</div>
</template>

<script>
// import Message from './Message.vue';
import { requestAuth } from '../../http-common'

export default {
  name: 'CardMessage',
  components: {
    // Message
  },
  props: [
    'message'// peut être défini comme tableau ou boolean
  ],
  // data() {
  //   return {
  //     isModalVisible: false,
  //     message: {
  //       id: null,
  //       title: null,
  //       content: null,
  //       imgUrl: null
  //     },
  //   };
  // },
  methods: {
    getOneMessage: function () {
      console.log("this.message : ", this.message.id);
      requestAuth.get('message/one/', {
        id: this.message.id,
        title: this.message.title,
        content: this.message.content,
        imgUrl: this.message.imgUrl
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          console.log("youpiiiii");
          this.message = response.data;
          // this.$router.push('message/' + response.data.id);
          // hideLoader(); // Cacher le loader lorsque les cartes sont créées
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error :", error);
      });
      // this.$router.push('message/' + id);
      this.isModalVisible = true;
    },
    closeMessage() {
      this.isModalVisible = false;
      this.message = '';
    }
  },
  mounted() {
    this.getOneMessage()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>