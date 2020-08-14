const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebPackPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const readdirp = require('readdirp');

const init = async (env, argv) => {
    const files = await readdirp.promise('./src/views', {fileFilter: '*.pug'});
    const htmlPlugins = files.map(entry => {
        const parts = entry.basename.split('.');
        const name = parts[0];
        const extension = parts[1];
        const filepath = entry.path.replace(entry.basename, '');
        console.log('');
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            filename: `${filepath}${name}.html`,
            template: path.resolve(__dirname, `src/views/${filepath}${name}.${extension}`),
            hash: true
        })
    })
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/scripts.js',
            library: 'MyLibrary',
            libraryTarget: 'var'
        },
        devtool: argv.mode === 'development' ? 'source-map' : false,
        watch: argv.mode === 'development' ? true : false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)|(bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        {
                            loader: 'eslint-loader'
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass')
                            }
                        }
                    ]
                },
                { 
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'pug-loader',
                            options: {
                                pretty: true
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/styles.css'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/img/', to: 'img/', noErrorOnMissing: true },
                ],
            }),
            new ImageminWebPackPlugin({
                disable: argv.mode === 'development' ? true : false,
                test: 'img/**'
            })
        ].concat(htmlPlugins)
    };
};
module.exports = init;