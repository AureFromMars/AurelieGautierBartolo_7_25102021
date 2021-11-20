<template>
  <div id="login" class="m-3">
    <h2 class="text-center">Formulaire de connexion</h2>
    <form v-on:submit.prevent="login" class="d-flex flex-column justify-content-evenly align-center" method="post" id="login-form">
      <div class="form-group my-2">
        <label for="email">Adresse email<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="email" id="email" name="email" type="email" class="form-control" title="Votre adresse email" placeholder="Veuillez saisir votre adresse email..." required />
      </div>
      <div class="form-group my-2">
        <label for="password">Mot de passe<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="password" id="password" name="password" type="text" class="form-control" title="Votre mot de passe" placeholder="Veuillez saisir votre mot de passe..." required />
      </div>
      <div class="form-group my-2">
        <button type="submit" name="submit" class="btn" title="Connectez-vous à notre réseau social interne Groupomania">Soumettre</button>
      </div>
    </form>
  </div>
</template>

<script>
import { requestWithoutAuth } from '../../http-common'

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    login: function () {
      requestWithoutAuth().post('user/login', {
        email: this.email,
        password: this.password
      })
      .then( async response => {
        const data = await response.data;
        if (response) {
          console.log('data :', data);
          localStorage.setItem('token', response.data.token);// Future improvement with localStorage + cookies : https://www.codeheroes.fr/2020/06/20/securiser-une-api-rest-3-3-gestion-du-jwt-cote-client/
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('isAdmin', response.data.isAdmin);
          this.$router.push({ name: 'home' });
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error :", error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>