<template>
    <nav class="shadow-sm navbar navbar-expand-lg navbar-light d-flex flex-row flex-wrap justify-content-between ps-4 pe-5">
        <a class="navbar-brand my-auto" href="home.html">
            <img src="../../assets/icon-left-font2.png" height=100 alt="Logo Groupomania" title="Page d'accueil d'Orinoco, votre meilleur site de vente en ligne" />
        </a>
        <div class="d-flex flex-row flex-nowrap justify-content-end ps-4">
            <!-- <form id="searchForm" class="d-flex flex-row flex-nowrap">
                <input id="searchInput" class="form-control form-control-search" type="search" placeholder="Rechercher..." aria-label="Rechercher un article">
                <button id="searchButton" class="btn btn-primary" type="submit">Rechercher</button>
            </form> -->
            <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mx-2" id="navbarContent">
                <ul class="d-flex flex-row navbar-nav me-auto mb-2 mb-lg-0 text-center">
                    <li class="nav-item ms-2">
                        <router-link class="nav-link" :to="{ name: 'Home'}">
                            <p class="tertiary-color mb-2">Accueil</p>
                            <i class="tertiary-color fas fa-home fa-2x"></i>
                        </router-link>
                    </li>
                    <li class="nav-item ms-2">
                        <router-link class="nav-link" :to="{ name: 'User'}">
                            <p class="tertiary-color mb-2">Mon compte</p>
                            <i class="tertiary-color fas fa-user-circle fa-2x"></i>
                        </router-link>
                    </li>
                    <li class="nav-item ms-2">
                        <router-link class="nav-link" :to="{ name: 'Logout'}">
                            <p class="tertiary-color mb-2">Quitter</p>
                            <i class="tertiary-color fas fa-sign-out-alt fa-2x"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
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
<style lang="scss" scoped>
    .navbar-toggler {
        border-color: #091F43;

        // &-icon {
        //     color: #091F43;
        // }
    }
</style>