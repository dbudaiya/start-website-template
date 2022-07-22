const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const app = path.join(__dirname, "src");

module.exports = {
  entry: {
    index: "./src/views/index/index.js",
    about: "./src/views/about/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[id].chunk.js",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": app,
      "~": path.resolve(app, "assets")
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: "html-loader",
      },
      {
        test: /\.(mp4|mov)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "video/",
              name: "[contenthash].[ext]",
            },
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // context: "./assets/images/",
              outputPath: "images/",
              name: "[contenthash].[ext]",
            },
          },
        ],
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     name: "vendors",
  //     chunks: ["index", "list", "about"],
  //     minChunks: 3,
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].[chunkhash].css",
    }),

    new HtmlWebpackPlugin({
      // favicon: "./src/assets/images/favicon.ico",
      filename: "./index.html",
      template: "./src/views/index/index.html",
      inject: "body",
      hash: true,
      chunks: ["vendors", "index"],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true,
      },
    }),
    new HtmlWebpackPlugin({
      // favicon: "./src/assets/images/favicon.ico",
      filename: "./about.html",
      template: "./src/views/about/index.html",
      inject: true,
      hash: true,
      chunks: ["vendors", "about"],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    contentBase: "./",
    host: "localhost",
    port: 8888,
    inline: true,
    hot: true,
  },
};
