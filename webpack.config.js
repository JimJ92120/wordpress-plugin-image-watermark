const path = require("path");
const WordPressConfig = require("@wordpress/scripts/config/webpack.config.js");

module.exports = {
  ...WordPressConfig,
  ...{
    entry: path.resolve(__dirname, "src/main.js"),
  },
};
