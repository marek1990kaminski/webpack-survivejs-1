const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

exports.devConf = ({host, port} = {}) => ({
    devtool: 'inline-source-map',
    devServer: {
        stats: "normal", /*errors-only, minimal, none, normal, detailed, verbose*/
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

                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    },
                ]
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