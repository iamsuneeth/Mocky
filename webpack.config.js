const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        background:"./src/js/background.js",
        devtools:"./src/js/devtools.js",
        panel:"./src/js/panel.js",
        main:"./src/styles/main.scss"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"dist")
    },
    module: {
        loaders: [
            {
                test:/\.js?/,
                include : path.resolve(__dirname,"src/js"),
                loader: 'babel-loader'
            },
            { // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  use: 'css-loader?importLoaders=1',
                }),
            },
            { //scss loader for webpack
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot:true
    },
    plugins:[
        new ExtractTextPlugin({
            filename:'main.css'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}