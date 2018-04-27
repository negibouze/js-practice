const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const prod = (env && env.production);
    const plugins = [];
    if (prod) {
        plugins.push(
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        );
    }  
    return {
        mode: prod ? 'production' : 'development',
        entry: { bundle: './src/js/index.js' },
        output: {
            path: path.resolve(__dirname, 'public/assets/js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.(js)$/, exclude: /node_modules/, loader: 'babel-loader' },
            ]
        },
        plugins,
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: '/assets/js',
            watchContentBase: true,
            port: 3000
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                  commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                    compress: {
                        drop_console: true,
                        ecma: 6
                    },
                    mangle: true
                    }
                })
            ]      
        }
    }
}
