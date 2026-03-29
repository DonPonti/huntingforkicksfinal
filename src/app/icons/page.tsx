"use client" // <--- This is the magic word that turns on interactivity

import { useState, useMemo } from 'react'
import { cultureDex } from '@/lib/culturedex'
import Link from 'next/link'
import Image from 'next/image'

// How many cards do you want per page? (Set to 4 for testing, then bump to 12 later!)
const ITEMS_PER_PAGE = 4; 

export default function CultureDexDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Convert our database object into an array
  const dexEntries = useMemo(() => {
    return Object.entries(cultureDex).map(([slug, data]) => ({
      slug,
      ...data
    }));
  }, []);

  // 2. Filter the entries based on the search bar (Searches by Name OR Type)
  const filteredEntries = useMemo(() => {
    return dexEntries.filter(icon => 
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      icon.types?.some((type: string) => type.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [dexEntries, searchQuery]);

  // 3. Pagination Math
  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // When a user types, we reset them back to Page 1
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <main className="min-h-screen bg-[#F6F8FA] dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 pb-20 transition-colors duration-300">
      
      {/* TOP NAVIGATION BANNER */}
      <div className="w-full bg-[#E3350D] text-white py-4 flex justify-between items-center px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-wider mb-8 shadow-md">
        <span>CultureDex v1.0</span>
        <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#9bcc50] animate-pulse"></span> 
          Tracking {dexEntries.length} Targets
        </span>
      </div>

      {/* HEADER & SEARCH SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            Icon Database
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 dark:text-gray-500 mt-2 tracking-widest">
            Select a target to view stats and equipped items
          </p>
        </div>
        
        {/* THE WORKING SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search by name or type..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-gray-800 dark:text-white focus:border-[#30a7d7] dark:focus:border-[#30a7d7] focus:outline-none transition-colors shadow-sm"
          />
          {searchQuery && (
             <span className="absolute right-4 top-3 text-xs font-bold text-gray-400">
               {filteredEntries.length} found
             </span>
          )}
        </div>
      </div>

      {/* THE GRID */}
      <div className="max-w-6xl mx-auto px-4 min-h-[400px]">
        {paginatedEntries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedEntries.map((icon) => (
              <Link 
                href={`/icons/${icon.slug}`} 
                key={icon.slug} 
                prefetch={false}
                className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#30a7d7] group flex flex-col relative overflow-hidden transform hover:-translate-y-1"
              >
                <div className="absolute top-4 left-4 z-10 bg-black/80 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                  #{icon.id}
                </div>

                <div className="w-full aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-300 border-2 border-gray-50 dark:border-gray-700">
                  {icon.image ? (
                    <Image src={icon.image} alt={icon.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">NO IMAGE</div>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-1">
                    {icon.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                    {icon.types?.map((type: string) => (
                      <span key={type} className="bg-[#9bcc50] text-black text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
            No targets found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto px-4 mt-12 flex justify-center items-center gap-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full font-bold uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#30a7d7] transition-colors"
          >
            ← Prev
          </button>
          
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full font-bold uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#30a7d7] transition-colors"
          >
            Next →
          </button>
        </div>
      )}

    </main>
  )
}