import React from "react";
import { graphql } from "gatsby";
// This is the extra redux functionality
import store from "reduxFunctionality/index";
import { Provider } from "react-redux";

// This is the context that gets passed down to the page
interface BlogPostPageContext {
  path: string;
  pageContext: {
    slug: string;
    uri: string;
  };
  data: {
    craftApi: {
      entry: {
        metaTitle: string;
        metaDescription: string;
      };
    };
  };
}

// markup
const BlogPostPage = ({ pageContext, data }: BlogPostPageContext) => {
  const { slug, uri } = pageContext;
  const { metaTitle, metaDescription } = data.craftApi.entry;

  return (
    <Provider store={store}>
      <main>
        <br />
        metaTitle: {metaTitle}
        <br />
        metaDescription: {metaDescription}
        <br />
        slug: {slug}
        <br />
        uri: {uri}
      </main>
    </Provider>
  );
};

export const query = graphql`
  query BlogPostPageQuery($slug: String) {
    craftApi {
      entry(section: "blog", type: "post", slug: [$slug], status: ["enabled"]) {
        ...SEOFragment
      }
    }
  }
`;

export default BlogPostPage;
