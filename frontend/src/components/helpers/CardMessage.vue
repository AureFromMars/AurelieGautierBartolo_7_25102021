<template>
<!-- <div v-on:click="this.$router.push({name:'User'})">
  <a href="#" data-toggle="collapse" data-target=".forum-content" class="text-body text-decoration-none"> -->
    <div class="message-card rounded-3 bg-white">
      <div class="p-2 p-sm-3 d-flex flex-row">
        <div class="user-picture text-center w-20 m-0">
          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
          <p class="text-muted"><a href="javascript:void(0)">Username</a></p>
        </div>
        <div class="d-flex flex-column ps-3">
          <div class="d-flex flex-row justify-content-between">
            <h6 class="tertiary-color">{{ message.title }}</h6>
            <div class="text-muted small">
              <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> 19</span>
              <span><i class="far fa-comment ms-2"></i> 3</span>
            </div>
          </div>
          <p class="">{{ message.content }}</p>
        </div>
      </div>
    <!-- </div>
  </a> -->
</div>
</template>

<script>
export default {
  name: 'CardMessage',
  props: {
    'message': {
      'title': String,
      'content': { Text }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.user-picture {
  width: 30%;
}

</style>