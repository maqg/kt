const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, 'dashboard/main.tsx')
    },
    optimization: {
        splitChunks:{
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial"
                }
            }
        }
    },
    watch: true,
    output: {
        path: path.join(__dirname, 'static/dashboard/'),
        filename: "script/[name].js?[hash]",
        publicPath: '/dashboard/'
    },
    mode: "development",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile: path.join("dashboard/tsconfig.json")
                }
            },
            {
                test:/\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: path.join(__dirname, 'postcss.config.js')
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
        port: 8000,
        inline: true,
        contentBase: "dist"
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename:"style/[name].css?[hash]",
        }),
        new HtmlWebpackPlugin({
            template:"./dashboard/index.html",
            filename: '../../views/dashboard.html',
            inject: 'body',
            favicon: path.join(__dirname, "dashboard/static/img/favicon.ico")
        })
    ]
};