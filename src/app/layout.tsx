import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Assuming you use these fonts
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";
import LuckyButton from "@/components/LuckyButton"; // The client component
import { getAllPosts } from "@/lib/api"; // Server-side fetching


// Define Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// ---------------------------------------------------------
// 1. GOD LEVEL SEO METADATA (Server Side Only)
// ---------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL('https://huntingforkicks.com'), 
  title: {
    default: "HUNTING FOR KICKS | Sneaker Culture & Tools",
    template: "%s | HFK®" 
  },
  verification: {
    google: "_id9bpWau5RTqOu8c_2VMC6eLoMuXZyZqQWhDVvA8IY",
  },
  description: "The intersection of sneaker culture, digital tools, and brutalist design. Based in India.",
  openGraph: {
    title: "HUNTING FOR KICKS",
    description: "Sneaker culture, size converters, and brutalist design.",
    url: 'https://huntingforkicks.com',
    siteName: 'Hunting For Kicks',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hunting For Kicks Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "HUNTING FOR KICKS",
    creator: '@huntingforkicks',
    images: ['/og-image.jpg'], 
  },
};

// ---------------------------------------------------------
// 2. THE LAYOUT COMPONENT
// ---------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // FETCH DATA FOR FOOTER (Runs on Server)
  // We get all slugs here to pass to the LuckyButton
  const allSlugs = getAllPosts(["slug"]).map((post) => post.slug);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-white text-black antialiased`}>
        
        {/* --- GLOBAL HEADER --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black text-xs font-mono uppercase tracking-tight">
          <div className="flex justify-between items-stretch h-12">
            
            {/* Logo */}
            <Link href="/" className="flex items-center px-4 border-r border-black hover:bg-black hover:text-white transition-colors">
              <span className="font-bold">Hunting For Kicks</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-1">
              <Link href="/blog" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-white transition-colors">
                Editorial
              </Link>
              <Link href="/tools" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-white transition-colors">
                Tools
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden ml-auto">
               <MobileMenu />
            </div>
          </div>
        </nav>

        {/* --- PAGE CONTENT --- */}
        <div className="pt-12">
          {children}
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="border-t border-black p-6 md:p-12 text-xs font-mono uppercase mt-20 bg-white">
          
          {/* TOP SECTION: LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="mb-4 font-bold text-gray-400">Social</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-500">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-500">Twitter / X</a></li>
                <li><a href="#" className="hover:text-gray-500">YouTube</a></li>
              </ul>
            </div>
            <div>
               <h4 className="mb-4 font-bold text-gray-400">Legal</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-gray-500">Terms of Use</a></li>
                 <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
               </ul>
            </div>
            <div className="hidden md:block"></div>
            <div>
              <h4 className="mb-4 font-bold text-gray-400">Newsletter</h4>
              <p className="mb-4 text-gray-500">Drop your email to get early access to tools.</p>
              <div className="border-b border-black pb-1 flex justify-between cursor-pointer hover:opacity-50">
                 <span className="text-gray-400">Email</span>
                 <span>→</span>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: SIGNATURE */}
          <div className="border-t border-gray-200 pt-12 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* 1. Lucky Button (Client Component) */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <LuckyButton allSlugs={allSlugs} />
            </div>

            {/* 2. Logo */}
            <div className="flex justify-center order-1 md:order-2">
              <span className="font-black text-6xl md:text-8xl tracking-tighter hover:text-gray-300 transition-colors cursor-default">
                HFK®
              </span>
            </div>

            {/* 3. Copyright */}
            <div className="flex flex-col items-center md:items-end text-gray-500 order-3">
              <p className="mb-1">&copy; Based in India</p>
              <p className="tracking-widest">EST. 2026</p>
            </div>

          </div>

        </footer>

      </body>
    </html>
  );
}