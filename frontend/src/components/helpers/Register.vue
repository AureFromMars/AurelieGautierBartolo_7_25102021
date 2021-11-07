<template>
  <div class="container">
    <form class="d-flex flex-column justify-content evenly">
      <div class="form-group">
        <label for="username">
          Nom d'utilisateur<abbr title="Ce champ est obligatoire">*</abbr>
        </label>
        <input id="username" title="Veuillez renseigner votre nom d'utilisateur." placeholder="Veuillez renseigner votre nom d'utilisateur..." class="form-control" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">
          Adresse email<abbr title="Ce champ est obligatoire">*</abbr>
        </label>
        <input id="email" title="Veuillez renseigner une adresse email valide." placeholder="Veuillez renseigner une adresse email valide..." class="form-control" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">
          Mot de passe<abbr title="Ce champ est obligatoire">*</abbr>
        </label>
        <input id="password" title="Veuillez saisir votre mot de passe." placeholder="Veuillez saisir votre mot de passe..." class="form-control" type="text" required />
      </div>
      <div class="form-group">
        <input id="password-verify" title="Saisissez à nouveau votre mot de passe." placeholder="Saisissez à nouveau votre mot de passe..." class="form-control" type="text" required />
      </div>
      <div class="form-group">
        <label for="admin">
          Code administrateur
        </label>
        <input id="admin" title="Veuillez saisir le code administrateur éventuellement fourni." placeholder="Veuillez saisir le code administrateur éventuellement fourni..." class="form-control" type="email" required />
      </div>
      <div class="form-group d-flex flex-column">
        <label for="picture">
          Ajoutez votre photo de profil
        </label>
        <button class="btn">Sélectionnez sur<br/>votre ordinateur</button>
      </div>
      <div class="form-group">
        <label for="bio">
          Décrivez-vous en quelques lignes si vous le souhaitez<br>
        </label>
        <textarea id="bio" title="Décrivez-vous en quelques lignes si vous le souhaitez." placeholder="Décrivez-vous en quelques lignes si vous le souhaitez..." class="form-control" rows="4" cols="50" required></textarea>
      </div> 
      <button class="btn" title="Connectez-vous à notre réseau social interne Groupomania" type="submit">
        S'inscrire
      </button>
    </form>
    <p class="message">Déjà enregistré ? <a href="#">Connectez-vous !</a></p>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#register {
  // text-align: center;
  // margin-top: 60px;
}
</style>