<template>
  <div class="user-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
    <div class="text-center w-30">
      <a href="#" class="text-decoration-none">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
        <p class="text-muted">{{ user.username }}</p>
      </a>
    </div>
    <div class="d-flex flex-column w-100 ps-3">
      <div class="d-flex flex-row flex-wrap justify-content-between">
        <h6 class="tertiary-color">{{ user.username }}</h6>
        <div class="d-flex flex-row flex-nowrap text-muted small">
          <span><i class="far fa-comment"></i> 3</span>
          <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span>
        </div>
      </div>
      <p>{{ user.createdAt }}</p>
      <p>{{ user.bio }}</p>
    </div>
  </div>
</template>

<script>
import { requestAuth } from '../../http-common'

export default {
  name: 'myAccount',
  data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
    return {
      // user: {
      //   id: localStorage.getItem('userId'),
      //   username: null,
      //   bio: null,
      //   imgUrl: null
      // }
      user: null
    }
  },
  methods: {
    myAccount: function () {
      // requestAuth.get(`user/one/${this.id}`, {
      //   username: this.username,
      //   bio: this.bio,
      //   imgUrl: this.imgUrl
      // })
      requestAuth().get(`user/one/${this.id}`)
      .then(async response => {
        const data = await response.data;
        if (response) {
          console.log("youpiiiii");
          // hideLoader(); // Cacher le loader lorsque les cartes de produits sont créées
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