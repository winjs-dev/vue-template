import {UPLOAD_PREFIX} from '../constant';

// 开发环境服务配置文件取 development
if (process.env.NODE_ENV === 'development') {
  import('../../config/development').then((config) => {
    window.LOCAL_CONFIG = config.default;
  });
}

/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl(prefix) {
  let baseUrl = '';
  switch (prefix) {
    case UPLOAD_PREFIX:
      prefix = '';
      baseUrl = window.LOCAL_CONFIG.API_UPLOAD;
      break;
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME;
  }

  return `${baseUrl}${prefix}`;
}
