<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <div class="message-cards d-flex flex-wrap justify-content-center">
        <AddMessage v-on:newMessageEvent="getAllMessages" />
      </div>
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title" v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchTitle" >Search</button>
          </div>
        </div>
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllMessages"> Remove All</button>
      </div>
      <div class="message-cards d-flex flex-wrap justify-content-center">
         <div class="simplebar-content-wrapper h-100">
            <nav class="nav nav-pills nav-gap-y-1 flex-row justify-content-center">
                <router-link :to="{name:'home'}" class="nav-link nav-link-faded active" >Tous les messages</router-link>
                <router-link :to="{name:'users'}" class="nav-link nav-link-faded">Les plus populaires</router-link>
                <router-link :to="{name:'messages'}" class="nav-link nav-link-faded">Mes messages</router-link>
                <!-- <div><a @click="orderKey = 'libelle'">Legende</a></div>
                <div><a @click="orderKey = 'Description'">Description</a></div> -->
            </nav>
        </div>
      </div>
      <div class="message-cards d-flex flex-wrap justify-content-center">
        <CardMessage
          :class="{ active: index == currentIndex }" 
          v-for="(message, index) in messages" 
          :key="index"
          @click="setActiveMessage(message, index)" 
          :message="message"
        />
      </div>
    </div>
    <div id="page-change" class="small text-end red-text">Changement de page</div>
  </div>
</template>

<script>
import CardMessage from './CardMessage.vue'
import AddMessage from './AddMessage.vue'
import MessageDataService from "../services/MessageDataService"

export default {
  name: 'Messages',
  components: {
    CardMessage,
    AddMessage,
  },
  data() {
    return {
      messages: [],
      currentMessage: null,// SUPP ###########
      currentIndex: -1,
      title: ""// SUPP #############
    }
  },
  methods: {
    getAllMessages() {
      MessageDataService.getAll()
      .then(response => {
        this.messages = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    refreshList() {
      this.retrieveMessages();
      this.currentMessage = null;
      this.currentIndex = -1;
    },
    setActiveMessage(message, index) {
      this.currentMessage = message;
      this.currentIndex = index;
    },
    removeAllMessages() {
      MessageDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
    },
    searchTitle() {
      MessageDataService.findByTitle(this.title)
      .then(response => {
        this.messages = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.getAllMessages()
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