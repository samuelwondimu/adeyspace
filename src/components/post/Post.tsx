import React from "react";
import { dataset, projectId } from "../../sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import { POST_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import { PortableText } from "next-sanity";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Post({ post }: { post: POST_QUERYResult }) {
  return (
    <main className="conainer mx-auto prose prose-lg p-4">
      {post?.title ? <h1 className="text-4xl">{post?.title}</h1> : null}
      {post?.mainImage ? (
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder
            .image(post?.mainImage)
            .width(300)
            .height(300)
            .quality(80)
            .url()}
          width={300}
          height={300}
          alt={post.mainImage.alt || "post main image"}
        />
      ) : null}
      {post?.body ? <PortableText value={post.body} /> : null}
    </main>
  );
}
