"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowUp, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  name: string;
  type: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  tags: string[];
  featured?: boolean;
  status?: string;
};

const projects: Project[] = [
  {
    name: "Parcel Cost Calculator",
    type: "iOS learning project",
    status: "SwiftUI learning · Demo asset pending",
    description: "A practical SwiftUI learning project for calculating parcel delivery costs. The source and original screenshot are not present in this repository yet.",
    tags: ["Swift", "SwiftUI", "iOS"],
    featured: true,
  },
  {
    name: "SwiftData learning applications",
    type: "iOS learning project",
    status: "Learning · Demo asset pending",
    description: "Small SwiftData practice builds for learning local persistence in SwiftUI. Source links and screenshots are not present in this repository yet.",
    tags: ["Swift", "SwiftUI", "SwiftData"],
    featured: true,
  },
  {
    name: "Velora",
    type: "Independent product",
    status: "In development · MVP preparation",
    description: "An independently owned dating product in early development, built around a considered full-stack foundation.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Work Bridge Solution",
    type: "Business website",
    description: "A professional business website. Visit the live site to explore the published work.",
    href: "https://www.workbridgesolution.com/",
    tags: ["Website", "Professional work"],
    featured: true,
  },
  {
    name: "Explainable Bearing Fault Diagnosis",
    type: "Final-year research",
    status: "Research · In development",
    description: "Exploring bearing fault diagnosis across four CWRU operating loads and normal, inner race, outer race, and ball fault classes. The work studies 1D-CNN models, SHAP explanations, attribution consistency, physics-guided learning, and cross-load generalization.",
    tags: ["CWRU", "1D-CNN", "SHAP", "Research"],
    featured: true,
  },
  {
    name: "NewZealankans Marketplace",
    type: "Full-stack marketplace",
    description: "Classifieds marketplace built with React, TypeScript, NestJS, Prisma, and PostgreSQL.",
    href: "https://github.com/Dashin-sanjana/New-Zealankanz-Frontend",
    tags: ["React", "NestJS", "Prisma"],
  },
  {
    name: "SL Guide",
    type: "Travel planning",
    description: "A responsive web app for exploring Sri Lanka’s places and culture, with personalized trip planning and booking flows.",
    image: "/assets/sl_guide_preview.png",
    imageAlt: "SL Guide portfolio project preview",
    href: "https://github.com/Dashin-sanjana/SL-GUIDE",
    tags: ["Web app", "Travel"],
  },
  {
    name: "Fably",
    type: "Fashion mobile app",
    description: "AI-assisted fashion app concept for outfit visualizations, personal styling, wardrobe planning, and shopping.",
    image: "/assets/clothes_11605848-removebg-preview.png",
    imageAlt: "Fashion illustration for the Fably project",
    href: "https://github.com/fablypro/Fably",
    tags: ["Mobile", "Fashion"],
  },
  {
    name: "E-Clothing",
    type: "Mobile commerce app",
    description: "Mobile commerce project for browsing products, filtering, purchases, order tracking, and recommendations.",
    image: "/assets/E%20Clothing.png",
    imageAlt: "E-Clothing project image",
    href: "https://github.com/Dashin-sanjana/E-clothing",
    tags: ["Mobile", "Commerce"],
  },
  {
    name: "Plane Management System",
    type: "Management system",
    description: "A system for managing flight timetables, crew rostering, and aircraft maintenance.",
    image: "/assets/airline_12315171-removebg-preview.png",
    imageAlt: "Airplane icon for the Plane Management System",
    href: "https://github.com/Dashin-sanjana/Plane-ticket-management",
    tags: ["Java", "Systems"],
  },
  {
    name: "Student Exam Grade System",
    type: "Education system",
    description: "A platform concept for managing student grades securely and efficiently.",
    image: "/assets/achievement_11300864-removebg-preview.png",
    imageAlt: "Achievement icon for the Student Exam Grade System",
    href: "https://github.com/Dashin-sanjana/Ticketing-System",
    tags: ["Education", "Application"],
  },
  {
    name: "Life Below Water",
    type: "Awareness website",
    description: "An educational website about marine conservation and United Nations Sustainable Development Goal 14.",
    image: "/assets/tide_3408448-removebg-preview.png",
    imageAlt: "Ocean themed illustration for Life Below Water",
    tags: ["Web design", "SDG 14"],
  },
  {
    name: "UI/UX Designs",
    type: "Interface design",
    description: "User interface concepts for web and mobile products, including user flows, wireframes, and visual screens.",
    image: "/assets/website_14654068-removebg-preview.png",
    imageAlt: "Website design icon",
    tags: ["UI/UX", "Design"],
  },
  {
    name: "Personal Expense Tracker",
    type: "Finance web app",
    description: "A responsive income and expense tracker with authentication, live financial records, date and category filters, and Chart.js visualizations.",
    image: "/assets/calculator_12405686.png",
    imageAlt: "Calculator illustration for the Personal Expense Tracker",
    href: "https://github.com/Dashin-sanjana/expense-tracker",
    tags: ["Web app", "Finance"],
  },
];

