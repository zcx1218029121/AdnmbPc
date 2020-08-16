import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'content',
      path: '/',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      name: 'info',
      path: '/info',
      component: require('@/components/info/Info').default
    }
  ]
})
