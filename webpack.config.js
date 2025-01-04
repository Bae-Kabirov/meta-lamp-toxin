const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
      template: path.join(__dirname, "src", "main.pug"),
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
      ],
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
  },
};
