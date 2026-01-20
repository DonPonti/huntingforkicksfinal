import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
 // Error on Line 3 fixed 
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd"; 
import markdownToHtml from "../../../lib/markdownToHtml";

// Type definition for Next.js 15 Page Props
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERATE STATIC PATHS
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. DYNAMIC METADATA
export async function generateMetadata(props: Props) {
  const params = await props.params; // Await the params!
  const post = getPostBySlug(params.slug, ["title", "excerpt", "coverImage"]);
  
  if (!post) return;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.coverImage ? [post.coverImage] : ['/og-image.jpg'], 
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ['/og-image.jpg'],
    },
  };
}

// 3. MAIN PAGE COMPONENT
// Error on Line 43 fixed by using proper 'Props' type
export default async function Post(props: Props) {
  const params = await props.params; // Await the params!
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "excerpt",
  ]);

  if (!post.slug) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    author: [{
      '@type': 'Person',
      name: post.author || 'HFK Editor',
    }],
  };

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen">
      
      {/* Error on Line 75 fixed because imports now work */}
      <JsonLd data={jsonLd} />

      <Link href="/blog" className="font-mono text-xs uppercase hover:underline mb-8 inline-block">
        ← Back to Index
      </Link>

      <article>
        <header className="mb-8 border-b border-black pb-8">
           <div className="flex justify-between items-end font-mono text-xs uppercase text-gray-500 mb-4 tracking-widest">
             <span>{post.date}</span>
             <span>By {post.author}</span>
           </div>
           <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none break-words">
             {post.title}
           </h1>
        </header>

        {post.coverImage && (
          <div className="relative aspect-video w-full mb-12 bg-gray-200 border border-black">
             <Image 
                src={post.coverImage} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
             />
          </div>
        )}

        <div 
          className="prose prose-lg prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-img:grayscale hover:prose-img:grayscale-0 prose-a:text-black prose-a:underline font-serif max-w-none mb-20"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}