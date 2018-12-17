/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSession = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeSession = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}
// 判断是否是android;环境
export const getIsAndroid = () => {
  var sUserAgent = navigator.userAgent.toLowerCase();
  return sUserAgent.match(/Android/i) ? true : false;
};
// 判断是否是微信环境
export const getIsWeiXin = () => {
  return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
};
// 判断是否是APP环境
export const getIsApp = () => {
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/gss_app/i) == 'gss_app';
};