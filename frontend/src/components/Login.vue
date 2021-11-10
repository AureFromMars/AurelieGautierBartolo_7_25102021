<template>
  <div id="login" class="m-3">
    <h3 class="text-center">Formulaire de connexion</h3>
    <form class="d-flex flex-column justify-content-evenly align-center" id="login-form" action="" method="post">
      <div class="form-group my-2">
        <label for="email">Adresse email<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="email" id="email" name="email" type="email" class="form-control" title="Veuillez renseigner une adresse email valide." placeholder="Veuillez renseigner une adresse email valide..." required />
      </div>
      <div class="form-group my-2">
        <label for="password">Mot de passe<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="password" id="password" name="password" type="text" class="form-control" title="Veuillez saisir votre mot de passe." placeholder="Veuillez saisir votre mot de passe..." required />
      </div>
      <div class="form-group my-2">
        <button v-on:click="login" type="submit" name="submit" class="btn btn-primary btn-md" title="Connectez-vous à notre réseau social interne Groupomania">Soumettre</button>
      </div>
    </form>
<!-- A FAIRE ############################################################################# -->
    <!-- <LoggedIn msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
// import LoggedIn from '@/components/notifications/LoggedIn.vue'

export default {
  name: 'Login',
  props: {
    msg: String
  },
  components: {
    // LoggedIn
  },
  data() {
    return {
      // explainErrorMessage: "Votre formulaire d'inscription comporte des erreurs.\nMerci de corriger les informations suivantes :\n\n",
      // errorMessage: "",
      email: null,
      password: null
    }
  },
  methods: {
    register: function () {
      try {
        // if (this.errorMessage != "") {
        //   alert(this.explainErrorMessage + this.errorMessage);
        //   return false;// Arrêter la fonction
        // }

        // Définir mon objet user à transmettre à l'API
        let user = {
          email : this.email,
          password : this.password
        };
        // Envoyer les données de l'objet au serveur
        let functionLogin = async () => {
          try {
            fetch('http://localhost:3001/api/user/login', {
              method : 'POST',
              headers :{
                'Content-type' : 'application/json'
              },
              body: JSON.stringify(user),
            })
            .then( response => response.json())// VOIR SI TOUT METTRE DANS LE PREMIER THEN, sans console.log insécure ####################
            .then( content => {
              console.log("Données renvoyées par l'API :", content),
              window.location.href = 'home'// Rediriger vers la page home
            });
          } catch (e) {//Afficher une alerte d'erreur en cas de problèmes d'accès
            alert(e)
          }
        };
        functionLogin();
      } catch (e) {//Afficher une alerte d'erreur en cas de problèmes d'accès
        alert(e)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>