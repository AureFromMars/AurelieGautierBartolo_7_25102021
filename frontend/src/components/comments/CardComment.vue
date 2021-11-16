<template>
  <div id="card-message">
    <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
      <div class="d-flex flex-column w-100 ps-3">
        <div type="button" class="d-flex flex-column w-100 ps-3">
          <p>{{ comment.content }}</p>
          <div class="d-flex flex-row justify-content-between small">
            <p v-if="this.comment.user">{{ comment.User.username }}</p>
            <p v-if="this.$route.name === 'user'">Afficher le lien du message ou autre</p>
            <p class="small m-0 text-end">Le {{ createdDate }} à {{ createdHour }}</p>
          </div>
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
  ],
  computed: {
    createdDate: function() {
      var t = this.comment.createdAt.split(/[- T : .]/);
      var newDate = t[2] + '/' + t[1] + '/' + t[0];
      return newDate;
    },
    createdHour: function() {
      var t = this.comment.createdAt.split(/[- T : .]/);
      var newHour = t[3] + 'h' + t[4];
      return newHour;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>