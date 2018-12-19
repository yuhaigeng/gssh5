import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./action";
import getters from "./getter";
import { websiteDate } from "../config/env";

import { getStore, getSession } from "../config/mUtils";

Vue.use(Vuex)

const state = {
  websiteDate,
  tokenId: '',
  secretKey: '',
  userData: null,
  firmId:'',
  userId:'',
  isLogin: false,
  isNewMessage: false, //是否有新的消息
  isAutoLogin:false,//是否调用过自动登录
  goShopCart: [],//购物车
  system:null,//系统消息
  

  

}
//如果在模块化构建系统中，请确保在开发调用了Vue.user(Vuex)
export default new Vuex.Store({
  // modules: {
  //   cart
  // },
  // plugins: [localStoragePlugin]
  state,
  getters,
  actions,
  mutations
})