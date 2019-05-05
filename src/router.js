import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tehtava43',
      name: 'tehtava43',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tehtava43" */ './views/Tehtava43.vue')
    },
    {
      path: '/tehtava44',
      name: 'tehtava44',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tehtava44" */ './views/Tehtava44.vue')
    },
    {
      path: '/tehtava45',
      name: 'tehtava45',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tehtava45" */ './views/Tehtava45.vue')
    },
    {
      path: '/tehtava46',
      name: 'tehtava46',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tehtava46" */ './views/Tehtava46.vue')
    }
  ]
})
