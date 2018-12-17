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
  tokenId: getStore('tokenId') ? getStore('tokenId') : '',
  secretKey: getStore('secretKey') ? getStore('secretKey') : '',
  userData: getStore('secretKey') ? getStore('secretKey') : '',
  cartList:[],
  isNewMessage: getSession('message') ? getSession('message') : '',
  

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