const skills = [
  { name: "iOS development", items: ["Swift", "SwiftUI", "SwiftData", "Xcode"] },
  { name: "Programming", items: ["Java", "Python", "JavaScript"] },
  { name: "Frontend", items: ["HTML", "CSS", "React"] },
  { name: "Backend", items: ["NestJS"] },
  { name: "Cross-platform", items: ["Flutter"] },
];

const certificates = [
  ["Introduction to Swift", "Simplilearn SkillUp · Completed 21 November 2026", "Certificate holder: K.A Dashin Sanjana · Code: 11062017", "/assets/introduction-to-swift-certificate.pdf"],
  ["Artificial Intelligence Foundations: Machine Learning", "LinkedIn Learning", ""],
  ["Introduction to Web APIs", "LinkedIn Learning", ""],
  ["Learning SQL Programming", "LinkedIn Learning", ""],
  ["Python Data Structures and Algorithms", "LinkedIn Learning", ""],
  ["Python Programming", "University of Moratuwa", ""],
  ["Web Development", "University of Moratuwa", ""],
  ["English Language", "Cambridge School", ""],
];

function AmbientScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    try {
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(root.clientWidth, root.clientHeight);
      renderer.setClearColor(0x000000, 0);
      root.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, root.clientWidth / root.clientHeight, 0.1, 100);
      camera.position.z = 8;
      const positions = new Float32Array(360 * 3);
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 9;
        positions[i + 2] = (Math.random() - 0.5) * 4;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0x8b9d72, size: 0.02, transparent: true, opacity: 0.52, sizeAttenuation: true });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let frame = 0;
      const render = () => {
        points.rotation.y += 0.00038;
        points.rotation.x = Math.sin(performance.now() * 0.00012) * 0.025;
        renderer.render(scene, camera);
        if (!reduced) frame = requestAnimationFrame(render);
      };
      render();
      const resize = () => {
        if (!root.clientWidth || !root.clientHeight) return;
        camera.aspect = root.clientWidth / root.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(root.clientWidth, root.clientHeight);
      };
      window.addEventListener("resize", resize);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch {
      root.classList.add("scene-fallback");
    }
  }, []);

  return <div ref={host} className="ambient-scene" aria-hidden="true" />;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card reveal ${project.featured ? "project-card-featured" : ""}`} style={{ "--card-index": index } as CSSProperties}>
      {project.image ? (
        <div className="project-image"><img src={project.image} alt={project.imageAlt || ""} loading="lazy" /></div>
      ) : (
        <div className={`project-art project-art-${index % 3}`} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
      )}
      <div className="project-body">
        <div className="project-topline"><span>{project.type}</span>{project.status && <span className="status-pill">{project.status}</span>}</div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.href.includes("github") ? "View project" : "Visit website"}<ArrowUpRight size={16} /></a>}
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const filters = ["All work", "iOS & mobile", "Web & research"];
  const visibleProjects = projects.filter((project) => activeFilter === "All work" || (activeFilter === "iOS & mobile" ? /ios|mobile/i.test(project.type) : !/ios|mobile/i.test(project.type)));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(".hero-copy > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.11, ease: "power3.out", delay: 0.15 });
      gsap.fromTo(".hero-portrait", { y: 24, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.28 });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    });
    return () => context.revert();
  }, []);

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".reading-progress");
    if (!bar) return;
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Dashin Sanjana, home">D<span>.</span>S</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {[ ["Work", "work"], ["About", "about"], ["Experience", "experience"], ["Education", "education"], ["Contact", "contact"] ].map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="/assets/Dashin%20sanjana%20updated%20cv.pdf.pdf" download onClick={closeMenu}>Download CV <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <AmbientScene />
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> Aspiring iOS Developer <span className="eyebrow-separator">·</span> Colombo, Sri Lanka</p>
            <h1 id="hero-title">Building the<br /><em>future of iOS.</em></h1>
            <p className="hero-lede">I’m Dashin Sanjana — a Software Engineering undergraduate and software engineer building thoughtful mobile experiences and useful full-stack products.</p>
            <div className="hero-actions"><a href="#work" className="button button-dark">Explore my work <ArrowDownRight size={17} /></a><a href="mailto:dashinsanjana@gmail.com" className="text-link">Let’s talk <ArrowUpRight size={16} /></a></div>
            <div className="hero-footnote"><span>01 / 04</span><span>Swift · SwiftUI · SwiftData</span></div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-frame"><img src="/assets/dashin-sanjana-original.jpg" alt="Dashin Sanjana, in the original photograph he provided" fetchPriority="high" /></div>
            <figcaption><span>Dashin Sanjana</span><span>Software Engineer <i>↗</i></span></figcaption>
            <span className="portrait-index">DS / 2026</span>
          </figure>
          <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><ArrowDown size={16} /><span>Scroll to explore</span></a>
        </section>

        <section className="marquee" aria-label="Focus areas"><div className="marquee-track">{[0, 1].map((copy) => <span key={copy}>SWIFT <b>✳</b> PRODUCT THINKING <b>✳</b> MOBILE EXPERIENCES <b>✳</b> SOFTWARE ENGINEERING <b>✳</b> SWIFTUI <b>✳</b> </span>)}</div></section>

        <section id="about" className="section about-section">
          <div className="section-kicker reveal"><span>01</span><span>About</span></div>
          <div className="about-layout">
            <h2 className="section-title reveal">Curious by nature.<br /><em>Engineer by craft.</em></h2>
            <div className="about-copy reveal"><p>I’m a Software Engineering undergraduate with professional software engineering experience and a growing focus on native iOS development. I’m learning to build considered, accessible mobile applications with Swift, SwiftUI, SwiftData, and Xcode.</p><p>My work also spans web development, Flutter, backend systems, and UI/UX design. I enjoy moving from a problem and a sketch to a working product, with care for the details people notice every day.</p><div className="about-meta"><span>Based in Colombo, Sri Lanka</span><span>Open to junior iOS roles</span></div></div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-kicker reveal"><span>02</span><span>Selected work</span></div>
          <div className="work-heading"><h2 className="section-title reveal">Projects with a<br /><em>purpose.</em></h2><p className="reveal">A mix of product work, learning projects, and research in progress. Each card is clear about what is live, what is learning, and what is still being built.</p></div>
          <div className="filter-row" role="group" aria-label="Filter projects">{filters.map((filter) => <button key={filter} type="button" aria-pressed={activeFilter === filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-kicker reveal"><span>03</span><span>Toolkit</span></div>
          <div className="work-heading"><h2 className="section-title reveal">What I build<br /><em>with.</em></h2><p className="reveal">A focused set of tools I use across native mobile, web, and full-stack work. No percentage scores — just the technologies I’m learning and applying.</p></div>
          <div className="skill-list">{skills.map((group, index) => <div className="skill-row reveal" key={group.name}><span className="skill-index">0{index + 1}</span><h3>{group.name}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div><ArrowUpRight className="skill-arrow" size={20} /></div>)}</div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-kicker reveal"><span>04</span><span>Experience</span></div>
          <div className="work-heading"><h2 className="section-title reveal">Learning through<br /><em>real work.</em></h2><p className="reveal">Professional experience comes first, with design, teaching, and creative work kept in view.</p></div>
          <div className="timeline">
            <article className="timeline-row reveal"><span className="timeline-date">Former</span><div><h3>Associate Software Engineer <span>— Zentrode</span></h3><p>Professional software engineering experience. Employment dates and role details are left general until confirmed.</p></div><span className="timeline-mark">01</span></article>
            <article className="timeline-row reveal"><span className="timeline-date">2025 — 2026</span><div><h3>Software Engineering Intern <span>— I O N Groups Pvt Ltd</span></h3><p>Software engineering internship experience in a professional team environment.</p></div><span className="timeline-mark">02</span></article>
            <article className="timeline-row reveal"><span className="timeline-date">Experience</span><div><h3>UI/UX Designer</h3><p>Designed and enhanced web and mobile interfaces, collaborating with developers on usability and implementation.</p></div><span className="timeline-mark">03</span></article>
          </div>
          <div className="secondary-experience reveal"><span>Also</span><p>Freelance Video Editor <b>2022 — Present</b></p><p>Online Mathematics Tutor <b>2023 — Present</b></p></div>
        </section>

        <section id="education" className="section education-section">
          <div className="section-kicker reveal"><span>05</span><span>Education</span></div>
          <div className="work-heading"><h2 className="section-title reveal">Always in<br /><em>progress.</em></h2><p className="reveal">Two undergraduate paths, both currently in progress, alongside a strong foundation in mathematics and science.</p></div>
          <div className="education-list">
            <article className="education-row reveal"><span>2023 — 2027</span><div><h3>University of Westminster</h3><p>BSc (Hons) Software Engineering · In Progress</p></div><span>01</span></article>
            <article className="education-row reveal"><span>2024 — 2027</span><div><h3>University of Sri Jayewardenepura</h3><p>BSc (Hons) Applied Science · In Progress</p></div><span>02</span></article>
            <article className="education-row reveal"><span>2022</span><div><h3>G/Dharmashoka College</h3><p>GCE Advanced Level · Combined Mathematics (B), Chemistry (B), Physics (C)</p></div><span>03</span></article>
          </div>
        </section>

        <section id="certifications" className="section certificate-section">
          <div className="section-kicker reveal"><span>06</span><span>Certificates & learning</span></div>
          <div className="work-heading"><h2 className="section-title reveal">Keep learning.<br /><em>Keep building.</em></h2><p className="reveal">Course certificates, competitions, and practical training are shown separately.</p></div>
          <div className="certificate-grid">{certificates.map(([name, issuer, detail, link], index) => <article key={name} className="certificate-card reveal"><span className="certificate-no">{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{issuer}</p>{detail && <small>{detail}</small>}{link && <a href={link} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={15} /></a>}</article>)}</div>
          <div className="learning-grid">
            <article className="learning-card reveal"><span>Completed practical training</span><h3>Getting Started with Scrumdinger</h3><p>Apple Developer · Hands-on SwiftUI application training. This is not a professional certificate.</p><a href="https://developer.apple.com/tutorials/app-dev-training/getting-started-with-scrumdinger" target="_blank" rel="noreferrer">Open Apple training <ArrowUpRight size={15} /></a></article>
            <article className="learning-card reveal"><span>Competitions & participation</span><h3>Hackathons and challenges</h3><p>AlgoXplore 1.0 · NSBM Green University<br />Haxpedition Mini Hackathon 2024 · IIT IEEE Branch<br />Quora 2023 Quiz Competition · University of Sri Jayewardenepura</p></article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-kicker reveal"><span>07</span><span>Contact</span></div>
          <div className="contact-main"><div className="reveal"><h2>Have a good<br /><em>problem to solve?</em></h2><p>I’m open to junior iOS opportunities, thoughtful collaborations, and conversations about building useful software.</p></div><div className="contact-links reveal"><a href="mailto:dashinsanjana@gmail.com">Email me <ArrowUpRight size={17} /></a><a href="https://github.com/Dashin-sanjana" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a><a href="https://www.linkedin.com/in/dashinsanjana-kaluarachchi" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} /></a><a href="/assets/Dashin%20sanjana%20updated%20cv.pdf.pdf" download>Download my CV <ArrowUpRight size={17} /></a></div></div>
          <div className="contact-bottom"><a className="wordmark" href="#top">D<span>.</span>S</a><span>© 2026 Dashin Sanjana</span><a href="#top">Back to top <ArrowUp size={14} /></a></div>
        </section>
      </main>
    </>
  );
}
