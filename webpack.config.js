const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js"),
    style: path.join(__dirname, "src/scss", "style.scss"),
    responsive: path.join(__dirname, "src/scss", "responsive.scss"),
  },
  output: {
    path: path.join(__dirname, "public"),
    clean: true,
    filename: "js/[name].js",
  },
  resolve: {
    extensions: [".js", ".pug"],
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
        test: /\.s[ac]ss$/i,
        include: path.join(__dirname, "src/scss"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "main.pug"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
  },
};
