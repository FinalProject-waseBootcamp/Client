
    // resolve: {
    //   modules: [...],
    //   fallback: {
    //     "fs": false,
    //     "tls": false,
    //     "net": false,
    //     "path": false,
    //     "zlib": false,
    //     "http": false,
    //     "https": false,
    //     "stream": false,
    //     "crypto": false,
    //     "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    //   } 
    // }

    const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

    const Dotenv = require('dotenv-webpack');
    module.exports = {
        plugins: [
            new Dotenv(),
            new NodePolyfillPlugin()
        ]
    }
