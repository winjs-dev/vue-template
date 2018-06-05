# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.2.0"></a>
# [2.2.0](https://github.com/cloud-templates/vue-template/compare/v2.1.8...v2.2.0) (2018-06-05)


### Bug Fixes

* Fix build.js ([e94c4b9](https://github.com/cloud-templates/vue-template/commit/e94c4b9))
* Fix meta.js ([5b63d9f](https://github.com/cloud-templates/vue-template/commit/5b63d9f))


### Features

* Refactor project template ([8ff2c28](https://github.com/cloud-templates/vue-template/commit/8ff2c28))
* run dll ([1d0a5a5](https://github.com/cloud-templates/vue-template/commit/1d0a5a5))



# Change Log
---

## 2.0.2
 
`2017-11-20`
 
- webpack 自动构建工具
 
   - `Fixed` `html-critical-webpack-plugin`引用时，出现`Fatal Error: Penthouse timed out after 30s.`的异常  
   
## 2.0.1
 
`2017-11-13`
 
- webpack 自动构建工具
 
   - `Changed` `webpack`版本更改为3.X，及配套依赖更新版本如（`optimize-css-assets-webpack-plugin`）
   
   - `Changed` HRM更改为webpack-dev-server
   
- src
    
   - `Changed` 新增`RESTFULLURL.js`（通过easymock自动生成）无需手动创建。详细`src/modules/services`
    
   - `Changed` 将`services`挂载到了vue的原型链上，`views`或`component`引用的时候用`this.$services.method`。详细见示例`src/modules/views/hello/hello.vue`
   
## 1.1.4
 
`2017-11-02`
 
- 项目src
 
   - `Improved` 针对`axios`进行进一步的封装，返回`Promise`的实例。详见`src/modules/services/_axios.js`

## 1.1.2
 
`2017-10-19`
 
- webpack 自动构建工具
 
   - `New` 引用`portfinder`，解决同时打开多个应用端口被占用的情况，端口号会自动增加，详见`template/bulid/dev-server.js`
   
   
## 1.1.0
 
`2017-10-12`
 
- webpack 自动构建工具
 
   - `New` 引入减少关键css渲染的自动化解决方案`html-critical-webpack-plugin`
   
   - `New` 引入`webpack.HashedModuleIdsPlugin`

## 1.0.8
 
`2017-10-09`
 
- webpack 自动构建工具
 
   - `Changed` css雪碧图做成配置项
   
- src
    
   - `Changed` 更新组件的写法，采用大驼峰或中划线`template/src/modules/components/SendCode`
    
   - `Changed` 增加路径别名在实战的使用说明demo`template/src/modules/views/hello/index.vue`

## 1.0.6
 
`2017-09-21`
 
- webpack 自动构建工具
 
   - `Changed` 默认设置图片压缩`imagemin`不开启
   
   - `Improved` 路径别名优化
   
## 1.0.5
 
`2017-09-20`
 
- webpack 自动构建工具
 
   - `Changed` 更新`compression-webpack-plugin`版本号，避免出现`node-gyp``node-pre-gyp`下载异常的问题
   
- src
    
   - `Changed` 更新`template/src/modules/config.js`及`template/src/config.js` 
      
   
## 1.0.4
 
`2017-09-18`
 
- webpack 自动构建工具
 
   - `Changed` 为dist目录下index.html引用的`config.js`添加hash值,去除缓存

## 1.0.3
 
`2017-09-08`
 
- webpack 自动构建工具
 
   - `Changed` 引入`cloud-utils`工具类函数集合，替换工程里的`utils`
 
- src
 
   - `Changed` 修复组件`sendcode`异常 
   
   - `New` 引入`store.js`，详见`template/src/assets/js/store.js` 
   
## 1.0.2
 
`2017-09-04`
 
- webpack 自动构建工具
 
   - `New` 引入`eslint`javascript代码检测工具，新增命令`npm run lint`，详见`template/package.json`、`template/.eslintrc.js`
 
- src
 
   - `Changed` 将`template/src/modules/utils/_axios.js`转移到了`template/src/modules/services`目录下 
   
## 1.0.1

`2017-08-16`

- webpack 自动构建工具

  - `New` 引入`webpack.ProgressPlugin`打包进度条，有关配置在template/build/webpack.prod.conf.js文件里（101行）

  - `Improved` 添加生产环境中，去除js文件的日志信息功能，有关配置在template/build/webpack.prod.conf.js文件里（36行） 
  

## 1.0.0

`2017-08-15`

- webpack 自动构建工具

  - `New` 引入`webpack-spritesmith`图片精灵功能，把需要合并的小图片拷贝至`src/assets/images/sprites`，执行命令行`npm run dll`，会在项目`src/assets/less/`自动生成`_sprite.css`（已在main.less里引用）。有关配置在template/build/webpack.dll.conf.js文件里（69行）

  - `New` 引入`imagemin-webpack-plugin`图片压缩功能，有关配置在template/build/webpack.prod.conf.js文件里（113行）

  - `New` 将相关第三方模块依赖（node_modules里的具体模块），依靠CommonsChunkPlugin功能，打包到vendor.js文件里，利于实现增量更新，有关配置在template/build/webpack.prod.conf.js文件里（70行）

  - `Improved` html文件里需要引用的图片静态资源，新增copyfiles文件夹。这样就不需要每次手动在webpack.dll.conf.js添加

  - `Update` 更新package.json的`webpack`版本

- 项目src

  - `New` 新增文件夹`copyfiles`和`sprites`至目录`assets/images`，**`copyfiles`目录下的文件并不会被webpack处理，它们会直接复制到最终的打包目录（默认是dist/assets/images/copyfiles），而其他的静态资源都会被webpack处理解析为模块依赖**

  - `New` 新增文件夹`widget`至目录`assets/less`，主要放置web组件的样式文件，如button.less

  - `Update` 更新package.json的`webpack`版本

  - `Changed` 删除`font.less`，直接引用fonts文件夹下的iconfont.css。
