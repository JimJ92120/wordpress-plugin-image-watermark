const path = require("path");
const WordPressConfig = require("@wordpress/scripts/config/webpack.config.js");

module.exports = {
  ...WordPressConfig,
  ...{
    entry: {
      "admin/options-media": path.resolve(
        __dirname,
        "src/admin/options-media/index.js"
      ),
      "admin/upload": path.resolve(__dirname, "src/admin/upload/index.js"),
    },
  },
};
