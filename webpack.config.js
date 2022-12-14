const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  target: 'web',
  entry: path.resolve(__dirname, './src/main.ts'), // entry point
  output: {
    path: path.resolve(__dirname, './dist'), // output dir
    filename: '[name].bundle.js', // output js bundle file
    assetModuleFilename: 'assets/images/[hash][ext][query]', // output dir for assets
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.mp3/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/main.html'), // entry html-template
      filename: 'index.html', // output html-file
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets/favicon'), to: './assets/favicon/' },
        { from: path.resolve(__dirname, './src/assets/public'), to: './assets/images' },
      ],
    }),
    new CleanWebpackPlugin(), // clean dist directory
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 5000,
    compress: true,
    open: true,
    hot: true,
  },
};

module.exports = config;
