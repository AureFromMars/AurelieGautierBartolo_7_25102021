<template>
  <div class="m-0 px-5 py-2 h-100">
    <div class="h-100 w-100 m-auto d-flex flex-column justify-content-between">
      <div id="breadcrumbs" class="small text-start red-text">breadcrumbs</div>
      <div id="body" class="rounded-3 background-color h-100 d-flex flex-column justify-content-start">
        <!-- <div id="nav">
          <router-link to="/messages"><button class="btn">Tous les messages</button></router-link> |
          <router-link to="/accounts"><button class="btn">Tous les utilisateurs</button></router-link> |
        </div> -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Body'
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.red-text {
  color: #BA4D55;
}
.background-color {
  background-color: #FFD7D7;
}
</style>