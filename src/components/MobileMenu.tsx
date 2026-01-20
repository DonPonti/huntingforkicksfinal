"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open/close the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. THE TRIGGER BUTTON (Visible only on Mobile) */}
      <button 
        onClick={toggleMenu}
        className="md:hidden flex items-center px-4 border-l border-black hover:bg-black hover:text-white transition-colors h-full font-mono uppercase text-xs"
      >
        {isOpen ? "CLOSE" : "MENU"}
      </button>

      {/* 2. THE FULL SCREEN OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-12 z-40 bg-black text-white p-6 flex flex-col justify-between animate-in fade-in duration-200">
          
          {/* Main Links */}
          <nav className="flex flex-col gap-6 mt-12">
            <Link 
              href="/" 
              onClick={toggleMenu} 
              className="text-5xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              onClick={toggleMenu} 
              className="text-5xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors"
            >
              Editorial
            </Link>
            <Link 
              href="/tools" 
              onClick={toggleMenu} 
              className="text-5xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors"
            >
              Tools
            </Link>
          </nav>

          {/* Footer Info inside Menu (Simplified) */}
          <div className="font-mono text-xs uppercase border-t border-white/20 pt-8 mb-8">
             <p className="text-gray-500 mb-4 tracking-widest">Connect</p>
             <div className="flex flex-col gap-2">
               <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
               <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
             </div>
          </div>

        </div>
      )}
    </>
  );
}