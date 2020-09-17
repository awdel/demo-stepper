const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Build one css file per js file
const NodeSassGlobImporter = require('node-sass-glob-importer'); // Allow wildcards in scss imports - used for additional scss files in views
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Move images to dist
const ImageminWebPackPlugin = require('imagemin-webpack-plugin').default; // Optimise images
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML file generation
const path = require('path');
const readdirp = require('readdirp');

const init = async (env, argv) => {
    // Loop through 'views' to generate multiple html-webpack-plugin configurations
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
        target: 'node',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/scripts.js'
        },
        devtool: argv.mode === 'development' ? 'source-map' : false,
        watch: argv.mode === 'development' ? true : false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true
        },
        devServer: {
            contentBase: './dist',
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
                                implementation: require('sass'),
                                sassOptions: {
                                    importer: NodeSassGlobImporter()
                                }
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