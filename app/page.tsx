import { getPosts } from '@/lib/posts';
import PostList from '@/components/post-list';
export default function Home() {
  const posts = getPosts().map(post => ({ slug: post.slug, title: post.title, description: post.description, date: post.date, tags: post.tags }));
  return <main id="main" className="container">
    <section className="hero">
      <div className="eyebrow">TAEHYUN’S DEVELOPMENT POST</div>
      <h1>배우고, 만들고,<br /><span>기록합니다.</span></h1>
      <p>코드로 풀어낸 문제와 새롭게 배운 것들.<br />더 나은 개발을 위한 작은 기록을 쌓아갑니다.</p>
      <a className="text-link" href="#posts">게시글 살펴보기 ↗</a>
      <div className="hero-note" aria-hidden="true"><span>const post = &#123;</span><br />&nbsp; curiosity: true,<br />&nbsp; learning: &apos;every day&apos;,<br />&nbsp; notes: []<br /><span>&#125;;</span><div className="note-caption">한 줄의 코드, 하나의 배움.</div></div>
    </section>
    <PostList posts={posts} />
  </main>;
}
