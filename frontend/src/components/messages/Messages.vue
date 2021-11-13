<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <div class="message-cards d-flex flex-wrap justify-content-center">
        <AddMessage v-on:newMessageEvent="getAllMessages" />
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
    <!-- VERSION with CARD -->
    <h4>VERSION BEZCODER with CARD</h4>
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
      <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row"
        :class="{ active: index == currentIndex }"
        v-for="(message, index) in messages"
        :key="index"
        @click="setActiveMessage(message, index)"
      >
        <div class="text-center w-30">
          <a href="#" class="text-decoration-none">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
            <p class="text-muted">{{ message.userId }}</p>
          </a>
        </div>
        <!-- <div type="button" @click="getOneMessage" class="d-flex flex-column w-100 ps-3"> -->
        <div type="button" class="d-flex flex-column w-100 ps-3">
          <div class="d-flex flex-row flex-wrap justify-content-between">
            <h6 class="tertiary-color">{{ message.title }}</h6>
            <div class="d-flex flex-row flex-nowrap text-muted small">
              <span><i class="far fa-comment"></i> 3</span>
              <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span>
            </div>
          </div>
          <p>{{ message.createdAt }}</p>
          <p>{{ message.content }}</p>
        </div>
        <!-- <Message v-show="isModalVisible" @close="closeMessage" /> -->
      </div>
      <div class="m-auto">
        <div v-if="currentMessage">
          <h4>Message</h4>
          <div>{{ currentMessage.title }}</div>
          <div>{{ currentMessage.content }}</div>
          <div>{{ currentMessage.userId }}</div>
          <div>{{ currentMessage.createdAt }}</div>
          <a class="badge badge-warning" :href="'/messages/' + currentMessage.id" >Edit</a>
        </div>
        <div v-else><br /><p>Please click on a Message...</p></div>
      </div>
    </div>
    <!-- END VERSION with CARD -->
    <div id="page-change" class="small text-end red-text">Changement de page</div>
  </div>
</template>

<script>
import CardMessage from './CardMessage.vue'
import AddMessage from './AddMessage.vue'
// import Message from './Message.vue'
// import { requestAuth } from '../../http-common'
import MessageDataService from "../services/MessageDataService"

export default {
  name: 'Messages',
  components: {
    CardMessage,
    AddMessage,
    // Message
  },
  data() {
    return {
      // messages: null,
      messages: [{
        id: null,
        title: null,
        content: null,
        imgUrl: null
      }],
      currentMessage: null,
      currentIndex: -1,
      title: ""
    }
  },
  // props: [
  //   id,
  //   title,
  //   content,
  //   imgUrl
  // ],
  methods: {
    // VERSION 1
    // getAllMessages: function () {
    //   requestAuth.get('message/all')
    //   .then(async response => {
    //     const data = await response.data;
    //     if (response) {
    //       this.messages = response.data;
    //       // hideLoader(); // Cacher le loader lorsque les cartes de produits sont créées
    //     } else {
    //       const error = data.message;
    //       return Promise.reject(error);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("error :", error);
    //   })
    // },
    // VERSION 2 BEZCODER
    
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