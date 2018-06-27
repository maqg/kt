const path = require('path');
const Promise = global.Promise;
module.exports = {
    mode: "development",
    target: "node",
    entry: {
        server: path.join(__dirname, 'src/index.ts')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "server.js"
    },
    watch: true,
    resolve: {
        extensions: ['json','.config.js','.ts', '.js']
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    }
};