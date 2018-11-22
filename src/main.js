// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./common/mobile-util";

import axios from 'axios' //引入axios

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './common/coverMint.css'
Vue.use(Mint);

Vue.prototype.$ajax = axios //修改Vue的原型属性

Vue.prototype.HOST = 'http://testapp.guoss.cn/gssapi/server/api.do'
Vue.config.productionTip = false

let md5 = require("js-md5")
Vue.prototype.$md5 = md5;


import { pageNo , pageSize , websiteDate , websideNode } from "./config/env.js";
console.log(websiteDate)
Vue.prototype.pageNo = pageNo;
Vue.prototype.pageSize = pageSize;
Vue.prototype.websiteDate = websiteDate;

import Vuelazyload from "vue-lazyload"
Vue.use(Vuelazyload,{
  loading:require('../static/img/default_huodong_pic.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
