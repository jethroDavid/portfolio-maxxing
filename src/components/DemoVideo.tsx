import { useState } from 'react';
import type { ProjectDemo } from '../data/portfolio';

export default function DemoVideo({ demo }: { demo: ProjectDemo }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="demo-fallback" role="img" aria-label={`Demo video missing: ${demo.filename}`}>
        <span className="demo-fallback-icon" aria-hidden="true">
          ▶
        </span>
        <p>
          demo offline — drop the real cut at <code>public/demos/{demo.filename}</code>
        </p>
      </div>
    );
  }

  return (
    <figure className="demo">
      <div className="demo-label" aria-hidden="true">
        <span>●</span> {demo.filename}
      </div>
      <video
        className="demo-player"
        controls
        preload="metadata"
        playsInline
        src={demo.src}
        onError={() => setFailed(true)}
      />
      <figcaption className="demo-caption">{demo.caption}</figcaption>
    </figure>
  );
}
