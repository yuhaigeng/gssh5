import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home');
const more = r => require.ensure([], () => r(require('../page/more/moreGoods.vue')), 'more');
const my = r => require.ensure([], () => r(require('../page/my/my.vue')), 'my');
const message = r => require.ensure([], () => r(require('../page/message/message.vue')), 'message');
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login');
const register = r => require.ensure([], () => r(require('../page/login/register.vue')), 'register');
const detail = r => require.ensure([], () => r(require('../page/goodsDetails/goodsDetails.vue')), 'detail');
const address = r => require.ensure([], () => r(require('../page/address/addressManagement.vue')), 'address');
const newEditor = r => require.ensure([], () => r(require('../page/address/newEditor.vue')), 'newEditor');
const search =  r => require.ensure([], () => r(require('../page/search/search.vue')), 'search');
const setUp = r => require.ensure([], () => r(require('../page/setUp/setUp.vue')), 'setUp');
const company =  r => require.ensure([], () => r(require('../page/setUp/company.vue')), 'company');
const revise = r => require.ensure([], () => r(require('../page/setUp/revise.vue')), 'revise');
const collect = r => require.ensure([], () => r(require('../page/collect/collect.vue')), 'collect');
const vip = r => require.ensure([], () => r(require('../page/vip/vip.vue')), 'vip');

const coupon = r => require.ensure([], () => r(require('../page/coupon/coupon.vue')), 'coupon');
const vipCoupon = r => require.ensure([], () => r(require('../page/coupon/vipCoupon.vue')), 'vipCoupon');

const score = r => require.ensure([], () => r(require('../page/score/score.vue')), 'score');
const scoreRecord = r => require.ensure([], () => r(require('../page/score/childer/scoreRecord.vue')), 'scoreRecord');
const goodsList = r => require.ensure([], () => r(require('../page/score/childer/goodsList.vue')), 'goodsList');
const good = r => require.ensure([], () => r(require('../page/score/childer/childern/good.vue')), 'good');
const exchangeCoupon = r => require.ensure([], () => r(require('../page/score/childer/exchangeCoupon.vue')), 'exchangeCoupon');
const scoreGame = r => require.ensure([], () => r(require('../page/score/childer/scoreLuckDraw.vue')), 'scoreGame');

const onlineCoupon = r => require.ensure([], () => r(require('../page/coupon/onlineCoupon.vue')), 'onlineCoupon');

const orderManagement = r => require.ensure([], () => r(require('../page/order/orderManagement.vue')), 'orderManagement');
const orderSettlement = r => require.ensure([], () => r(require('../page/order/orderSettlement.vue')), 'orderSettlement');
const orderDetails = r => require.ensure([], () => r(require('../page/order/orderDetails.vue')), 'orderDetails');
const chooseCoupon = r => require.ensure([], () => r(require('../page/order/chooseCoupon.vue')), 'chooseCoupon');
const orderPay = r => require.ensure([], () => r(require('../page/order/orderPay.vue')), 'orderPay');

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect:'/home',
      },
      {
        path: '/home',
        component: home,
        meta: {
          keepAlive: false // 需要被缓存
        }
      },      //主页
      { path: '/more', component: more}, //更多商品
      { path: '/my', component: my},              //个人中心
      { path: '/message', component: message}, // 消息
      { path: '/login', component: login},   //登录
      { path: '/register', component: register}, //注册
      { path: '/detail/:id', component: detail}, //详细信息
      {
        path: '/address',
        component: address
      }, //地址管理
      {path: '/newEditor',component:newEditor}, //新建编辑
      { path: '/search', component: search}, //搜索
      { path: '/setUp', component: setUp}, //设置
      { path: '/company', component: company}, //公司信息
      { path: '/revise', component: revise}, //需改密码
      { path: '/collect', component: collect}, //收藏
      { //vip
        path: '/vip',
        component: vip
      },
      { //vipCoupon
        path: '/vipCoupon',
        component: vipCoupon
      },
      { //优惠卷
        path: '/coupon',
        component: coupon
      },
      { //在线领取优惠卷
        path: '/onlineCoupon',
        component: onlineCoupon
      },
      { //果币商城
        path: '/score',
        component: score ,
        children: [
          { //果币记录
            path: 'record',
            component: scoreRecord,
          },
          { //果币商品
            path: 'goodsList',
            component: goodsList,
            children:[
              { //果币商品
                path: 'good',
                component: good,
              },
            ]
          },
          {//兑换优惠卷
            path: 'exchangeCoupon',
            component: exchangeCoupon,
          },
          {
            path: 'scoreGame',
            component: scoreGame,
          }
        ]
      }, //果币商城
      { path: '/orderManagement', component: orderManagement}, //订单管理
      { 
        path: '/orderDetails',
        component: orderDetails,
        children:[//选择优惠券
          
        ]
      }, //订单详情
      { path: '/orderSettlement', component: orderSettlement}, //订单结算
      { 
        path: 'chooseCoupon',
        component: chooseCoupon,
      },
      { path: '/orderPay', component:orderPay} //订单支付
    ]
  }]
})
