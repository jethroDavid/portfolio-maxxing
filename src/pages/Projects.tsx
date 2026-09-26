import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolio';

export default function Projects() {
  return (
    <>
      <section className="panel" aria-label="Projects intro">
        <p className="eyebrow">LEVEL SELECT</p>
        <h1>Projects</h1>
        <p className="lede">
          Five flagship builds: a trading stack, an agent runtime, an encrypted vault, a
          personal automation system, and a family board. Pick a level.
        </p>
      </section>

      <div className="card-grid">
        {PROJECTS.map((project) => (
          <Link className="panel card" key={project.slug} to={`/projects/${project.slug}`}>
            <span className="level-tag">LEVEL {project.level}</span>
            <h2>{project.title}</h2>
            <p>{project.tagline}</p>
            <div className="tags">
              {project.stack.slice(0, 4).map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <span className="card-cta">ENTER →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
