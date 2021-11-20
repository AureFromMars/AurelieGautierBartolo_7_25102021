<template>
  <div id="body" class="mx-auto my-3 px-4 py-3 h-100 w-100 rounded-3 d-flex flex-column justify-content-start">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style lang="scss" scoped>
  #body {
    min-width: 300px;
    max-width:800px;
    background-color: #FFD7D7;
  }
</style>