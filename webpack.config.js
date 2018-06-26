const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let src = path.join(__dirname, 'src'); // eslint-disable-line
const devMode = process.env.NODE_ENV !== 'production'; // eslint-disable-line

module.exports = {
    entry: {
        index: path.join(src, 'index.pug'),
        about: path.join(src, 'about.pug'),
        style: path.join(src, 'style.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'), // eslint-disable-line
        filename: '[name].js'
    },
    mode: process.env.NODE_ENV, // eslint-disable-line
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'), // eslint-disable-line
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.pug$/,
                use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000
                    }
                }
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            limit: 10000
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: process.env.NODE_ENV === 'production' && [ // eslint-disable-line
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(src, 'index.pug')
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: path.join(src, 'about.pug')
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: '[id].css'
        })
    ]
};