const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development", //"production",
  entry: {
    content: path.resolve(__dirname, ".", "src", "content.ts"),
  },
  devtool: "cheap-module-source-map",
  output: {
    path: path.join(__dirname, "./dist"),
    // Keep folder structure.
    filename: (fileData) => {
      const rawFilePath = fileData.chunk.entryModule.resource;
      const relativePath = path.relative(path.join(__dirname, "src"), rawFilePath);
      const folderPath = path.dirname(relativePath);
      return path.join(folderPath, "[name].js");
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" }
      ],
    }),
  ],
};
