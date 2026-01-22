import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const allPosts = getAllPosts(["title", "date", "excerpt", "slug", "category", "coverImage"]);
  
  return (
    <main>
      
      {/* HERO SECTION: Tighter Vertical Spacing (35vh) */}
      <section className="border-b border-black min-h-[35vh] flex flex-col justify-center items-center p-6 text-center bg-white">
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase mb-4">
          Hunting<br />For Kicks
        </h1>
        
        <p className="font-mono text-xs uppercase max-w-md leading-relaxed text-gray-600">
          The intersection of Sneaker culture, Digital tools, and Cinematic icons.
        </p>

      </section>

      {/* THE BRUTALIST FEED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black">
        
        {/* --- EDITORIAL POSTS --- */}
        {/* Added 'index' here to fix the ReferenceError */}
        {allPosts.map((post, index) => (
          <article key={post.slug} className="group relative border-b md:border-b-0 border-black last:border-b-0">
            <Link href={`/blog/${post.slug}`} className="block h-full">
              
              {/* Image Container - Optimized with Next.js Image */}
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                {post.coverImage && (
                  <Image 
                    src={post.coverImage} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    priority={index < 2} // Preloads the first 2 images for speed
                  />
                )}
                
                {/* Overlay Badge */}
                <div className="absolute top-2 left-2 bg-white border border-black px-2 py-0.5 text-[10px] font-mono uppercase z-10">
                  {post.category || 'Article'}
                </div>
              </div>

              {/* Minimal Text Info */}
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

        {/* --- PROMO TOOL CARD (Appears at the end of the grid) --- */}
        <div className="group border-black md:border-l-0 lg:border-l relative flex flex-col h-full bg-black text-white">
             <Link href="/tools/size-converter" className="flex flex-col h-full">
                <div className="aspect-[3/4] flex items-center justify-center border-b border-white/20">
                   <h3 className="text-6xl font-mono rotate-90 tracking-widest">TOOLS</h3>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                   <div>
                     <span className="inline-block border border-white px-2 py-0.5 text-[10px] font-mono uppercase mb-2">
                        System v1.0
                     </span>
                     <h2 className="text-xl font-bold uppercase">Size Converter</h2>
                     <p className="text-xs text-gray-400 mt-2">
                        Universal sizing protocol.
                     </p>
                   </div>
                   <button className="mt-4 w-full bg-white text-black py-2 text-xs font-mono uppercase font-bold hover:bg-gray-200 transition-colors">
                      Launch Utility
                   </button>
                </div>
             </Link>
        </div>

      </div>
    </main>
  );
}