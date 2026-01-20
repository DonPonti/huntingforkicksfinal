import { getPostBySlug, getAllPosts } from "@/lib/api";
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

// 1. Generate Static Paths (Keeps it fast)
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. MAGZINE SEO ENGINE: Generates tags for Google/Socials
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ["title", "excerpt", "coverImage"]);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Hunting For Kicks`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [post.coverImage || '/images/default-og.jpg'], // Fallback image
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/images/default-og.jpg'],
    },
  };
}

// 3. The Article Layout
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch more data now (category, author, coverImage)
  const post = getPostBySlug(slug, [
    "title", 
    "date", 
    "slug", 
    "content", 
    "coverImage",
    "author",
    "category"
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <article className="min-h-screen max-w-4xl mx-auto px-6 py-12">
      
      {/* Magazine Navigation */}
      <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-black">Magazine</Link>
        <span>/</span>
        <span className="text-black">{post.category || 'General'}</span>
      </nav>

      {/* Header Section */}
      <header className="mb-12 text-center">
        <div className="mb-6">
           {/* Replaces the static span */}
<Link 
  href={`/blog/category/${post.category?.toLowerCase()}`}
  className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors mb-6"
>
  {post.category || 'Feature'}
</Link>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex justify-center items-center gap-4 text-gray-500 font-medium border-y border-gray-100 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {/* Author Avatar Placeholder */}
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-black">{post.author || 'Editor'}</span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Featured Image (If it exists) */}
      {post.coverImage && (
        <figure className="mb-12">
          {/* In a real app, use Next/Image here. For now, simple img tag */}
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </figure>
      )}

      {/* Content Body */}
      <div className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-a:text-blue-600">
        <MDXRemote source={post.content} />
      </div>

      {/* Author/Share Footer */}
      <footer className="mt-20 pt-10 border-t border-gray-200">
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">About the Author</h3>
          <p className="text-gray-600 italic">
            "We are building the ultimate magazine engine."
          </p>
        </div>
      </footer>

    </article>
  );
}