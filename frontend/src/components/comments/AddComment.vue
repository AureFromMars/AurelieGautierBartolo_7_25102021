<template>
  <div class="message-card rounded-3 bg-white">
    <div class="p-2 p-sm-3 d-flex flex-column">
      <h3>Ajouter un nouveau commentaire</h3>
      <form v-on:submit.prevent="addComment" class="p-2 p-sm-3">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du message</label>
          <textarea v-model="content" id="new-content" name="new-content" placeholder="Saisissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <button type="submit" name="submit" class="btn btn-primary" title="Enregistrer un nouveau commentaire">Enregistrer le commentaire</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { requestAuth } from '../../http-common'
import LogoutService from '../services/LogoutService'

export default {
  name: 'AddComment',
  data() {
    return {
      content: null
    }
  },
  methods: {
    addComment: function () {
      requestAuth().post('message/comment/create', {
        content : this.content,
        messageId: this.$route.params.id
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          this.$emit('newCommentEvent');
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
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
.add-message-buttons {
  gap: 10px;
}
</style>