// ./src/components/PostsPreview.tsx

import { POSTS_QUERY } from "@/sanity/lib/queries";
import { POSTS_QUERYResult } from "@/sanity/types";
import { useLiveQuery } from "next-sanity/preview";
import Posts from "./Posts";

export default function PostsPreview({
  posts = [],
}: {
  posts: POSTS_QUERYResult;
}) {
  const [data] = useLiveQuery<POSTS_QUERYResult>(posts, POSTS_QUERY);

  return <Posts posts={data} />;
}
