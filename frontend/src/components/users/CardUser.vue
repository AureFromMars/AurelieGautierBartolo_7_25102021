<template>
  <!-- <div v-on:click="this.$router.push({name:'User'})">
    <a href="#" data-toggle="collapse" data-target=".forum-content" class="text-body text-decoration-none"> -->
      <div class="user-card rounded-3 bg-white">
        <div class="p-2 p-sm-3 d-flex flex-column justify-content-center">
          <div class="user-card-top d-flex flex-column w-100 align-items-center">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
            <div class="text-muted small">
                <span class="d-none d-sm-inline-block"><i class="far fa-file-alt"></i> 19</span>
                <span><i class="far fa-comment ms-2"></i> 3</span>
            </div>
            <h6 class="tertiary-color">{{ user.username }}</h6>
          </div>
          <p class="my-2">{{ user.bio }}</p>
        </div>
      </div>
    <!-- </a>
  </div> -->
</template>

<script>
export default {
  name: 'CardUser',
  props: {
    'user': {
      'username': String,
      'bio': { Text }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.user-card {
  width: 200px;

  &-top {
    gap: 10px;
  }
}
</style>