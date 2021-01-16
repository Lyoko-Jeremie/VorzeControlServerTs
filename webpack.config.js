const path = require('path');
const webpack = require('webpack');


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');


module.exports = [{
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'node',

    entry: {
        VorzeControlServerTs: './src/VorzeControlServerTs.ts',
    },

    plugins: [new webpack.ProgressPlugin()],

    // externals: {
    //     serialport: "serialport"
    // },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },
            {
                test: /\.node$/,
                loader: 'node-loader',
                // loader: 'native-ext-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: false
        }
    }
}]
