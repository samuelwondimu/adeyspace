import { QueryParams } from "next-sanity";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticPropsContext } from "next";

import { sanityFetch } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { POST_SLUGS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { POST_QUERYResult, POST_SLUGS_QUERYResult } from "@/sanity/types";
import Post from "@/components/post/Post";

const PostPreview = dynamic(() => import("@/components/post/PostPreview"));

type PageProps = {
  post: POST_QUERYResult;
  params: QueryParams;
  draftMode: boolean;
  token: string;
};

export default function SinglePost(props: PageProps) {
  return (
    <div>
      {props.draftMode ? (
        <PostPreview post={props.post} params={props.params} />
      ) : (
        <Post post={props.post} />
      )}
    </div>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params = {}, draftMode = false } = context;
  if (!params?.slug) {
    return { notFound: true };
  }
  const post = await sanityFetch<POST_QUERYResult, typeof POST_QUERY>({
    query: POST_QUERY,
    params: { slug: params.slug },
    tags: ["post", "author"],
    token: draftMode ? token : undefined,
  });

  console.log("post", post);

  return {
    props: {
      post,
      params,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await sanityFetch<
      POST_SLUGS_QUERYResult,
      typeof POST_SLUGS_QUERY
    >({
      query: POST_SLUGS_QUERY,
    });

    console.log("Fetched slugs:", slugs);

    const paths = slugs.map(({ slug }) => ({
      params: { slug: slug ?? "" },
    }));

    return { paths, fallback: true };
  } catch (err) {
    console.error("Failed to fetch slugs:", err);
    return { paths: [], fallback: true };
  }
};
