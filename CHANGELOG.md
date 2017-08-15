---
引入图片精灵，图片压缩（spritesmith，imagemin-webpack-plugin）等功能
---

## 1.0.0

`2017-08-15`

- webpack 自动构建工具

  - `New` 引入`webpack-spritesmith`图片精灵功能，把需要合并的小图片拷贝至`src/assets/images/sprites`，执行命令行`npm run dll`，会在项目`src/assets/less/`自动生成`_sprite.css`（已在main.less里引用）。有关配置在template/build/webpack.dll.conf.js文件里（69行）

  - `New` 引入`imagemin-webpack-plugin`图片压缩功能，有关配置在template/build/webpack.prod.conf.js文件里（113行）

  - `New` 将相关第三方模块依赖（node_modules里的具体模块），依靠CommonsChunkPlugin功能，打包到vendor.js文件里，利于实现增量更新，有关配置在template/build/webpack.prod.conf.js文件里（70行）

  - `Improved` html文件里需要引用的图片静态资源，新增copyfiles文件夹。这样就不需要每次手动在webpack.dll.conf.js添加

  - `Update` 更新package.json的`webpack`版本

- 项目src

  - `New` 新增文件夹`copyfiles`和`sprites`至目录`assets/images`

  - `New` 新增文件夹`widget`至目录`assets/less`，主要放置web组件的样式文件，如button.less

  - `Update` 更新package.json的`webpack`版本

  - `Changed` 删除`font.less`，直接引用fonts文件夹下的iconfont.css。
