const path = require("path");
const WordPressConfig = require("@wordpress/scripts/config/webpack.config.js");

module.exports = {
  ...WordPressConfig,
  ...{
    entry: {
      "admin/index": path.resolve(__dirname, "src/admin/index.js"),
    },
  },
};
