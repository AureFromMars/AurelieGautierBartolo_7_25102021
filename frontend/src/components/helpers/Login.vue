<template>
  <div class="container">
    <form class="d-flex flex-column justify-content evenly">
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
        <button class="btn" title="Connectez-vous à notre réseau social interne Groupomania" type="submit">
          Se connecter
        </button>
      </form>
    <p class="message">Vous n'avez pas encore de compte ? <a href="#">Inscrivez-vous !</a></p>
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