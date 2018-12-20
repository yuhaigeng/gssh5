//调用系统参数
const getSystem = function (params) {
    const _this = params
    _this.$ajax.get(_this.HOST, {
        params: {
            method: "system_config_constant",
            websiteNode: _this.websiteNode
        }
    }).then(result => {
        return result.data;
    }).then(data => {
        console.log(data)
        if (data.statusCode == 100000) {
            //return data.data;
            localStorage.setItem("system", JSON.stringify(data.data))
        } else {
            console.log(data.statusStr)
        }
    }).catch(err => {
        // console.log(JSON.parse(data).data.mainActivityList);
        console.log('请求失败：' + err.statusCode);
    });
}
//获取微信jssdk
// const getWxJssdk = function(params){
//     const _this = params
//     _this.$ajax.get(_this.HOST,{
//       params:{
//         method : 'weixin_config',
//         url : _this.HOST
//       }
//     }).then(result => {
//       return result.data;
//   }).then(data => {
//       if(data.statusCode == 100000){
//         return data.data
//       }else{
//         console.log(data.statusStr)
//       }
//   }).catch(err => {
//     console.log('请求失败：' + err.statusCode);
//   });
// }
//获取是否有新消息
const getMessage = function (params) {
    const _this = params;
    console.log(_this.userBasicParam)
    const obj = Object.assign({
        method: "msg_not_read",
    }, _this.userBasicParam);
    console.log(obj)

    _this.$ajax.get(_this.HOST, {
        params: obj
    }).then(result => {
        return result.data;
    }).then(data => {
        console.log(data)
        if (data.statusCode == 100000) {
            if (data.data == 1) {
                _this.isNew = true;
            } else {
                _this.isNew = false;
            }
        } else {
            console.log(data.statusStr)
        }
    }).catch(err => {
        // console.log(JSON.parse(data).data.mainActivityList);
        console.log('请求失败：' + err.statusCode);
    });
}
//判读是否登陆
const getIsLogin = function () {
    if (localStorage.getItem("tokenId")) {
        return true;
    } else {
        return false;
    }
}
//获取tokenId
const getTokenId = function () {
    return localStorage.getItem("tokenId");
};
//获取secretKey
const getSecretKey = function () {
    return localStorage.getItem('secretKey');
};
//获取用户信息
const getUserData = function () {
    return localStorage.getItem('user_data')
};
// 判断环境是android;
const getIsAndroid =  function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    return sUserAgent.match(/Android/i) ? true : false;
};
// 判断环境是;
const getIsIos = function () {
  var ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);;
};
// 判断环境是否为微信
const getIsWeiXin = function () {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
};
// 判断是否是APP
const getIsApp = function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/gss_app/i) == 'gss_app';
};

export{
    getSystem,
    getMessage,
    getIsLogin,
    getTokenId,
    getSecretKey,
    getIsAndroid,
    getIsIos,
    getIsApp,
    getIsWeiXin,
    getUserData,
    // getWxJssdk
}
