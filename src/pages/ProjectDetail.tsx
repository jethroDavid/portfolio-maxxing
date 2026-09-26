import { Link, Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/portfolio';
import PixelArt, { SPRITES } from '../components/PixelArt';
import DemoVideo from '../components/DemoVideo';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Link className="back" to="/">
        ❯ cd ~/projects
      </Link>
      <article className="window" aria-label={project.title}>
        <div className="window-bar">
          <span className="prompt-dot" aria-hidden="true">
            ●
          </span>
          <span className="window-path">~/projects/{project.slug}.md</span>
        </div>
        <div className="window-body project-layout">
          <div className="sprite sprite-float" aria-hidden="true">
            <PixelArt sprite={SPRITES[project.slug]!} animated />
          </div>
          <div className="project-main">
            <h1>
              {String(project.level).padStart(2, '0')} — {project.title}
            </h1>
            <p className="project-tagline">{project.tagline}</p>
            <div className="tags">
              {project.stack.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <ul className="tick-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {project.demos.map((demo) => (
              <DemoVideo key={demo.src} demo={demo} />
            ))}
            {project.links.length > 0 && (
              <div className="btn-row">
                {project.links.map((link) => (
                  <a className="btn" key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
