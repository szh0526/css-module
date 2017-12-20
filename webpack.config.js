const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer'); //css兼容加前缀版本postcss
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = "development";

module.exports = {
    entry: {
        index: __dirname + '/src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
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
            // {
            //     test: /\.(css|scss)$/,
            //     exclude: /(node_modules)/,
            //     use: [{
            //             loader: 'style-loader'
            //         }, {
            //             loader: 'css-loader',
            //             options: {
            //                 sourceMap: true,
            //                 importLoaders: 1,//方便postCss
            //                 modules: true,//解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
            //                 localIdentName:"[name]-[local]-[hash:base64:8]"
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true,
            //                 config: {
            //                     path: 'postcss.config.js'
            //                 }
            //             },
            //         },{
            //             loader: 'sass-loader', 
            //             options: { 
            //                 sourceMap: true 
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(css|scss)$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ 
                            loader: 'css-loader', 
                            options: { 
                                sourceMap: true,
                                importLoaders: 1,//方便postCss
                                modules: true,//解决不同的模块中使用相同的类名造成冲突,解决css中class名的污染
                                localIdentName:"[name]-[local]-[hash:base64:8]"
                            } 
                        },{
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
                })
            },{
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'src/imgs/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                options: {
                    limit: 1000,
                    name: 'src/fonts/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"[name].css",
            ignoreOrder:true,
            allChunks: false //所有CSS文件合并成1个文件
        })
    ]
};