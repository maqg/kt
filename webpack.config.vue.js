const path = require('path');
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        dashboard: path.join(__dirname, 'dashboard-vue/index.ts')
    },
    output: {
        path: path.join(__dirname, 'static/dashboard-vue/'),
        publicPath: '/dashboard-vue/',
        filename: "script/[name].js?[hash]"
    },
    watch: true,
    resolve: {
        extensions: ['.ts','.js', '.vue', '.json', '.config.js'],
        alias: {
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: path.join(__dirname, 'node_modules'),
                options: {
                    configFile: path.join("dashboard-vue/tsconfig.json"),
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.scss?$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(ttf|eot|woff)/,
                loader: "file-loader",
                options: {
                    name: 'font/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ico|svg|png|jpg)/,
                loader: "file-loader",
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        port:8800
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:"style/[name].css?[hash]",
        }),
        new HtmlWebpackPlugin({
            template:"./dashboard-vue/index.html",
            filename: '../../views/dashboard-vue.html',
            inject: 'body',
            favicon: path.join(__dirname, "dashboard-vue/static/img/favicon.ico")
        }),
        new VueLoaderPlugin()
    ]
};