<template>
  <div class="d-flex flex-row flex-nowrap text-muted h-100 ">
    <div class="m-auto d-flex flex-row flex-nowrap m-auto"><i class="far fa-comment"></i> 3</div>
    <div class="m-auto d-flex flex-row flex-nowrap">
      <CounterLiking :messageId="message.id"/>
    </div>
</div>
</template>

<script>
import CounterLiking from './CounterLiking.vue'

export default {
  name: 'Counter',
  props: [
    'message'
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