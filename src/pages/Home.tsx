import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolio';
import PixelArt, { SPRITES } from '../components/PixelArt';

export default function Home() {
  return (
    <>
      <p className="ls-line" aria-label={`${PROJECTS.length} projects`}>
        <b>❯</b> ls ~/projects — total {PROJECTS.length}
      </p>

      {PROJECTS.map((project) => {
        const peek = project.highlights.slice(0, 2);
        const rest = project.highlights.length - peek.length;
        return (
          <article
            className="window project"
            id={`project-${project.slug}`}
            key={project.slug}
            aria-label={project.title}
          >
            <div className="window-bar">
              <span className="prompt-dot" aria-hidden="true">
                ●
              </span>
              <span className="window-path">~/projects/{project.slug}.md</span>
            </div>
            <div className="window-body project-layout">
              <div className="sprite" aria-hidden="true">
                <PixelArt sprite={SPRITES[project.slug]!} />
              </div>
              <div className="project-main">
                <h2>
                  {String(project.level).padStart(2, '0')} — {project.title}
                </h2>
                <p className="project-tagline">{project.tagline}</p>
                <div className="tags">
                  {project.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="peek-list">
                  {peek.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {rest > 0 && <p className="peek-more">… +{rest} more inside</p>}
                <Link className="read-more" to={`/projects/${project.slug}`}>
                  read more →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
