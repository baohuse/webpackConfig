const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'none',
    resolve: {
        alias: {
            'style': path.resolve(__dirname, 'src/common/style'),
            'helpers': path.resolve(__dirname, 'src/helpers')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: path.resolve(process.cwd(), './node_modules'), //过滤掉node_modules目录
                include: path.resolve(process.cwd(), './src') //只匹配src目录
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/index.css'
        }),
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            /* eslint-disable */
            if (stream.isTTY && percentage < 0.71) {
              stream.cursorTo(0);
              stream.write(`🐸 building...   ${~~(percentage * 100)}%`);
              stream.clearLine(1);
            } else {
              stream.cursorTo(0);
              stream.write(`🐸 ${msg}   ${~~(percentage * 100)}%`);
              stream.clearLine(1);
            }
            /* eslint-enable */
          }),
          new OptimizeCSSAssetsPlugin({}),
          new UglifyJsPlugin({
            cache: true,
            parallel: true, // 多进程压缩
            sourceMap: true
        })
    ],
    //吧loadsh单独打包出去，或者依赖，起名为 common.js
    optimization: {
        //代码分割，提取依赖公用代码, node_modules下面
        //吧代码中引用的node_modules依赖，超过2个的单独打一个包吧
        splitChunks: {
            //chunks: 'all',
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    minChunks: 1, //被几个模块用了
                    priority: 10 //优先级
                }
            }
        },
        minimize: false,
        minimizer: [
        ]


    }
    
}