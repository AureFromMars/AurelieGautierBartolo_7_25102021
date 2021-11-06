<template>
  <div class="card">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Card',
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