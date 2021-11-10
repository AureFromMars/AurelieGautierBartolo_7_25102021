<template>
  <div id="app" class="m-auto h-100">
    <router-view/>
    <!-- <Sign/> -->
    <!-- <Home/> -->
  </div>
</template>

// <script>
// import Sign from './views/Sign.vue'
// import Home from './views/Home.vue'

export default {
  name: 'App',
  props: {
    // msg: String
  },
  components: {
    // Sign,
    // Home
  }
}
</script>

<style lang="scss">


.tertiary-color {
  color: $COLOR_TERTIARY;
}

.btn {
  max-width: 200px;
  color: rgb(248, 156, 156);
};
</style>
