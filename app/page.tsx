"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, Menu, X, Download, Smartphone, Code2, Globe2, Sparkles, ExternalLink, Check, ChevronRight } from "lucide-react";

type Project = { num: string; name: string; type: string; summary: string; stack: string[]; image?: string; link?: string; status: string; accent: string };
const projects: Project[] = [
  { num:"01", name:"Velora", type:"Independent product · Mobile-first", summary:"A premium dating platform designed around meaningful connections, privacy-minded onboarding and a refined mobile experience. MVP and public-beta preparation in progress.", stack:["Next.js","TypeScript","Prisma","PostgreSQL"], status:"In development", accent:"rose" },
  { num:"02", name:"Bearing Fault Diagnosis", type:"Final-year research · Explainable AI", summary:"Researching explainable machine learning for electric motor bearing fault diagnosis across four operating loads, combining a 1D-CNN with attribution consistency and physics-guided learning.", stack:["Python","1D-CNN","SHAP","Machine Learning"], status:"Research in progress", accent:"blue" },
  { num:"03", name:"Work Bridge Solution", type:"Business website · Real-world delivery", summary:"Professional business website for a Sri Lankan manpower and staffing services company, designed to make services and business enquiries easy to find.", stack:["Web Development","Responsive UI","Business Website"], image:"/project-workbridge-placeholder.svg", link:"https://www.workbridgesolution.com/", status:"Website delivered", accent:"mint" },
  { num:"04", name:"NewZealankans Marketplace", type:"Full-stack marketplace", summary:"Classifieds marketplace with authentication, moderation, image uploads, search filters, admin tools and SEO-oriented pages.", stack:["React","TypeScript","NestJS","Prisma"], image:"/project-newzealankanz.jpg", link:"https://github.com/Dashin-sanjana/New-Zealankanz-Frontend", status:"Project", accent:"mint" },
  { num:"05", name:"SL Guide", type:"Travel planning platform", summary:"Tour discovery and travel-planning experience built around exploring Sri Lanka and planning more personalized journeys.", stack:["Web Development","UI/UX","Travel"], image:"/project-sl-guide.png", link:"https://github.com/Dashin-sanjana/SL-GUIDE", status:"Project", accent:"blue" },
  { num:"06", name:"Fably", type:"AI fashion · Mobile", summary:"AI-powered fashion application exploring wardrobe planning, outfit visualization and personalized styling.", stack:["Mobile Development","AI","Product Design"], image:"/project-fably.png", link:"https://github.com/fablypro/Fably", status:"Project", accent:"rose" },
  { num:"07", name:"E-Clothing", type:"Mobile commerce", summary:"Shopping application concept with browsing, filtering, checkout flows, order tracking and recommendations.", stack:["Mobile","E-commerce","UI/UX"], image:"/project-e-clothing.png", status:"Project", accent:"purple" },
  { num:"08", name:"Expense Tracker", type:"Finance dashboard", summary:"Personal finance tool for tracking income, expenses and visual summaries.", stack:["Web","Dashboard","Chart.js"], image:"/project-expense-tracker.png", status:"Project", accent:"mint" },
  { num:"09", name:"Plane Management System", type:"Operations software", summary:"Airline operations management covering scheduling, crew, tickets and maintenance records.", stack:["Software Engineering","Operations"], image:"/project-plane-management.png", status:"Project", accent:"blue" },
  { num:"10", name:"Student Exam Grade System", type:"Education software", summary:"Academic grade records and calculation workflows.", stack:["Software Engineering","Education"], image:"/project-grade-system.png", status:"Project", accent:"purple" },
  { num:"11", name:"Life Below Water", type:"Educational website", summary:"Visual storytelling and educational content about SDG 14 and marine conservation.", stack:["HTML","CSS","Web"], image:"/project-life-below-water.png", status:"Project", accent:"mint" },
  { num:"12", name:"UI/UX Designs", type:"Product design", summary:"Interface exploration across web and mobile experiences.", stack:["Figma","UI/UX","Design"], image:"/project-ui-ux.png", status:"Design work", accent:"rose" },
];

