import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml"; 
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd"; 
import { AUTHORS } from "@/lib/authors"; 

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. STATIC PARAMS (Builds pages faster)
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. SEO & SOCIAL CARDS
export async function generateMetadata(props: Props) {
  const params = await props.params;
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

// 3. MAIN COMPONENT
export default async function Post(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "excerpt",
    "category"
  ]);

  if (!post.slug) return notFound();

  const content = await markdownToHtml(post.content || "");
  const authorData = AUTHORS[post.author] || AUTHORS["Sage"];

  // Google Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    author: [{
      '@type': 'Person',
      name: authorData.name,
      image: authorData.picture 
    }],
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 md:p-12 min-h-screen">
      <JsonLd data={jsonLd} />

      {/* Mobile-Friendly Back Button */}
      <Link 
        href="/blog" 
        className="font-mono text-xs uppercase hover:bg-black hover:text-white px-3 py-2 mb-8 inline-block transition-colors border border-transparent hover:border-black"
      >
        ← Index
      </Link>

      <article>
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-10 md:mb-12 border-b-4 border-black pb-8">
           
           {/* Metadata Row: Stacks vertically on mobile (gap-y-4), spreads on desktop */}
           <div className="flex flex-wrap justify-between items-end font-mono text-xs uppercase mb-6 gap-y-4">
             
             {/* Author (Left) */}
             <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 border border-black rounded-full overflow-hidden grayscale">
                  <Image src={authorData.picture} alt={authorData.name} fill className="object-cover"/>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold bg-black text-white px-1">{authorData.name}</span>
                  <span className="text-[10px] text-gray-500">{authorData.role}</span>
                </div>
             </div>
             
             {/* Right Side Info (Category + Date) */}
             <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
                <Link 
                  href="/blog" 
                  className="bg-black text-white border border-black px-3 py-1 font-bold hover:bg-white hover:text-black transition-colors"
                >
                  {post.category || "Editorial"}
                </Link>

                <span className="border border-black px-2 py-1 bg-gray-100 text-gray-600">
                  {post.date}
                </span>
             </div>

           </div>

           {/* Title: 'break-words' prevents horizontal scroll on mobile */}
           <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] break-words hyphens-auto">
             {post.title}
           </h1>
        </header>

        {/* --- COVER IMAGE --- */}
        {post.coverImage && (
          <div className="relative aspect-video w-full mb-12 md:mb-16 bg-gray-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
             <Image 
                src={post.coverImage} 
                alt={post.title} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
             />
          </div>
        )}

        {/* --- ARTICLE CONTENT (Mobile Optimized Prose) --- */}
        <div 
          className="
            /* Text Sizing: Normal on mobile, Large on desktop */
            prose prose-base md:prose-lg max-w-none mb-20
            
            /* Aesthetics */
            font-sans text-black
            
            /* Headings */
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-3xl md:prose-headings:text-4xl
            
            /* Paragraphs */
            prose-p:text-gray-900 prose-p:leading-relaxed
            
            /* Links */
            prose-a:text-black prose-a:font-bold prose-a:decoration-2 prose-a:underline-offset-4 
            hover:prose-a:bg-black hover:prose-a:text-white
            
            /* Blockquotes */
            prose-blockquote:font-mono prose-blockquote:text-xs md:prose-blockquote:text-sm 
            prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-black 
            prose-blockquote:bg-gray-100 prose-blockquote:p-4
            
            /* Images */
            prose-img:border prose-img:border-black prose-img:grayscale hover:prose-img:grayscale-0 prose-img:w-full prose-img:h-auto
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* --- AUTHOR BIO (Mobile Stacked) --- */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t-4 border-black">
           <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              
              {/* Avatar */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 border-2 border-black flex-shrink-0 grayscale">
                 <Image src={authorData.picture} alt={authorData.name} fill className="object-cover"/>
              </div>

              {/* Bio Text */}
              <div className="flex-1 w-full">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 bg-black block"></span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">
                        File: {authorData.name}
                    </h3>
                 </div>
                 <p className="font-sans font-medium text-lg md:text-2xl leading-tight mb-6 text-black">
                    {authorData.bio}
                 </p>
                 <Link href="/" className="inline-block w-full md:w-auto text-center bg-black text-white px-4 py-3 md:py-2 text-xs font-mono uppercase hover:bg-gray-800 transition-colors">
                    View Archive
                 </Link>
              </div>
           </div>
        </div>

      </article>
    </main>
  );
}