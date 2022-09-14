module.exports = `query BlogPostQuery {
    craftApi {
      entries(section: "blog", type: "post", status: ["enabled"]) {
        ... on CraftAPI_blog_post_Entry {
          uri
          slug
        }
      }
    }
  }`;
