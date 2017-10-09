<template>
  <div class="page page-hello">
    <img src="~assets/images/copyfiles/logo.png">
  </div>
</template>

<script>
  // 工具类
  import {formatTime} from 'utils';
  // 组件
  import SendCode from '@components/SendCode';
  // 服务
  import {login} from 'services';

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
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
