const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, "app"),
    build: path.join(__dirname, "build"),
};

module.exports = {

    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: "[name].js", // In this case [name] will be replaced by the name of the entry - 'app'.
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            title: "Webpack demo",
        }),
        new CleanWebpackPlugin(['build']),
    ],
    devServer: {
        port: 9000,
        // overlay: true is equivalent
        overlay: {
            errors: true,
            warnings: true,
        },
        /*https: true*/
    }
};
