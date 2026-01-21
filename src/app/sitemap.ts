import { MetadataRoute } from 'next'
import { getAllPosts } from "@/lib/api"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://huntingforkicks.com'

  // 1. Get all blog posts
  const posts = getAllPosts(["slug", "date"])
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 2. Return the combined map
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add your tools manually here
    {
      url: `${baseUrl}/tools/size-converter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogUrls,
  ]
}