<template>
  <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
    <router-link v-if="this.$route.name === 'messages'" :to="'user/' + this.message.userId" class="text-center w-30 text-decoration-none">
      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
      <p class="text-muted">{{ message.User.username }}</p>
    </router-link>
    <router-link :to="'message/' + this.message.id" class="d-flex flex-column w-100 ps-3 pe-2 text-decoration-none text-black">
      <!-- <div class="d-flex flex-column"> -->
        <div type="button" class="message-container">
          <h3 class="message-container-title">{{ message.title }}</h3>
          <div class="message-container-content">
            {{ message.content }}
          </div>
        </div>
      <!-- </div> -->
    </router-link>
    <div class="d-flex flex-column justify-content-between small">
      <div><Counter :message="this.message"/></div>
      <p class="small m-0 text-end">{{ createdHour }}<br />{{ createdDate }}</p>
    </div>
  </div>
</template>

<script>
import Counter from '../helpers/Counter.vue'

export default {
  name: 'CardMessage',
  components: {
    Counter
  },
  computed: {
    createdDate: function() {
      var t = this.message.createdAt.split(/[- T : .]/);
      var newDate = t[2] + '/' + t[1] + '/' + t[0];
      return newDate;
    },
    createdHour: function() {
      var t = this.message.createdAt.split(/[- T : .]/);
      var newHour = t[3] + 'h' + t[4];
      return newHour;
    }
  },
  props: [
    'message'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
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