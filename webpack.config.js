const path = require("path");
const WordPressConfig = require("@wordpress/scripts/config/webpack.config.js");

module.exports = {
  ...WordPressConfig,
  ...{
    entry: {
      "admin/options-media/index": path.resolve(
        __dirname,
        "src/admin/options-media/index.js"
      ),
      "admin/upload/index": path.resolve(
        __dirname,
        "src/admin/upload/index.js"
      ),
    },
  },
};
