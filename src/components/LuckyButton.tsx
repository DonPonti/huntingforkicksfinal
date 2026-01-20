"use client";

import { useRouter } from "next/navigation";

type Props = {
  allSlugs: string[];
};

export default function LuckyButton({ allSlugs }: Props) {
  const router = useRouter();

  const handleLucky = () => {
    if (allSlugs.length === 0) return;
    // Pick a random slug
    const randomSlug = allSlugs[Math.floor(Math.random() * allSlugs.length)];
    // Go there
    router.push(`/blog/${randomSlug}`);
  };

  return (
    <button 
      onClick={handleLucky}
      className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-all font-bold tracking-widest uppercase text-[10px]"
    >
      I'm Feeling Lucky
    </button>
  );
}