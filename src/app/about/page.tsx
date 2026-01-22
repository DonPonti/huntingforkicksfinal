import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Manifesto | Hunting For Kicks",
  description: "Our mission: Utility, Culture, and Cinematic Icons.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      
      {/* HEADER */}
      <header className="mb-20 border-b-4 border-black pb-8">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
          THE<br />MANIFESTO
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest max-w-xl border-l-4 border-black pl-4">
          EST. 2026 <br />
          GLOBAL OPERATIONS
        </p>
      </header>

      {/* MISSION STATEMENT */}
      <section className="mb-24">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
          01 // The Mission
        </h2>
        <p className="text-2xl md:text-4xl font-sans font-bold leading-tight uppercase">
          The sneaker game is broken. It is drowning in algorithms, bots, and artificial scarcity. <br/><br/>
          <span className="bg-black text-white px-2">Hunting For Kicks is the antidote.</span>
        </p>
      </section>

      {/* CORE PILLARS */}
      <section className="grid md:grid-cols-2 gap-12 mb-24">
        
        {/* Pillar 1 */}
        <div className="border-t-2 border-black pt-4">
          <h3 className="text-xl font-black uppercase mb-2">Utility Over Hype</h3>
          <p className="font-serif text-lg leading-relaxed">
            We do not chase trends. We build tools. From size conversion algorithms to price tracking, we provide the tactical gear needed to navigate the market.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="border-t-2 border-black pt-4">
          <h3 className="text-xl font-black uppercase mb-2">Cinematic Icons</h3>
          <p className="font-serif text-lg leading-relaxed">
            Sneakers do not exist in a vacuum. We track the icons—athletes, artists, and actors—who turn leather and rubber into cultural currency.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="border-t-2 border-black pt-4">
          <h3 className="text-xl font-black uppercase mb-2">Archival Precision</h3>
          <p className="font-serif text-lg leading-relaxed">
            History deletes itself if no one is watching. We document the obscure, the vintage, and the forgotten with forensic detail.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="border-t-2 border-black pt-4">
          <h3 className="text-xl font-black uppercase mb-2">Brutal Honesty</h3>
          <p className="font-serif text-lg leading-relaxed">
            No sponsored fluff. No paid reviews. Just raw data, sharp opinion, and the unfiltered truth about the industry.
          </p>
        </div>

      </section>

      {/* TEAM / SIGNATURE */}
      <section className="bg-gray-100 p-8 md:p-12 border border-black mb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
          02 // The Editor
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
           {/* You can add your image here if you want, or keep it text-only for now */}
           <div className="flex-1">
             <p className="text-xl md:text-2xl font-bold font-sans mb-6">
               "We built this platform because we were tired of scrolling. We wanted a tool, not a feed."
             </p>
             <p className="font-mono text-sm uppercase">
               — Sage, Editor-in-Chief
             </p>
           </div>
        </div>
      </section>

      {/* CTA */}
      <div className="flex gap-4">
        <Link href="/blog" className="bg-black text-white px-8 py-4 font-mono uppercase font-bold text-sm hover:bg-gray-800 transition-colors">
          Read the Archive
        </Link>
        <Link href="/tools" className="border-2 border-black px-8 py-4 font-mono uppercase font-bold text-sm hover:bg-black hover:text-white transition-colors">
          Access Tools
        </Link>
      </div>

    </main>
  );
}