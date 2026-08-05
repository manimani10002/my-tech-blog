import './globals.css';

export const metadata = {
  title: '태현의 기술 블로그',
  description: '개발 및 기록을 위한 공간입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
