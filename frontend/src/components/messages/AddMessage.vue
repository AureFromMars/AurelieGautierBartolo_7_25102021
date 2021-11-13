<template>
  <div class="message-card rounded-3 bg-white">
    <div class="p-2 p-sm-3 d-flex flex-column">
      <h3>Ajouter un nouveau message</h3>
      <form v-on:submit.prevent="addMessage" class="p-2 p-sm-3">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-title">Titre du message</label>
          <input v-model="title" id="new-title" name="new-title" placeholder="Saisissez un titre court..." />
        </div>
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du message</label>
          <textarea v-model="content" id="new-content" name="new-content" placeholder="Sasissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <!-- <button v-on:click="uploadMessagePicture" name="upload" class="btn btn-primary" title="Ajouter une image">Ajouter un image</button> -->
          <button type="submit" name="submit" class="btn btn-primary" title="Enregistrer un nouveau message">Enregistrer le message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { requestAuth } from '../../http-common'

export default {
  name: 'AddMessage',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      title: null,
      content: null,
      imgUrl: null
    }
  },
  methods: {
    addMessage: function () {
      requestAuth.post('message/create', {
        title : this.title,
        content : this.content,
        imgUrl : this.imgUrl
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          // this.$router.push({ name: 'home' });
          // location.reload();
          this.$emit('newMessageEvent');
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
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