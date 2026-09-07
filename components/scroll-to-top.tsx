'use client';

export default function ScrollToTop() {
  return (
    <button
      type="button"
      className="scroll-to-top"
      aria-label="맨 위로 이동"
      title="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 12 6-6 6 6M12 6v14" />
      </svg>
    </button>
  );
}
