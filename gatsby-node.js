const path = require("path");

// Required for Paths to work with Gatsby.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        reduxFunctionality: path.resolve(__dirname, "src/reduxFunctionality"),
        types: path.resolve(__dirname, "src/types"),
        layouts: path.resolve(__dirname, "src/layouts"),
      },
    },
  });
};
