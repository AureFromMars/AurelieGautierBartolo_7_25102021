<template>
  <div id="add-comment" class="m-auto rounded-3 bg-white">
    <div class="d-flex flex-column">
      <h3>Ajouter un nouveau commentaire</h3>
      <form v-on:submit.prevent="addComment" class="my-2 d-flex flex-column gap">
          <div class="form-group d-flex flex-column">
            <label for="new-content">Contenu du message</label>
            <textarea v-model="content" class="form-control" id="new-content" rows="3" name="new-content" placeholder="Saisissez le contenu de votre message..." />
          </div>
          <button type="submit" name="submit" class="btn" title="Enregistrer un nouveau commentaire">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
import LogoutService from '../services/LogoutService'
import CommentDataService from "../services/CommentDataService"

export default {
  name: 'AddComment',
  data() {
    return {
      content: null
    }
  },
  methods: {
    addComment: function () {
      CommentDataService.create({
        content : this.content,
        messageId: this.$route.params.id
      })
      .then(() => {
        this.$emit('newCommentEvent');
        this.content = "";
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>