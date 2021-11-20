import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from './router'
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

Vue.use(VueRouter);
Vue.use(VueIziToast);