import React from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { InferGetStaticPropsType } from "next";
import { POSTS_QUERYResult } from "@/sanity/types";
import { token } from "@/sanity/lib/token";
import HeroPosts from "@/components/post/HeroPosts";
import HeroPostsLists from "@/components/post/HeroPostsLists";
import { Separator } from "@/components/ui/separator";

export const getStaticProps = async ({ draftMode = false }) => {
  const posts = await sanityFetch<POSTS_QUERYResult, typeof POSTS_QUERY>({
    query: POSTS_QUERY,
    tags: ["post", "author"],
    token: draftMode ? token : undefined,
  });
  return {
    props: { posts, draftMode, token: draftMode ? token : "" },
    revalidate: 60,
  };
};

export default function Page({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="min-h-screen">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <HeroPosts recentPosts={posts!} featuredPosts={posts[0]!} />
      <Separator />
      <HeroPostsLists posts={posts} />
      <Separator />
      {/* Footer */}
    </div>
  );
}