const certifications = [
  ["Introduction to Swift", "Simplilearn SkillUp", "21 Nov 2026 · Certificate code 11062017"],
  ["Artificial Intelligence Foundations: Machine Learning", "LinkedIn Learning", "Professional learning"],
  ["Introduction to Web APIs", "LinkedIn Learning", "Professional learning"],
  ["Learning SQL Programming", "LinkedIn Learning", "Professional learning"],
  ["Python Data Structures and Algorithms", "LinkedIn Learning", "Professional learning"],
  ["Python Programming", "University of Moratuwa", "Certificate"],
  ["Web Development", "University of Moratuwa", "Certificate"],
  ["English Language", "Cambridge School", "Certificate"],
];

const experience = [
  { role:"Associate Software Engineer", org:"Zentrode", date:"2026 · Former role", desc:"Professional software engineering experience spanning feature delivery, implementation, debugging and collaborative product development." },
  { role:"Software Engineering Intern", org:"I O N Groups Pvt Ltd", date:"2025 — 2026", desc:"Built practical experience in software development workflows, full-stack implementation and engineering collaboration." },
  { role:"UI/UX Design", org:"Independent design work", date:"Selected experience", desc:"Designing usable interfaces across web and mobile products with attention to consistency and interaction." },
];

function Orb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | undefined;
    let disposed = false;
    const init = async () => {
      const THREE = await import("three");
      if (disposed || !el) return;
      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.z = 7.2;
        renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
        const group = new THREE.Group(); scene.add(group);
        const geo = new THREE.IcosahedronGeometry(2, 5);
        const mat = new THREE.MeshBasicMaterial({ color: 0x70b7ff, wireframe: true, transparent: true, opacity: 0.24 });
        const mesh = new THREE.Mesh(geo, mat); group.add(mesh);
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.52, 2), new THREE.MeshBasicMaterial({ color: 0x7c6bff, wireframe: true, transparent: true, opacity: 0.12 })); group.add(core);
        const stars = new Float32Array(360 * 3);
        for (let i=0;i<360;i++){ const t=i*2.399963229728653; const z=1-2*(i+.5)/360; const rad=Math.sqrt(1-z*z); const rr=2.65+(i%7)*.13; stars[i*3]=rr*rad*Math.cos(t);stars[i*3+1]=rr*rad*Math.sin(t);stars[i*3+2]=rr*z; }
        const particles = new THREE.BufferGeometry();
        particles.setAttribute("position",new THREE.BufferAttribute(stars,3));
        const points = new THREE.Points(particles,new THREE.PointsMaterial({color:0x74c8ff,size:0.025,transparent:true,opacity:.65}));group.add(points);
        const resize=()=>{if(!el||!renderer)return;const r=el.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};
        resize();window.addEventListener("resize",resize);
        const draw=()=>{if(disposed)return;if(!reduceMotion){group.rotation.y+=.0017;group.rotation.x+=.0005;}renderer?.render(scene,camera);if(!reduceMotion)raf=requestAnimationFrame(draw);};draw();
        return ()=>{window.removeEventListener("resize",resize);geo.dispose();mat.dispose();core.geometry.dispose();(core.material as import("three").Material).dispose();particles.dispose();(points.material as import("three").Material).dispose();renderer?.dispose();};
      } catch { el.style.display="none"; }
    };
    let cleanup:(()=>void)|undefined;
    init().then(fn=>{if(disposed)fn?.();else cleanup=fn;});
    return ()=>{disposed=true;cancelAnimationFrame(raf);cleanup?.();};
  },[]);
  return <canvas ref={canvasRef} className="orb-canvas" aria-hidden="true"/>;
}

function RevealReady() {
  useEffect(() => {
    let disposed=false;
    let cleanup:(()=>void)|undefined;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced)return;
    Promise.all([import("gsap"),import("gsap/ScrollTrigger")]).then(([g,s])=>{
      if(disposed)return;
      const gsap=g.gsap; const ScrollTrigger=s.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx=gsap.context(()=>{
        gsap.fromTo(".hero-anim",{y:38,opacity:0},{y:0,opacity:1,duration:1.05,stagger:.12,ease:"power3.out",delay:.12});
        gsap.utils.toArray<HTMLElement>(".reveal").forEach(el=>{
          gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:.9,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}});
        });
        gsap.to(".hero-photo-shell",{y:-34,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
      });
      cleanup=()=>ctx.revert();
    });
    return ()=>{disposed=true;cleanup?.();};
  },[]);
  return null;
}

