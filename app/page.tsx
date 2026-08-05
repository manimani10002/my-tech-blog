export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '1rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
        Hello World! 👋
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>
        기술 블로그 배포 준비 완료!
      </p>
    </main>
  );
}
