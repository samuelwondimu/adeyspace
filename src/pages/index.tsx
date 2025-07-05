import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { InferGetStaticPropsType } from "next";
import { POSTS_QUERYResult } from "@/sanity/types";
import { token } from "@/sanity/lib/token";
import Posts from "@/components/post/Posts";
import PostsPreview from "@/components/post/PostsPreview";

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
  draftMode,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Creative Industries",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing design, writing, and creative workflows across industries.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "Technology",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Remote Work Revolution: 2025 Trends",
      excerpt:
        "Discover the latest trends shaping the future of remote work and distributed teams in the post-pandemic era.",
      image:
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&h=400&fit=crop",
      category: "Business",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Sustainable Tech: Green Innovation",
      excerpt:
        "How technology companies are leading the charge in environmental sustainability and carbon neutrality.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      category: "Environment",
      readTime: "6 min read",
    },
  ];

  // Sample recent posts data

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}

      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-6">
                      <Button>
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <span className="text-white/80 text-sm">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Recent Posts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest insights and stories from the world
              of technology and innovation.
            </p>
          </div>

          {draftMode ? <PostsPreview posts={posts} /> : <Posts posts={posts} />}

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest insights, trends, and stories delivered straight to
              your inbox. Join our community of innovators and stay ahead of the
              curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" />
              <Button variant="secondary">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
