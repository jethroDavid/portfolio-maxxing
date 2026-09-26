import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="window" aria-label="Not found">
      <div className="window-bar">
        <span className="prompt-dot" aria-hidden="true">
          ●
        </span>
        <span className="window-path">~/404</span>
      </div>
      <div className="window-body center">
        <p className="error-code">command not found: 404</p>
        <h1>No such file or directory</h1>
        <p>The princess is in another castle.</p>
        <Link className="read-more" to="/">
          cd ~
        </Link>
      </div>
    </section>
  );
}
