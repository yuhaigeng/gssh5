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
      {path: '/home',component: r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')},      //主页
      {path: '/more',component: r => require.ensure([], () => r(require('../page/more/moreGoods.vue')), 'more')}, //更多商品
      {path: '/my',component: r => require.ensure([], () => r(require('../page/my/my.vue')), 'my')},              //个人中心
      {path: '/message',component: r => require.ensure([], () => r(require('../page/message/message.vue')), 'message')}, // 消息
      {path: '/login',component: r => require.ensure([],() => r(require('../page/login/login.vue')), 'login')},   //登录
      {path: '/register',component: r => require.ensure([],() => r(require('../page/login/register.vue')), 'register')}, //注册
      {path: '/detail',component: r => require.ensure([], () => r(require('../page/more/goodsDetails.vue')), 'detail')}, //详细信息
      {path: '/address',component: r => require.ensure([], () => r(require('../page/address/addressManagement.vue')), 'address')}, //地址管理
      {path: '/newEditor',component: r => require.ensure([], () => r(require('../page/address/newEditor.vue')), 'newEditor')}, //新建编辑
      {path: '/search',component: r => require.ensure([], () => r(require('../page/more/search.vue')), 'search')}, //搜索
      {path: '/setUp',component: r => require.ensure([], () => r(require('../page/setUp/setUp.vue')), 'setUp')}, //设置
      {path: '/company',component: r => require.ensure([], () => r(require('../page/setUp/company.vue')), 'company')}, //公司信息
      {path: '/revise',component: r => require.ensure([], () => r(require('../page/setUp/revise.vue')), 'revise')}, //需改密码
     


    ]
  }]
})