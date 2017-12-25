const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer'); //css兼容加前缀版本postcss
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = "development";

module.exports = {
    devtool: 'source-map',//开发模式cheap-module-eval-source-map
    devServer: {
        historyApiFallback: false, //不跳转
        headers: { 'Access-Control-Allow-Origin': "*" }, //解决dev-server服务css,js,jpeg等静态资源跨域问题
        contentBase: path.join(__dirname,'static/build'),
        //控制台中不输出打包的信息 false打印
        quiet: false,
        // 不显示任何信息 false 显示
        noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        //有许多监听文件会导致 CPU 大量负载。用 watchOptions.poll 来增加轮询的间隔
        watchOptions: {
            aggregateTimeout: 300
        },
        host: 'localhost',
        port: 8080, //设置端口号
    },
    entry: {
        index: __dirname + '/static/src/index.js'
    },
    output: {
        path: path.join(__dirname,'static/build'),
        publicPath: "http://localhost:8080/",
        filename: '[name].js',
        chunkFilename: '[name].[chunkFilename:8].js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|lib)/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        compact: false,
                        babelrc: false,
                        cacheDirectory: true,
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }]
            },
            {
                test: /\.(css|scss)$/,
                exclude: /(node_modules)/,
                use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,//方便postCss
                            modules: true,//解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
                            localIdentName:"[name]-[local]-[hash:base64:8]"
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        },
                    },{
                        loader: 'sass-loader', 
                        options: { 
                            sourceMap: true 
                        }
                    }
                ]
            },
            // {
            //     test: /\.(css|scss)$/,
            //     exclude: /(node_modules)/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [{ 
            //                 loader: 'css-loader', 
            //                 options: { 
            //                     sourceMap: true,
            //                     importLoaders: 1,//方便postCss
            //                     modules: true,//解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
            //                     localIdentName:"[name]-[local]-[hash:base64:8]"
            //                 } 
            //             },{
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     sourceMap: true,
            //                     config: {
            //                         path: 'postcss.config.js'
            //                     }
            //                 },
            //             },{
            //                 loader: 'sass-loader', 
            //                 options: {
            //                     sourceMap: true 
            //                 }
            //             }
            //         ]
            //     })
            // },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.css','.sass', '.jsx'],
        alias: {
            'iconfont': path.join(__dirname,"/static/src/fonts/iconfont.css"),
            'commonJs': path.join(__dirname, '/static/src/js/common/common.js'),
            'appModuleJs': path.join(__dirname, '/static/src/components/modules/App/App.js'),
            'appModuleCss': path.join(__dirname, '/static/src/components/modules/App/App.css'),
            'appModuleScss': path.join(__dirname, '/static/src/components/modules/App/App.scss'),
            'anotherModuleScss': path.join(__dirname, '/static/src/components/modules/App/Another.css'),
        }
    },
    plugins: [

        //new webpack.optimize.ModuleConcatenationPlugin()
        // new ExtractTextPlugin({
        //     filename:"[name].css",
        //     ignoreOrder:true,
        //     allChunks: false //所有CSS文件合并成1个文件
        // })
        new webpack.HotModuleReplacementPlugin(),
        //删除未引用代码
        new UglifyJSPlugin({
            sourceMap:true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};