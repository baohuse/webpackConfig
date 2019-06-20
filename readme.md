
## 这是一份webpack4.x的不完全指南

- 为什么要用 webpack,
- webpack怎样配置
- webpack优化
- 怎样自己写一个loader plugins

###1 疑问🤔️1， loadder 跟 plugins 有什么区别

问得好，初学者经常会混淆两着，或多或少有些迷惑，让我们来🤔思考一下，loader的作用是什么，怎么配置的，一般loader 主要负责对于某些文件的处理和转化，如 es6 -> es5 , less -> css， 配置的话也是在modules 下面的 rules 使用test匹配到对应文件，再use对应的loadder进行转化

但构建的整个过程并非只是针对单个文件去做处理的，比如我们要将最终编译后的js文件做压缩混淆处理，还有在编译期间定义几个全局常量，将css单独打包，这些都需要 plugins 的支持，那可以看到，plugins 作用与webpack命令的整个生命周期当中

###2 4.x extract-text-webpack-plugin 这个插件用不了？？

推荐使用 mini-css-extract-plugin, 异步加载，并且更快


###3 splitCode 指什么， 单页面应用如何做 splitCode

这个插件源自一个需求，或者说问题？

我们想要提取多个入口 thunk 的公共代码

举例（- 代表用到了一些模块）

a.js - lodash
     - user.js
     - c.js

b.js - lodash
     - user.js
     - d.js

那我们在打包时会打两个包，一般来说是 a.bundle.js  b.bundle.js, 而在这两个包里面都包含了 lodash跟 user , 这不是我们所希望的，我们往往希望 公共的代码 单独打出来， ？

那对于单页面应用来说，我们将依赖打包为单独的文件也是挺好的（浏览器缓存）

### 4 css怎样压缩

optimize-css-assets-webpack-plugin


### 5 对babel的疑问，

babel是一个编译js的工具，它可以将最新的 es6 es7 编译为浏览器支持的代码，还可以编译jsx 等， 

babel的组成是几个模块话的包

@babel/core  核心包   js转化为ast树
@babel/preset-env  解析es6 7
@babel/preset-react  解析 jsx

### 6 开发与生产分离

在webpack4.x之前，我们是怎样做分离的？ 一般是通过webpack.DefinePlugin来设置一些环境变量，在webpack.config.js里面通过 env 来判断是开发还是生产构建，从而加载不同的插件，

开发我们需要
- 本地服务器，跨域代理， hmr
- sourceMap

生产构建
- 更小的bundle /优化, treeShaking啦，路由按需加载啦，codeSplit啦，uglify等
- 更轻量的 sourceMap
- css分离压缩

在webpack 4中，它提供了一个配置项 mode 用来指定模式，比如 development，production，none，
在你设置为production是，webpack会自动帮你做一些事，包括 uglify，依赖单独打包，还有环境变量 NODE_ENV

具体配置请参考： 代码 config目录


## 7 怎样合理利用缓存


## 8 怎样使用webpack-dev-server 代理跨域

这个很多教程都有写，就不啰嗦了，有一点就是代理的服务器地址调试时可能经常会变，能不能把这块抽离单独的文件？？ 项目根目录下的server.yml 
比如 server.yml

proxy:
   rules:
     ^/api: 'http://rap2api.taobao.org/app/mock/84689/'

js-yaml: 他可以将 yml文件转化为javascript对象

解析之后变成了这样
// {
//     proxy:
//     { rules: { '^/api': 'http://rap2api.taobao.org/app/mock/84689/' } }
// }









> 貌似 chrome 浏览器对es6支持的不错，promise,const 都可以，这是不是意味着以后不用配置babel了