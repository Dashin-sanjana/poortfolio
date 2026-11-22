"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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
  imageFit?: "contain" | "cover";
  visual?: "calculator" | "swiftdata" | "velora" | "bridge" | "bearing" | "marketplace" | "travel" | "fashion" | "clothing" | "airline" | "grades" | "ocean" | "design" | "finance";
  href?: string;
  linkLabel?: string;
  tags: string[];
  featured?: boolean;
  status?: string;
};

const projects: Project[] = [
  {
    name: "Parcel Cost Calculator",
    type: "iOS learning project",
    visual: "calculator",
    status: "SwiftUI learning · Demo asset pending",
    description: "A practical SwiftUI learning project for calculating parcel delivery costs. The source and original screenshot are not present in this repository yet.",
    tags: ["Swift", "SwiftUI", "iOS"],
    featured: true,
  },
  {
    name: "SwiftData learning applications",
    type: "iOS learning project",
    visual: "swiftdata",
    status: "Learning · Demo asset pending",
    description: "Small SwiftData practice builds for learning local persistence in SwiftUI. Source links and screenshots are not present in this repository yet.",
    tags: ["Swift", "SwiftUI", "SwiftData"],
    featured: true,
  },
  {
    name: "Velora",
    type: "Independent product",
    visual: "velora",
    status: "In development · MVP preparation",
    description: "An independently owned dating product in early development, built around a considered full-stack foundation.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Work Bridge Solution",
    type: "Business website",
    visual: "bridge",
    description: "A professional business website. Visit the live site to explore the published work.",
    href: "https://www.workbridgesolution.com/",
    linkLabel: "Visit website",
    tags: ["Website", "Professional work"],
    featured: true,
  },
  {
    name: "Explainable Bearing Fault Diagnosis",
    type: "Final-year research",
    visual: "bearing",
    status: "Research · In development",
    description: "Exploring bearing fault diagnosis across four CWRU operating loads and normal, inner race, outer race, and ball fault classes. The work studies 1D-CNN models, SHAP explanations, attribution consistency, physics-guided learning, and cross-load generalization.",
    tags: ["CWRU", "1D-CNN", "SHAP", "Research"],
    featured: true,
  },
  {
    name: "NewZealankans Marketplace",
    type: "Full-stack marketplace",
    visual: "marketplace",
    description: "Classifieds marketplace built with React, TypeScript, NestJS, Prisma, and PostgreSQL.",
    href: "https://new-zealankanz-frontend.vercel.app",
    linkLabel: "View live project",
    tags: ["React", "NestJS", "Prisma"],
  },
  {
    name: "SL Guide",
    type: "Travel planning",
    description: "A responsive web app for exploring Sri Lanka’s places and culture, with personalized trip planning and booking flows.",
    visual: "travel",
    tags: ["Web app", "Travel"],
  },
  {
    name: "Fably",
    type: "Fashion mobile app",
    description: "AI-assisted fashion app concept for outfit visualizations, personal styling, wardrobe planning, and shopping.",
    visual: "fashion",
    href: "https://fably.pro",
    linkLabel: "Visit website",
    tags: ["Mobile", "Fashion"],
  },
  {
    name: "E-Clothing",
    type: "Mobile commerce app",
    description: "Mobile commerce project for browsing products, filtering, purchases, order tracking, and recommendations.",
    visual: "clothing",
    tags: ["Mobile", "Commerce"],
  },
  {
    name: "Plane Management System",
    type: "Management system",
    description: "A system for managing flight timetables, crew rostering, and aircraft maintenance.",
    visual: "airline",
    tags: ["Java", "Systems"],
  },
  {
    name: "Student Exam Grade System",
    type: "Education system",
    description: "A platform concept for managing student grades securely and efficiently.",
    visual: "grades",
    tags: ["Education", "Application"],
  },
  {
    name: "Life Below Water",
    type: "Awareness website",
    description: "An educational website about marine conservation and United Nations Sustainable Development Goal 14.",
    visual: "ocean",
    tags: ["Web design", "SDG 14"],
  },
  {
    name: "UI/UX Designs",
    type: "Interface design",
    description: "User interface concepts for web and mobile products, including user flows, wireframes, and visual screens.",
    visual: "design",
    tags: ["UI/UX", "Design"],
  },
  {
    name: "Personal Expense Tracker",
    type: "Finance web app",
    description: "A responsive income and expense tracker with authentication, live financial records, date and category filters, and Chart.js visualizations.",
    visual: "finance",
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

const storyScenes = [
  { id: "stand", number: "01", title: "Start with an idea", detail: "I begin by getting clear on the problem and what the experience should feel like.", label: "A NEW PROJECT" },
  { id: "code", number: "02", title: "Settle in and build", detail: "Then I get into the code—building the interface, connecting the pieces, and working through the details.", label: "IN THE FLOW" },
  { id: "finish", number: "03", title: "Share what I made", detail: "When the work is ready, I bring it together, share the result, and enjoy that final little win.", label: "PROJECT COMPLETE" },
];

function ScrollBackdrop() {
  return (
    <div className="portfolio-scroll-backdrop" aria-hidden="true">
      <div className="portfolio-character-wrap">
        <span className="ambient-orbit ambient-orbit-one" />
        <span className="ambient-orbit ambient-orbit-two" />
        <span className="ambient-orbit ambient-orbit-three" />
        <img className="portfolio-character" src="/assets/dashin-cinematic-developer.png" alt="" fetchPriority="high" />
      </div>
    </div>
  );
}

function ScrollStory() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-chapter").forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveScene(index),
          onEnterBack: () => setActiveScene(index),
        });
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section className="story-section" aria-labelledby="story-title">
      <div className="story-heading">
        <p className="section-kicker"><span>01</span><span>A little about how I work</span></p>
        <h2 id="story-title">Scroll through<br /><em>my process.</em></h2>
      </div>
      <div className="story-chapters">
          {storyScenes.map((item, index) => (
            <article className={`story-chapter${activeScene === index ? " is-active" : ""}`} key={item.id} aria-current={activeScene === index ? "step" : undefined}>
              <span className="story-chapter-number">{item.number} / 03</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
      </div>
    </section>
  );
}

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
      const material = new THREE.PointsMaterial({ color: 0xff7135, size: 0.02, transparent: true, opacity: 0.58, sizeAttenuation: true });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const ribbonGroup = new THREE.Group();
      const ribbonGeometries: THREE.BufferGeometry[] = [];
      const ribbonMaterials: THREE.LineBasicMaterial[] = [];
      for (let band = 0; band < 3; band += 1) {
        const segments = 180;
        const ribbonPositions = new Float32Array((segments + 1) * 3);
        const radius = 1.9 + band * 0.34;
        for (let segment = 0; segment <= segments; segment += 1) {
          const angle = (segment / segments) * Math.PI * 2;
          ribbonPositions[segment * 3] = Math.cos(angle) * radius;
          ribbonPositions[segment * 3 + 1] = Math.sin(angle) * radius * 0.68 + Math.sin(angle * 3 + band) * 0.11;
          ribbonPositions[segment * 3 + 2] = Math.sin(angle * 2 + band * 0.7) * 0.12;
        }
        const ribbonGeometry = new THREE.BufferGeometry();
        ribbonGeometry.setAttribute("position", new THREE.BufferAttribute(ribbonPositions, 3));
        const ribbonMaterial = new THREE.LineBasicMaterial({
          color: 0xff7135,
          transparent: true,
          opacity: 0.17 - band * 0.035,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        ribbonGeometries.push(ribbonGeometry);
        ribbonMaterials.push(ribbonMaterial);
        ribbonGroup.add(new THREE.LineLoop(ribbonGeometry, ribbonMaterial));
      }
      scene.add(ribbonGroup);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const placeRibbons = () => {
        ribbonGroup.position.set(root.clientWidth < 680 ? 0.15 : 1.25, 0, -0.65);
      };
      placeRibbons();
      let frame = 0;
      const render = () => {
        const time = performance.now() * 0.001;
        points.rotation.y = time * 0.026;
        points.rotation.x = Math.sin(time * 0.35) * 0.045;
        points.position.x = Math.sin(time * 0.2) * 0.13;
        ribbonGroup.rotation.z = time * 0.045;
        ribbonGroup.rotation.x = Math.sin(time * 0.28) * 0.09;
        ribbonGroup.position.y = Math.sin(time * 0.32) * 0.12;
        renderer.render(scene, camera);
        if (!reduced) frame = requestAnimationFrame(render);
      };
      render();
      const resize = () => {
        if (!root.clientWidth || !root.clientHeight) return;
        camera.aspect = root.clientWidth / root.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(root.clientWidth, root.clientHeight);
        placeRibbons();
      };
      window.addEventListener("resize", resize);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        ribbonGeometries.forEach((ribbonGeometry) => ribbonGeometry.dispose());
        ribbonMaterials.forEach((ribbonMaterial) => ribbonMaterial.dispose());
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
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(x - 0.5) * 3}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(0.5 - y) * 3}deg`);
    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
  };
  const resetPointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article className={`project-card reveal ${project.featured ? "project-card-featured" : ""}`} style={{ "--card-index": index } as CSSProperties} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      {project.image ? (
        <div className={`project-image image-fit-${project.imageFit || "cover"}`}><img src={project.image} alt={project.imageAlt || ""} loading="lazy" /></div>
      ) : (
        <ProjectArtwork kind={project.visual || "marketplace"} />
      )}
      <div className="project-body">
        <div className="project-topline"><span>{project.type}</span>{project.status && <span className="status-pill">{project.status}</span>}</div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel || "View live project"}<ArrowUpRight size={16} /></a>}
      </div>
    </article>
  );
}

function ProjectArtwork({ kind }: { kind: NonNullable<Project["visual"]> }) {
  return (
    <div className={`project-art project-art-${kind}`} aria-hidden="true">
      <span className="art-label">PROJECT VISUAL · {kind === "bearing" ? "RESEARCH" : "PRODUCT"}</span>
      <svg viewBox="0 0 600 330" role="presentation" focusable="false">
        {kind === "calculator" && <>
          <rect x="270" y="28" width="270" height="274" rx="18" className="art-panel" />
          <text x="296" y="69" className="art-eyebrow">PARCEL ESTIMATE</text>
          <text x="296" y="125" className="art-value">LKR 1,250</text>
          <text x="296" y="153" className="art-muted">Delivery cost · 2.4 kg</text>
          <path d="M296 183h218" className="art-rule" />
          {[0, 1, 2].map((n) => <g key={n}><rect x="296" y={202 + n * 26} width="34" height="16" rx="5" className="art-chip" /><rect x={342 + n * 47} y={202 + n * 26} width={38 + n * 8} height="5" rx="3" className="art-line" /></g>)}
          <circle cx="126" cy="171" r="75" className="art-orbit" /><path d="M82 171h88M126 127v88" className="art-accent-stroke" />
          <text x="99" y="185" className="art-symbol">₹</text>
        </>}
        {kind === "swiftdata" && <>
          <rect x="197" y="13" width="204" height="303" rx="29" className="art-phone" />
          <rect x="209" y="28" width="180" height="274" rx="20" className="art-screen" />
          <rect x="270" y="36" width="58" height="8" rx="4" className="art-notch" />
          <text x="230" y="80" className="art-eyebrow">LIBRARY</text><text x="230" y="108" className="art-title">Saved items</text>
          {[0, 1, 2].map((n) => <g key={n}><rect x="225" y={126 + n * 51} width="148" height="42" rx="10" className="art-row" /><circle cx="245" cy={147 + n * 51} r="9" className="art-accent-fill" /><rect x="263" y={139 + n * 51} width="76" height="5" rx="3" className="art-line" /><rect x="263" y={149 + n * 51} width="51" height="4" rx="2" className="art-dim-line" /></g>)}
          <circle cx="135" cy="171" r="45" className="art-orbit" /><path d="M119 171h32M135 155v32" className="art-accent-stroke" />
        </>}
        {kind === "velora" && <>
          <rect x="331" y="29" width="202" height="268" rx="18" className="art-panel" />
          <circle cx="432" cy="117" r="59" className="art-avatar art-avatar-one" />
          <circle cx="432" cy="97" r="20" className="art-avatar-face" /><path d="M393 153c8-34 70-34 78 0" className="art-avatar-body" />
          <text x="365" y="207" className="art-title">A little closer.</text><rect x="366" y="225" width="132" height="6" rx="3" className="art-dim-line" />
          <rect x="365" y="252" width="65" height="24" rx="12" className="art-button" /><rect x="438" y="252" width="60" height="24" rx="12" className="art-row" />
          <rect x="67" y="78" width="157" height="199" rx="16" className="art-card-back" /><circle cx="145" cy="150" r="42" className="art-avatar art-avatar-two" /><path d="M113 225c8-28 56-28 64 0" className="art-avatar-body" />
          <circle cx="145" cy="127" r="15" className="art-avatar-face" />
        </>}
        {kind === "bridge" && <>
          <rect x="48" y="41" width="503" height="247" rx="15" className="art-panel" />
          <path d="M48 78h503" className="art-rule" /><circle cx="72" cy="60" r="4" className="art-dot" /><circle cx="88" cy="60" r="4" className="art-dot" /><circle cx="104" cy="60" r="4" className="art-dot" />
          <text x="82" y="119" className="art-eyebrow">WORK BRIDGE SOLUTION</text><text x="82" y="161" className="art-title">Connecting people</text><text x="82" y="190" className="art-title">with opportunity.</text>
          <rect x="82" y="214" width="94" height="27" rx="13" className="art-button" /><rect x="190" y="224" width="112" height="5" rx="3" className="art-dim-line" />
          <rect x="387" y="107" width="128" height="150" rx="13" className="art-card-back" /><path d="M409 219l25-34 21 14 33-50" className="art-accent-stroke" /><circle cx="489" cy="149" r="6" className="art-accent-fill" />
        </>}
        {kind === "bearing" && <>
          <text x="52" y="61" className="art-eyebrow">CWRU · CROSS-LOAD ANALYSIS</text><text x="52" y="96" className="art-title">Bearing signal study</text>
          {[0, 1, 2].map((n) => <g key={n}><rect x="52" y={119 + n * 57} width="284" height="44" rx="8" className="art-panel" /><path d={`M66 ${142 + n * 57}h255`} className="art-rule" /><path d={n === 0 ? "M66 141c13-19 17 18 31-1s18-11 29 0 18-20 31-3 18 18 32-1 18-15 31 0 18 5 31-1 18-12 31 1 18 13 31 0 18-10 37 1" : n === 1 ? "M66 198c11-4 18-14 30 0s22 13 32-5 17-13 29 5 22 8 33-3 18-15 30 4 21 13 33-1 22-13 35 2 21 10 37-2" : "M66 255c14-17 17 16 32 0s17-8 29 0 18-19 31 1 20 15 33-4 18-9 31 3 18 12 31-1 21-15 33 1 21 7 37 0"} className="art-accent-stroke" /></g>)}
          <rect x="372" y="118" width="174" height="159" rx="12" className="art-panel" />
          {[0, 1, 2, 3, 4].map((col) => [0, 1, 2, 3].map((row) => <rect key={`${col}-${row}`} x={390 + col * 27} y={139 + row * 27} width="20" height="20" rx="3" className={`art-heat heat-${(col + row) % 4}`} />))}
          <text x="390" y="264" className="art-eyebrow">FAULT CLASSES</text>
        </>}
        {kind === "marketplace" && <>
          <text x="51" y="61" className="art-eyebrow">COMMUNITY MARKETPLACE</text><text x="51" y="100" className="art-title">Find your next</text><text x="51" y="132" className="art-title">good thing.</text>
          <rect x="52" y="159" width="197" height="32" rx="16" className="art-row" /><circle cx="69" cy="175" r="6" className="art-dot" /><rect x="84" y="172" width="105" height="5" rx="3" className="art-dim-line" />
          {[0, 1, 2].map((n) => <g key={n}><rect x={286 + n * 86} y={76 + (n % 2) * 12} width="76" height="190" rx="12" className="art-panel" /><rect x={296 + n * 86} y={88 + (n % 2) * 12} width="56" height="99" rx="8" className={`art-listing listing-${n}`} /><rect x={297 + n * 86} y={200 + (n % 2) * 12} width="42" height="5" rx="3" className="art-line" /><rect x={297 + n * 86} y={214 + (n % 2) * 12} width="30" height="4" rx="2" className="art-dim-line" /><text x={297 + n * 86} y={250 + (n % 2) * 12} className="art-price">LKR ···</text></g>)}
        </>}
        {kind === "travel" && <>
          <rect x="40" y="38" width="520" height="254" rx="16" className="art-panel" /><path d="M40 78h520" className="art-rule" />
          <text x="64" y="64" className="art-eyebrow">SL GUIDE · YOUR ISLAND, YOUR WAY</text><text x="64" y="117" className="art-title">Find a place to wander</text>
          <rect x="64" y="136" width="282" height="129" rx="10" className="art-map" />
          <path d="M77 232c34-44 44-5 72-54s45 18 70-19 39 13 112-8M85 154c18 25 43 19 54 63s45 12 62 38 46-7 74 7" className="art-route" />
          {[0, 1, 2].map((n) => <circle key={n} cx={126 + n * 73} cy={193 - (n % 2) * 30} r="6" className="art-map-pin" />)}
          <rect x="365" y="137" width="168" height="57" rx="9" className="art-row" /><rect x="378" y="149" width="42" height="34" rx="6" className="art-destination dest-one" /><text x="430" y="159" className="art-muted">ELLA · HIGHLANDS</text><rect x="430" y="169" width="78" height="5" rx="3" className="art-dim-line" />
          <rect x="365" y="207" width="168" height="57" rx="9" className="art-row" /><rect x="378" y="219" width="42" height="34" rx="6" className="art-destination dest-two" /><text x="430" y="229" className="art-muted">SOUTH COAST</text><rect x="430" y="239" width="62" height="5" rx="3" className="art-dim-line" />
        </>}
        {kind === "fashion" && <>
          <text x="48" y="63" className="art-eyebrow">FABLY · YOUR STYLE, YOUR WAY</text><text x="48" y="101" className="art-title">Outfit studio</text>
          <rect x="48" y="119" width="252" height="183" rx="14" className="art-panel" /><rect x="61" y="132" width="104" height="156" rx="9" className="art-fashion-card fashion-one" /><rect x="176" y="132" width="111" height="156" rx="9" className="art-fashion-card fashion-two" />
          <path d="M92 174l19-15 14 7 14-7 18 15-12 18-10-6v58h-31v-58l-10 6z" className="art-garment garment-one" /><path d="M199 171l18-13 15 8 15-8 19 13-8 22-12-6v55h-37v-55l-12 6z" className="art-garment garment-two" />
          <rect x="73" y="263" width="80" height="5" rx="3" className="art-dim-line" /><rect x="189" y="263" width="77" height="5" rx="3" className="art-dim-line" />
          <rect x="339" y="52" width="150" height="250" rx="25" className="art-phone" /><rect x="350" y="66" width="128" height="222" rx="17" className="art-screen" /><rect x="393" y="72" width="42" height="5" rx="3" className="art-notch" /><text x="365" y="103" className="art-eyebrow">TODAY'S LOOK</text><circle cx="414" cy="167" r="45" className="art-style-orbit" /><path d="M392 153l16-12 12 6 12-6 16 12-8 16-8-5v41h-28v-41l-8 5z" className="art-garment garment-three" /><rect x="372" y="230" width="83" height="7" rx="4" className="art-line" /><rect x="372" y="246" width="58" height="5" rx="3" className="art-dim-line" />
        </>}
        {kind === "clothing" && <>
          <rect x="40" y="37" width="520" height="258" rx="16" className="art-panel" /><path d="M40 78h520" className="art-rule" /><text x="62" y="64" className="art-eyebrow">E-CLOTHING · NEW SEASON</text><rect x="402" y="49" width="128" height="20" rx="10" className="art-row" /><circle cx="513" cy="59" r="4" className="art-accent-fill" />
          {[0, 1, 2].map((n) => <g key={n}><rect x={62 + n * 163} y="98" width="146" height="176" rx="10" className="art-row" /><rect x={73 + n * 163} y="108" width="124" height="103" rx="7" className={`art-product product-${n}`} /><path d={n === 0 ? `M${111+n*163} 133l17-10 12 5 12-5 18 10-8 16-8-4v42h-37v-42l-8 4z` : n === 1 ? `M${273+n*163} 128l16-8 13 5 13-5 17 8-6 21-9-4v46h-39v-46l-9 4z` : `M${436+n*163} 132l18-9 13 6 13-6 17 9-9 17-8-5v42h-37v-42l-8 5z`} className={`art-garment garment-shop-${n}`} />
          <rect x={74+n*163} y="222" width="65" height="6" rx="3" className="art-line" /><rect x={74+n*163} y="237" width="47" height="5" rx="3" className="art-dim-line" /><circle cx={187+n*163} cy="237" r="8" className="art-button" /></g>)}
        </>}
        {kind === "airline" && <>
          <text x="48" y="59" className="art-eyebrow">AIRLINE OPERATIONS · TODAY</text><text x="48" y="97" className="art-title">Flight control</text>
          <rect x="48" y="116" width="318" height="178" rx="12" className="art-panel" /><text x="65" y="140" className="art-muted">FLIGHT</text><text x="150" y="140" className="art-muted">ROUTE</text><text x="265" y="140" className="art-muted">STATUS</text><path d="M62 151h288" className="art-rule" />
          {[0, 1, 2].map((n) => <g key={n}><text x="65" y={177+n*37} className="art-flight">{`SK ${n+1}0${n+4}`}</text><text x="150" y={177+n*37} className="art-muted">{n===0?"CMB → SIN":n===1?"CMB → DXB":"CMB → MLE"}</text><rect x="266" y={162+n*37} width="70" height="21" rx="10" className={`art-flight-status status-${n}`} /><text x="275" y={177+n*37} className="art-status-label">{n===0?"ON TIME":n===1?"BOARDING":"SCHEDULED"}</text><path d={`M62 ${190+n*37}h288`} className="art-rule" /></g>)}
          <rect x="391" y="116" width="160" height="178" rx="12" className="art-panel" /><circle cx="471" cy="198" r="52" className="art-flight-ring" /><path d="M471 156l10 35 28 15-2 9-29-6-7 35-8 0-1-35-28 7-2-9 27-16 4-35z" className="art-plane" /><text x="422" y="274" className="art-muted">FLEET OVERVIEW</text>
        </>}
        {kind === "grades" && <>
          <text x="48" y="59" className="art-eyebrow">STUDENT PORTAL · TERM 02</text><text x="48" y="97" className="art-title">Results overview</text>
          <rect x="48" y="116" width="337" height="180" rx="12" className="art-panel" /><text x="66" y="142" className="art-muted">SUBJECT</text><text x="259" y="142" className="art-muted">GRADE</text><text x="326" y="142" className="art-muted">SCORE</text><path d="M62 153h307" className="art-rule" />
          {[0,1,2,3].map(n=><g key={n}><circle cx="77" cy={174+n*28} r="7" className={`art-subject-dot subject-${n}`} /><text x="94" y={178+n*28} className="art-flight">{["Mathematics","Computing","Science","English"][n]}</text><text x="270" y={178+n*28} className="art-grade">{["A","A−","B+","A"][n]}</text><rect x="326" y={168+n*28} width="42" height="7" rx="4" className="art-score-track" /><rect x="326" y={168+n*28} width={[38,33,28,36][n]} height="7" rx="4" className="art-score-fill" /><path d={`M62 ${190+n*28}h307`} className="art-rule" /></g>)}
          <rect x="414" y="116" width="137" height="180" rx="12" className="art-panel" /><circle cx="482" cy="188" r="43" className="art-grade-ring" /><text x="461" y="195" className="art-grade-total">3.8</text><text x="446" y="260" className="art-muted">TERM GPA</text>
        </>}
        {kind === "ocean" && <>
          <rect x="40" y="38" width="520" height="254" rx="16" className="art-ocean-panel" /><text x="64" y="70" className="art-ocean-kicker">LIFE BELOW WATER · SDG 14</text><text x="64" y="123" className="art-ocean-title">Protect what we</text><text x="64" y="159" className="art-ocean-title">can't replace.</text><rect x="64" y="182" width="112" height="27" rx="13" className="art-ocean-button" /><text x="80" y="200" className="art-ocean-button-label">EXPLORE THE OCEAN</text>
          <path d="M40 225c49-27 70 22 119-1s69 17 120-3 78 20 127-3 86 14 154-8v82H40z" className="art-wave wave-one" /><path d="M40 251c51-21 72 15 125-2s74 18 126-1 84 13 132-4 88 18 137-3v51H40z" className="art-wave wave-two" /><path d="M384 151c17-20 35-22 53-10l17-5-11 14 11 12-19-4c-13 12-31 13-51 4l-14 5 5-11-8-9z" className="art-turtle" /><circle cx="447" cy="149" r="2" className="art-ocean-eye" />
        </>}
        {kind === "design" && <>
          <text x="48" y="59" className="art-eyebrow">DESIGN WORKSPACE · WEB + MOBILE</text><text x="48" y="97" className="art-title">Ideas into interfaces</text>
          <rect x="48" y="116" width="504" height="178" rx="12" className="art-panel" /><rect x="48" y="116" width="82" height="178" rx="12" className="art-sidebar" /><circle cx="70" cy="139" r="7" className="art-design-dot" /><rect x="86" y="136" width="31" height="5" rx="3" className="art-dim-line" />{[0,1,2,3].map(n=><g key={n}><rect x="63" y={163+n*25} width="12" height="12" rx="3" className={`art-tool tool-${n}`} /><rect x="83" y={167+n*25} width="33" height="4" rx="2" className="art-dim-line" /></g>)}
          <rect x="151" y="134" width="189" height="143" rx="9" className="art-design-canvas" /><rect x="164" y="147" width="163" height="75" rx="6" className="art-design-hero" /><rect x="176" y="162" width="72" height="5" rx="3" className="art-design-line" /><rect x="176" y="174" width="54" height="4" rx="2" className="art-design-dim" /><rect x="176" y="190" width="49" height="15" rx="7" className="art-design-button" /><rect x="164" y="232" width="74" height="32" rx="5" className="art-design-tile" /><rect x="253" y="232" width="74" height="32" rx="5" className="art-design-tile" />
          <rect x="371" y="128" width="89" height="154" rx="16" className="art-phone" /><rect x="379" y="140" width="73" height="130" rx="11" className="art-screen" /><rect x="396" y="145" width="39" height="4" rx="2" className="art-notch" /><rect x="388" y="163" width="55" height="36" rx="5" className="art-design-hero" /><rect x="388" y="207" width="37" height="4" rx="2" className="art-design-line" /><rect x="388" y="217" width="48" height="4" rx="2" className="art-design-dim" /><rect x="388" y="231" width="55" height="19" rx="8" className="art-design-button" />
          <rect x="477" y="150" width="54" height="12" rx="6" className="art-color-swatch swatch-one" /><rect x="477" y="170" width="54" height="12" rx="6" className="art-color-swatch swatch-two" /><rect x="477" y="190" width="54" height="12" rx="6" className="art-color-swatch swatch-three" />
        </>}
        {kind === "finance" && <>
          <text x="48" y="59" className="art-eyebrow">PERSONAL FINANCE · OVERVIEW</text><text x="48" y="97" className="art-title">Your money, in view</text>
          <rect x="48" y="116" width="504" height="178" rx="12" className="art-panel" /><rect x="66" y="133" width="146" height="58" rx="9" className="art-row" /><text x="80" y="153" className="art-muted">TOTAL BALANCE</text><text x="80" y="178" className="art-finance-value">LKR 248,500</text><rect x="226" y="133" width="142" height="58" rx="9" className="art-row" /><text x="240" y="153" className="art-muted">INCOME THIS MONTH</text><text x="240" y="178" className="art-finance-value">LKR 85,000</text><rect x="382" y="133" width="152" height="58" rx="9" className="art-row" /><text x="396" y="153" className="art-muted">SPENT THIS MONTH</text><text x="396" y="178" className="art-finance-value">LKR 42,300</text>
          <text x="67" y="215" className="art-muted">CASH FLOW</text><path d="M70 267h460M70 241h460M70 215h460" className="art-rule" />{[0,1,2,3,4,5,6,7,8].map(n=><rect key={n} x={84+n*49} y={239-[18,34,26,48,40,58,45,69,54][n]} width="25" height={[28,43,35,58,49,68,55,78,63][n]} rx="4" className={`art-finance-bar finance-${n%3}`} />)}
        </>}
      </svg>
      <span className="art-disclaimer">Illustrative UI preview · not a product screenshot</span>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const filters = ["All work", "iOS & mobile", "Web & research"];
  const visibleProjects = projects.filter((project) => activeFilter === "All work" || (activeFilter === "iOS & mobile" ? /ios|mobile/i.test(project.type) : !/ios|mobile/i.test(project.type)));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(".hero-copy > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.11, ease: "power3.out", delay: 0.15 });
    });
    return () => context.revert();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
    if (!cards.length) return;
    let observer: IntersectionObserver | undefined;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
        return;
      }

      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.72,
            delay: (Number(card.style.getPropertyValue("--card-index")) % 2) * 0.08,
            ease: "power3.out",
            overwrite: "auto",
          });
          cardObserver.unobserve(card);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

      cards.forEach((card) => {
        gsap.set(card, { y: 24, scale: 0.985 });
        cardObserver.observe(card);
      });
      observer = cardObserver;
    });

    return () => { observer?.disconnect(); context.revert(); };
  }, [activeFilter]);

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
      <ScrollBackdrop />
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
            <h1 id="hero-title">I’m Dashin.<br /><em>I build for iOS.</em></h1>
            <p className="hero-lede">I’m Dashin Sanjana — a Software Engineering undergraduate and software engineer building thoughtful mobile experiences and useful full-stack products.</p>
            <div className="hero-actions"><a href="#work" className="button button-dark">Explore my work <ArrowDownRight size={17} /></a><a href="mailto:dashinsanjana@gmail.com" className="text-link">Let’s talk <ArrowUpRight size={16} /></a></div>
            <div className="hero-footnote"><span>01 / 04</span><span>Swift · SwiftUI · SwiftData</span></div>
          </div>
          <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><ArrowDown size={16} /><span>Scroll to explore</span></a>
        </section>

        <ScrollStory />

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
