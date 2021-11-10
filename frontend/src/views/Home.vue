<template>
  <div id="home" class="min-vh-100 m-auto d-flex">
    <div class="w-100 d-flex flex-nowrap flex-column justify-content-between">
        <Header class="h-10"/>
        <Body/>
        <Footer class="h-10"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/layout/Header.vue'
import Body from '../components/layout/Body.vue'
import Footer from '../components/layout/Footer.vue'

export default {
  name: 'Home',
  props: {
  },
  components: {
    Header,
    Body,
    Footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img-container {
  width: 600px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


</style>