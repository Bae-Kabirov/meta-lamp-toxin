const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getAbsolutePath = (relativePath) => {
  return path.resolve(__dirname, relativePath);
};

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js"),
  },
  output: {
    path: path.join(__dirname, "public"),
    clean: true,
    filename: "[name].js",
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
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      filename: "[name].css",
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
  },
};
