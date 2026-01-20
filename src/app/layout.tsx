import type { Metadata } from "next";
import MobileMenu from "@/components/MobileMenu";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// 1. The "Reading" Font (Clean, Neutral)
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

// 2. The "Data" Font (Technical, Brutalist)
const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: "HUNTING FOR KICKS",
  description: "Sneaker culture and digital tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white`}>
        
        {/* --- SSENSE STYLE HEADER --- */}
        {/* Sticky, thin borders, monospace navigation, uppercase */}
       <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black text-xs font-mono uppercase tracking-tight">
  <div className="flex justify-between items-stretch h-12">
    
    {/* Logo */}
    <Link href="/" className="flex items-center px-4 border-r border-black hover:bg-black hover:text-white transition-colors">
      <span className="font-bold">Hunting For Kicks</span>
    </Link>

    {/* Desktop Links - "Editorial" points to your new page */}
    <div className="hidden md:flex flex-1">
      <Link href="/blog" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-white transition-colors">
        Editorial
      </Link>
      <Link href="/tools" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-white transition-colors">
        Tools
      </Link>
    </div>

    {/* Mobile Menu Toggle (Pushed to the far right) */}
    <div className="md:hidden ml-auto">
       <MobileMenu />
    </div>
    
  </div>
</nav>

        {/* Padding top to account for fixed header */}
        <div className="pt-12">
          {children}
        </div>

        {/* --- BRUTALIST FOOTER --- */}
       {/* --- BRUTALIST FOOTER: SIMPLE & CENTERED --- */}
        {/* --- BRUTALIST FOOTER: LOGOTYPE CENTERED --- */}
        {/* --- BRUTALIST FOOTER --- */}
        <footer className="border-t border-black p-6 md:p-12 text-xs font-mono uppercase mt-20 bg-white">
          
          {/* --- TOP SECTION: LINKS & NEWSLETTER (Unchanged) --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Social */}
            <div>
              <h4 className="mb-4 font-bold text-gray-400">Social</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-500">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-500">Twitter / X</a></li>
                <li><a href="#" className="hover:text-gray-500">YouTube</a></li>
              </ul>
            </div>

            {/* Column 2: Legal */}
            <div>
               <h4 className="mb-4 font-bold text-gray-400">Legal</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-gray-500">Terms of Use</a></li>
                 <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
               </ul>
            </div>

            {/* Column 3: Whitespace */}
            <div className="hidden md:block"></div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="mb-4 font-bold text-gray-400">Newsletter</h4>
              <p className="mb-4 text-gray-500">Drop your email to get early access to tools.</p>
              <div className="border-b border-black pb-1 flex justify-between cursor-pointer hover:opacity-50">
                 <span className="text-gray-400">Email</span>
                 <span>→</span>
              </div>
            </div>
          </div>

          {/* --- BOTTOM SECTION: THE SIGNATURE ROW (Modified) --- */}
          {/* We use a 3-column Grid to perfectly center the logo */}
          <div className="border-t border-gray-200 pt-12 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* 1. EXTREME LEFT: Lucky Button */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <button className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-all font-bold tracking-widest uppercase text-[10px]">
                I'm Feeling Lucky
              </button>
            </div>

            {/* 2. MIDDLE: HFK® Logo */}
            <div className="flex justify-center order-1 md:order-2">
              <span className="font-black text-6xl md:text-8xl tracking-tighter hover:text-gray-300 transition-colors cursor-default">
                HFK®
              </span>
            </div>

            {/* 3. EXTREME RIGHT: Copyright & Location */}
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