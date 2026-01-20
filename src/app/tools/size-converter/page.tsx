"use client";

import { useState } from "react";

export default function SizeConverter() {
  const [usSize, setUsSize] = useState<string>("9");
  
  // Simple conversion logic (approximate for Nike/Jordan)
  const calculateSizes = (us: string) => {
    const num = parseFloat(us);
    if (isNaN(num)) return { uk: "-", eu: "-", cm: "-" };
    return {
      uk: num - 1,
      eu: 30 + (num * 1.5), // Rough estimate formula
      cm: 22 + (num * 0.8)  // Rough estimate formula
    };
  };

  const sizes = calculateSizes(usSize);

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT: The Interface (Brutalist Form) */}
      <div className="border-r border-black p-8 flex flex-col justify-center bg-white">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-2">
          Size<br/>Index
        </h1>
        <p className="font-mono text-xs mb-12 uppercase tracking-widest text-gray-500">
          Universal Standard Conversion Protocol v1.0
        </p>

        <label className="font-mono text-xs uppercase font-bold mb-2 block">
          Enter US Size (Men's)
        </label>
        <input 
          type="number" 
          value={usSize}
          onChange={(e) => setUsSize(e.target.value)}
          className="w-full text-6xl font-black border-b-4 border-black pb-2 focus:outline-none placeholder-gray-200"
          placeholder="9"
          autoFocus
        />
        
        <p className="mt-8 text-xs font-mono text-gray-400">
          *Calibration based on standard Nike/Jordan measurements.
        </p>
      </div>

      {/* RIGHT: The Data Display (Monospace Grid) */}
      <div className="bg-black text-white p-8 flex flex-col justify-center">
        
        {/* Result Row 1 */}
        <div className="border-b border-white/20 pb-8 mb-8">
          <span className="block font-mono text-xs uppercase text-gray-400 mb-2">UK Size</span>
          <span className="text-8xl font-mono">{sizes.uk}</span>
        </div>

        {/* Result Row 2 */}
        <div className="flex gap-8">
          <div className="flex-1">
            <span className="block font-mono text-xs uppercase text-gray-400 mb-2">Europe</span>
            <span className="text-5xl font-mono">{sizes.eu}</span>
          </div>
          <div className="flex-1">
             <span className="block font-mono text-xs uppercase text-gray-400 mb-2">CM / JP</span>
             <span className="text-5xl font-mono">{sizes.cm}</span>
          </div>
        </div>

      </div>
    </main>
  );
}