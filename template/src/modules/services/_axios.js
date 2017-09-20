/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/23 11:13
 * @version $ https://github.com/mzabriskie/axios
 * 安卓4.4.3一下的手机还是不支持Promise的,需要引入npm install babel-polyfill和npm install babel-runtime，在入口文件上加上即可
 * import 'babel-polyfill';
 */

/* name module */
import Qs from 'qs';
import axios from 'axios';
import autoMatchBaseUrl from './autoMatchBaseUrl';

// 添加一个请求拦截器 （于transformRequest之前处理）
axios.interceptors.request.use(function (config) {
  if (config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    if (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      let contentType = config.headers['Content-Type'];
      if (typeof contentType !== 'undefined') {
        if (~contentType.indexOf('multipart')) {
          // 类型 `multipart/form-data;`
          config.data = config.data;
        } else if (~contentType.indexOf('json')) {
          // 类型 `application/json`
          // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
          config.data = JSON.stringify(config.data);
        } else {
          // 类型 `application/x-www-form-urlencoded`
          // 服务器收到的raw body(原始数据) name=homeway&key=nokey
          config.data = Qs.stringify(config.data);
        }
      }
    }
  }
  // 若是有做鉴权token , 就给头部带上token
  if (~config['url'].indexOf('operatorQry')) {
    config.headers['accessToken'] = 'de4738c67e1bb450be71b660f0716aa4675860cec1ff9bc23d800efb40519cf3';
  }
  return config;
}, function (error) {
  // 当出现请求错误是做一些处理
  return Promise.reject(error);
});

// 添加一个返回拦截器 （于transformResponse之后处理）
// 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
axios.interceptors.response.use(function (response) {
  // 对返回的数据进行一些处理
  let responseConfig = response && response.config;
  let result = response && response.data;

  // json
  if (responseConfig.responseType === 'json') {
    try {
      result = JSON.parse(result);
      if (String(result.error_no) === '2000') { // 未登录已超时
        return;
      }
    } catch (e) {
      console.log('转换失败：' + e);
    }
  }

  return result;
}, function (error) {
  // 对返回的错误进行一些处理
  return Promise.reject(error);
});

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 * @private
 */
export default function _Axios(url, {
  method = 'post',
  timeout = 10000,
  prefix = window.CT.OPEN_PREFIX,
  data = {
    'date': Date.now()
  },
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
  },
  dataType = 'json'
}) {
  let baseUrl = autoMatchBaseUrl(prefix);

  return axios({
    // `baseURL`如果`url`不是绝对地址，那么将会加在其前面。
    // 当axios使用相对地址时这个设置非常方便
    // 在其实例中的方法
    baseURL: baseUrl,
    url: url,
    method: method,
    // `params`是请求连接中的请求参数，必须是一个纯对象，或者URLSearchParams对象
    params: method === 'get' && data,
    // `data`是请求提需要设置的数据
    // 只适用于应用的'PUT','POST','PATCH'，请求方法
    // 当没有设置`transformRequest`时，必须是以下其中之一的类型（不可重复？）：
    // -string,plain object,ArrayBuffer,ArrayBufferView,URLSearchParams
    // -仅浏览器：FormData,File,Blob
    // -仅Node：Stream
    data: method === 'post' && data,
    timeout: timeout,
    headers: headers,
    // `responseType`表明服务器返回的数据类型，这些类型的设置应该是
    // 'arraybuffer','blob','document','json','text',stream'
    responseType: dataType,
    // `transformRequest`允许请求的数据在传到服务器之前进行转化。
    // 这个只适用于`PUT`,`GET`,`PATCH`方法。
    // 数组中的最后一个函数必须返回一个字符串或者一个`ArrayBuffer`,或者`Stream`,`Buffer`实例,`ArrayBuffer`,`FormData`
    transformRequest: [function (data) {
      // 依自己的需求对请求数据进行处理
      return data;
    }],
    // `transformResponse`允许返回的数据传入then/catch之前进行处理
    transformResponse: [function (data) {
      // 依自己的需求对数据进行处理
      return data;
    }]
  }).catch(function (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.log('error: ' + error.response.data);
      console.log('error: ' + error.response.status);
      console.log('error: ' + error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log('error: ' + error.config);
  });
}
