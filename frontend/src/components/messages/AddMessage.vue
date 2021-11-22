<template>
  <div id="add-message" class="m-auto p-2 p-sm-3 w-100 rounded-3 bg-white d-flex flex-column justify-content-center">
    <h2>Ajouter un nouveau message</h2>
    <form v-on:submit.prevent="requestSelectorFileOrNot" class="p-2 p-sm-3">
      <div class="form-group my-2 d-flex flex-column">
        <label for="new-title">Titre du message</label>
        <input v-model="title" id="new-title" name="new-title" class="form-control" maxlength="255" placeholder="Le titre (max. 255 caractères)..." required/>
      </div>
      <div class="form-group my-2 d-flex flex-column">
        <label for="new-content">Contenu du message</label>
        <textarea v-model="content" id="new-content" name="new-content" rows="5" class="form-control h-300" placeholder="Le contenu de votre message..." required/>
      </div>
      <div class="gap add-message-buttons form-group my-2 d-flex flex-row flex-wrap justify-content-between">
        <input v-on:change="handleFileUpload" type="file" accept="image/*" id="file" name="Ajouter une image" title="Ajouter une image" />
        <button type="submit" name="submit" class="btn" title="Enregistrer le nouveau message">Enregistrer</button>
      </div>
    </form>
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
    },
    handleFileUpload( event ){
      this.file = event.target.files[0]
      console.log('this.file : ', this.file);
    },
    addMessageWithFile: function () {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("message", JSON.stringify({
        title : this.title,
        content : this.content
      }))
      MessageDataService.create(formData)
      .then(async response => {
        const data = await response.data;
        if (response) {
          this.$emit('newMessageEvent');
          this.title = "";
          this.content = "";
          this.$router.go()
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      })
    },
    requestSelectorFileOrNot: function () {
      if (this.file != null) {
        this.addMessageWithFile()
      } else {
        this.addMessage()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>