<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <div class="message-cards d-flex justify-content-center">
        <div class="p-2 p-sm-3 d-flex flex-row message-card rounded-3 bg-white">
          <div class="d-flex flex-column ps-3">
            <h3>Ajoutez un nouveau message</h3>
            <form class="p-2 p-sm-3" v-on:submit.prevent="addNewMessage">
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Titre du message</label>
                <input v-model="newMessageText" id="new-title" placeholder="Ex. nourrir le chat" />
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Contenu message</label>
                <textarea v-model="newMessageText" id="new-title" placeholder="Ex. nourrir le chat" />
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Nouveau message</label>
                <button type="submit" name="submit" class="btn btn-primary btn-md" title="Ajoutez une image">Ajoutez un image</button>
              </div>
              <button type="submit" name="submit" class="btn btn-primary btn-md" title="Ajoutez une image">Enregistrer le message</button>
            </form>
          </div>
        </div>
      </div>
      <div class="m-2"><MenuMessage/></div>
      <div class="message-cards d-flex flex-row flex-wrap justify-content-center">
        <CardMessage
          v-for="(message) in messages"
          v-bind:key="message.id"
          v-bind:message="message"
        />
      </div>
    </div>
    <div id="page-change" class="small text-end red-text">Changement de page</div>
  </div>
</template>

<script>
import CardMessage from './CardMessage.vue'
import MenuMessage from './MenuMessage.vue'

export default {
  name: 'Messages',
  props: {
    // title: String
  },
  components: {
    CardMessage,
    MenuMessage
  },
  el: '#message-card',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      newMessageText: '',
      messages: [
        {
          id: 1,
          title: 'Titre message 1',
          content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        },
        {
          id: 2,
          title: 'Titre message 2',
          content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        },
        {
          id: 3,
          title: 'Titre message 3',
          content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        }
      ],
      nextMessageId: 4
    }
  },
  methods: {
    addNewMessage: function () {
      this.messages.push({
        id: this.nextMessageId++,
        title: this.newMessageText
      })
      this.newMessageText = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.red-text {
  color: #BA4D55;
}
.background-red {
  background-color: #FFD7D7;
}
.message-cards {
  gap: 10px;
  margin: 20px 0;
}
.message-card {
  width: 500px;
}

</style>