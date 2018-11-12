// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./common/mobile-util";
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import axios from 'axios' //引入axios

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.prototype.$ajax = axios //修改Vue的原型属性

Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;


import { pageNo , pageSize , websiteDate , websideNode } from "./config/env.js";

Vue.prototype.pageNo = pageNo;
Vue.prototype.pageSize = pageSize;
Vue.prototype.websideNode = websideNode;
Vue.prototype.websiteDate = websiteDate;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
