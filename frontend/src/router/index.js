import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign.vue'
import Login from '../components/sign/Login.vue'
import Register from '../components/sign/Register.vue'
import Home from '../views/Home.vue'
import Users from '../components/users/Users.vue'
import User from '../components/users/User.vue'
import Messages from '../components/messages/Messages.vue'
import Message from '../components/messages/Message.vue'

Vue.use(VueRouter)
// Ajouter une redirection vers le loging si pas connecté // C'est pas un path if token pas bon, alors redirection login
// Si connecté => Home // middleware pour vérifier si besoin connecter
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/sign/login'// A revoir après middleware
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/home/messages',
      children: [
        {
          path: 'messages',
          name: 'messages',
          component: Messages,
          children: [{
            path: '/:id',
            name: 'message',
            component: Message
          }]
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
          children: [{
            path: '/:id',
            name: 'user',
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

// mettre le token dans le localStorage et vérifier si redirec vers home si requiresAuth = true
// https://router.vuejs.org/guide/advanced/meta.html

export default router