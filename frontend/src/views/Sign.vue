<template>
  <div id="sign" class="min-vh-100 m-auto d-flex">
    <div class="container m-auto d-flex flex-nowrap flex-column justify-content-center text-center align-middle">
      <h1>Bienvenue<br/>sur le réseau social de<br/>Groupomania !</h1>
      <div class="img-container m-auto">
        <img alt="Groupomania logo" src="../assets/icon-above-font.svg">
      </div>
      <div id="nav">
        <router-link :to="{name:'Login'}"><button class="btn">Se connecter</button></router-link> |
        <router-link :to="{name:'Register'}"><button class="btn">S'inscrire</button></router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  props: {
    // msg: String
  },
  components: {
    // Register,
    // Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img-container {
  width: 100%;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>