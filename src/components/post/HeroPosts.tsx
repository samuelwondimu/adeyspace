import {
  internalGroqTypeReferenceTo,
  POSTS_QUERYResult,
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
} from "@/sanity/types";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";

interface HeroPostsPorps {
  featuredPosts: {
    _id: string;
    title: string | null;
    slug: Slug | null;
    mainImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    };
  };
  recentPosts: POSTS_QUERYResult;
}

const HeroPosts: React.FC<HeroPostsPorps> = ({
  featuredPosts,
  recentPosts,
}) => {
  return (
    <section className="container mx-auto py-4 mt-12">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        Your Space. Your Voice. Your Power.
      </h1>
      <div className="mt-4 flex justify-start items-center">
        <span className="block text-sm text-muted-foreground md:text-base">
          Adey Space is a vibrant online platform dedicated to celebrating,
          empowering,
        </span>
        <Button variant="link">
          Read More <ArrowRight />
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <Image
            className="w-full rounded-lg object-cover"
            src={urlFor(featuredPosts.mainImage)
              .width(500)
              .height(300)
              .quality(80)
              .url()}
            width={500}
            height={300}
            alt={featuredPosts.mainImage.alt || "post main image"}
          />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              {featuredPosts.title}
            </h1>
          </div>
          <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
            <span
              data-slot="avatar"
              className="relative flex size-8 shrink-0 overflow-hidden h-8 w-8 rounded-md md:h-12 md:w-12"
            >
              <Image
                className="aspect-square size-full"
                src={urlFor(featuredPosts.mainImage)
                  .width(300)
                  .height(300)
                  .quality(80)
                  .url()}
                width={300}
                height={300}
                alt={featuredPosts.mainImage.alt || "post main image"}
              />
            </span>
            <span className="text-sm md:text-base">
              <span className="block text-foreground">Sarah Johnson</span>
              <span className="text-xs text-muted-foreground md:text-sm">
                AI Researcher
              </span>
            </span>
          </div>
        </div>
        <div className="space-y-6 text-foreground md:space-y-8">
          {recentPosts.map((post) => {
            return (
              <div
                key={post._id}
                className="flex items-start gap-4 border-b pb-6 last:border-b-0"
              >
                <div className="w-1/4 shrink-0 md:w-1/5">
                  <Image
                    className="rounded-md"
                    src={urlFor(post.mainImage!)
                      .width(600)
                      .height(400)
                      .quality(80)
                      .url()}
                    width={600}
                    height={400}
                    alt={post.mainImage!.alt || "post main image"}
                  />
                </div>
                <div className="w-3/4 md:w-4/5">
                  <p className="text-sm leading-relaxed md:text-base">
                    {post.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroPosts;
