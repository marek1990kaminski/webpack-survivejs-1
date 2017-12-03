const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

exports.loadCSSProd = ({exclude, include, use}) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        // `allChunks` is needed with CommonsChunkPlugin to extract
        // from extracted chunks as well.
        allChunks: true,
        filename: "[name].css",
    });
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: 'style-loader'
                    }),
                },
            ]
        },
        plugins: [
            plugin,
        ],
    }
};

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});