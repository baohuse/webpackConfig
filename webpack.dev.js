const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack'); 
const common = require('./webpack.common.js')
//将sever.yml 转化为 js 对象
const yaml = require('js-yaml')
const fs = require('fs')

let obj = yaml.safeLoad(fs.readFileSync('server.yml', 'utf-8'))
const rules = obj.proxy.rules
console.log('转化',obj.proxy.rules, {...rules})


module.exports = merge(common, {
  mode: 'development', // webpack提供的开发环境模式
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    historyApiFallback: true, // 不跳转
    inline: true, //实时刷新
    hot: true, // 配置热加载
    proxy: {
      // '/api': {
      //   target: 'http://rap2api.taobao.org/app/mock/84689/',
      //   changeOrigin: true //target是域名的话一般需要这个
      // }
      ...rules
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
});