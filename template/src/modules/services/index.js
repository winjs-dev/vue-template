/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/10/24 17:35
 * @version $ 考虑到所有的API都放到这里
 */

/* name module */
import _Axios from './_axios';
import urls from './RESTFULLURL';

let FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return _Axios(urls[key], options);
  }
});

export default FUNS;
