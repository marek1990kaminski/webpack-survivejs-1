const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require("webpack-merge");
const parts = require("./webpack.parts");


const glob = require("glob");


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
            publicPath: ""
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            },
                        }
                    ]
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
]);

const productionConfig = merge([
    parts.loadCSSProd({use: ['css-loader', 'sass-loader', parts.autoprefix()]}),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true}),
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "./img/[name].[ext]",
        },
    }),
]);

const developmentConfig = merge([
    parts.devConf({
        // Customize host/port here if needed
        host: /*"0.0.0.0"*/process.env.HOST,
        port: 9000/*process.env.PORT*/,
    }),
    parts.loadCSS(),
    parts.loadImages(),

]);

module.exports = env => {
    if (env === "production") {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};

