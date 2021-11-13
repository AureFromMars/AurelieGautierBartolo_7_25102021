<template>
<div id="card-message">
  <div class="message-card rounded-3 bg-white m-auto p-2 p-sm-3 d-flex flex-row">
    <div class="text-center w-30">
      <a href="#" class="text-decoration-none">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" width="50" alt="User" />
        <p class="text-muted">{{ message.userId }}</p>
      </a>
    </div>
    <router-link :to="'message/' + this.message.id" class="d-flex flex-column w-100 ps-3 text-decoration-none text-black">
      <div class="d-flex flex-column w-100 ps-3">
        <div type="button" class="d-flex flex-column w-100 ps-3">
          <div class="d-flex flex-row flex-wrap justify-content-between">
            <h6 class="tertiary-color">{{ message.title }}</h6>
            <Counter/>
            <!-- <div class="d-flex flex-row flex-nowrap text-muted small">
              <span><i class="far fa-comment"></i> 3</span>
              <span class="ms-2"><i class="far fa-thumbs-up"></i> 19</span>
            </div> -->
          </div>
          <p>{{ message.createdAt }}</p>
          <p>{{ message.content }}</p>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import Counter from '../helpers/Counter.vue'

export default {
  name: 'CardMessage',
  components: {
    Counter
  },
  props: [
    'message'// peut être défini comme tableau ou boolean
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>