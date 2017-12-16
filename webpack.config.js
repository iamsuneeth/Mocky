const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        background:"./src/js/background.js",
        devtools:"./src/js/devtools.js",
        panel:"./src/js/panel.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"dist")
    },
    devtool:'sourcemap',
    module: {
        loaders: [
            {
                test:/\.js?/,
                include : path.resolve(__dirname,"src/js"),
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            query: {
                                modules:true,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }
                    ]
                })
            },
            { 
                test: /\.scss$/,
                exclude:/node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            query:{
                                modules:true,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot:true
    },
    plugins:[
        new ExtractTextPlugin("style.css"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}