import { urlFor } from "@/sanity/lib/image";
import { POSTS_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import React from "react";

interface HeroPostsListsProps {
  posts: POSTS_QUERYResult;
}

const HeroPostsLists: React.FC<HeroPostsListsProps> = ({ posts }) => {
  return (
    <section>
      <div className="container mx-auto py-10">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Posts
              </h2>
            </div>
          </div>
          <p>
            Insights, tutorials, and thoughts on modern software development
          </p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => {
            return (
              <a key={post._id} href="#" className="group flex flex-col">
                <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                  <div className="transition-opacity duration-300 group-hover:opacity-80">
                    <div className="aspect-[3/2] w-full">
                      <Image
                        className="object-cover object-center"
                        src={urlFor(post.mainImage!)
                          .width(600)
                          .height(400)
                          .quality(80)
                          .url()}
                        alt={post.mainImage!.alt || "post main image"}
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90"
                  >
                    Security
                  </span>
                </div>
                <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                  Cybersecurity Essentials for Modern Applications
                </div>
                <div className="text-muted-foreground mb-4 line-clamp-2 text-sm md:mb-5 md:text-base">
                  Essential security practices every developer should implement,
                  from authentication and authorization to data encryption and
                  secure coding practices.
                </div>
                <div className="flex items-center gap-2">
                  <span
                    data-slot="avatar"
                    className="relative flex shrink-0 overflow-hidden rounded-full size-12"
                  >
                    <Image
                      className="aspect-square size-full"
                      src={urlFor(post.mainImage!)
                        .width(300)
                        .height(300)
                        .quality(80)
                        .url()}
                      width={300}
                      height={300}
                      alt={post.mainImage!.alt || "post main image"}
                    />
                  </span>
                  <div className="flex flex-col gap-px">
                    <span className="text-xs font-medium">Lisa Wang</span>
                    <span className="text-muted-foreground text-xs">
                      3 Jan 2024
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroPostsLists;
