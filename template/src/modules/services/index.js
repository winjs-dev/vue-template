/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/10/24 17:35
 * @version $ 考虑到所有的API都放到这里
 */

/* name module */
import Fetch from '../utils/fetch';

export function login(data) {
    return Fetch('/usercenter/user/mobile_login', { data });
}
