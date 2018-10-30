import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'



Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [
      {path: '',redirect:'/home',},
      {path: '/home',component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')},
      {path: '/more',component: r => require.ensure([], () => r(require('../page/more/moreGoods.vue')), 'more')},
      {path: '/my',component: r => require.ensure([], () => r(require('../page/my/my.vue')), 'my')},
      {path: '/message',component: r => require.ensure([], () => r(require('../page/message/message.vue')), 'message')},
      {path: '/detail',component: r => require.ensure([], () => r(require('../page/more/goodsDetails.vue')), 'detail')}
    ]
  }]
})