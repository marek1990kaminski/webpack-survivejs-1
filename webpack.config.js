const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require("webpack-merge");
const parts = require("./webpack.parts");


const PATHS = {
    app: path.join(__dirname, "app/js"),
    build: path.join(__dirname, "build"),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        output: {
            path: PATHS.build,
            filename: "[name].js", // In this case [name] will be replaced by the name of the entry - 'app'.
        },
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
    },
    parts.loadCSS(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devConf({
        // Customize host/port here if needed
        host: /*"0.0.0.0"*/process.env.HOST,
        port: 9000/*process.env.PORT*/,
    }),
]);

module.exports = env => {
    if (env === "production") {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};