import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hunting For Kicks",
  description: "User obligations and operational protocols.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      
      {/* HEADER */}
      <header className="mb-16 border-b-4 border-black pb-8">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
          TERMS OF<br />SERVICE
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest max-w-xl">
          Protocol: V1.0 <br />
          Status: Enforced
        </p>
      </header>

      {/* CONTENT */}
      <div className="prose prose-lg max-w-none font-sans text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:leading-relaxed">
        
        <p className="font-mono text-sm border-l-4 border-black pl-4 bg-gray-100 p-4 mb-12">
          <strong>NOTICE:</strong> By accessing <strong>Hunting For Kicks</strong>, you agree to abide by these protocols. If you do not agree, terminate your session immediately.
        </p>

        <h3>1. Access Protocol</h3>
        <p>
          We grant you a limited, non-exclusive, non-transferable license to access the content and tools on this platform for personal, non-commercial use. Any attempt to scrape, data-mine, or reverse-engineer our tools (including the Size Converter algorithm) will result in an immediate IP ban.
        </p>

        <h3>2. Intellectual Property</h3>
        <p>
          All content, including the "Hunting For Kicks" brand, the brutalist design system, the archival imagery, and the editorial analysis, is the intellectual property of Hunting For Kicks. You may not replicate our design or content without explicit written permission.
        </p>

        <h3>3. Accuracy of Tools</h3>
        <p>
          Our utility tools (Size Converters, Price Checkers, etc.) are calibrated based on standard manufacturer data. However, sneaker sizing varies by factory, year, and material.
        </p>
        <p className="font-bold">
           We provide these tools "AS IS" and are not liable for sizing errors or financial losses incurred from third-party purchases.
        </p>

        <h3>4. External Links</h3>
        <p>
          Our Service may contain links to third-party web sites (like StockX, GOAT, Nike) that are not owned or controlled by Hunting For Kicks. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites.
        </p>

        <h3>5. Termination</h3>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h3>6. Governing Law</h3>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>

      </div>

      {/* FOOTER LINK */}
      <div className="mt-20 pt-8 border-t border-black">
        <Link href="/" className="font-mono text-xs uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors">
          ← Return to Base
        </Link>
      </div>

    </main>
  );
}