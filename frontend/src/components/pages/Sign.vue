<template class="container m-auto d-flex h-100">
  <div id="sign" class="container h-100 d-flex flex-nowrap flex-column justify-content-around text-align-center m-auto align-middle">
    <h1>Bienvenue<br/>sur le réseau social de<br/>Groupomania !</h1>
    <div class="img-container m-auto">
      <img :src="require('../../assets/icon-above-font.svg')" alt="Logo Groupomania" title="Page d'accueil de Groupomania, le réseau social de notre entreprise" />
    </div>
    <div class="col-md-12">
      <div class="login_page">
        <div class="form">
          <Register/>
          <Login/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Register from '../helpers/Register.vue'
import Login from '../helpers/Login.vue'

export default {
  name: 'Sign',
  props: {
    msg: String
  },
  components: {
    Register,
    Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#sign {
  // text-align: center;
  // margin-top: 60px;
}

.img-container {
  width: 600px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


</style>