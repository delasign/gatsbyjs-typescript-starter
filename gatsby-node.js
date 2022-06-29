const path = require("path");

// Required for Paths to work with Gatsby.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components")
      },
    },
  });
};
