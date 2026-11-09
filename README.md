# Lohan Sabari Krishna — Award-Style Portfolio

> Modern, dark monochrome, award-winning studio portfolio inspired by the Hayler Studio aesthetic. Crafted for **Lohan Sabari Krishna**, first-year B.Tech Computer Science & Engineering (Artificial Intelligence) student at **Thejus Engineering College**.

![Portfolio Preview Banner](public/favicon.svg)

---

## ⚡ Key Highlights & Features

- **3D Concrete Isometric Hero**: High-performance Three.js WebGL scene featuring isometric concrete blocks with mouse parallax, soft directional shadows, and an interactive draggable 3D camera / AI sensor centerpiece.
- **Studio Inset Frame**: Thin white rounded-rectangle border framing the viewport, replicating high-end award-winning digital studios.
- **Floating Glassmorphism Pill Navbar**: Smooth backdrop-blurred pill with active white chip indicator, scroll direction auto-hide, sound effects toggle, and mobile responsive drawer.
- **Tactile Interface Sounds**: Real-time synthesized audio feedback (hover ticks, click pops, success chimes) via the Web Audio API with zero external audio assets and a mute/unmute toggle.
- **Draggable & Keyboard Carousel**: Interactive hero slides with `01.` `02.` `03.` indicators, animated progress bar line, and "Drag to Explore" hint.
- **Smooth Inertia Scrolling**: Powered by **Lenis** for silky 60 FPS viewport inertia.
- **Context-Aware Custom Cursor**: Spring-physics follower ring that morphs into a glowing "VIEW" circle over projects and a "DRAG" badge over the 3D canvas.
- **Procedural Film Grain**: GPU-accelerated canvas grain overlay for a warm analog film texture.
- **Single Source of Truth**: All information, projects, skills, education, and social links are editable in one file: `src/data/content.js`.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) (Custom WebGL isometric raycasting & procedural textures)
- **Smooth Scroll**: [@studio-freight/lenis / Lenis](https://github.com/darkroomengineering/lenis)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Web Audio API Sound Synthesizer & [canvas-confetti](https://github.com/catdad/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### 1. Installation

Clone or open the workspace folder and install dependencies:

```bash
npm install
```

### 2. Run the Development Server

Start the local Vite dev server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 3. Production Build

To create an optimized, minified production bundle in the `dist` directory:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ✏️ Customizing Your Content

All information is consolidated in **`src/data/content.js`**. You can update everything in one place:

- **Personal Information**: Name, title, college name, department, email, GitHub, LinkedIn.
- **Hero Carousel Slides**: Featured projects, stats, and headline tags.
- **Projects & Works**: Project title, category, description, tech stack tags, live URLs, GitHub repos, and engineering highlights.
- **Skills Matrix**: Add or adjust skill levels (0–100%) and categories (AI & Machine Learning, Web, Systems, DevOps).
- **Academic Journey**: Timeline milestones, high school, Thejus Engineering College admission, and certifications.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to **GitHub**.
2. Go to [Vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**.

### Deploy to Netlify

1. Link your GitHub repository on [Netlify.com](https://www.netlify.com/).
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Click **Deploy Site**.

---

## 📄 License & Credits

Designed & built for **Lohan Sabari Krishna**, B.Tech CSE (Artificial Intelligence) at **Thejus Engineering College**.
Aesthetic inspired by studio brutalism and dark monochrome design templates.

