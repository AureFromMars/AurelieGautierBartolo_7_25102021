<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <div class="message-cards d-flex justify-content-center"><AddMessage/></div>
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
import AddMessage from './AddMessage.vue'
import http from '../../http-common'

export default {
  name: 'Messages',
  props: {
    // source: {
    //   type: [String, Array],
    //   required: true
    //   },
    // title: {
    //   type: String,
    //   required: true
    // },
    // content: {
    //   type: String,
    //   required: true
    // },
    // // picture: {
    // //   type: String,
    // //   required: true
    // // },
    // id: {
    //   type: Number
    //   // default: 3
    // },
    // userId: {
    //   type: Number
    // },
    // //DATE A RECUPERER DANS LA TABLE
  },
  components: {
    CardMessage,
    MenuMessage,
    AddMessage
  },
  // el: '#message-card',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      messages: null,
      // messages: [
      //   {
      //     id: null,
      //     title: null,
      //     content: null,
      //     picture: null
      //   }
      // ],
      token: "",
      title: "",
      content: "",
      userId: "",
      isAdmin: "",
      totalMessages: "",
      // DATE A RECUPERER DANS LA TABLE
      query: ''
    }
  },
  methods: {
    getMessages() {
      http.get('message/all')
      .then(response => (this.messages = response.data))
      console.log(this.messages);
      // if ( typeof this.source === 'string' ) {
      //   fetch(this.source)
      //   .then(stream => stream.json())
      //   .then(data => this.items = data)
      //   .catch(error => console.error(error))
      // } else {
      //   this.items = this.source
      // }
    },

    // getMessages: function () {
    //   try {// Possibilité de ne faire qu'un seul then
    //     fetch('message/all')
    //     .then(response => {// Accéder à l'API
    //       console.log(response);
    //       // this.messages = messages;
    //       return response.json();
    //     })
    //     // hideLoader(); // Cacher le loader lorsque les cartes de produits sont créées
    //   } catch (e) {//Afficher une alerte d'erreur en cas de problèmes d'accès
    //     alert(e)
    //   }
    // },
    allMessages() {
      this.getMessages()
    }
  }
}
</script>

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