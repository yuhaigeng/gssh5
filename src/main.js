// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import axios from 'axios' //引入axios

import Mint from 'mint-ui';

import "./common/mobile-util";
import 'mint-ui/lib/style.css'
import './common/coverMint.css'

let md5 = require("js-md5");

Vue.prototype.$md5 = md5;

Vue.use(Mint);

Vue.prototype.HOST = 'http://testapp.guoss.cn/gssapi/server/api.do'
//http://app.guoss.cn/gss_api/server/api.do
//http://testapp.guoss.cn/gssapi/server/api.do

import { pageNo , pageSize , websiteDate } from "./config/env.js";
console.log(websiteDate)
Vue.prototype.pageNo = pageNo;
Vue.prototype.pageSize = pageSize;
Vue.prototype.websiteDate = websiteDate;
Vue.prototype.websiteNode = websiteDate.code;

import { Lazyload } from 'mint-ui'
Vue.use(Lazyload);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
axios.defaults.timeout = 5000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 5000;
axios.interceptors.response.use((res) => {
    console.log(res)
      console.log("请求结束 ")
      return res;
    }, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config);
    });
});
Vue.prototype.$ajax = axios //修改Vue的原型属性