const Path = require('path');
const assetPath = Path.resolve(__dirname, "../src");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let dev = process.env.NODE_ENV !== "production";
/* Function pour enregistrer les pages html */
const fs = require("fs");
let templates = [];
let files = fs.readdirSync(assetPath);

files.forEach(file => {
  if (file.match(/\.html$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: Path.resolve(__dirname, `${assetPath}/${filename}html`),
        filename: filename + "html"
      })
    );
  }
});

module.exports = {
  entry: {
    main: [`${assetPath}/scripts/index.js`, `${assetPath}/styles/index.scss`]
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, "../public"), to: "public" },
      { from: Path.resolve(__dirname, "../src/img"), to: "img" }
    ]),
    ...templates
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `[name]${dev ? "" : ".[hash]"}.[ext]`,
              useRelativePath: !dev
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: `[name]${dev ? "" : ".[hash]"}.[ext]`
            }
          }
        ]
      }
    ]
  }
};
