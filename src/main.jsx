import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import portrait from './assets/fady-portrait.webp';
import logo from './assets/fa-logo.png';
import algorithmsCert from './assets/certificate-algorithms.webp';
import cppCert from './assets/certificate-cpp.webp';
import ntiCert from './assets/certificate-nti-python.webp';
import './style.css';

const Icon = ({name, size=18}) => {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-4 1.5a13.7 13.7 0 0 0-7.3 0C4.6 1.1 3.4 1.5 3.4 1.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 2 8.7c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>,
    code: <><path d="m8 17-5-5 5-5m8 10 5-5-5-5m-2-7-4 24"/></>,
    bulb: <><path d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.7c.6.4 1 1.1 1 1.8h6c0-.7.4-1.4 1-1.8A7 7 0 0 0 12 2Z"/></>,
    grad: <><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3.5 3 8.5 3 12 0v-5m4-2v6"/></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.3-2 4.5-2 4.5s3.2-.5 4.5-2c.7-.8.7-2 0-2.5s-1.7-.7-2.5 0Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3c3-3.5 7-5 11-5-0 4-1.5 8-5 11a22 22 0 0 1-3 2Z"/><path d="M9 12H4s.5-3 3-4c1.5-.5 3 0 3 0m2 7v5s3-.5 4-3c.5-1.5 0-3 0-3"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const certificates = [
  { image: algorithmsCert, title: 'Algorithms & Problem-Solving — Level 2', issuer: 'Programming Advices', date: 'September 6, 2026', type: 'Graduation Certificate', description: 'Recognition for completing Level 2 in algorithms and problem-solving, strengthening logical thinking and structured approaches to coding challenges.' },
  { image: cppCert, title: 'Introduction to Programming Using C++ — Level 2', issuer: 'Programming Advices', date: 'September 5, 2026', type: 'Certificate of Attendance', description: 'Attended the Level 2 C++ programming course, building a stronger foundation in programming concepts and practical problem-solving.' },
  { image: ntiCert, title: 'Programming Using Python', issuer: 'NTI × ITIDA', date: 'July 19 – August 13, 2026', type: 'Summer Training Certificate', description: 'Completed a 120-hour summer training program: 90 technical hours and 30 freelancing hours, with a final score of 92.5%.' }
];

function App(){
  const [dark,setDark]=useState(false);
  const [active,setActive]=useState('Home');
  const links=[['Home','home'],['About','about'],['Journey','journey'],['Certificates','certificates'],['Contact','contact']];
  const go=(id,label)=>{setActive(label);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  useEffect(()=>{
    const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
      // Re-trigger the entrance animation whenever a section re-enters the viewport.
      entry.target.classList.toggle('visible', entry.isIntersecting);
    }),{threshold:.14,rootMargin:'0px 0px -45px 0px'});
    document.querySelectorAll('.reveal').forEach(node=>revealObserver.observe(node));
    const sectionObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        const match=links.find(([,id])=>id===entry.target.id);
        if(match) setActive(match[0]);
      }
    }),{rootMargin:'-28% 0px -58% 0px',threshold:0});
    links.forEach(([,id])=>{const el=document.getElementById(id);if(el)sectionObserver.observe(el);});
    return ()=>{revealObserver.disconnect();sectionObserver.disconnect();};
  },[]);
  return <div className={dark?'site dark':'site'}>
    <header className="nav wrap">
      <a className="brand" href="#home" onClick={e=>{e.preventDefault();go('home','Home')}}><img className="brand-logo" src={logo} alt="FA monogram"/><b>Fady Atef</b></a>
      <nav aria-label="Main navigation">{links.map(([label,id])=><a key={id} className={active===label?'active':''} href={'#'+id} onClick={e=>{e.preventDefault();go(id,label)}}>{label}</a>)}</nav>
      <div className="nav-actions"><button className="theme-toggle" onClick={()=>setDark(!dark)} aria-label="Toggle theme"><Icon name={dark?'sun':'moon'} size={17}/></button><button className="talk" onClick={()=>go('contact','Contact')}><i/>Let's Talk <Icon name="arrow" size={16}/></button></div>
    </header>
    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy reveal">
          <div className="eyebrow">COMPUTER SCIENCE STUDENT <span/></div>
          <h1>Fady Atef<br/><em>Makram</em></h1>
          <p className="lead">Building digital experiences<br className="desktop-break"/> with clean code and creative thinking.</p>
          <p className="intro">Second-year Computer Science student at Assiut University, passionate about Back-end Development. Building a strong technical foundation in Java, OOP, Python, and C++ to design efficient and robust software solutions.</p>
          <div className="hero-buttons"><button className="primary" onClick={()=>go('journey','Journey')}>Explore My Journey <Icon name="arrow"/></button><a className="secondary" href="/Fady-Atef-CV.pdf" download><Icon name="download" size={17}/> Download CV</a></div>
          <div className="socials"><a href="https://github.com/Fady-ateff" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github"/></a><a href="https://www.linkedin.com/in/fady-atef-m" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin"/></a><a href="https://www.instagram.com/fady3_atef" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram"/></a><a href="mailto:fadyatef.dev@gmail.com" aria-label="Email"><Icon name="mail"/></a></div>
        </div>
        <div className="hero-art reveal" aria-label="Portrait of Fady Atef"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="planet-glow"/><div className="portrait-shell"><div className="portrait-inner"><img src={portrait} alt="Fady Atef Makram"/></div></div><span className="orb orb-a"/><span className="orb orb-b"/><span className="orb orb-c"/><span className="orb orb-d"/><div className="floating-tag"><span className="live-dot"/> Open to learning & opportunities</div></div>
        <div className="scroll-hint"><span className="mouse"><i/></span> Scroll to explore</div>
      </section>
      <section className="values wrap reveal" aria-label="Core values">
        <div className="value"><Icon name="code"/><b>Software Development</b><small>Building a strong foundation</small></div><div className="value"><Icon name="bulb"/><b>Problem Solving</b><small>Logical & analytical thinking</small></div><div className="value"><Icon name="grad"/><b>Continuous Learning</b><small>Always improving</small></div><div className="value"><Icon name="rocket"/><b>Big Dreams</b><small>Building my future</small></div><button className="featured" onClick={()=>go('about','About')}>Discover More <span><Icon name="arrow"/></span></button>
      </section>
      <section className="content-section wrap reveal" id="about"><div className="section-kicker">01 / ABOUT ME</div><div className="section-grid"><h2>Curious mind.<br/><em>Builder's mindset.</em></h2><div className="about-text"><p>​I'm a second-year Computer Science student at Assiut University with a genuine interest in Back-end development and software engineering. I enjoy breaking down complex problems, learning the fundamentals, and turning ideas into practical solutions.</p><p>My current focus is Java, OOP, and SQL / Relational Databases, alongside Data Structures and Algorithms, backed by a strong foundation in C++ and Python. I also use AI tools to support coding, debugging, and learning workflows.</p><div className="details"><div><small>UNIVERSITY</small><b>Assiut University</b></div><div><small>ACADEMIC YEAR</small><b>Second Year · CS</b></div><div><small>CUMULATIVE GPA</small><b>3.5 / 4.00</b></div></div></div></div>
        <div className="skills-block"><div className="mini-label">TECHNICAL TOOLKIT</div><div className="skill-chips"><span>C++</span><span>Python</span><span>Java</span><span>Algorithms</span><span>OOP</span><span>Problem Solving</span><span>Back-end Development</span><span>Debugging</span><span>​Git & GitHub</span></div></div>
      </section>
      <section className="content-section journey wrap reveal" id="journey"><div className="section-kicker">02 / MY JOURNEY</div><div className="journey-list">
        <article className="journey-card"><div className="journey-icon"><Icon name="grad" size={25}/></div><div><span className="mini-label">2025 — PRESENT</span><h3>Computer Science Student</h3><p>Faculty of Computers and Information · Assiut University</p><p className="muted">Second-year student pursuing a Bachelor's degree in Computer Science, expected to graduate in 2029.</p></div><div className="journey-badge">University <span>↗</span></div></article>
        <article className="journey-card"><div className="journey-icon"><Icon name="code" size={25}/></div><div><span className="mini-label">TECHNICAL TRAINING</span><h3>C++ & Data Structures Intensive Program</h3><p>Programming Advices · 13-course curriculum</p><p className="muted">Studied C++ fundamentals, OOP, data structures, memory management, pointers, recursion, and algorithm complexity (Big O).</p></div><div className="journey-badge">C++ <span>↗</span></div></article>
        <article className="journey-card"><div className="journey-icon"><Icon name="rocket" size={25}/></div><div><span className="mini-label">TRAINING PROGRAM</span><h3>Python Development Track</h3><p>National Telecommunication Institute (NTI)</p><p className="muted">Selected for a professional development program focused on Python software development and practical workflows.</p></div><div className="journey-badge">Python <span>↗</span></div></article>
        {/* <article className="journey-card"><div className="journey-icon"><Icon name="bulb" size={25}/></div><div><span className="mini-label">ONGOING PRACTICE</span><h3>ICPC Training & Competitive Programming</h3><p>Problem-solving practice</p><p className="muted">Developing algorithmic thinking and coding efficiency through regular practice, including problem-solving on Codeforces.</p></div><div className="journey-badge">Practice <span>↗</span></div></article> */}
      </div></section>
      <section className="content-section wrap cert-section reveal" id="certificates"><div className="section-kicker">03 / CERTIFICATES</div><div className="cert-heading"><div><h2>Proof of <em>progress.</em></h2><p>A few milestones from my learning journey.</p></div><span className="cert-count">03 CREDENTIALS</span></div><div className="cert-grid">{certificates.map((cert,index)=><article className="cert-card" key={cert.title} style={{'--card-order':index}}><a className="cert-image" href={cert.image} target="_blank" rel="noreferrer" aria-label={`View ${cert.title}`}><img src={cert.image} alt={`${cert.title} certificate`} loading="lazy"/><span>VIEW CERTIFICATE ↗</span></a><div className="cert-info"><div className="cert-meta"><span>{cert.type}</span><span>{cert.date}</span></div><h3>{cert.title}</h3><p className="cert-issuer">{cert.issuer}</p><p className="cert-description">{cert.description}</p></div></article>)}</div></section>
      <section className="contact-section wrap reveal" id="contact"><div className="section-kicker">04 / GET IN TOUCH</div><div className="contact-panel"><div><span className="mini-label">HAVE A QUESTION OR AN IDEA?</span><h2>Let's build<br/><em>something great.</em></h2><p>I'm always interested in learning, connecting, and exploring new opportunities.</p></div><div className="contact-links"><a href="mailto:fadyatef.dev@gmail.com"><span><Icon name="mail"/></span><div><small>EMAIL</small><b>fadyatef.dev@gmail.com</b></div><Icon name="arrow"/></a><a href="tel:+201289755934"><span>☎</span><div><small>PHONE</small><b>+20 128 975 5934</b></div><Icon name="arrow"/></a><a href="https://www.linkedin.com/in/fady-atef-m" target="_blank" rel="noreferrer"><span><Icon name="linkedin"/></span><div><small>LINKEDIN</small><b>Connect with me</b></div><Icon name="arrow"/></a><a href="https://github.com/Fady-ateff" target="_blank" rel="noreferrer"><span><Icon name="github"/></span><div><small>GITHUB</small><b>Fady-ateff</b></div><Icon name="arrow"/></a><a href="https://www.instagram.com/fady3_atef" target="_blank" rel="noreferrer"><span><Icon name="instagram"/></span><div><small>INSTAGRAM</small><b>@fady3_atef</b></div><Icon name="arrow"/></a></div></div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#home" onClick={e=>{e.preventDefault();go('home','Home')}}><img className="brand-logo" src={logo} alt="FA monogram"/><b>Fady Atef</b></a><span>Designed with curiosity. Built with purpose.</span><small>© {new Date().getFullYear()} Fady Atef</small></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
