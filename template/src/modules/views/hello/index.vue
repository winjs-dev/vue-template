<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/images/copyfiles/logo.png">
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;template&gt;
            &lt;div class=&quot;page page-hello&quot;&gt;
              &lt;!-- 静态资源路径写法事例 --&gt;
              &lt;img src=&quot;~@assets/images/copyfiles/logo.png&quot;&gt;
              &lt;p v-text=&quot;msg&quot;&gt;&lt;/p&gt;
              &lt;!-- 组件用法 --&gt;
              &lt;send-code class=&quot;button button-default&quot; v-model=&quot;start&quot; @click.native=&quot;handleSendCode&quot;&gt;&lt;/send-code&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            /**
            * 以下仅为事例代码，可以随意扩展修改
            */

            // 工具类
            import {formatDate} from &#x27;utils&#x27;;
            // 组件
            import SendCode from &#x27;@components/SendCode&#x27;;

            export default {
              data() {
                return {
                  msg: &#x27;Welcome to Your Vue.js App&#x27;,
                  start: false
                }
              },
              created() {
                this.getTenantInfo();
              },
              methods: {
                getTenantInfo() {
                  // 接口请求示例
                  const data = {
                    tenant_key: '06db342e571d46da8867b79d7e8a47ea'
                  };
                  this.$services.funcTenantInfoGet({
                    data
                  }).then((res) =&gt; {
                    console.log(&#x27;接口请求成功：&#x27; + JSON.stringify(res, null, 2));
                    this.message = formatDate(Date.now());
                  });
                },
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
        </pre>
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
  import SendCode from '@components/SendCode';

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        message: '现在时间是：',
        start: false
      }
    },
    created() {
      this.getTenantInfo();
    },
    methods: {
      getTenantInfo() {
        const data = {
          tenant_key: '06db342e571d46da8867b79d7e8a47ea'
        };
        this.$services.funcTenantInfoGet({
          data
        }).then((res) => {
          console.log('接口请求成功：' + JSON.stringify(res, null, 2));
          this.message += formatDate(Date.now());
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
