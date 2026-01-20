import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the content folder at the root
const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  // Remove ".mdx" from slug to get the ID
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse the metadata (Frontmatter) vs the content
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    // Check if the field exists in the frontmatter (title, date, category, etc.)
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Sort posts by date in descending order (Newest first)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    
  return posts;
}