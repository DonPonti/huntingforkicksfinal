import { cultureDex, assets } from '@/lib/culturedex'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-static';

// NETLIFY FIX: This tells Next.js to pre-build these pages at deploy time
// stopping Netlify from firing Serverless Functions for every single visitor.
export function generateStaticParams() {
  return Object.keys(cultureDex).map((slug) => ({
    slug: slug,
  }))
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function CultureDexProfile(props: Props) {
  const params = await props.params;
  const icon = cultureDex[params.slug];

  if (!icon) return notFound();

  return (
    <main className="min-h-screen bg-[#F6F8FA] dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 pb-20 overflow-x-hidden transition-colors duration-300">
      
      {/* TOP NAVIGATION BANNER - POKEDEX RED */}
      <div className="w-full bg-[#E3350D] text-white py-4 flex justify-between items-center px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-wider mb-6 md:mb-10 shadow-md">
        {/* NETLIFY FIX: Added prefetch={false} here to stop background server requests */}
        <Link href="/icons" prefetch={false} className="hover:text-black dark:hover:text-gray-200 transition-colors flex items-center gap-2">
          <span>←</span> 
          <span className="hidden md:inline">Back to Dex</span>
          <span className="md:hidden">Back</span>
        </Link>
        <span className="flex items-center gap-2 bg-black/20 dark:bg-black/40 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#9bcc50] animate-pulse"></span> 
          Database Active
        </span>
      </div>

      {/* TITLE SECTION */}
      <div className="text-center mb-6 md:mb-10 px-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white">
          {icon.name} <span className="text-gray-400 dark:text-gray-500 font-medium">#{icon.id}</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-12 gap-6 md:gap-8 w-full">
        
        {/* LEFT COLUMN: IMAGE & STATS */}
        <div className="md:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Main Image Box */}
          <div className="bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 md:p-6 aspect-square relative flex items-center justify-center shadow-inner border-4 border-white dark:border-gray-800 transition-colors">
            {icon.image ? (
              <Image src={icon.image} alt={icon.name} fill className="object-cover rounded-2xl" />
            ) : (
              <span className="text-indigo-400 dark:text-gray-400 font-mono font-bold">NO IMAGE DATA</span>
            )}
          </div>

          {/* Stats Box */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 md:p-6 text-gray-800 dark:text-gray-100 shadow-sm border-t-4 border-[#30a7d7] transition-colors">
            <h3 className="font-black mb-4 text-sm uppercase tracking-wider text-gray-400 dark:text-gray-500">Base Stats</h3>
            <div className="flex justify-between items-end h-28 md:h-32 gap-1 md:gap-2 w-full">
              {Object.entries(icon.stats).map(([statName, value]) => (
                <div key={statName} className="flex flex-col items-center w-full gap-2">
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-20 md:h-24 relative rounded-t-sm overflow-hidden border-b-2 border-gray-300 dark:border-gray-600 transition-colors">
                     <div 
                        className="absolute bottom-0 w-full bg-[#30a7d7] transition-all duration-1000"
                        style={{ height: `${value}%` }}
                     ></div>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase text-center leading-tight truncate w-full px-1">
                    {statName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DATA & ATTRIBUTES */}
        <div className="md:col-span-7 flex flex-col gap-6 w-full">
          
          {/* Flavor Text */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              {icon.description}
            </p>
          </div>

          {/* Blue Attributes Box */}
          <div className="bg-[#30a7d7] dark:bg-[#258ab3] rounded-3xl p-6 md:p-8 text-white grid grid-cols-2 gap-y-6 gap-x-4 shadow-md transition-colors">
            {Object.entries(icon.attributes).map(([key, value]) => (
              <div key={key} className="break-words pr-2">
                <span className="block text-xs md:text-sm font-bold uppercase opacity-80 mb-1">{key}</span>
                <span className="block text-lg md:text-xl font-black text-white leading-tight">{value as string}</span>
              </div>
            ))}
          </div>

          {/* Types & Weaknesses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Type</h3>
              <div className="flex flex-wrap gap-2">
                {icon.types.map((type: string) => (
                  <span key={type} className="bg-[#9bcc50] text-black px-3 py-1.5 rounded-lg text-xs md:text-sm font-black uppercase tracking-wide">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Weaknesses</h3>
              <div className="flex flex-wrap gap-2">
                {icon.weaknesses.map((weak: string) => (
                  <span key={weak} className="bg-[#f16e57] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-black uppercase tracking-wide">
                    {weak}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM INVENTORY TABLE */}
      <div className="max-w-5xl mx-auto px-4 mt-12 md:mt-16 w-full">
        <h3 className="text-xl md:text-2xl font-black mb-6 uppercase tracking-tighter text-gray-800 dark:text-white ml-2 transition-colors">Equipped Inventory</h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden w-full transition-colors">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-[10px] md:text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 transition-colors">
                  <th className="py-4 pl-6 font-bold">Item Asset</th>
                  <th className="py-4 font-bold">Maker / Brand</th>
                  <th className="py-4 pr-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {icon.equipped.map((assetId: string) => {
                  const asset = assets[assetId];
                  if (!asset) return null;
                  return (
                    <tr key={assetId} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
                      
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative bg-[#F6F8FA] dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shrink-0 transition-colors">
                            {asset.image ? (
                              <Image src={asset.image} alt={asset.name} fill className="object-contain p-2" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">N/A</div>
                            )}
                          </div>
                          <span className="font-black text-sm md:text-base text-gray-800 dark:text-white transition-colors">{asset.name}</span>
                        </div>
                      </td>
                      
                      <td className="py-4">
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wide bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full transition-colors">
                          {asset.brand}
                        </span>
                      </td>
                      
                      <td className="py-4 pr-6 text-right">
                        <a 
                          href={asset.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-[#E3350D] text-white text-[10px] md:text-xs uppercase font-black px-5 py-2.5 rounded-full hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-sm"
                        >
                          Find Item
                        </a>
                      </td>
                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  )
}