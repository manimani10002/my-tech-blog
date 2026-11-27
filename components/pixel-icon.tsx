const icons = {
  folder: 'M1 3h6v2h8v8H1zm2 2v6h10V7H5V5z',
  terminal: 'M1 2h14v12H1zm2 2v8h10V4zm1 1h2v1h1v2H6v1H4V8h1V6H4zm4 4h4v1H8z',
  search: 'M3 2h6v1h1v1h1v5h-1v1h2v2h2v2h-2v-2h-2v-2H3V9H2V4h1zm1 2v4h5V4z',
  up: 'M7 2h2v2h2v2h2v2h-2V7H9v7H7V7H5v1H3V6h2V4h2z',
};

export default function PixelIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      <path d={icons[name]} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
