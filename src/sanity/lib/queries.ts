import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
    _id, title, slug, mainImage
  }`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage
  }`);
  
export const POST_SLUGS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }
  `);
