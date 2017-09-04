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

export function formatSize(size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return size.toString() + ' B';
}
