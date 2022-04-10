const path    = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: "development",
    devtool: "source-map",
    entry: {
      application: path.resolve(__dirname, "app/javascript/application.js")
    },
    output: {
      filename: "[name].js",
      sourceMapFilename: "[name].js.map",
      path: path.resolve(__dirname, "app/assets/builds"),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sass|css)$/,
          use: ["style-loader", "css-loader"],
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        Pages: path.resolve(__dirname, 'app/javascript/app/Pages'),
        Components: path.resolve(__dirname, 'app/javascript/app/Components'),
        utils: path.resolve(__dirname, 'app/javascript/app/utils'),
        context: path.resolve(__dirname, 'app/javascript/app/context'),
        hooks: path.resolve(__dirname, 'app/javascript/app/hooks'),
        public: path.resolve(__dirname, 'public'),
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
}
