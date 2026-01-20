import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

// 1. GENERATE TITLES FOR SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${categoryName} Articles | Hunting For Kicks`,
    description: `Read the latest stories about ${categoryName}.`,
  };
}

// 2. GENERATE PATHS (Optimization)
export async function generateStaticParams() {
  const posts = getAllPosts(["category"]);
  // Get unique categories
  const categories = new Set(posts.map((post) => post.category?.toLowerCase()).filter(Boolean));
  
  return Array.from(categories).map((category) => ({
    slug: category,
  }));
}

// 3. THE CATEGORY PAGE
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug.toLowerCase();

  // Get ALL posts, then filter for this category
  const allPosts = getAllPosts(["title", "date", "excerpt", "slug", "category", "coverImage"]);
  const categoryPosts = allPosts.filter((post) => post.category?.toLowerCase() === categoryName);

  if (categoryPosts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">We couldn't find any articles for "{slug}".</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      
      {/* Header */}
      <header className="mb-16 border-b-4 border-black pb-8">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
          Magazine Section
        </p>
        <h1 className="text-6xl font-black tracking-tighter capitalize">
          {slug}
        </h1>
      </header>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categoryPosts.map((post) => (
          <article key={post.slug} className="group cursor-pointer flex flex-col h-full">
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
              
              {/* Image Thumbnail (Standard Magazine Feature) */}
              <div className="bg-gray-200 h-48 w-full mb-6 rounded overflow-hidden">
                 {post.coverImage ? (
                   <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                     No Image
                   </div>
                 )}
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                  {post.date}
                </span>
                <h2 className="text-2xl font-bold leading-tight mb-3 group-hover:underline decoration-2 underline-offset-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}