<template>
  <nav id="header" class="shadow-sm navbar navbar-expand-lg navbar-light d-flex flex-row flex-wrap justify-content-between ps-1 pe-3">
    <router-link :to="{name:'home'}" class="d-flex flex-row">
      <div class="w-100 h-100">
        <img class="m-auto w-100" id="logo" src="../../assets/icon-left-font.png" alt="Logo Groupomania" title="Page d'accueil d'Orinoco, votre meilleur site de vente en ligne" />
      </div>
    </router-link>
    <div class="d-flex flex-row flex-nowrap justify-content-end ps-4 small">
      <button class="navbar-toggler min-h-300" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Bouton de navigation" title="Bouton de navigation">
        <span class="navbar-toggler-icon"></span>
        Menu
      </button>
      <div class="collapse navbar-collapse mx-2" id="navbarContent">
        <ul class="d-flex flex-row navbar-nav me-auto mb-lg-0 text-center">
          <li class="nav-item ms-2">
            <router-link :to="{ name: 'home'}" class="text-decoration-none">
              <p class="tertiary-color mb-2">Accueil</p>
              <i class="tertiary-color fas fa-home fa-2x"></i>
            </router-link>
          </li>
          <li class="nav-item ms-2">
            <div v-on:click="myAccount" class="text-decoration-none" type="button">
              <p class="tertiary-color mb-2">Mon compte</p>
              <i class="tertiary-color fas fa-user-circle fa-2x"></i>
            </div>
          </li>
          <li v-if="displayAdminButton" class="nav-item ms-2">
            <router-link :to="{ name: 'users'}" class="text-decoration-none" type="button">
              <p class="tertiary-color mb-2">Les utilisateurs</p>
              <i class="tertiary-color fas fa-users fa-2x"></i>
            </router-link>
          </li>
          <li class="nav-item ms-2">
            <div v-on:click="logout" class="text-decoration-none" type="button">
              <p class="tertiary-color mb-2">Quitter</p>
              <i class="tertiary-color fas fa-sign-out-alt fa-2x"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import LogoutService from '../services/LogoutService'

export default {
  name: 'Header',
  data() {
    return {
      isAdmin: false
    }
  },
  methods: {
    logout: function () {
      LogoutService()
    },
    myAccount: function () {
      if( !(this.$route.name == 'user' && this.$route.params.id == localStorage.getItem('userId')) ) {
        this.$router.push({ name: 'user', params: {id: localStorage.getItem('userId')} });
        this.$router.go()
      }
    },
    displayAdminButton: function () {
      if (localStorage.getItem('isAdmin') == 'true') {
        return this.isAdmin = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #logo {
    max-height: 100px;
  }
</style>