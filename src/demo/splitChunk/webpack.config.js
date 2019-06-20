const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: {
        a: './a.js',
        b: './b.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     use: 'babel-loader',
            //     exclude: path.resolve(process.cwd(), './node_modules'), //过滤掉node_modules目录
            //     include: path.resolve(process.cwd(), './src') //只匹配src目录
            // },
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
            filename: 'index.css'
        })
    ],
    //优化，webpack4将大量插件集成了进来，并使用mode简化了操作
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
    
}