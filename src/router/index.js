import Home from '../pages/home/Index.vue'
import About from '../pages/about/Index.vue'
import interceptor from '../app/interceptor'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'Home',
      icon : 'fa-home'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About',
      icon : 'question'
    }
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
    routes
})

router.beforeEach(interceptor)

export {
  router,
  routes
}
