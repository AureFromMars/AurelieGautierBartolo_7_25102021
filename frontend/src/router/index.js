import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../views/Home.vue'
import Users from '../components/Users.vue'
import User from '../components/User.vue'
import Messages from '../components/Messages.vue'
import Message from '../components/Message.vue'

Vue.use(VueRouter)
// Ajouter une redirection vers le loging si pas connecté // C'est pas un path if token pas bon, alors redirection login
// Si connecté => Home // middleware pour vérifier si besoin connecter
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/sign/login'// A revoir après middleware
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/messages',
      children: [
        {
          path: 'messages',
          name: 'Messages',
          component: Messages,
          children: [{
            path: '/:id',
            name: 'Message',
            component: Message
          }]
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
          children: [{
            path: '/:id',
            name: 'User',
            component: User
          }]
        }
      ]
    }
  ],
  mode:"history"
})
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// }) // https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

// mettre le token dxans le localStorage et vérifier si redirec vers home si requiresAuth = true
// https://router.vuejs.org/guide/advanced/meta.html

export default router