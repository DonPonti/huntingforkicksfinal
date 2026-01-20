import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 min-h-screen">
      
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-4">
          WEB TOOLS
        </h1>
        <p className="text-xl text-gray-500">
          Free, privacy-focused browser tools. No server uploads, ever.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* LINKED TOOL 1: Word Counter */}
        <Link href="/tools/word-counter" className="group">
          <div className="border border-black p-6 h-full hover:bg-black hover:text-white transition-colors cursor-pointer rounded-lg">
            <h3 className="text-xl font-bold mb-2">Word Counter</h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 mb-4">
              Count words, characters, and reading time instantly.
            </p>
            <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded group-hover:bg-blue-900 group-hover:text-white">
              READY
            </span>
          </div>
        </Link>

        {/* LINKED TOOL 2: Slug Generator */}
        <Link href="/tools/slug-generator" className="group">
          <div className="border border-black p-6 h-full hover:bg-black hover:text-white transition-colors cursor-pointer rounded-lg">
            <h3 className="text-xl font-bold mb-2">Slug Generator</h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300 mb-4">
              Turn any text into a URL-friendly slug.
            </p>
            <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded group-hover:bg-purple-900 group-hover:text-white">
              READY
            </span>
          </div>
        </Link>

        {/* PLACEHOLDER: More Coming Soon */}
        <div className="border border-dashed border-gray-300 p-6 opacity-60 rounded-lg flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-bold text-gray-400 mb-2">More Tools Coming</h3>
          <p className="text-xs text-gray-400">
            We are building more useful utilities.
          </p>
        </div>

      </div>
    </main>
  );
}