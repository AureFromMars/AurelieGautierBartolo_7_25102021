<template>
  <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
    <UserProfile :user="message.User" class="m-auto"/>
    <router-link :to="{name:'message', params: {id: this.message.id}}" class="d-flex flex-column w-100 ps-3 pe-2 text-decoration-none text-black">
      <div type="button" class="message-container">
        <h3 class="message-container-title">{{ message.title }}</h3>
        <div class="message-container-content">
          {{ message.content }}
        </div>
      </div>
    </router-link>
    <div class="d-flex flex-column justify-content-between small">
      <div><Counter :message="message"/></div>
      <p class="small m-0 text-end">{{ createdHour }}<br />{{ createdDate }}</p>
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

<style lang="scss">
.message-container {//#############################
  max-width: 250px;

  & * {
    text-overflow: ellipsis;
    overflow: hidden;    
  }
  &-title {
    width: 100%;
    font-size: 100%;
    white-space: nowrap;
  }
  &-content {
    font-size: 0.9em;
    -webkit-line-clamp: 3;
    max-height: 3 * 1.5em;
  }
  &:after {
    font-size: 80%;
    content: 'Lire la suite...';
  }
}
</style>