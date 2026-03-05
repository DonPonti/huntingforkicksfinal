import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const iconsDirectory = path.join(process.cwd(), '_icons')

export function getIconSlugs() {
  return fs.readdirSync(iconsDirectory)
}

export function getIconBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(iconsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | string[] | number
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllIcons(fields: string[] = []) {
  const slugs = getIconSlugs()
  const icons = slugs
    .map((slug) => getIconBySlug(slug, fields))
    // Sorts icons alphabetically
    .sort((a, b) => ((a.name as string) > (b.name as string) ? 1 : -1))
  return icons
}