import { cultureDex } from '@/lib/culturedex'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CultureDex | Sneaker & Asset Database",
  description: "Browse the ultimate gamified database of cultural icons, their stats, and their equipped sneaker inventory.",
}

export default function CultureDexDirectory() {
  // Convert our database object into an array so we can map through it
  const dexEntries = Object.entries(cultureDex).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return (
    <main className="min-h-screen bg-[#F6F8FA] font-sans text-gray-800 pb-20">
      
      {/* TOP NAVIGATION BANNER - POKEDEX RED */}
      <div className="w-full bg-[#E3350D] text-white py-4 flex justify-between items-center px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-wider mb-8 shadow-md">
        <span>CultureDex v1.0</span>
        <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#9bcc50] animate-pulse"></span> 
          Tracking {dexEntries.length} Targets
        </span>
      </div>

      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-800">
            Icon Database
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 mt-2 tracking-widest">
            Select a target to view stats and equipped items
          </p>
        </div>
        
        {/* Fake Search Bar for aesthetics (we can make this real later!) */}
        <div className="bg-white border-2 border-gray-200 rounded-full px-6 py-3 w-full md:w-72 flex items-center shadow-sm">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Search Dex...</span>
        </div>
      </div>

      {/* THE GRID (The Character Select Screen) */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {dexEntries.map((icon) => (
            <Link 
              href={`/icons/${icon.slug}`} 
              key={icon.slug} 
              className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#30a7d7] group flex flex-col relative overflow-hidden transform hover:-translate-y-1"
            >
              {/* ID Number Badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/80 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                #{icon.id}
              </div>

              {/* Character Image */}
              <div className="w-full aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-300 border-2 border-gray-50">
                {icon.image ? (
                  <Image src={icon.image} alt={icon.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">NO IMAGE</div>
                )}
              </div>

              {/* Character Info */}
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-1">
                  {icon.name}
                </h2>
                
                {/* Type Pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                  {icon.types?.map((type: string) => (
                    <span 
                      key={type} 
                      className="bg-[#9bcc50] text-black text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

            </Link>
          ))}

        </div>
      </div>

    </main>
  )
}