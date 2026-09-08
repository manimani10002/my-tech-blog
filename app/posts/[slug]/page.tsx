import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { getPost, getPosts } from '@/lib/posts';
export const dynamicParams = false;
export function generateStaticParams() { return getPosts().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return { title: post.title, description: post.description };
}
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <main id="main" className="article-container"><Link className="text-link" href="/#posts">← 모든 기록</Link><article>
    <header className="article-header"><div className="post-tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><h1>{post.title}</h1><p>{post.description}</p><div className="post-meta"><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time><span>·</span><span>태현</span></div></header>
    <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown></div>
  </article><div className="article-end"><span>읽어주셔서 감사합니다.</span><Link className="text-link" href="/#posts">다른 기록 읽기 ↗</Link></div></main>;
}
