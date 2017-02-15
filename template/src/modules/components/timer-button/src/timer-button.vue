<template>
  <button type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>

<script>
  export default{
    name: 'timer-button',
    data() {
      return {
        timer: 0
      }
    },
    props: {
      second: {
        type: Number,
        default: 60
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      run: function () {
        this.$emit('run');
      },
      start: function(){
        this.time = this.second;
        this.timer();
      },
      stop: function(){
        this.time = 0;
        this.disabled = false;
      },
      setDisabled: function(val){
        this.disabled = val;
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }else{
          this.disabled = false;
        }
      }

    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    }

  }
</script>


<!--
用法：

html:

<timer-button ref="timerbtn" class="btn btn-default" v-on:run="sendCode"></timer-button>

js:
var vm = new Vue({
    el:'#app',
    methods:{
        sendCode:function(){
            vm.$refs.timerbtn.setDisabled(true); //设置按钮不可用
            ajax("sys/sendCode?_"+$.now(),function(data){
                if(data.status){
                    vm.$refs.timerbtn.start(); //启动倒计时
                }else{
                    vm.$refs.timerbtn.stop(); //停止倒计时
                }
            });
        },
    }
});
-->
