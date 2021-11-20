<template>
  <div id="counter" class="d-flex flex-column flex-nowrap text-muted h-100 gap ">
    <div class="counter btn py-0 px-1 d-flex flex-row flex-nowrap h-100 ms-auto justify-content-end" title="Nombre de commentaires">
      <i class="m-auto far fa-comment fa-sm"></i>
      <span class="m-auto ps-1 small">{{ this.message.Comments.length }}</span>
    </div>
    <CounterLiking :messageId="message.id"/>
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

<style lang="scss" scoped>
.btn {
  background-color: $COLOR_PRIMARY;
  pointer-events: none;
}
</style>