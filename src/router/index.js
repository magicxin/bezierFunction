import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
Vue.use(Router)

const router = new Router({
  routes: [{
      path:'/',
      component: home,
      meta: {
        keepAlive: false
      }
    }]
})


export default router;

