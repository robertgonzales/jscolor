module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: "./dist",
    filename: "index.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
      },
    ],
  },
}
