const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const PurgecssPlugin = require("purgecss-webpack-plugin");

//new PurgecssPlugin({
//extractor: class TailwindExtractor {
//static extract(content) {
//return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
//}
//},
//extensions: ["html"],
//paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
//})

const PATHS = {
  src: path.join(__dirname, "src")
};

module.exports = (env, argv) => {
  console.info("running in mode:", argv.mode);

  let config = {
    mode: argv.mode,
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    stats: "errors-only",
    module: {
      rules: [
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {}
          }
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")]
              }
            }
          ]
        }
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
      new MiniCssExtractPlugin()
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
