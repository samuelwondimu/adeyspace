import { POST_QUERY } from "@/sanity/lib/queries";
import { POST_QUERYResult } from "@/sanity/types";
import { QueryParams } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import React from "react";
import Post from "./Post";

export default function PostPreview({
  post,
  params = [],
}: {
  post: POST_QUERYResult;
  params: QueryParams;
}) {
  const [data] = useLiveQuery<POST_QUERYResult>(post, POST_QUERY, params);

  return <Post post={data} />;
}
