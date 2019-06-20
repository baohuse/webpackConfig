const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack'); 
const common = require('./config/webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // webpack提供的开发环境模式
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'), //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    historyApiFallback: true, // 不跳转
    inline: true, //实时刷新
    hot: true // 配置热加载
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
});