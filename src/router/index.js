import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Cart from '@/components/Cart'
import Info from '@/components/Info'

import directive from 'element-ui/packages/popover/src/directive';
Vue.directive('popover', directive);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Products',
      component: Products
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
