
import http from '../config/http.js'

// import fetch from '../config/fetch'
// import {
//   getStore
// } from '../config/mUtils'

import {
  pageNo,
  pageSize,
  websiteDate
} from "../config/env.js";

// 获取配置信息
export const getSystem = () => http({
  method: 'system_config_constant',
  websiteNode: websiteDate.code
});
//获取首页数据信息
export const getHomeDate = () => http({
  method: 'main_page_show_three',
  websiteNode: websiteDate.code
})
//自动登录数据信息
export const autoLogin = (tokenId) => http({
  method: 'user_login',
  tokenId:tokenId,
})
//获取是否有新的消息
export const getIsNewMessage = (firmId, dataObj) => http(Object.assign({
  method: 'msg_not_read',
  firmId: firmId
},dataObj))
//实现打开微信公众号的次数统计----通过sessionStorage
export const open = (firmId) => http({
  method: 'user_login_rcd',
  firmId: firmId
})
//更多商品数据请求
export const getMoreFistList = (firmId) => http({
  method: 'goods_first_type',
  websiteNode:websiteDate.code,
  firmId:firmId,
})
//二级列表
export const getMoreSecondList = (firmId, typeCode) => http({
  method: 'goods_second_type',
  websiteNode: websiteDate.code,
  firmId: firmId,
  typeCode: typeCode
})

//分类列表+商品列表
export const getMoreGoodsList = (firmId, typeCode, eyeId, pageNo, pageSize) => http({
  method: 'goods_info_show_fou',
  websiteNode: websiteDate.code,
  firmId: firmId,
  typeCode: typeCode,
  eyeId: eyeId,
  pageNo: pageNo,
  pageSize: pageSize
})
//商品详情接口
export const getGoodsDetail = (id) => http({
  method: 'goods_get_by_id_two',
  goodsId:id
});
//添加商品收藏接口
export const addGoodsColle = (id,userId) => http({
  method: 'goods_collection_add',
  goodsId:id,
  userId: userId
})
//删除商品收藏接口
export const delGoodsColle = (id, userId) => http({
  method: 'goods_collection_del',
  goodsId: id,
  userId: userId
})

//提交购物车
export const submitGoCart = (goodsList, firmId) => http({
  method: 'settlement_shop_cart',
  goodsList: goodsList,
  firmId: firmId,
});
//常购商品列表
export const getCollectionList = (pageNo,pageSize) => http({
  method: 'goods_collection',
  websiteNode:websiteDate.code,
  pageNo:pageNo,
  pageSize:pageSize
})
//搜索热词列表
export const getSearchHotcityList = () => http({
  method: 'goods_show_hot',
})

//搜索商品列表->点击热词搜索
export const getSearchGoodsList = (goodsName) => http({
  method: 'goods_show_name2',
  websiteNode: websiteDate.code,
  goodsName: goodsName
});
//搜索商品列表->输入内容搜索
export const getSearchGoodsList1 = (goodsName) => http({
  method: 'goods_show_name',
  websiteNode: websiteDate.code,
  goodsName: goodsName
});
//获取消息列表
export const getMessageList = () => http({
  method: 'mipush_msgrcd_show',
  firmId:firmId,
  pageSize: pageSize,
  pageNo: pageNo,
  tokenId: tokenId,
  sign: sign,
  source: source
});
//获取提示消息 gss_desc
export const getGuossDesc = ( code ) => http({
  method:'gss_desc',
  websiteNode: websiteDate.code,
  code: code
});
// 获取动态验证码
export const getGuossSms = (phoneNumber) => http({
  method: 'gss_sms',
  mobile: phoneNumber,
})
//账号密码登录
export const userLogin = (phoneNumber, password) => http({
  method: 'user_login',
  websiteNode: websiteDate.code,
  mobile: phoneNumber,
  password: password
});
//短信验证码登录
export const userDynamicLogin = (phoneNumber, sms) => http({
  method: 'user_dynamic_login',
  websiteNode: websiteDate.code,
  mobile: phoneNumber,
  smsCode:sms
});

//注册前获取配置的省市区列表
export const getProvincialCityList = () => http({
  method:'get_pcc',
  websiteNode:websiteDate.code
})
//获取街道数据
export const getStreet = (code) => http({
  method: 'get_street',
  code:code
})
//注册
export const register = (dataObj) => http(Object.assign({
  method: 'firm_register'
},dataObj))




