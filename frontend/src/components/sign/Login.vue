<template>
  <div id="login" class="m-3">
    <h3 class="text-center">Formulaire de connexion</h3>
    <form class="d-flex flex-column justify-content-evenly align-center" id="login-form">
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
import http from '../../http-common'

export default {
  name: 'Login',
  data() {
    return {
      // explainErrorMessage: "Votre formulaire d'inscription comporte des erreurs.\nMerci de corriger les informations suivantes :\n\n",
      // errorMessage: "",
      email: null,
      password: null
    }
  },
  methods: {
    login: function () {
        // if (this.errorMessage != "") {
        //   alert(this.explainErrorMessage + this.errorMessage);
        //   return false;// Arrêter la fonction
        // }
        // let user = {
        //   email : this.email,
        //   password : this.password
        // };
        // console.log("user : ", user);
        // let functionLogin = async () => {
        //   try {
        //     http.post('user/login', {
        //       body: JSON.stringify(user),
        //     })
        //     .then( response => response.data())
        //     .then(content => (
        //       console.log("content : ", content),
        //       console.log("content.token : ", content.token)
        //       // localStorage.setItem('token', content.token)
        //     ));
        //     // console.log(this.messages);
        //   } catch (e) {
        //     alert(e)
        //   }
        // }; functionLogin();

        // Définir mon objet user à transmettre à l'API


        // Envoyer les données de l'objet au serveur
        //let functionLogin = () => {
        //  fetch('http://localhost:3001/api/user/login', {
        //    method : 'POST',
        //    headers :{
        //      'Content-type' : 'application/json'
        //    },
        //    body: JSON.stringify(user),
        //  })
        //  .then( response => {
        //    if(response.ok) {
        //      response.json()
        //    } else {
        //      alert("error")
        //    }
            
        //  })// VOIR SI TOUT METTRE DANS LE PREMIER THEN, sans console.log insécure ####################
        //  .then( content => {
        //    console.log("Données renvoyées par l'API :", content),
        //    console.log("token :", content.token)
        
        //Version SuperKev

        // let user = {
        //   email : this.email,
        //   password : this.password
        // };
        // console.log("this.email : ", this.email);
        // console.log("this.password : ", this.password);
        // fetch('http://localhost:3001/api/user/login', {
        //    method : 'POST',
        //    headers :{
        //      'Content-type' : 'application/json'
        //    },
        //    body: JSON.stringify(user),
        //  })
        // .then(async response => {
        //   const data = await response.json();

        //   // check response
        //   if(response.ok)
        //   {
        //     console.log('data :', data);
        //   }
        //   else
        //   {
        //     // reject la promese
        //     const error = data.message;
        //     return Promise.reject(error);
        //   }
        // })
        // .catch(error => {
        //   // gestion error
        //   console.log("error :", error);
        // })



        //Version axios a verifier
        http.post('user/login', {
            email : this.email,
            password : this.password
          })
        .then(async response => {
          const data = await response.json();

          // check response
          if(response.ok)
          {
            console.log('data :', data);
          }
          else
          {
            // reject la promese
            const error = data.message;
            return Promise.reject(error);
          }
        })
        .catch(error => {
          // gestion error
          console.log("error :", error);
        })






      //       // localStorage.setItem('token', JSON.stringify(content.token))
      //       // const tokenStored = JSON.parse(content.token)
      //       // const addTokenToLocalStorage = () => {
      //       //   localStorage.setItem('token', JSON.stringify(tokenStored));
      //       // }
      //       // addTokenToLocalStorage()


      //       // window.location.href = 'home'
      //       // this.$router.replace('home')
        //   });
        // };
        // functionLogin();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>