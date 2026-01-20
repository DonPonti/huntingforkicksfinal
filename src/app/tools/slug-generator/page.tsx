"use client";

import { useState } from "react";
import Link from "next/link";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  // The Magic Logic
  const generateSlug = (text: string) => {
    setInput(text);
    const newSlug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Replace spaces with -
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
    
    setSlug(newSlug);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <nav className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-black">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Slug Generator</span>
      </nav>

      <h1 className="text-5xl font-black tracking-tighter mb-8">
        SLUG GENERATOR
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Input Side */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2 text-gray-500">
            Enter Article Title
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => generateSlug(e.target.value)}
            placeholder="e.g. How to Build a Next.js Website"
            className="w-full p-4 border-2 border-black text-lg font-bold rounded focus:ring-4 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Output Side */}
        <div className={`p-6 rounded-lg border-2 ${slug ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
          <label className="block text-sm font-bold uppercase mb-2 text-gray-500">
            Generated Slug
          </label>
          
          <div className="text-2xl font-mono break-all mb-4">
            {slug || "your-slug-will-appear-here"}
          </div>

          {slug && (
            <button
              onClick={copyToClipboard}
              className="bg-black text-white px-6 py-2 rounded font-bold hover:scale-105 transition-transform"
            >
              {copied ? "COPIED!" : "COPY SLUG"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}