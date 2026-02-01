import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Archive | Hunting For Kicks",
  description: "Complete list of articles and essays.",
};

export default function BlogIndex() {
  const allPosts = getAllPosts(["title", "date", "excerpt", "slug", "category", "coverImage"]);

  return (
    <main className="min-h-screen">
      
      {/* Simple Text Header */}
      <header className="border-b border-black p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Editorial<br/>Index
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
          {allPosts.length} Articles Published
        </p>
      </header>

      {/* The Grid (Same style as Homepage) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
        
        {/* We add 'index' here to handle priority loading */}
        {allPosts.map((post, index) => (
          <article key={post.slug} className="group relative border-b md:border-b-0 border-black last:border-b-0">
            <Link href={`/blog/${post.slug}`} className="block h-full">
              
              {/* Image Aspect 3:4 - Optimized */}
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                {post.coverImage && (
                  <Image 
                    src={post.coverImage} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    priority={index < 4} // Loads the entire top row instantly
                  />
                )}
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-white border border-black px-2 py-0.5 text-[10px] font-mono uppercase z-10">
                  {post.category || 'Article'}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 bg-white min-h-[120px] flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase leading-tight mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-end border-t border-gray-200 pt-2">
                  <span className="font-mono text-[10px] uppercase text-gray-400">{post.date}</span>
                  <span className="font-mono text-[10px] uppercase">Read</span>
                </div>
              </div>

            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}