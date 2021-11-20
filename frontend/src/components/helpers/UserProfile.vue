<template>
  <div id="user-profile" class="text-center d-flex flex-column justify-content-start mx-auto gap">
    <router-link v-if="this.$route.name != 'user'" :to="{name:'user', params: {id: this.user.id}}" class="text-center w-30 text-decoration-none">
      <img :src="selectUserImage()" class="rounded-circle" width="50" height="50" alt="Image utilisateur"/>
      <p class="username text-muted m-0">{{ user.username }}</p>
    </router-link>
    <div v-else class="text-center m-0">
      <img :src="selectUserImage()" class="rounded-circle" width="50" height="50" alt="Image utilisateur"/>
      <p class="text-muted">{{ user.username }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserProfile',
  props: [
    'user'
  ],
  methods: {
    selectUserImage() {
      if(this.user.imageUrl == null) {
        return require('/public/images/profile.png')
      } else {
        return this.user.imageUrl;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
#user-profile {
  flex: 0 1 10%;
  width: 100px;
}
img {
  object-fit: cover;
}
.username {
  overflow-wrap: break-word;
}
</style>