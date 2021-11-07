<template>
  <div id="app">
    <div id="bloc-page" class="container m-auto d-flex h-100">
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/register">S'enregistrer</router-link>
        <!-- <Sign msg="Welcome to Your Vue.js App"/> -->

        <!-- <Header msg="Welcome to Your Vue.js App"/>
        <Body msg="Welcome to Your Vue.js App"/>
        <Footer msg="Welcome to Your Vue.js App"/> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import Header from './components/template/Header.vue'
// import Body from './components/template/Body.vue'
// import Footer from './components/template/Footer.vue'
// import Sign from './components/pages/Sign.vue'


export default {
  name: 'App',
  components: {
    // Sign,
    // Header, 
    // Body,
    // Footer
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
}

.btn {
  max-width: 200px;
  color: rgb(248, 156, 156);

  /* &-outline-info {
  color: $primary;
  border-color: $primary;

      :hover{
          color: #000;
          background-color: $primary;
          border-color: $primary;
      };
  }; */
};
</style>
