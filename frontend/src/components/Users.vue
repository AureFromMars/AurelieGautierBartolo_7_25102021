<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
    <div class="m-2"><MenuUser/></div>
    <div class="user-cards d-flex flex-row flex-wrap justify-content-center">
        <CardUser
        v-for="(user) in users"
        v-bind:key="user.id"
        v-bind:user="user"
        />
    </div>
    </div>
    <div id="page-change" class="small text-end red-text">Changement de page</div>
  </div>
</template>

<script>
import CardUser from './helpers/CardUser.vue'
import MenuUser from './helpers/MenuUser.vue'

export default {
  name: 'Users',
  props: {
    // title: String
  },
  components: {
    CardUser,
    MenuUser
  },
  el: '#user-card',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      newMessageText: '',
      users: [
        {
          id: 1,
          username: 'Username 1',
          bio: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        },
        {
          id: 2,
          username: 'Username 2',
          bio: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        },
        {
          id: 3,
          username: 'Username 3',
          bio: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
        }
      ],
      nextMessageId: 4
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.red-text {
  color: #BA4D55;
}
.background-color {
  background-color: #FFD7D7;
}
.user-cards {
  gap: 10px;
  margin: 20px 0;
}
</style>