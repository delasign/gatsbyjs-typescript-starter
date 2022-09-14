// required to make the environment variables work.
// This implies .env.development for development & .env.production for production.
require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "CraftAPI",
        fieldName: "craftApi",
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: process.env.GATSBY_CRAFTCMS_AUTH_BEARER,
        },
        url: process.env.GATSBY_CRAFT_GRAPHQL_API,
      },
    },
  ],
};
