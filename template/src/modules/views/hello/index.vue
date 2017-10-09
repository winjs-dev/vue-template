<template>
  <div class="page page-hello">
    <img src="~assets/images/copyfiles/logo.png">
  </div>
</template>

<script>
  // 工具类
  import { formatTime } from 'utils';
  // 组件
  import MessageBox from '@components/messageBox';
  // 服务
  import { login } from 'services';

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
