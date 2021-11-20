<template>
  <div id="messages" class="px-3 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="h-100 w-100 d-flex flex-column gap">
      <h1>Les messages</h1>
      <AddMessage v-on:newMessageEvent="getAllMessages" />
      <h2>Tous les messages</h2>
      <form class="d-flex flex-row flex-nowrap justify-content-center">
        <input type="text" class="form-control" placeholder="Rechercher un message par le titre"/>
        <button class="btn" type="button">Rechercher</button>
      </form>
      <nav class="gap d-flex flex-wrap flex-row justify-content-end h-100 text-center small">
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />populaires</router-link>
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />impopulaires</router-link>
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />commentés</router-link>
        <div class="d-flex flex-row flex-nowrap p-0 m-auto">
          <p class="m-auto pe-3">Tri par<br />date</p>
          <div class="d-flex flex-column flex-nowrap m-auto">
            <div v-on:click="orderCrescent = true" title="Du plus ancien au plus récent" type="button"><i class="nav-link p-0 fas fa-caret-up mb-"></i></div>
            <div v-on:click="orderCrescent = false" title="Du plus récent au plus ancien" type="button"><i class="nav-link p-0 fas fa-caret-down"></i></div>
          </div>
        </div>
      </nav>
      <div class="gap d-flex flex-column">
        <CardMessage
          v-for="message in orderedMessages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>
    <div id="page-change" class="text-center nav-link mb-2">Voir plus de messages</div>
  </div>
</template>

<script>
import CardMessage from './CardMessage.vue'
import AddMessage from './AddMessage.vue'
import MessageDataService from "../services/MessageDataService"
import LogoutService from '../services/LogoutService'

export default {
  name: 'Messages',
  components: {
    CardMessage,
    AddMessage
  },
  data() {
    return {
      messages: [],
      orderCrescent: false
    }
  },
  computed: {
    orderedMessages: function() {
      const messages = this.messages;
      if(this.orderCrescent) {
        return messages.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateA - newDateB
        })
      } else {
        return messages.sort((a, b) => {
          var aa = a.createdAt.split(/[- T : .]/);
          var bb = b.createdAt.split(/[- T : .]/);
          var newDateA = new Date( aa[0], aa[1], aa[2], aa[3], aa[4], aa[5] );
          var newDateB = new Date( bb[0], bb[1], bb[2], bb[3], bb[4], bb[5] );
          return newDateB - newDateA
        })
      }
    },
  },
  methods: {
    getAllMessages() {
      MessageDataService.getAll()
      .then(response => {
        this.messages = response.data;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
  },
  mounted() {
    this.getAllMessages();
  }
}
</script>

<style lang="scss">
</style>