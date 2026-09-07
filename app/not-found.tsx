import Link from 'next/link';
export default function NotFound() {
  return <main id="main" className="article-container empty"><div className="eyebrow">404 · NOT FOUND</div><h1>이 기록을 찾을 수 없습니다.</h1><p>주소가 바뀌었거나 아직 공개되지 않은 글입니다.</p><Link className="text-link" href="/">블로그로 돌아가기 →</Link></main>;
}
