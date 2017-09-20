/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl(prefix) {
  let baseUrl = '';
  switch (prefix) {
    case window.CT.UPLOADING_PREFIX:
      prefix = '';
      baseUrl = window.LOCAL_CONFIG.API_UPLOAD;
      break;
    case window.CT.OPERATOR_PREFIX:
      baseUrl = window.LOCAL_CONFIG.API_HSAIR;
      break;
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME;
  }

  return `${baseUrl}${prefix}`;
}
