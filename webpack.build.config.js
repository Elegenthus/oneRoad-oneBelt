const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'main.js': ['./src/main.js'],
        'manage.js': ['./src/manage.js'],
        'login.js': ['./src/login.js'],
        'learn.js': ['./src/learn.js'],
        'about.js': ['./src/about.js'],
        // vendor: ["vue", "whatwg-fetch", "./src/scss/reset.css"]
    },
    output: {
        path: path.join(__dirname, "statics"),
        publicPath: '/static/',
        filename: '[name]'
    },
    module: {
        noParse: /vue.runtime.min/,
        loaders: [{
                test: /\.vue$/,
                loader: 'vue',
                options: {
                    cssModules: {
                        localIdentName: '[name]-[local]-[hash:base64:5]',
                        camelCase: true
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }, {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                loader: 'url-loader?limit=20&name=images/[hash:8].[name].[ext]'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
        alias: {
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js")
    ]
};