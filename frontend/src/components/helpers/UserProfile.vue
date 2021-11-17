<template>
  <div class="text-center w-30">
    <router-link v-if="this.$route.name != 'user'" :to="{name:'user', params: {id: this.user.id}}" class="text-center w-30 text-decoration-none">
      <img :src="selectUserImage()" class="rounded-circle" width="50" alt="Image utilisateur"/>
      <p class="text-muted">{{ user.username }}</p>
    </router-link>
    <div v-else class="text-center w-30">
      <a href="#" class="text-decoration-none">
        <img :src="selectUserImage()" class="rounded-circle" width="50" alt="Image utilisateur"/>
        <p class="text-muted">{{ user.username }}</p>
      </a>
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
      if(this.user.imageUrl === null) {
        return 'https://bootdey.com/img/Content/avatar/avatar3.png'
      } else {
        return this.user.imageUrl;
      }
    },
  }
}
</script>
<style lang="scss">

</style>