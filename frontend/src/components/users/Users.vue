<template>
  <div id="users" class="m-0 px-2 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <h1>Tous les utilisateurs</h1>
    <div class="rounded-3 h-100 d-flex flex-column">
      <div class="gap my-20 mx-0 d-flex flex-row flex-wrap justify-content-center">
          <CardUser
          v-for="(user) in users"
          v-bind:key="user.id"
          v-bind:user="user"
          />
      </div>
    </div>
    <div id="page-change" class="small text-end primary-color">Changement de page</div>
  </div>
</template>

<script>
import CardUser from './CardUser.vue'
import LogoutService from '../services/LogoutService'
import UserDataService from "../services/UserDataService"

export default {
  name: 'Users',
  components: {
    CardUser
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    getAllUsers() {
      UserDataService.getAll()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log("error : ", error);
        if (error.response.status === 401) {LogoutService()}
      });
    },
  },
  mounted() {
    this.getAllUsers();
  }
}
</script>

<style lang="scss" scoped>
</style>