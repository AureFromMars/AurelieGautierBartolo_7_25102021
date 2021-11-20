<template>
  <div id="card-user" class="rounded-3 bg-white">
    <router-link :to="{name:'user', params: {id: this.user.id}}" class="p-3 d-flex flex-row justify-content-center text-decoration-none text-black">
      <UserProfile :user="user" />
      <div class="bio ms-2" v-if="user.bio">
        <div class="bio-text">{{ user.bio }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import UserProfile from '../helpers/UserProfile.vue'

export default {
  name: 'CardUser',
  components: {
    UserProfile
  },
  props: {
    'user': {
      'username': String,
      'bio': { Text }
    }
  }
}
</script>

<style lang="scss" scoped>
#card-user {
  max-width: 300px;
}
.bio {
  & * {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &-text {
    font-size: 0.9em;
    -webkit-line-clamp: 4;
    max-height: 4 * 1.5em;
  }
  &:after {
    font-size: 80%;
    content: 'Lire la suite...';
  }
}
</style>