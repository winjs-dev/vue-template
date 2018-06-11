<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/images/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
    </div>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */

  // 工具类
  import {formatDate} from 'utils';
  // 组件
  import {SendCode} from '@components';

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js PWA App',
        message: '现在时间是：' + formatDate(Date.now()),
        start: false
      }
    },
    methods: {
      handleSendCode() {
        setTimeout(() => {
          this.start = true;
        }, 1000);
      }
    },
    components: {
      'send-code': SendCode
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
