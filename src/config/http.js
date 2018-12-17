import Qs from 'qs'
import axios from "axios"

var url = 'http://testapp.guoss.cn/gssapi/server/api.do'; //


// axios.defaults.baseURL = url;

// axios.defaults.timeout = 300;


// axios.defaults.transformRequest = [function (data) {
//   data = Qs.stringify(data)
//   return data
// }]

// axios.defaults.transformResponse = [function (data) {
//   data = JSON.parse(data)
//   return data
// }]


// axios.interceptors.request.use(function (config) {
//   console.log("请求开始")
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use((res) => {
//   console.log("请求结束 ")
//   return res;
// }, (error) => {
//   console.log(error)
//   return Promise.reject(error);
// });
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

function http(params) {
  return new Promise((resolve, reject) => {
    console.log(url)
    axios.get(url, {
       params: params
    })
    .then((res) => {
      resolve(res.data)
    }).catch(err => {
      if (err == "Error: timeout of 5000ms exceeded") {
        console.log("服务器请求超时");
        reject('timeout');
        return
      }
      reject(err);
    })
  })

}
export default http
