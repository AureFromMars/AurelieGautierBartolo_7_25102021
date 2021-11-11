<template>
  <div id="app" class="m-auto h-100">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .img-container {
    width: 100%;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .tertiary-color {
    color: $COLOR_TERTIARY;
  }
  .btn {
    max-width: 200px;
    // color: $COLOR_PRIMARY_LIGHT;
    background-color: $COLOR-TERTIARY;
  };
</style>
