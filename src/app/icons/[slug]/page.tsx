import { cultureDex, assets } from '@/lib/culturedex'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
    <main className="min-h-screen bg-[#F6F8FA] font-sans text-gray-800 pb-20 overflow-x-hidden">
      
      {/* TOP NAVIGATION BANNER - POKEDEX RED */}
      <div className="w-full bg-[#E3350D] text-white py-4 flex justify-between items-center px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-wider mb-6 md:mb-10 shadow-md">
        <Link href="/icons" prefetch={false} className="hover:text-black dark:hover:text-gray-200 transition-colors flex items-center gap-2">
          <span>←</span> 
          <span className="hidden md:inline">Back to Dex</span>
          <span className="md:hidden">Back</span>
        </Link>
        <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#9bcc50] animate-pulse"></span> 
          Database Active
        </span>
      </div>

      {/* TITLE SECTION */}
      <div className="text-center mb-6 md:mb-10 px-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          {icon.name} <span className="text-gray-400 font-medium">#{icon.id}</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-12 gap-6 md:gap-8 w-full">
        
        {/* LEFT COLUMN: IMAGE & STATS */}
        <div className="md:col-span-5 flex flex-col gap-6 w-full">
          <div className="bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] rounded-3xl p-4 md:p-6 aspect-square relative flex items-center justify-center shadow-inner border-4 border-white">
            {icon.image ? (
              <Image src={icon.image} alt={icon.name} fill className="object-cover rounded-2xl" />
            ) : (
              <span className="text-indigo-400 font-mono font-bold">NO IMAGE DATA</span>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 md:p-6 text-gray-800 shadow-sm border-t-4 border-[#30a7d7]">
            <h3 className="font-black mb-4 text-sm uppercase tracking-wider text-gray-400">Base Stats</h3>
            <div className="flex justify-between items-end h-28 md:h-32 gap-1 md:gap-2 w-full">
              {Object.entries(icon.stats).map(([statName, value]) => (
                <div key={statName} className="flex flex-col items-center w-full gap-2">
                  <div className="w-full bg-gray-100 h-20 md:h-24 relative rounded-t-sm overflow-hidden border-b-2 border-gray-300">
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
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-base md:text-lg leading-relaxed text-gray-700 font-medium">
              {icon.description}
            </p>
          </div>

          <div className="bg-[#30a7d7] rounded-3xl p-6 md:p-8 text-white grid grid-cols-2 gap-y-6 gap-x-4 shadow-md">
            {Object.entries(icon.attributes).map(([key, value]) => (
              <div key={key} className="break-words pr-2">
                <span className="block text-xs md:text-sm font-bold uppercase opacity-80 mb-1">{key}</span>
                <span className="block text-lg md:text-xl font-black text-white leading-tight">{value as string}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Type</h3>
              <div className="flex flex-wrap gap-2">
                {icon.types.map((type: string) => (
                  <span key={type} className="bg-[#9bcc50] text-black px-3 py-1.5 rounded-lg text-xs md:text-sm font-black uppercase tracking-wide">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Weaknesses</h3>
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

      {/* BOTTOM INVENTORY TABLE (The Affiliate Links Restored) */}
      <div className="max-w-5xl mx-auto px-4 mt-12 md:mt-16 w-full">
        <h3 className="text-xl md:text-2xl font-black mb-6 uppercase tracking-tighter text-gray-800 ml-2">Equipped Inventory</h3>
        
        {/* Table Container with rounding to match the Pokédex theme */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] md:text-xs uppercase tracking-wider text-gray-500">
                  <th className="py-4 pl-6 font-bold">Item Asset</th>
                  <th className="py-4 font-bold">Maker / Brand</th>
                  <th className="py-4 pr-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {icon.equipped.map((assetId: string) => {
                  const asset = assets[assetId];
                  if (!asset) return null;
                  return (
                    <tr key={assetId} className="hover:bg-gray-50 transition-colors group">
                      
                      {/* Image + Item Name Column */}
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative bg-[#F6F8FA] rounded-xl overflow-hidden border border-gray-200 shrink-0">
                            {asset.image ? (
                              <Image src={asset.image} alt={asset.name} fill className="object-contain p-2" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">N/A</div>
                            )}
                          </div>
                          <span className="font-black text-sm md:text-base text-gray-800">{asset.name}</span>
                        </div>
                      </td>
                      
                      {/* Brand Column */}
                      <td className="py-4">
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-3 py-1.5 rounded-full">
                          {asset.brand}
                        </span>
                      </td>
                      
                      {/* Affiliate Button Column */}
                      <td className="py-4 pr-6 text-right">
                        <a 
                          href={asset.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-[#E3350D] text-white text-[10px] md:text-xs uppercase font-black px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
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