<template>
  <div class="message-card rounded-3 bg-white">
    <div class="p-2 p-sm-3 d-flex flex-column">
      <h2>Ajouter un nouveau message</h2>
      <form v-on:submit.prevent="addMessage" class="p-2 p-sm-3">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-title">Titre du message</label>
          <input v-model="title" id="new-title" name="new-title" class="form-control" placeholder="Saisissez un titre court..." />
        </div>
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du message</label>
          <textarea v-model="content" id="new-content" name="new-content" class="form-control" placeholder="Saisissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <!-- <button v-on:click="uploadMessagePicture" name="upload" class="btn btn-primary" title="Ajouter une image">Ajouter un image</button> -->
          <button type="submit" name="submit" class="btn" title="Enregistrer un nouveau message">Enregistrer le message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LogoutService from '../services/LogoutService'
import MessageDataService from "../services/MessageDataService"

export default {
  name: 'AddMessage',
  data() {
    return {
      title: null,
      content: null,
      imgUrl: null
    }
  },
  methods: {
    addMessage: function () {
      MessageDataService.create({
        title : this.title,
        content : this.content,
        imgUrl : this.imgUrl
      })
      .then(async response => {
        const data = await response.data;
        if (response) {
          this.$emit('newMessageEvent');
          this.title = "";
          this.content = "";
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
</style>