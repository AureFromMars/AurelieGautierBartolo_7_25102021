<template>
  <div class="d-flex flex-row flex-nowrap text-muted h-100">
    <div class="btn py-0 px-1 m-auto d-flex flex-row flex-nowrap h-100" title="Nombre de commentaires">
      <i class="m-auto far fa-comment fa-sm"></i>
      <span class="m-auto ps-1 small">{{ this.message.Comments.length }}</span>
    </div>
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
    'message',
  ],
  components: {
    CounterLiking
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.btn {
  background-color: $COLOR_PRIMARY;
  pointer-events: none;
}
</style>