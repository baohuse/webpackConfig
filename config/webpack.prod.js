const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production', // webpack提供的生产环境模式，针对生产环境做一定优化
  devtool: 'source-map', //生产环境中我们使用source-map选项生成一份额外的source map文件
});