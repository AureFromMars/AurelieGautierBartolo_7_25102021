<template>
  <div id="sign" class="min-vh-100 m-auto d-flex">
    <div class="p-2 m-auto d-flex flex-nowrap flex-column justify-content-center text-center align-middle">
      <div class="m-auto">
        <img alt="Groupomania logo" title="Logo de Groupomania" class="w-50 mb-4" src="../assets/icon-above-font.png">
      </div>
      <h1>Bienvenue<br/>sur le réseau social de<br/>Groupomania !</h1>
      <div id="nav" class="my-2">
        <router-link :to="{name:'login'}"><button class="btn me-2">Se connecter</button></router-link>
        <router-link :to="{name:'register'}"><button class="btn">S'inscrire</button></router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sign'
}
</script>

<style lang="scss" scoped>
</style>