const webpack = require("webpack");
const path = require("path");
const glob = require('glob')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = (env, argv) => {
  console.info("running in mode:", argv.mode);

  let config = {
    mode: argv.mode,
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              
            },
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          ]
        },
        
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Development",
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin(),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
      })
    ]
  };

  if (argv.mode === "development") {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    };
  }

  return config;
};
