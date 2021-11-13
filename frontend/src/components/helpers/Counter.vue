<template>
  <div class="d-flex flex-row flex-nowrap text-muted m-auto">
    <div class="m-auto"><i class="far fa-comment"></i> 3</div>
    <div class="m-auto"><CounterLiking/></div>
    <!-- <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span> -->
</div>
</template>

<script>
import CounterLiking from './CounterLiking.vue'

export default {
  name: 'Counter',
  props: [
  ],
  components: {
    CounterLiking
  },
  methods: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>