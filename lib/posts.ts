import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Post = { slug: string; title: string; description: string; date: string; tags: string[]; content: string };
const directory = path.join(process.cwd(), 'content/posts');
export function getPosts(): Post[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(file => file.endsWith('.md')).flatMap(file => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
    if (data.draft === true) return [];
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
    if (typeof data.title !== 'string' || typeof data.description !== 'string' ||
      typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date ||
      !Array.isArray(data.tags) || !data.tags.every((tag: unknown) => typeof tag === 'string')) {
      throw new Error(`글 메타데이터를 확인하세요: ${file} (title, description, date, tags)`);
    }
    return [{ slug: file.slice(0, -3), title: data.title, description: data.description, date, tags: data.tags, content }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
export function getPost(slug: string) { return getPosts().find(post => post.slug === slug); }
