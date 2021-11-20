<template>
  <div id="card-message" class="card-container w-100 m-auto gap d-flex flex-row flex-wrap jusitfy-content-between rounded-3 bg-white p-3">
    <UserProfile :user="message.User" v-if="this.$route.name != 'user'" class="user-profile"/>
    <div class="card-container-content d-flex flex-row flex-wrap mx-auto gap">
      <router-link class="card-container-content-message mx-auto w-100 text-decoration-none text-black" :to="{name:'message', params: {id: this.message.id}}">
        <h3 class="card-container-content-message-title">{{ message.title }}</h3>
        <div v-if="this.message.imageUrl" class="card-container-content-message-img my-2">
          <img :src="this.message.imageUrl" alt="Image utilisateur"/>
        </div>
        <div class="card-container-content-message-text">{{ message.content }}</div>
      </router-link>
      <div class="card-container-content-counter d-flex flex-column justify-content-between small mx-auto gap">
        <div class="d-flex flex-row justify-content-end"><Counter :message="message"/></div>
        <div class="small text-end">{{ createdHour }}<br />{{ createdDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '../helpers/Counter.vue'
import UserProfile from '../helpers/UserProfile'

export default {
  name: 'CardMessage',
  components: {
    Counter,
    UserProfile
  },
  props: [
    'message'
  ],
  computed: {
    createdDate: function() {
      const t = this.message.createdAt.split(/[- T : .]/);
      const newDate = t[2] + '/' + t[1] + '/' + t[0];
      return newDate;
    },
    createdHour: function() {
      const t = this.message.createdAt.split(/[- T : .]/);
      const utcPlus1 = (parseInt(t[3]) + 1).toLocaleString('fr-FR', { minimumIntegerDigits: 2 })
      const newHour = utcPlus1 + 'h' + t[4];
      return newHour;
    }
  }
}
</script>

<style lang="scss" >

.card-container {
  &-content {
    flex: 1 1 80%;

    &-message {
      flex: 1 1 60%;
      & * {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-title {
        font-size: 100%;
      }
      &-text {
        font-size: 0.9em;
        -webkit-line-clamp: 6;
        max-height: 6 * 1.5em;
      }
      &:after {
        font-size: 80%;
        content: 'Lire la suite...';
      }
      &-img {
        height: 200px;

        &>img {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
      }
    }
    &-counter {
      flex: 0 1 10%;
    }
  }
}
</style>