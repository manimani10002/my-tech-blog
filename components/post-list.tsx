'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PixelIcon from './pixel-icon';
import type { Post } from '@/lib/posts';
export default function PostList({ posts }: { posts: Omit<Post, 'content'>[] }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || !event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.code !== 'Slash' && event.key !== '/') return;
      event.preventDefault();
      searchInput.current?.focus();
    }

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const tags = [...new Set(posts.flatMap(post => post.tags))];
  const filtered = posts.filter(post => (!tag || post.tags.includes(tag)) &&
    `${post.title} ${post.description} ${post.tags.join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <section id="posts" className="posts-section">
    <div className="section-heading"><div><h2><PixelIcon name="folder" /> 게시글 <span>{String(posts.length).padStart(2, '0')}</span></h2></div>
      <label className="search">
        <PixelIcon name="search" />
        <span className="sr-only">글 제목, 요약, 태그 검색</span>
        <input ref={searchInput} type="search" aria-keyshortcuts="Alt+/" placeholder="어떤 기록을 찾고 있나요?" value={query} onChange={event => setQuery(event.target.value)} />
        <kbd className="search-shortcut" aria-hidden="true">Alt /</kbd>
      </label>
    </div>
    <div className="filters" role="group" aria-label="태그 필터"><button aria-pressed={tag === null} onClick={() => setTag(null)}>전체</button>{tags.map(item => <button key={item} aria-pressed={tag === item} onClick={() => setTag(item)}>{item}</button>)}</div>
    <p className="sr-only" role="status">{filtered.length}개의 글</p>
    <div className="post-list">{filtered.map((post, index) => <article className="post-row" key={post.slug}>
      <div className="post-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
      <div className="post-copy"><div className="post-meta"><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time><span>·</span><span>태현</span></div>
        <h3><Link href={`/posts/${encodeURIComponent(post.slug)}`}>{post.title}</Link></h3><p>{post.description}</p>
        <div className="post-tags">{post.tags.map(item => <span key={item}>#{item}</span>)}</div>
      </div><span className="post-arrow" aria-hidden="true">↗</span>
    </article>)}</div>
    {filtered.length === 0 && <div className="empty"><h3>{posts.length ? '검색 결과가 없습니다.' : '첫 번째 기록을 준비하고 있습니다.'}</h3><p>{posts.length ? '다른 검색어나 태그로 찾아보세요.' : '곧 새로운 배움을 이곳에 공유할게요.'}</p>{posts.length > 0 && <button onClick={() => { setQuery(''); setTag(null); }}>전체 글 보기</button>}</div>}
  </section>;
}
