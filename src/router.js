// require vue and vue modules
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

/* IMPORT COMPONENTS */
// page components
import {Home, About, Phaser, Three, Pixi} from './components/'
// element components
import {PixiComponent, PhaserComponent, ThreeComponent, Navigation, Overlay, Header, Footer, DrawerComponent, GridComponent, Test} from './components/'


// global elements
Vue.component('PixiComponent', PixiComponent)
Vue.component('ThreeComponent', ThreeComponent)
Vue.component('PhaserComponent',PhaserComponent)
Vue.component('SiteNavigation', Navigation)
Vue.component('SiteOverlay', Overlay)
Vue.component('SiteHeader', Header)
Vue.component('SiteFooter', Footer)
Vue.component('DrawerComponent', DrawerComponent)
Vue.component('GridComponent', GridComponent)

// register router
Vue.use(Router)
Vue.use(VueResource);


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
    },
    {
      path: '/phaser',
      name: 'Phaser',
      component: Phaser
    },
    {
      path: '/three',
      name: 'Three',
      component: Three
    },
    {
      path: '/pixi',
      name: 'Pixi',
      component: Pixi
    }    
  ]
})
