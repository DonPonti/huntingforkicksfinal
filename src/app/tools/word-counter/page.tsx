"use client"; // <--- This is crucial. It tells Next.js this page has interactivity.

import { useState } from "react";
import Link from "next/link";

export default function WordCounter() {
  const [text, setText] = useState("");

  // Logic to calculate stats
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  
  // Estimate reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-black">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Word Counter</span>
      </nav>

      <h1 className="text-5xl font-black tracking-tighter mb-8">
        Word Counter
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Input Area */}
        <div className="md:col-span-2">
          <textarea
            className="w-full h-96 p-6 border-2 border-black focus:ring-4 focus:ring-black focus:outline-none text-lg resize-none rounded-lg shadow-lg"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <button 
            onClick={() => setText("")}
            className="mt-4 text-red-600 text-sm font-bold hover:underline"
          >
            Clear Text
          </button>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          
          {/* Main Stat Card */}
          <div className="bg-black text-white p-6 rounded-lg shadow-xl">
            <div className="mb-4">
              <span className="block text-4xl font-bold">{wordCount}</span>
              <span className="text-sm text-gray-400 uppercase tracking-widest">Words</span>
            </div>
            <div>
              <span className="block text-4xl font-bold">{charCount}</span>
              <span className="text-sm text-gray-400 uppercase tracking-widest">Characters</span>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h3 className="font-bold border-b border-gray-200 pb-2 mb-4">Details</h3>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Sentences</span>
              <span className="font-mono font-bold">{sentenceCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reading Time</span>
              <span className="font-mono font-bold">~{readingTime} min</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}