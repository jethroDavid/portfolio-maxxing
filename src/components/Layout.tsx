import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PROFILE } from '../data/portfolio';

export default function Layout() {
  const { pathname,hash } = useLocation();
  useEffect(()=>{if(hash){requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView());}else{window.scrollTo(0,0);}},[pathname,hash]);
  const home=pathname==='/';
  return <>
    <a className="skip-link" href={home?'#experience':'#main'}>Skip to content</a>
    <header className="site-header">
      {!home&&<Link className="home-link" to="/">← Back</Link>}
      <nav aria-label="Main navigation"><a href="https://resume-jethro-david.web.app/" target="_blank" rel="noreferrer">Resume</a><a href={`mailto:${PROFILE.email}`}>Contact</a></nav>
    </header>
    <main id="main" className={home?'home':'detail-page'}><Outlet/></main>
  </>;
}
