import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE, PROJECTS } from '../data/portfolio';
import PaperScene, { storySubtitle } from '../components/PaperScene';

export default function Home() {
  const story = useRef<HTMLElement>(null);
  const [progress,setProgress]=useState(0);
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{frame=0;const el=story.current;if(!el)return;const range=el.offsetHeight-window.innerHeight;setProgress(media.matches?1:Math.max(0,Math.min(1,-el.getBoundingClientRect().top/Math.max(1,range))));};
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const preference=()=>{setReduced(media.matches);request();};
    preference();window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);media.addEventListener('change',preference);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);media.removeEventListener('change',preference);};
  },[]);
  return <>
    <section ref={story} className={`scroll-story${reduced?' reduced':''}`} aria-label="From idea to shipped app">
      <div className="story-viewport">
        <PaperScene progress={progress} reduced={reduced} />
        <div className="scene-caption"><p>{storySubtitle(progress)}</p><small>Scroll</small></div>
        <a className="skip-story" href="#experience">Skip to experience</a>
      </div>
    </section>
    <section id="experience" className="experience">
      <p className="eyebrow">The person behind the work</p>
      <h1>I take ideas all the way<br className="desktop-break"/> to working products.</h1>
      <p className="intro">I’m Jethro, a senior software engineer. I work across web, mobile and backend systems, from the first feature to performance, offline reliability and production releases.</p>
      <div className="experience-lines">
        <div><span>2024 to present</span><p><strong>TabLogs</strong>Mobile ownership, offline sync, performance and releases.</p></div>
        <div><span>2021 to 2024</span><p><strong>Accenture</strong>Enterprise mobile apps and production commerce.</p></div>
        <div><span>2019 to 2021</span><p><strong>Full stack development</strong>Magento, Laravel, payments and custom modules.</p></div>
      </div>
      <p className="expertise">Web & mobile · Backend & automation · AWS (S3, IAM, CDK)</p>
      <div className="selected-work"><h2>A few things I’ve built</h2>{PROJECTS.map(project=><Link key={project.slug} to={`/projects/${project.slug}`}><span>{project.title}</span><span aria-hidden="true">↗</span></Link>)}</div>
      <footer className="closing"><a href={`mailto:${PROFILE.email}`}>Have something in mind? <span>Let’s talk ↗</span></a><span>Philippines · Working remotely</span></footer>
    </section>
  </>;
}


