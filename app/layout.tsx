import './globals.css';
import Link from 'next/link';
export const metadata = {
  title: { default: '태현의 기술 블로그', template: '%s | 태현의 기술 블로그' },
  description: '개발 및 기록을 위한 공간입니다.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>
    <a className="skip-link" href="#main">본문으로 바로가기</a>
    <header className="site-header"><div className="container header-inner">
      <Link href="/" className="brand"><span className="brand-icon" aria-hidden="true">t.</span>태현의 기술 블로그<span className="brand-dot">/</span></Link>
      <nav aria-label="메인 메뉴"><Link href="/#posts">글 목록</Link><Link href="/about">소개</Link><a href="https://github.com/manimani10002" target="_blank" rel="noreferrer">GitHub ↗<span className="sr-only"> (새 탭)</span></a></nav>
    </div></header>
    {children}
    <footer className="container site-footer"><span>© {new Date().getFullYear()} 태현 · 배움의 순간을 기록합니다.</span><span>Built with curiosity & Next.js</span></footer>
  </body></html>;
}
