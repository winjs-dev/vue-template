/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/10/24 17:34
 * @version $ IIFE
 */

/* name module */

import {formatDate} from 'utils';

/**
 * [formateTime description]
 * @param  {[type]} timeStamp [description]
 * @param  {[type]} fmt       [description]
 * @return {[type]}           [description]
 */
export function formatTime(timeStamp, fmt) {
  return formatDate(timeStamp, fmt);
}
