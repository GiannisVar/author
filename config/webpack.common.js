const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');

//Just to help us with directories and folders path
const __base = path.resolve(__dirname, '..');
const __src = path.resolve(__base, 'src');

module.exports = {
    //Entry: main file that init our application
    entry: path.resolve(__src, 'main.js'),
    devServer: {
        historyApiFallback: true
    },
    //Output: result of the bundle after webpack run
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__base, 'dist'),
        clean: true
    },

    //Plugins to help and include additionals functionalities to webpack
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Lina Kalliora',
            favicon: path.resolve(__base, 'public', 'favicon.ico'),
            template: path.resolve(__base, 'public', 'index.html'),
        }),
        new VueLoaderPlugin(),
        new Dotenv()
    ],

    resolve: {
        extensions: ['.js', '.vue', '.json']
    },

    //Webpack dosent know how to handler all type of files and what to do with them, so this section 
    //we can capture and configure a specific type of file and determine a loader plugin to process it 
    module: {
        rules: [
            //Vue loader. Says to webpack that files with .vue extension need to be processed by the vue-loader plugin
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                      isCustomElement: (tag) => ["swiper-container", "swiper-slide"].includes(tag)
                    }
                  },
            },
            //CSS loaders. Make possible import css files as js modules 
            {
                test: /\.(css|scss)$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            //Indicates that png files are assets to be processed by webpack
            {
                test: /\.(png|jpg|svg|ico)$/,
                type: 'asset/resource'
            }
        ]
    }
}