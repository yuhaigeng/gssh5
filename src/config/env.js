/**
 * 配置编译环境和线上环境之间的切换
 * 
 * routerMode: 路由模式
 * websideNode : 站点编码
 * pageNo ：常量 表示分页时候的页数
 * pageSize: 常量 表示分页时候每页数据的多少
 * project_Env : boolean值表示测试或者正式环境
 * 
 */

const websideNode = '3301'
const pageNo = 1;
const pageSize = 10;
const project_Env = false;
// 请求地址数组测试+正式
const apiArr = [
    'http://61.164.113.187:8090/gssapi/server/api.do',
    'http://app.guoss.cn/gss_api/server/api.do'
];

const api = (project_Env) => {
    if (project_Env) {
        return api[1];
    } else {
        return api[0];
    }
}
// 不同站点名字及 微信appId数据
const websiteAllDate = {
  '3301': {
    name: '杭州站',
    appId: ['wxe92e098badc60fab', 'wx4e26ee7446c5aa37'],
  },
  '3302': {
    name: '宁波站',
    appId: ['wxe92e098badc60fab', 'wx8cc1a343dd5c87ac'],
  },
  '3201': {
    name: '南京站',
    appId: ['wxe92e098badc60fab', 'wx6a8d195d6acf1614'],
  }
}

const appId = (project_Env) => {
  if (project_Env) {
    return websiteAllDate[websideNode].appId[1];
  } else {
    return websiteAllDate[websideNode].appId[0];
  }
}
//站点数据
const websiteDate = {
    code: websideNode,
    name: websiteAllDate[websideNode].name,
    appId: appId(),
}
export{
    pageNo,
    pageSize,
    websiteDate,
}

