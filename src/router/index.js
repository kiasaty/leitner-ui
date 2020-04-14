import Vue        from 'vue'
import VueRouter  from 'vue-router'

Vue.use(VueRouter)

import NotFound from '@/views/NotFound'
import Login    from '@/views/Login'
import Register from '@/views/Register'

import Front  from '@/views/Front'
import Home   from '@/views/Home'

import Boxes    from '@/views/Boxes'
import Box      from '@/views/Box'
import Session  from '@/views/Session'

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    component: Front,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/boxes',
        name: 'Boxes',
        component: Boxes,
      },
      {
        path: '/boxes/:id',
        name: 'Box',
        component: Box,
      },
    ]
  },
  {
    path: '/boxes/:id/session',
    name: 'Session',
    component: Session,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  // some pages should only be shown to guests
  const guestPages = ['Login', 'Register']
  const onlyGuestsAllowed = guestPages.indexOf(to.name) !== -1
  if (loggedIn && onlyGuestsAllowed) {
    return next({ name: 'Home' })
  }

  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['Home', ...guestPages]
  const authRequired = publicPages.indexOf(to.name) === -1
  if (!loggedIn && authRequired) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
