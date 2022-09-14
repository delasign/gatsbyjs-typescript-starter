import React from "react";

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
}

// markup
const BlogPostPage = ({ pageContext }: BlogPostPageContext) => {
  const { slug, uri } = pageContext;
  return (
    <Provider store={store}>
      <main>
        slug: {slug}
        <br />
        uri: {uri}
      </main>
    </Provider>
  );
};

export default BlogPostPage;
