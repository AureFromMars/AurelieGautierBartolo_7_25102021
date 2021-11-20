<template>
  <div id="footer" class="background-color d-flex flex-column py-4">
    <div class="d-flex flex-row flex-wrap justify-content-center small">
      <router-link class="text-white mx-3 mb-2" :to="{ name: 'home'}">Vie privée</router-link>
      <router-link class="text-white mx-3 mb-2" :to="{ name: 'home'}">Mentions légales</router-link>
      <router-link class="text-white mx-3 mb-2" :to="{ name: 'home'}">Contactez-nous</router-link>
    </div>
    <div class="d-flex flex-row justify-content-center mt-3">
        <img src="../../assets/icon-left-font-monochrome-white.svg" height=20 alt="Logo Groupomania" title="Page d'accueil d'Orinoco, votre meilleur site de vente en ligne" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .background-color {
    background-color: #091F43;
  }
</style>