const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer'); //css兼容加前缀版本postcss
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//process.env.NODE_ENV = "development";

module.exports = {
    //devtool: 'cheap-module-eval-source-map',//生产模式source-map
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
    //将每个页面的入口文件放在对应的文件目录下,单独打包。避免重复或混杂代码
    entry: {
        //index: __dirname + '/static/src/index.js',
        "js/page/index1/index1": __dirname + '/static/src/index1.js',
        "common/lodash": ['lodash'],
        "common/dll": ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname,'static/build'),
        publicPath: "http://localhost:8080/",
        filename: '[name].js',
        chunkFilename: '[name].[hash].chunk.js'
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
        extensions: ['.js', '.json', '.css','.sass', '.jsx'],
        alias: {
            'iconfont': path.join(__dirname,"/static/src/fonts/iconfont.css"),
            'commonJs': path.join(__dirname, '/static/src/js/common/common.js'),
            'appModuleJs': path.join(__dirname, '/static/src/components/modules/App/App.js'),
            'appModuleCss': path.join(__dirname, '/static/src/components/modules/App/App.css'),
            'appModuleScss': path.join(__dirname, '/static/src/components/modules/App/App.scss'),
            'anotherModuleScss': path.join(__dirname, '/static/src/components/modules/App/Another.css'),
            //import Utility from '../../utilities/utility'; 替换成 import Utility from 'Utilities/utility';
            //Utilities: path.resolve(__dirname, 'src/utilities/'),
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new ExtractTextPlugin({
        //     filename:"[name].css",
        //     ignoreOrder:true,
        //     allChunks: false //所有CSS文件合并成1个文件 不添加allChunks参数的话，不会抽离chunk的css
        // })
        new webpack.optimize.CommonsChunkPlugin({
            name: ["chunk","vendor","dll"],
            //minChunks是指一个文件至少被require几次才会被放到CommonChunk里，如果minChunks等于2，说明一个文件至少被require两次才能放在CommonChunk里
            minChunks: 2
            //filename: "vendor.js"
        }),
        new webpack.HotModuleReplacementPlugin(),
        //删除未引用代码
        // new UglifyJSPlugin({
        //     sourceMap:true
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
};