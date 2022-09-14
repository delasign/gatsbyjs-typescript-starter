import { graphql } from "gatsby";

export const seoFragment = graphql`
  fragment SEOFragment on CraftAPI_blog_post_Entry {
    metaTitle
    metaDescription
  }
`;
