'use client';

import PixelIcon from './pixel-icon';

export default function ScrollToTop() {
  return (
    <button
      type="button"
      className="scroll-to-top"
      aria-label="맨 위로 이동"
      title="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
    >
      <PixelIcon name="up" />
    </button>
  );
}
