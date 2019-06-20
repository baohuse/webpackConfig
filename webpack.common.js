// 这是一份基本的 webpack 配置

const webpack = require('webpack'); 
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
        'style': path.resolve(__dirname, 'src/common/style'),
        'helpers': path.resolve(__dirname, 'src/helpers')
    }
 },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // options: {
            //   modules: true, // 指定启用css modules
            //   localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            // }
          },
        //   {
        //     loader: "postcss-loader"
        //   }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
       new webpack.BannerPlugin('这是一份基本的 webpack 配置'),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "./app/index.tmpl.html")//new 一个这个插件的实例，并传入相关的参数
    // })
  ],
}