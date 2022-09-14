const path = require("path");

// MARK: Pages: GraphQL Queries + Templates
// We also include a reference for debugging purposes.
const Pages = [
  {
    reference: "blogPost",
    query: require("./graphql/posts.js"),
    template: path.resolve("./src/templates/blogPost.tsx"),
  },
];

// This is the function that allows you to programatically create pages via the graphql
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
  // Create an array to hold all the entries (pages)
  var allEntries = [];
  // Gather all the pages
  await Promise.all(
    Pages.map(async (page) => {
      console.log(
        "⚈ ⚈ ⚈ Making Query with reference : " + page.reference + " ⚈ ⚈ ⚈"
      );
      const response = await graphql(page.query);
      if (response.errors) {
        reporter.panic("❌ Errors whilst grabbing your Craft CMS entries");
        return;
      }
      console.log(
        "✅ Succesfully made query with reference : " + page.reference + "."
      );
      const entries = response.data.craftApi.entries;
      // Make sure there are entries
      if (Array.isArray(entries) || entries.length) {
        console.log(
          "✅ Entries exist for query with reference : " + page.reference + "."
        );
        entries.map((entry) => {
          console.log("⚈ ⚈ ⚈ Analyizing entry ⚈ ⚈ ⚈ ", entry);
          allEntries.push({
            uri: entry.uri,
            slug: entry.slug,
            template: page.template,
          });
        });
      } else {
        // End the process as there were no entries for the reference.
        reporter.reporter(
          "❌ Error: there are no entries for query with reference" +
            page.reference +
            "."
        );
      }
    })
  );
  console.log("✅ Executed all queries.");
  console.log("⚈ ⚈ ⚈ Creating Pages ⚈ ⚈ ⚈");
  // Create all the pages
  await Promise.all(
    allEntries.map((entry) => {
      console.log("⚈ ⚈ ⚈ Creating Page with entry ⚈ ⚈ ⚈  ", entry);
      // Please note that we add "/" to the end of our paths (URL) as its recommended for SEO purposes.
      createPage({
        matchPath: entry.uri + "/",
        path: entry.uri + "/",
        component: entry.template,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: entry.slug,
          uri: entry.uri,
        },
      });
      console.log("✅ Creatied Page with entry.");
      // Create Redirect /frompath to the home page
      createRedirect({
        fromPath: `/frompath`,
        toPath: `/`,
      });
    })
  );
};

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
