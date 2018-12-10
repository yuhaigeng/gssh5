import Vue from "vue";
import Vuex from "vuex";
import testStore from "./testStore.js";
Vue.use(Vuex)

const state = {
    cartList: {}, // 加入购物车的商品列表
    userInfo: null, //用户信息
    goodsId: null, //商品ID
    cartId: null, //购物车id
    sig: null, //购物车sig
    orderParam: null, //订单的参数
    orderMessage: null, //订单返回的信息
    orderDetail: null, //订单详情
    login: false, //是否登录
    imgPath: null, //头像地址
}

//如果在模块化构建系统中，请确保在开发调用了Vue.user(Vuex)
export default new Vuex.Store({
    state:{
        message:"old",
    },
    mutations:{
        updateState (state , message) {
             console.log("触发mutations")
            state.message = message
        }
    },
    actions:{
        updateState () {
            console.log("触发actions")
            commit('updateState','new')
        }
    },
    modules:{
        testStore
    }
})