<template>
  <div class="background-color d-flex flex-column py-4">
    <div class="d-flex flex-row justify-content-center small">
      <router-link class="text-white mx-3" :to="{ name: 'Home'}">Vie privée</router-link>
      <p class="text-white mx-3"> | </p>
      <router-link class="text-white mx-3" :to="{ name: 'Home'}">Mentions légales</router-link>
      <p class="text-white mx-3"> | </p>
      <router-link class="text-white mx-3" :to="{ name: 'Home'}">Contactez-nous</router-link>
    </div>
      <div class="d-flex flex-row justify-content-center">
        <img src="../../assets/icon-left-font-monochrome-white.svg" height=20 alt="Logo Groupomania" title="Page d'accueil d'Orinoco, votre meilleur site de vente en ligne" />
    </div>
    <!-- <p class="text-white mt-2 mb-0">© Groupomania 2021</p> -->
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.background-color {
  background-color: #091F43;
}
.img-container {
  width: 100%;
  // height: 80px;

  img {
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }
}

</style>