export default function Home() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [showAll,setShowAll]=useState(false);
  const visible=showAll?projects:projects.slice(0,6);
  const close=()=>setMenuOpen(false);
  return <main id="top">
    <RevealReady/>
    <div className="noise" aria-hidden="true"/>
    <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
    <header className="topbar container">
      <a className="brand" href="#top" aria-label="Dashin Sanjana home"><span className="brand-mark">D<span>.</span></span><span className="brand-type">DASHIN<span> / DEV</span></span></a>
      <nav className={menuOpen?"nav-links open":"nav-links"} aria-label="Main navigation">
        <a onClick={close} href="#work">Work</a><a onClick={close} href="#expertise">Expertise</a><a onClick={close} href="#journey">Journey</a><a onClick={close} href="#credentials">Credentials</a><a onClick={close} href="#contact">Contact</a>
      </nav>
      <a className="top-cta" href="mailto:dashinsanjana@gmail.com">Let’s connect <ArrowUpRight size={15}/></a>
      <button className="menu-btn" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-eyebrow hero-anim"><span className="signal"/><span>SWIFT FIRST. ENGINEERED WITH PURPOSE.</span><span className="hero-index">PORTFOLIO / 2026</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker hero-anim"><span className="bracket">[</span> iOS DEVELOPER IN THE MAKING <span className="bracket">]</span></div>
          <h1 className="hero-title hero-anim" id="hero-title">I build<br/><em>what’s next<span className="dot">.</span></em></h1>
          <p className="hero-description hero-anim">Hey, I’m <strong>Dashin Sanjana</strong> — a software engineer and aspiring iOS developer crafting thoughtful digital experiences with <span>Swift, SwiftUI and SwiftData.</span></p>
          <div className="hero-actions hero-anim"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={18}/></a><a className="button button-ghost" href="/Dashin%20sanjana%20updated%20cv.pdf.pdf" download>Download CV <Download size={17}/></a></div>
          <div className="hero-foot hero-anim"><span><span className="line"/><strong>SWIFT / SWIFTUI</strong><small>Native iOS focus</small></span><span><span className="line"/><strong>FULL-STACK</strong><small>Production perspective</small></span></div>
        </div>
        <div className="hero-art hero-anim">
          <Orb/>
          <div className="hero-photo-shell"><div className="photo-backdrop"/><img src="/profile-dashin.png" alt="Portrait of Dashin Sanjana" className="hero-photo"/><span className="photo-outline"/></div>
          <div className="float-label label-swift"><span className="mono">01 / SPECIALIZATION</span><strong>iOS Development</strong><span>Swift · SwiftUI · SwiftData</span></div>
          <div className="float-label label-code"><Code2 size={17}/><span>DESIGN × ENGINEERING</span></div>
          <div className="orbit-small orbit-a"/><div className="orbit-small orbit-b"/>
        </div>
      </div>
      <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><div className="scroll-track"><span/></div><span>BASED IN SRI LANKA <span className="blue-dot">✦</span> BUILDING FOR EVERYWHERE</span></div>
    </section>
    <section className="marquee-section" aria-label="Areas of expertise"><div className="marquee"><div className="marquee-content">SWIFT <span>✳</span> SWIFTUI <span>✳</span> SWIFTDATA <span>✳</span> REACT <span>✳</span> NESTJS <span>✳</span> FLUTTER <span>✳</span> PYTHON <span>✳</span> MOBILE ENGINEERING <span>✳</span> SWIFT <span>✳</span> SWIFTUI <span>✳</span> SWIFTDATA <span>✳</span> REACT <span>✳</span> NESTJS <span>✳</span> FLUTTER <span>✳</span> PYTHON <span>✳</span> MOBILE ENGINEERING <span>✳</span></div></div></section>
    <section id="work" className="section work-section container">
      <div className="section-top reveal"><span className="eyelabel">01 / SELECTED WORK</span><span className="section-dash"/></div>
      <div className="section-heading reveal"><h2>Proof in the<br/><em>projects.</em></h2><p>From mobile-first products to full-stack systems and explainable AI research — selected work, built with intent.</p></div>
      <div className="project-grid">{visible.map((p,i)=><article className={"project-card reveal "+(i===0?"project-feature":"")} key={p.num}>
        <div className={"project-visual tone-"+p.accent}>
          {p.image?<img src={p.image} alt={p.name+" project preview"} loading="lazy"/>:<div className={"project-art art-"+p.accent}>{p.num==="01"?<div className="velora-art"><span className="v-heart">♡</span><span>VELORA</span><small>Connections, thoughtfully made.</small></div>:<div className="research-art"><span className="research-caption">SIGNAL / ANALYSIS</span><svg viewBox="0 0 540 180" role="img" aria-label="Stylized diagnostic signal wave"><path d="M0 90 Q25 90 40 44 T85 100 T130 72 T175 110 T220 65 T265 88 T310 40 T355 120 T400 58 T445 98 T490 70 T540 90" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M0 90 Q25 90 40 44 T85 100 T130 72 T175 110 T220 65 T265 88 T310 40 T355 120 T400 58 T445 98 T490 70 T540 90" fill="none" stroke="currentColor" strokeWidth="15" opacity=".08"/></svg><span>EXPLAINABLE AI <i>↗</i></span></div>}</div>}
          <div className="project-visual-top"><span>{p.num} / {p.type}</span><span className="project-arrow"><MoveUpRight size={19}/></span></div>
          <span className="project-status">{p.status}</span>
        </div>
        <div className="project-copy"><div><span className="project-sub">{p.type}</span><h3>{p.name}</h3><p>{p.summary}</p><div className="chips">{p.stack.map(x=><span key={x}>{x}</span>)}</div></div>{p.link?<a className="project-link" href={p.link} target="_blank" rel="noreferrer" aria-label={"Open "+p.name}><ArrowUpRight size={21}/></a>:<span className="project-link muted" title="Public project link not available"><ArrowUpRight size={21}/></span>}</div>
      </article>)}</div>
      <div className="work-footer reveal"><span>SELECTED WORK / {visible.length.toString().padStart(2,"0")} OF {projects.length.toString().padStart(2,"0")}</span><button className="text-button" onClick={()=>setShowAll(!showAll)}>{showAll?"Show selected projects":"View all projects"} <ChevronRight size={18}/></button></div>
    </section>
    <section id="expertise" className="section expertise-section"><div className="container">
      <div className="section-top reveal"><span className="eyelabel">02 / THE TOOLKIT</span><span className="section-dash"/></div>
      <div className="section-heading reveal"><h2>Native by focus.<br/><em>Versatile by nature.</em></h2><p>One core direction — building for the Apple ecosystem — supported by a practical software engineering foundation.</p></div>
      <div className="expertise-layout">
        <div className="ios-panel reveal"><div className="ios-panel-top"><span className="ios-mini">PRIMARY SPECIALIZATION</span><Smartphone size={25}/></div><div className="ios-glyph">S<span>W</span></div><h3>iOS<br/><em>Development.</em></h3><p>Thoughtful native app interfaces, data-driven workflows and Swift-centered engineering.</p><div className="ios-tags"><span>Swift</span><span>SwiftUI</span><span>SwiftData</span><span>Xcode</span></div><span className="ios-panel-index">01 / CORE FOCUS</span></div>
        <div className="skills-side reveal">
          <div className="skill-row"><div className="skill-no">02</div><div><h3>Programming</h3><p>Java <span>·</span> Python <span>·</span> JavaScript</p></div><Code2 size={24}/></div>
          <div className="skill-row"><div className="skill-no">03</div><div><h3>Frontend</h3><p>HTML <span>·</span> CSS <span>·</span> React</p></div><Globe2 size={24}/></div>
          <div className="skill-row"><div className="skill-no">04</div><div><h3>Backend</h3><p>NestJS <span>·</span> REST APIs <span>·</span> Databases</p></div><Code2 size={24}/></div>
          <div className="skill-row"><div className="skill-no">05</div><div><h3>Cross-platform</h3><p>Flutter <span>·</span> Mobile UI</p></div><Smartphone size={24}/></div>
          <div className="skills-note"><Sparkles size={17}/><span>Learning continuously. Building intentionally.</span></div>
        </div>
      </div>
      <div className="training-panel reveal"><div><span className="eyelabel">PRACTICAL iOS TRAINING</span><h3>Scrumdinger <span>↗</span></h3><p>Completed Apple’s “Getting Started with Scrumdinger” app development tutorial. Hands-on SwiftUI training — not represented as an Apple certification.</p></div><a href="https://developer.apple.com/tutorials/app-dev-training/getting-started-with-scrumdinger" target="_blank" rel="noreferrer" className="round-link" aria-label="Open Apple Developer Scrumdinger tutorial"><ExternalLink size={20}/></a></div>
    </div></section>
    <section id="journey" className="section journey-section container">
      <div className="section-top reveal"><span className="eyelabel">03 / THE JOURNEY</span><span className="section-dash"/></div>
      <div className="section-heading reveal"><h2>Experience that<br/><em>shapes the work.</em></h2><p>A foundation in software engineering, product delivery and user-centered design.</p></div>
      <div className="timeline">{experience.map((e,i)=><div className="timeline-item reveal" key={e.role}><div className="timeline-marker"><span>{String(i+1).padStart(2,"0")}</span></div><div className="timeline-body"><div className="timeline-head"><h3>{e.role}</h3><span>{e.date}</span></div><h4>{e.org}</h4><p>{e.desc}</p></div></div>)}</div>
      <div className="education-wrap reveal"><span className="eyelabel">ACADEMIC FOUNDATION</span><div className="education-grid"><div><strong>University of Westminster</strong><span>BSc (Hons) Software Engineering</span><small>2023 — 2027 · In progress</small></div><div><strong>University of Sri Jayewardenepura</strong><span>BSc (Hons) Applied Science</span><small>2024 — 2027 · In progress</small></div></div></div>
    </section>
    <section id="credentials" className="section credentials-section"><div className="container"><div className="section-top reveal"><span className="eyelabel">04 / LEARNING & CREDENTIALS</span><span className="section-dash"/></div><div className="section-heading reveal"><h2>Always<br/><em>in progress.</em></h2><p>Evidence of learning, from Swift fundamentals to APIs and machine learning.</p></div><div className="cert-grid">{certifications.map((c,i)=><div className="cert-card reveal" key={c[0]}><span className="cert-no">{String(i+1).padStart(2,"0")}</span><div><h3>{c[0]}</h3><p>{c[1]}</p><small>{c[2]}</small></div><Check size={18}/></div>)}</div><p className="credentials-disclaimer">Credentials shown as listed in the existing portfolio and the supplied Swift completion certificate. Verification links can be added when available.</p></div></section>
    <section id="contact" className="contact-section"><div className="container"><div className="contact-top reveal"><span className="eyelabel">05 / LET’S CREATE SOMETHING</span><span>OPEN TO iOS DEVELOPER OPPORTUNITIES</span></div><h2 className="reveal">Have a project<br/>in <em>mind?</em> <a href="mailto:dashinsanjana@gmail.com" aria-label="Email Dashin Sanjana"><ArrowUpRight aria-hidden size={55}/></a></h2><div className="contact-bottom reveal"><p>From early product thinking to usable software.<br/>Let’s make something worth opening.</p><div className="socials"><a href="https://github.com/Dashin-sanjana" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="https://www.linkedin.com/in/dashinsanjana-kaluarachchi" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href="mailto:dashinsanjana@gmail.com"><Mail size={17}/> Email</a></div></div></div></section>
    <footer className="footer container"><span>© {new Date().getFullYear()} DASHIN SANJANA</span><span>DESIGNED WITH INTENTION. BUILT WITH CODE.</span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
