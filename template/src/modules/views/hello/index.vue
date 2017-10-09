<template>
  <div class="page page-hello">
    <!-- 静态资源路径写法事例 -->
    <img src="~@assets/images/copyfiles/logo.png">
    <p v-text="msg"></p>
    <!-- 组件用法 -->
    <send-code class="button button-default" v-model="start" @click.native="handleSendCode"></send-code>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */

  // 工具类
  import {formatTime} from 'utils';
  // 组件
  import SendCode from '@components/SendCode';
  // 服务
  import {login} from 'services';

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        start: false
      }
    },
    methods: {
      handleLogin() {
        login({
          username: 'demo',
          password: '123456'
        }).then((res) => {
          this.message = formatTime(res && res.login_time);
        });
      },
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
