const {
  override,
  addPostcssPlugins,
  addWebpackPlugin,
} = require("customize-cra");
const WorkerPlugin = require("worker-plugin");

module.exports = override(
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")]),
  addWebpackPlugin(new WorkerPlugin()),
);
