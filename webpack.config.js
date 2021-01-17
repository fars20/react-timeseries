const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./lib/index.js",
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist",'umd'),
    libraryTarget: "umd",
    library: "idata-apps-generic-timeseries"
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
