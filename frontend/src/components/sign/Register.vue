<template>
  <div id="register" class="container">
    <form  v-on:submit.prevent="requestSelectorFileOrNot" id="userRegisterForm" name="userRegisterForm" class="d-flex flex-column justify-content evenly" method="post">
      <div class="form-group my-2">
        <label for="username" class="form-label">Nom d'utilisateur<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="username" id="username" name="username" class="form-control" title="Veuillez renseigner votre nom d'utilisateur." placeholder="Veuillez renseigner votre nom d'utilisateur..." type="text" required />
      </div>
      <div class="form-group my-2">
        <label for="email" class="form-label">Adresse email<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="email" id="email" name="email" class="form-control" title="Veuillez renseigner une adresse email valide." placeholder="Veuillez renseigner une adresse email valide..." type="email" required />
      </div>
      <div class="form-group my-2">
        <label for="password" class="form-label">Mot de passe<abbr title="Ce champ est obligatoire">*</abbr></label>
        <input v-model="password" id="password" name="password" class="form-control" title="Veuillez saisir votre mot de passe." placeholder="Veuillez saisir votre mot de passe..." type="text" required />
      </div>
      <!-- <div class="form-group my-2">
        <input id="password-verify" title="Saisissez à nouveau votre mot de passe." placeholder="Saisissez à nouveau votre mot de passe..." class="form-control" type="text" required />
      </div> -->
      <div class="form-group my-2 d-flex flex-column">
        <label for="file" class="form-label">Image de profil</label>
        <!-- <button id="file" name="file">Ajouter l'image</button> -->
        <input v-on:change="handleFileUpload" id="file" name="file" type="file" accept="image/*" ref="file" />
      </div>
      <div class="form-group my-2">
        <label for="bio" class="form-label">Décrivez-vous en quelques lignes si vous le souhaitez<br></label>
        <textarea v-model="bio" id="bio" name="bio" title="Décrivez-vous en quelques lignes si vous le souhaitez." placeholder="Décrivez-vous en quelques lignes si vous le souhaitez..." rows="4" cols="50"></textarea>
      </div> 
      <!-- <button v-on:click="register" type="submit" name="submit" class="btn btn-primary btn-md" title="Inscrivez-vous sur notre réseau social interne Groupomania">S'inscrire</button> -->
      <button type="submit" name="submit" class="btn btn-primary btn-md" title="Inscrivez-vous sur notre réseau social interne Groupomania">S'inscrire</button>
    </form>
    <!-- <p class="message">Déjà enregistré ? <router-link to="/login">Connectez-vous</router-link></p> -->
  </div>
</template>

<script>
// import Registered from '@/components/notifications/Registered.vue' // @ if succeed to replace src folder
import { requestWithoutAuth } from '../../http-common' // If want to store base URL and headers, else import axios directly
import { requestWithoutAuthWithFile } from '../../http-common' // If want to store base URL and headers, else import axios directly

export default {
  name: 'Register',
  data() {
    return {
      explainErrorMessage: "Votre formulaire d'inscription comporte des erreurs.\nMerci de corriger les informations suivantes :\n\n",
      errorMessage: "",
      username: null,
      email: null,
      password: null,
      file: null,
      bio: null
    }
  },
  methods: {
    checkUsername: function () {
      if (this.username === ""){
        this.errorMessage += "- vous n'avez pas renseigné votre nom d'utilisateur.\n";
        // this.username.className += ' is-invalid';
        return false;
      }
      else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/.test(this.username))) {// Mettre le regex à l'intérieur de /^ +$/
        this.errorMessage += "- vous avez un caractère invalide dans votre nom d'utilisateur.\n";
        // this.username.className += ' is-invalid';
        return false;
      }
      // this.username.classList.remove('is-invalid');
      return true;
    },
    checkEmail: function () {
      if (this.email === ""){
        this.errorMessage += "- vous n'avez pas renseigné votre Adresse Email.\n";
        // email.className += ' is-invalid';
        return false;
      }
      else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))) {
        this.errorMessage += "- le format de votre Email n'est pas valide.\n"
        // email.className += ' is-invalid';
        return false;
      }
      // email.classList.remove('is-invalid');
      return true;
    },
    checkPassword: function() {
      if (this.password === ""){
        this.errorMessage += "- vous n'avez pas renseigné votre Adresse.\n";
        // password.className += ' is-invalid';
        return false;
      }
      else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/.test(this.password))) {
        this.errorMessage += "- vous avez un caractère invalide dans votre Adresse.\n";
        // password.className += ' is-invalid';
        return false;
      }
      // password.classList.remove('is-invalid');
      return true;
    },
    register: function () {
      this.checkUsername();
      this.checkEmail();
      this.checkPassword();

      if (this.errorMessage != "") {
        alert(this.explainErrorMessage + this.errorMessage);
        return false;// Arrêter la fonction
      }
      requestWithoutAuth().post('user/register', {
        username : this.username,
        email : this.email,
        password : this.password,
        bio : this.bio
      })
      .then( async response => {
        console.log('response.data : ', response.data)
        const data = await response.data;
        if(response) {
          console.log("data : ", data);
          this.$router.push({ name: 'login' });
          // window.location.href = 'login';
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
      })
    },
    handleFileUpload(  ){
      this.file = this.$refs.file.files.item(0);
      console.log('this.file : ', this.file);
    },
    registerWithFile: function () {
      this.checkUsername();
      this.checkEmail();
      this.checkPassword();

      if (this.errorMessage != "") {// FAIRE ?????????????????????? ###############################
        alert(this.explainErrorMessage + this.errorMessage);
        return false;// Arrêter la fonction
      }
      let formData = new FormData();
      console.log('formData : ', formData);
      console.log('formData.append("file", this.file) : ', formData.append("file", this.file));

      requestWithoutAuthWithFile().post('user/register', {
        user: {
          username : this.username,
          email : this.email,
          password : this.password,
          bio : this.bio        
        },
        // file : this.file,
        headers: formData.getHeaders(),
        file : formData.append("file", this.file)
        
      })
      .then( async response => {
        console.log('response.data : ', response.data)
        const data = await response.data;
        if(response) {
          console.log("data : ", data);
          this.$router.push({ name: 'login' });
        } else {
          const error = data.message;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error : ", error);
      })
    },
    requestSelectorFileOrNot: function () {
      if (this.file != null) {
        this.registerWithFile()
      } else {
        this.register()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>