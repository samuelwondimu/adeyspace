import React from "react";
import { POSTS_QUERYResult } from "@/sanity/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link href={`/blogs/${post.slug?.current}`} key={post?.title}>
          <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 cursor-pointer hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
              {/* <Image
        src={urlFor(post?.mainImage?.asset!)}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      /> */}
              {post.slug?.current}
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
                  {post?.title}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {post?.title}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {post?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post?.title}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
