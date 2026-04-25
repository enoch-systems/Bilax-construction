# Bilax Constructions - Construction Services Website

A modern, responsive construction company website built with Next.js and React, featuring a hero section with video backgrounds, services showcase, project portfolio, and contact information.

## Project Overview

Bilax Constructions is a professional construction company website designed to showcase comprehensive construction services including interior design, construction, architecture, engineering, and renovation. It features a responsive design with video backgrounds, mobile-optimized navigation with slide-in menu, and a dark aesthetic theme throughout.

## Features

### Core Functionality
- Hero section with dual video backgrounds (mobile and desktop layouts)
- Full-height slide-in mobile menu with smooth 700ms animation
- Backdrop blur overlay when mobile menu is open
- About Us section with company description
- Projects portfolio with hover effects and view project buttons
- Services showcase with visual indicators
- Responsive footer with contact information and social links
- Click-to-call phone number integration
- Mobile-responsive navigation with hamburger menu

### Technical Highlights
- Responsive video backgrounds with conditional rendering
- React hooks (useState, useRef) for state management
- Click outside detection for menu closing
- CSS transitions and transforms for smooth animations
- Layering with CSS z-index for overlays
- Tailwind CSS utility classes for styling
- Optimized performance with automatic code splitting
- SEO-friendly structure with proper metadata

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript

### Styling
- Tailwind CSS
- PostCSS

### Tools
- ESLint
- Git
- Node.js

## Project Structure

```bash
construction/
├── public/
│   ├── video1.mp4
│   └── video2.mp4
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── AboutUs.tsx
│       ├── AboutFeatures.tsx
│       ├── ConstructionVision.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       └── Projects.tsx
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd construction

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudinary Video Setup

To load hero videos from Cloudinary instead of local files:

1. Copy `.env.example` to `.env.local`.
2. Set these values:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_1`
   - `NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_2`
3. Restart the dev server.

Example:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mycloud
NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_1=construction/video1
NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_2=construction/video2
```

The app will use:
`https://res.cloudinary.com/<cloud-name>/video/upload/f_auto,q_auto/<public-id>`
No local video fallback is used. Hero videos load from Cloudinary only.

## Deployment

This project can be deployed on Vercel, Netlify, or any Next.js-compatible hosting platform.

## Contact

- Phone: [+2349162919586](tel:+2349162919586)
- Email: info@bilaxconstructions.com
- Address: Plot 166 tenant road, Aba, Abia State, Nigeria
