// import vue and vue modules
import Vue from 'vue'
import Router from 'vue-router'

// import components
import MainHeader from '../components/MainHeader.vue'
import Navigation from '../components/Navigation.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import MainFooter from '../components/MainFooter.vue'
import Card from '../components/Card.vue'

// make components available to use in other components
Vue.component('Navigation', require('../components/Navigation.vue'))
Vue.component('MainHeader', require('../components/MainHeader.vue'))
Vue.component('MainFooter', require('../components/MainFooter.vue'))
Vue.component('Card', require('../components/Card.vue'))

// start vue
Vue.use(Router)

// set routes
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
