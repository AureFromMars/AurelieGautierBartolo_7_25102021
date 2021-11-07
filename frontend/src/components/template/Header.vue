<template>
  <div class="header align-items-center m-auto">
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-row flex-wrap justify-content-between align-items-center px-3 my-auto">
    <a class="navbar-brand my-auto" href="index.html"><img class="logo" src="img/orinoco-logo.png" width=200 height=100 alt="Logo Orinoco" title="Page d'accueil d'Orinoco, votre meilleur site de vente en ligne" /></a>
    <div class="d-flex flex-row flex-wrap my-auto mx-2 justify-content-center">
        <form id="searchForm" class="d-flex flex-row flex-nowrap">
            <input id="searchInput" class="form-control form-control-search" type="search" placeholder="Rechercher..." aria-label="Rechercher un article">
            <button id="searchButton" class="btn btn-primary" type="submit">Rechercher</button>
        </form>
        <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mx-2" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!-- Bouton pour accéder à la future page de contact -->
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-comments fa-2x"></i></a>
                </li>
                <!-- Bouton du menu de la page du compte utilisateur à créer utltérieurement -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg" class="rounded-circle" height="35" alt="" loading="lazy"/>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="#">Paramètres</a></li>
                        <li><a class="dropdown-item" href="#">Déconnexion</a></li>
                    </ul>
                </li>
                <!-- Bouton pour accéder au panier cart.html -->
                <li class="nav-item dropdown">
                    <a class="nav-link" href="cart.html">
                        <i class="fas fa-shopping-cart fa-2x"></i>
                        <span class="badgeOfProductsStored badge rounded-pill badge-notification bg-secondary"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
  </div>
  
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #b94242;
}
</style>