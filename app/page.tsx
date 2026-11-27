import { getPosts } from '@/lib/posts';
import PostList from '@/components/post-list';

export default function Home() {
  const posts = getPosts().map(({ slug, title, description, date, tags }) => ({ slug, title, description, date, tags }));

  return (
    <main id="main" tabIndex={-1} className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell-prompt" aria-hidden="true">
          <span>taehyun@blog</span><span className="shell-path">:~</span><span>$</span>
          <span className="shell-cursor" />
        </div>
        <h1 id="hero-title">배우고, 만들고,<br /><span>기록합니다.</span></h1>
        <p>더 나은 개발을 위한 작은 기록을 쌓아갑니다.</p>
      </section>
      <PostList posts={posts} />
    </main>
  );
}
