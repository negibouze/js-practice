const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env) => {
    const public = path.resolve(__dirname, 'public');
    const build = path.resolve(__dirname, 'build');
    const prod = (env && env.production);
    const shouldUseSourceMap = !prod;
    const plugins = [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(public, 'index.html'),
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
        })
    ];
    if (prod) {
        plugins.push(
            new CopyWebpackPlugin([
                { from: public, to: build, ignore: ['index.html'] }
            ]),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        );
    }
    return {
        bail: true,
        mode: prod ? 'production' : 'development',
        devtool: shouldUseSourceMap ? 'source-map' : false,
        entry: { bundle: './src/index.js' },
        output: {
            path: build,
            filename: 'assets/js/[name].[chunkhash:8].js',
            chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'        
        },
        module: {
            rules: [
                { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader', options: {} },
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
                {
                    test: /\.(styl|stylus)$/, exclude: /node_modules/,
                    use: [
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: shouldUseSourceMap,
                                minimize: true,
                                importLoaders: 2                                       
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: shouldUseSourceMap,
                                plugins: () => [
                                    autoprefixer({
                                        flexbox: 'no-2009'
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: shouldUseSourceMap
                            }
                        }
                    ]
                },
                { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)([?]?.*)$/, loader: 'file-loader', options: { name: 'assets/media/[name].[hash:8].[ext]' } }
            ]
        },
        plugins,
        devServer: {
            contentBase: build,
            publicPath: '/',
            watchContentBase: true,
            port: 3001
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
        },
        resolve: {
            extensions: ['*', '.js', '.vue', '.styl'],
            // alias: {
            //     'vue$': 'vue/dist/vue.esm.js'                
            // }
        }
    }
}
