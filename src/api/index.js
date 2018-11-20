// import fetch from '../config/fetch.js'


// export const system = data => fetch('', data, 'GET').then(result => {
//     console.log(result)
//     return result;
// });
import http from '../config/http.js'

function system(data) {
    
  return http(data)
}

export {
  system,
}