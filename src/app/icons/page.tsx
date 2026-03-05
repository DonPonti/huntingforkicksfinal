import Link from 'next/link'
import { getAllIcons } from '@/lib/icons-api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Icon Archive | Hunting For Kicks",
  description: "The database of cinematic and cultural sneaker icons.",
}

export default function IconsDirectory() {
  const icons = getAllIcons(['slug', 'name', 'alias'])

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      <header className="mb-16 border-b-4 border-black pb-8">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
          ICON<br />ARCHIVE
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest max-w-xl">
          Database Status: Online <br />
          Tracking {icons.length} Active Targets
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {icons.map((icon) => (
          <Link href={`/icons/${icon.slug}`} key={icon.slug as string} className="group block border-2 border-black p-6 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">{icon.name}</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
              {icon.alias}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}