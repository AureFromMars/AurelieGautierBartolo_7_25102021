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

<style lang="scss" scoped>
</style>