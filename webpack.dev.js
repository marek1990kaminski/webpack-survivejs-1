
exports.devConf = ({ host, port } = {}) => ({
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