import axios from "axios";
import iView from "iview";
import VueCookies from 'vue-cookies';
import config from "../config/config.js";

let qs = require("qs");
if (config.env === 'development') {
  console.log(config.env);
  let token = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzYwNDcxMzMsInN1YiI6InNodWFpZ2UiLCJleHAiOjE1MzYwNTA3MzMsImp0aSI6IjQzOGE5ZTgzOTQ5MjQxNWJhMWZhYzk0YWVlZTIwNDFiIiwidWlkIjoxMTMxLCJlIjozNjAwLCJhdWQiOiI0YjA1MzUxZjYxNzU0N2Q3OTdhMDc0YWNkODFmNGQwNyJ9.EmXuAisPl0JwUytwUHZg5gQo5y3VdnQYXd8Yul_SbUc";
  VueCookies.set("token", token);
}
axios.defaults.timeout = 50000;
axios.defaults.baseURL = '';

function http(config) {
  // debugger
  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        // 如果请求为解析url链接的请求 报错情况下进行拦截
        if (config.url.indexOf('parserHtml') != -1) {
          if (response.data.code == 500) {
            return
          }
          if (response.data.code == 10003) {
            iView.Message.error({
              content: response.data.message,
              duration: 3
            });
            return
          }
          if (response.data.code == 10004) {
            iView.Message.error({
              content: response.data.message,
              duration: 3
            });
            return
          }
        }
        if (response.data.code === 401) {
          // 判断该页面是否在iframe标签里面
          if (self != top) {
            top.window.location.href = "http://" + location.hostname.replace(/(micro|wechat|mobile|device)/, "geeker") + "/login.html"
          } else {
            window.location.href = "http://" + location.hostname.replace(/(micro|wechat|mobile|device)/, "geeker") + "/login.html?uri=" + encodeURIComponent(window.location.href);
          }
        } else if (response.data.code === 403) {
          iView.Message.error("权限不足，禁止访问！");
        } else if (response.data.code === 500) {
          if (response.data.message == '无权访问') {
            window.location.href = location.origin + "/noPermisson";
          } else {
            iView.Message.error('网络访问失败，请稍后再试！');
          }
        } else if (response.data.code !== 200) {
          if (response.data === "") {
            return null;
          } else {
            iView.Message.error({
              content: response.data.message,
              duration: 3
            });
          }

        }
        resolve(response.data);
      })
      .catch(err => {
        iView.Message.error({
          content: "网络请求发生错误！",
          duration: 3
        });
        reject(err);
      });
  });
}

/**
 * 封装get方法
 * @param url 要请求的url地址
 * @param params 请求的参数
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  // debugger
  return http({
    method: "GET",
    url: url,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'platform': 'PC',
    }
  });
}

/**
 * 封装post请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return http({
    method: "POST",
    url: url,
    data: qs.stringify(data, {
      allowDots: true
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'platform': 'PC',
    }
  });
}

/**
 * 封装patch请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return http({
    method: "PATCH",
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'platform': 'PC',
    }
  });
}

/**
 * 封装put请求
 * @param url 要请求的url地址
 * @param data 请求的参数
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return http({
    method: "PUT",
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'platform': 'PC',
    }
  });
}