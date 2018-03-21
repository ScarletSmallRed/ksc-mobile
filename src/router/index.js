import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Products from '@/views/Products'
import Cart from '@/views/Cart'
import Info from '@/views/Info'

import directive from 'element-ui/packages/popover/src/directive';
Vue.directive('popover', directive);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
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
