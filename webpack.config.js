const path = require('path');

module.exports = {
    entry: {
        background:"./src/background.js",
        devtools:"./src/devtools.js",
        panel:"./src/panel.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"dist")
    },
    module: {
        loaders: [
            {
                test:/\.js?/,
                include : path.resolve(__dirname,"src"),
                loader: 'babel-loader'
            },
            {
                test:/\.css?/,
                include: path.resolve(__dirname,"src"),
                loader: 'css-loader'
            }
        ]
    }
}