<template>
  <div id="card-message">
    <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
      <div class="d-flex flex-column w-100 ps-3">
        <div type="button" class="d-flex flex-column w-100 ps-3">
          <p>{{ comment.content }}</p>
          <p>{{ comment.User.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardComment',
  props: [
    'comment'// peut être défini comme tableau ou boolean
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>