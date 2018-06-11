<template>
  <div id="app">
    <header class="header"><span>Vue.js PWA</span></header>
    <div class="pages">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import '~@assets/less/app.less';

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }
  .header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 16px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
