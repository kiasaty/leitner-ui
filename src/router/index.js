import Vue        from 'vue'
import VueRouter  from 'vue-router'

Vue.use(VueRouter)

import NotFound from '@/views/NotFound'
import Login    from '@/views/Login'
import Register from '@/views/Register'

import Front  from '@/views/Front'
import Home   from '@/views/Home'

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
  { // start of front routes
    path: '/',
    component: Front,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
    ]
  }, // end of front routes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  // redirect to login page if user is not logged in and trying to access a restricted page
  const authRequired = to.matched[0].path == '/panel'
  if (!loggedIn && authRequired) {
    return next('/login')
  }

  // some pages should only be shown to guests
  const guestPages = ['/login', '/register']
  const onlyGuestAllowed = guestPages.indexOf(to.matched[0].path) !== -1
  if (loggedIn && onlyGuestAllowed) {
    return next('/panel')
  }

  next()
})

export default router
