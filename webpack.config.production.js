/**
 * Created by songyingchun on 2017/8/6.
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/main.js",
        vendor: ["Vue", "swiper", "IScroll", "jquery"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].[hash:8].js",
        publicPath: "./",
        sourceMapFilename: "[name].map"
    },
    devServer: {
        hot: true,
        inline: true,
        port: 9000,
        historyApiFallback: true,
    },
    devtool: "cheap-module-inline-source-map",
    module: {
        rules: [{
            test: /\.vue$/,
            include: /src/,
            use: [{
                loader: "vue-loader",
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: "css-loader?sourceMap!postcss-loader!sass-loader",
                            fallback: "vue-loader"
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: "css-loader?sourceMap!postcss-loader!sass-loader",
                            fallback: "vue-loader"
                        })
                    }
                }
            }],
        },{
            test: /\.(js|json)$/,
            exclude: /(node_modules|plugins)/,
            include: /src/,
            enforce: "pre",
            use: [{
                loader: "source-map-loader"
            },{
                loader: "babel-loader"
            },{
                loader: "eslint-loader"
            }]
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            include: /src/,
            use: ExtractTextPlugin.extract({
                use: "css-loader"
            })
        },{
            test: /\.(sass|scss)$/,
            exclude: /node_modules/,
            include: /src/,
            use: ExtractTextPlugin.extract({
                use: "postcss-loader!sass-loader",
                fallback: "css-loader"
            })
        },{
            test: /\.(jpg|jpeg|png|svg|gif)$/,
            exclude: /node_modules/,
            include: /src/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "images/[name].[hash:8].[ext]",
                }
            }]
        }]
    },
    resolve: {
        extensions: [".vue", ".js", ".json", ".sass", ".scss", ".css", ".less", ".jsx"],
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "src": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "favicon.ico",
            template: "index.html",
            filename: "index.html",
            inject: "body",
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'production'"
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
                drop_console: true,
                unused: true,
                toplevel: true,
                properties: true
            },
            sourcemap: true,
            mangle: true,
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "src/data"),
            to: path.resolve(__dirname, "dist/assets/data"),
            name: "[name].[hash:8].[ext]"
        }])
    ]
};
