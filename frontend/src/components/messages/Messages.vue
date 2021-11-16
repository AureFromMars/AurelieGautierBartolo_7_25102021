<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <h1>Les messages</h1>
      <div class="message-cards d-flex flex-wrap justify-content-center">
        <AddMessage v-on:newMessageEvent="getAllMessages" />
      </div>
      <h2>Tous les messages</h2>
      <nav class="nav nav-pills nav-gap-y-1 flex-row justify-content-end h-100 text-center small mt-3 mb-1">
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />populaires</router-link>
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />impopulaires</router-link>
        <router-link :to="{name:'users'}" class="nav-link py-0 m-auto">Les +<br />commentés</router-link>
        <div class="d-flex flex-row flex-nowrap p-0 h-100 m-auto">
          <p class="m-auto pe-3">Tri par<br />date</p>
          <div class="m-auto d-flex flex-column flex-nowrap h-100">
            <div v-on:click="orderCrescent = true" class="m-auto" title="Du plus ancien au plus récent" type="button"><i class="nav-link p-0 fas fa-caret-up mb-"></i></div>
            <div v-on:click="orderCrescent = false" class="m-auto" title="Du plus récent au plus ancien" type="button"><i class="nav-link p-0 fas fa-caret-down"></i></div>
          </div>
        </div>
      </nav>
      <div class="message-cards d-flex flex-wrap justify-content-center">
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
    AddMessage,
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
    async getAllMessages() {
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