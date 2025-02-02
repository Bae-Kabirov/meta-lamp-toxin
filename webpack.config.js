const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { styleText } = require("util");

module.exports = {
  entry: {
    app: path.join(__dirname, "src/app", "index.js"),
    style: path.join(__dirname, "src/app/scss", "style.scss"),
    responsive: path.join(__dirname, "src/app/scss", "responsive.scss"),
  },
  output: {
    path: path.join(__dirname, "public"),
    clean: true,
    filename: "js/[name].js",
  },
  resolve: {
    extensions: [".js", ".pug"],
    alias: {
      app: path.resolve(__dirname, "src/app/"),
      widget: path.resolve(__dirname, "src/widget/"),
      pages: path.resolve(__dirname, "src/pages/"),
      shared: path.resolve(__dirname, "src/shared/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: {
          loader: "pug-loader",
          options: {
            pretty: true,
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/app", "main.pug"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/**/*.{png,jpg,jpeg,gif,svg}",
          to: (resourcePath) => {
            console.log("resourcePath:", resourcePath);

            const absoluteFilename = resourcePath.absoluteFilename;
            const parentFolder = path.basename(path.dirname(absoluteFilename));
            const grandparentFolder = path.basename(
              path.dirname(path.dirname(absoluteFilename))
            );

            return `img/${grandparentFolder}/[name][ext]`;
          },
          noErrorOnMissing: true,
        },
        {
          from: "src/shared/fonts",
          to: "fonts",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  devServer: {
    watchFiles: path.join(__dirname, "src"),
  },
};
