import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PROFILE, PROJECTS } from '../data/portfolio';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = now
    .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })
    .replace(/,/g, '');
  return (
    <>
      <span className="bar-pill bar-date">{date}</span>
      <span className="bar-pill bar-clock">
        {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
      </span>
    </>
  );
}

function CenterTitle() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/projects\/([\w-]+)/);
  const title = match ? `~/projects/${match[1]}` : '~';
  return (
    <span className="bar-center">
      <b>jethro</b>@portfolio:{title}
    </span>
  );
}

export default function Layout() {
  const { hash } = useLocation();
  return (
    <div className="wrap">
      <ScrollToTop />
      <header className="waybar">
        <nav className="ws" aria-label="Projects">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              className={hash === `#project-${project.slug}` ? 'ws-link active' : 'ws-link'}
              to={`/#project-${project.slug}`}
              title={project.title}
            >
              {i + 1}
            </Link>
          ))}
        </nav>
        <CenterTitle />
        <div className="bar-right">
          <Clock />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Jethro Clein David</span>
        <nav aria-label="Contact">
          <a href={`mailto:${PROFILE.email}`}>email</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
        </nav>
      </footer>
    </div>
  );
}
