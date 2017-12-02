const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.scss'
});

exports.devConf = ({host, port} = {}) => ({
    devtool: 'inline-source-map',
    devServer: {
        stats: "errors-only",
        host,
        port,
        overlay: {
            errors: true,
            warnings: true,
        },
        /*https: true*/
    },
});
//we defined a function here, that receives a destructuring assignment as an argument

exports.loadCSS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ["style-loader", "css-loader", 'sass-loader'],
            },
        ],
    },
});

exports.loadCSSProd = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                }),
            },
        ]
    },
    plugins: [
        extractPlugin,
    ]
};