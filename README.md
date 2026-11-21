# Dashin — Cinematic iOS Developer Portfolio

A distinctive, Swift-first portfolio redesign built in **Next.js App Router + TypeScript**, featuring **GSAP ScrollTrigger** motion and a **Three.js** animated wireframe orb.

## Safe branch status

This redesign is intentionally developed on `feature/cinematic-ios-portfolio`. The original `main` branch is unchanged and should not be merged or deployed until explicitly approved.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Experience

- Cinematic animated intro, floating personal portrait and ambient 3D canvas
- Responsive project gallery using original portfolio screenshots
- Swift / SwiftUI / SwiftData-first skills hierarchy
- Employment dates avoid incorrectly marking the Zentrode role as current
- Simplilearn Introduction to Swift completion data and **separate** completed Apple Scrumdinger training
- Responsive navigation, reduced-motion support, accessible fallbacks, semantic metadata

## Before release

- Confirm the exact end month/year for Zentrode.
- Add approved live links/screenshots for Velora and bearing fault research when shareable.
- Add the original Swift certificate PDF to `public/` when the binary can be uploaded; its credential code is currently displayed as text.
- Review other existing certificate details against source documents.
- Check mobile/responsive rendering and run `npm run build`.
- Existing portfolio images are copied into `public/` from the same Git objects in the original repo.

No production deployment or default-branch merge has been performed.
