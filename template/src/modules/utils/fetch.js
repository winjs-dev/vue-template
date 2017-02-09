/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/23 11:13
 * @version $ https://github.com/mzabriskie/axios
 */

/* name module */
import { getSessionStorageItem } from '../utils/func';
import axios from 'axios';

/**
 * 基于axios ajax请求
 * @param url
 * @param isOpenApi 若有不同环境的接口
 * @param method
 * @param data
 * @param timeout
 * @param headers
 * @returns {Promise<R>|Promise.<T>|*}
 */
export default function fetch(url, {method = 'post', data = {}, timeout = 3000, headers = {}}) {

  let baseUrl = LOCAL_CONFIG.API_HOME;

  // 固定的参数
  Object.assign(data, {
    access_token: getSessionStorageItem('access_token')
  });

  /**
   *   全局请求及响应拦截器
   */
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data

    if (response.data.error_no == '2000') { // 未登录已超时

      return;
    }

    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  return axios({
    baseURL: baseUrl,
    url: url,
    method: method,
    params: method === 'get' && data,
    data: method === 'post' && data,
    timeout: timeout,
    headers: headers,
    transformResponse: [function (response) {
      // Do whatever you want to transform the data
      var res = null;

      try {
        // statements
        res = JSON.parse(response);

        return res;
        // return [res.data][0] ? res.data : res;
      } catch (e) {
        // statements
        console.log('axios transformResponse ' + e);
      }
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
