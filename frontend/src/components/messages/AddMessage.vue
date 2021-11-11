<template>
  <div class="p-2 p-sm-3 d-flex flex-row rounded-3 bg-white">
    <div class="d-flex flex-column">
      <h3>Ajouter un nouveau message</h3>
      <form class="p-2 p-sm-3" v-on:submit.prevent="addMessage">
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-title">Titre du message</label>
          <input v-model="title" id="new-title" placeholder="Saisissez un titre court..." />
        </div>
        <div class="form-group my-2 d-flex flex-column">
          <label for="new-content">Contenu du message</label>
          <textarea v-model="content" id="new-content" placeholder="Sasissez le contenu de votre message..." />
        </div>
        <div class="add-message-buttons form-group my-2 d-flex flex-row">
          <!-- <button v-on:click="uploadMessagePicture" name="upload" class="btn btn-primary" title="Ajouter une image">Ajouter un image</button> -->
          <button v-on:click="addMessage" type="submit" name="submit" class="btn btn-primary" title="Enregistrer un nouveau message">Enregistrer le message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMessage',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      title: null,
      content: null,
      picture: null
    }
  },
  methods: {
    // addNewMessage: function () {
    //   this.messages.push({
    //     title: this.newMessage,
    //     content: this.newMessage,
    //     picture: this.newMessage,
    //   })
    //   this.newMessage = {}
    // },
    addMessage: function () {
      try {
        let message = {
          title : this.title,
          content : this.content,
          picture : this.picture
        };
        let functionAddMessage = async () => {
          try {
            fetch('http://localhost:3001/api/message/create', {
              method : 'POST',
              headers : {
                'Content-type' : 'application/json'
              },
              body: JSON.stringify(message),
            })
            .then( response => response.json())// VOIR SI TOUT METTRE DANS LE PREMIER THEN, sans console.log insécure ####################
            .then( message => {
              console.log("Données renvoyées par l'API :", message)
              // window.location.href = 'home'
              // this.$router.replace('Home')
            });
          } catch (e) {
            alert(e)
          }
        };
        functionAddMessage();
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-message-buttons {
  gap: 10px;
}
</style>