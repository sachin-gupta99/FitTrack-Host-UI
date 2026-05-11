const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/bootstrap.tsx",
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "fitTrackHost",
      remotes: {
        ContentMF: "ContentMF@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": { singleton: true, eager: true, requiredVersion: false },
        "react-router": { singleton: true, eager: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
