import { getIconBySlug, getAllIcons } from '@/lib/icons-api'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

// 1. We update the type to expect a Promise
type Props = {
  params: Promise<{
    slug: string
  }>
}

// 2. Add 'async' and 'await params' to the Metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const icon = getIconBySlug(params.slug, ['name', 'alias'])
  
  if (!icon.name) return {}
  
  return {
    title: `${icon.name} | Sneaker Archive | Hunting For Kicks`,
    description: `Analyzing the sneaker rotation and cultural impact of ${icon.name}: ${icon.alias}.`,
  }
}

// 3. Add 'async' and 'await params' to the main component
export default async function IconProfile(props: Props) {
  const params = await props.params;
  const icon = getIconBySlug(params.slug, [
    'name',
    'alias',
    'signatureShoe',
    'rotation',
    'brandAffiliation',
    'firstSignatureYear',
    'content'
  ])

  if (!icon.name) return notFound()

  const rotation = icon.rotation as string[] || []

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      {/* HEADER */}
      <header className="mb-12 border-b-4 border-black pb-8">
        <Link href="/icons" className="font-mono text-xs uppercase tracking-widest hover:underline mb-8 block">
          ← Back to Archive
        </Link>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
          {icon.name}
        </h1>
        <p className="font-mono text-sm md:text-base uppercase tracking-widest border-l-4 border-black pl-4 bg-gray-100 py-2 inline-block pr-6">
          {icon.alias}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-12">
        {/* LEFT COL: STATS (The Sidebar) */}
        <aside className="md:col-span-1 border-t-2 border-black pt-6">
          <h2 className="font-black text-xl uppercase tracking-tighter mb-6">Database Specs</h2>
          
          <div className="mb-6">
            <p className="font-mono text-xs uppercase text-gray-500 mb-1">Brand Affiliation</p>
            <p className="font-bold uppercase">{icon.brandAffiliation}</p>
          </div>

          <div className="mb-6">
            <p className="font-mono text-xs uppercase text-gray-500 mb-1">First Signature</p>
            <p className="font-bold uppercase">{icon.firstSignatureYear}</p>
          </div>

          <div className="mb-6">
            <p className="font-mono text-xs uppercase text-gray-500 mb-1">Grail/Signature Asset</p>
            <p className="font-bold uppercase bg-black text-white px-2 py-1 inline-block">{icon.signatureShoe}</p>
          </div>

          <div className="mb-6">
            <p className="font-mono text-xs uppercase text-gray-500 mb-2">Known Rotation</p>
            <ul className="list-disc pl-4 font-bold text-sm uppercase space-y-1">
              {rotation.map((shoe, idx) => (
                <li key={idx}>{shoe}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* RIGHT COL: ANALYSIS */}
        <article className="md:col-span-2 border-t-2 border-black pt-6">
          <h2 className="font-black text-xl uppercase tracking-tighter mb-6">Cultural Analysis</h2>
          <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed">
            {icon.content}
          </div>
        </article>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const icons = getAllIcons(['slug'])
  return icons.map((icon) => ({
    slug: icon.slug,
  }))
}