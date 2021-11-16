<template>
  <div class="m-0 px-5 py-2 h-100">
    <div class="h-100 w-100 m-auto d-flex flex-column justify-content-between">
      <div id="body" class="rounded-3 background-color h-100 d-flex flex-column justify-content-start">
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

<style lang="scss" scoped>
  #body {
    min-width: 300px;
  }
  .background-color {
    background-color: #FFD7D7;
  }
</style>