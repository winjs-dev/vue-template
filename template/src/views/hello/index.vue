<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/images/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <div class="demo">
        <h3>方法示例</h3>
        <prev>
          &lt;template&gt;
          &lt;div class=&quot;page page-hello&quot;&gt;
          &lt;div class=&quot;page-content&quot;&gt;
          &lt;!-- 静态资源路径写法事例 --&gt;
          &lt;img src=&quot;~@assets/images/logo.png&quot;&gt;
          &lt;h1 v-text=&quot;msg&quot;&gt;&lt;/h1&gt;
          &lt;h2 v-text=&quot;message&quot;&gt;&lt;/h2&gt;
          &lt;div class=&quot;demo&quot;&gt;
          &lt;h3&gt;方法示例&lt;/h3&gt;
          &lt;/div&gt;
          &lt;/div&gt;
          &lt;/div&gt;
          &lt;/template&gt;

          &lt;script&gt;
          /**
          * 以下仅为事例代码，可以随意扩展修改
          */

          // 工具类
          import {formatDate} from &#x27;utils&#x27;;
          // 组件
          import {SendCode} from &#x27;@components&#x27;;

          export default {
          data() {
          return {
          msg: &#x27;Welcome to Your Vue.js App&#x27;,
          message: &#x27;现在时间是：&#x27; + formatDate(Date.now()),
          start: false
          }
          },
          methods: {
          handleSendCode() {
          setTimeout(() =&gt; {
          this.start = true;
          }, 1000);
          }
          },
          components: {
          &#x27;send-code&#x27;: SendCode
          }
          }
          &lt;/script&gt;

          &lt;style lang=&quot;less&quot; rel=&quot;stylesheet/less&quot;&gt;
          @import &quot;./style.less&quot;;
          &lt;/style&gt;
        </prev>
      </div>
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
        msg: 'Welcome to Your Vue.js App',
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
