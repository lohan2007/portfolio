/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * Edit your personal details, projects, skills, education, and links in this single file.
 * ==============================================================================
 */

export const personalData = {
  name: "Lohan Sabari Krishna",
  monogram: "LSK",
  avatar: "/profile.jpg",
  shortTitle: "AI Student. Builder. Creator.",
  role: "AI & Machine Learning Engineer in the Making",
  institution: "Thejus Engineering College",
  department: "B.Tech Computer Science & Engineering (Artificial Intelligence)",
  year: "1st Year (Class of 2028)",
  location: "Kerala, India",
  status: "Available for Projects & Research",
  portfolioYear: "2026",
  email: "lohansabaripersonal@gmail.com",
  github: "https://github.com/lohansabari",
  linkedin: "https://linkedin.com/in/lohan-sabari-krishna",
  instagram: "https://instagram.com/lohan_sabari",
  bioHeadline: "Architecting the convergence of Artificial Intelligence and modern software.",
  bioFull: "I am an ambitious first-year Computer Science & Engineering (Artificial Intelligence) undergraduate at Thejus Engineering College. Deeply fascinated by deep learning, computer vision, neural architectures, and award-grade digital experiences, I build software that merges mathematical rigor with refined aesthetic craft.",
  stats: [
    { value: 12, suffix: "+", label: "Projects Completed" },
    { value: 14, suffix: "+", label: "Core Technologies" },
    { value: 5, suffix: "+", label: "Certifications" },
    { value: 99, suffix: "%", label: "Curiosity & Drive" },
  ],
};

export const heroSlides = [
  {
    id: "01",
    tag: "FEATURED AI SYSTEM",
    title: "OmniVision AI",
    category: "Computer Vision & Edge Inference",
    description: "Multimodal visual reasoning agent powered by lightweight transformer backbones for real-time edge intelligence.",
    badge: "PyTorch • OpenCV • FastViT",
    year: "2026",
    linkText: "Explore Architecture",
    image: "/images/project-1.jpg",
    previewUrl: "https://github.com/lohansabari",
    stats: { latency: "14ms", accuracy: "98.4%", platform: "NVIDIA Jetson / Web" }
  },
  {
    id: "02",
    tag: "NEURAL APPLICATION",
    title: "NeuroClimate 3D",
    category: "AI Forecasting & Geospatial",
    description: "Predictive microclimate weather engine running localized temporal convolutions with high-fidelity spatial visualizer.",
    badge: "TensorFlow • Three.js • FastAPI",
    year: "2025",
    linkText: "View Live Dashboard",
    image: "/images/project-2.jpg",
    previewUrl: "https://github.com/lohansabari",
    stats: { horizons: "72 Hours", resolution: "1.2km²", refresh: "Realtime" }
  },
  {
    id: "03",
    tag: "AUTONOMOUS REASONING",
    title: "NexusLLM Core",
    category: "Generative AI & LLMs",
    description: "Reasoning multimodal agent architecture with local vector RAG memory indexing and tool execution loops.",
    badge: "Python • Llama-3 • LangChain",
    year: "2026",
    linkText: "Experience System",
    image: "/images/project-3.jpg",
    previewUrl: "https://github.com/lohansabari",
    stats: { tokens: "128k Context", latency: "22ms/tok", reasoning: "Chain-of-Thought" }
  },
];

export const projects = [
  {
    id: "project-1",
    index: "01",
    title: "OmniVision AI",
    subtitle: "Autonomous Neural Perception & Edge Vision",
    category: "Computer Vision & Edge AI",
    year: "2026",
    image: "/images/project-1.jpg",
    description: "An advanced visual-intelligence agent combining lightweight transformer backbones with TensorRT quantization for zero-shot object localization, spatial scene reconstruction, and sub-15ms edge inference.",
    tech: ["PyTorch", "OpenCV", "TensorRT", "FastViT", "FastAPI"],
    highlights: [
      "Sub-15ms frame processing using TensorRT FP16 quantization",
      "Dynamic prompt-guided zero-shot detection and segmentation",
      "Interactive dashboard with real-time webcam telemetry inspection"
    ],
    github: "https://github.com/lohansabari",
    demo: "https://github.com/lohansabari",
    color: "#FFE96B",
    featured: true,
  },
  {
    id: "project-2",
    index: "02",
    title: "NexusLLM Core",
    subtitle: "Autonomous Multimodal Reasoning & Code Intelligence",
    category: "Generative AI & LLMs",
    year: "2026",
    image: "/images/project-3.jpg",
    description: "A next-generation conversational reasoning copilot powered by quantized open-weights models, local vector RAG memory indexing, and self-correcting autonomous tool execution loops.",
    tech: ["Python", "LangChain", "Llama-3", "ChromaDB", "FastAPI"],
    highlights: [
      "Local RAG vector indexing over technical papers and research codebases",
      "Dynamic multi-step chain-of-thought verification engine",
      "Sub-25ms time-to-first-token with streaming websocket outputs"
    ],
    github: "https://github.com/lohansabari",
    demo: "https://github.com/lohansabari",
    color: "#60a5fa",
    featured: true,
  },
  {
    id: "project-3",
    index: "03",
    title: "NeuroClimate 3D",
    subtitle: "Spatiotemporal Deep Learning Microclimate Forecast",
    category: "Predictive AI & Geospatial",
    year: "2025",
    image: "/images/project-2.jpg",
    description: "A deep climate forecasting system leveraging temporal convolutional LSTM networks and satellite imagery to generate hourly precipitation heatmaps visualized on an interactive 3D WebGL globe.",
    tech: ["TensorFlow", "Three.js", "Python", "React", "Tailwind CSS"],
    highlights: [
      "94.2% accuracy on 24-hour localized rainfall predictions",
      "Interactive 3D weather globe with animated volumetric wind currents",
      "Dark mode aesthetic inspired by aeronautical cockpits"
    ],
    github: "https://github.com/lohansabari",
    demo: "https://github.com/lohansabari",
    color: "#a78bfa",
    featured: true,
  },
  {
    id: "project-4",
    index: "04",
    title: "CyberSentinel AI",
    subtitle: "High-Throughput Threat & Packet Anomaly Shield",
    category: "Cyber AI & Security",
    year: "2025",
    image: "/images/project-4.jpg",
    description: "An unsupervised neural intrusion detection daemon processing 10,000+ packets/sec in memory to isolate zero-day exploit patterns, DDoS vector deviations, and network anomalies in real time.",
    tech: ["Scikit-Learn", "PyTorch", "NumPy", "Pandas", "Docker"],
    highlights: [
      "Analyzes 10,000+ packets/sec in memory with minimal memory footprint",
      "Automated PDF & JSON audit reports generated post-incident",
      "Configurable heuristic sensitivity thresholds and auto-quarantine"
    ],
    github: "https://github.com/lohansabari",
    demo: "https://github.com/lohansabari",
    color: "#34d399",
    featured: true,
  },
];

export const skillCategories = [
  {
    title: "AI & Machine Learning",
    badge: "Core Specialization",
    skills: [
      { name: "Python", level: 90, desc: "NumPy, Pandas, Matplotlib, Scipy" },
      { name: "PyTorch & TensorFlow", level: 82, desc: "CNNs, RNNs, Model Fine-Tuning" },
      { name: "Computer Vision", level: 80, desc: "OpenCV, Object Detection, YOLO" },
      { name: "Scikit-Learn", level: 88, desc: "Classification, Regressions, Clustering" },
      { name: "NLP & LLM Prompting", level: 85, desc: "Embeddings, RAG, LangChain basics" },
    ],
  },
  {
    title: "Modern Web & UI Engineering",
    badge: "Interactive Craft",
    skills: [
      { name: "React & Vite", level: 92, desc: "Hooks, State, Component Architecture" },
      { name: "JavaScript (ES6+)", level: 90, desc: "Async/Await, DOM, Event Systems" },
      { name: "Tailwind CSS", level: 95, desc: "Design systems, Responsive layouts" },
      { name: "Three.js / WebGL", level: 75, desc: "Shaders, 3D Geometries, Lighting" },
      { name: "Framer Motion & GSAP", level: 86, desc: "Smooth scroll, physics, gestures" },
    ],
  },
  {
    title: "Systems & Foundation",
    badge: "CS Principles",
    skills: [
      { name: "C Programming", level: 88, desc: "Pointers, Memory, Data Structures" },
      { name: "Java", level: 80, desc: "OOP, Collections, Algorithms" },
      { name: "Data Structures & Algos", level: 84, desc: "Trees, Graphs, Dynamic Programming" },
      { name: "Database Design", level: 78, desc: "SQL, MongoDB, Schema normalization" },
      { name: "Linux & Bash", level: 82, desc: "CLI scripting, process management" },
    ],
  },
  {
    title: "DevOps & Tooling",
    badge: "Engineering Workflow",
    skills: [
      { name: "Git & GitHub", level: 92, desc: "Branches, PR workflows, CI actions" },
      { name: "FastAPI / Node.js", level: 80, desc: "REST APIs, WebSockets, JSON validation" },
      { name: "Docker Basics", level: 74, desc: "Containerization, Multi-stage builds" },
      { name: "Vite / Modern Bundlers", level: 90, desc: "HMR, Assets, Optimization" },
      { name: "VS Code & Antigravity IDE", level: 95, desc: "Debugging, Extensions, Profiling" },
    ],
  },
];

export const marqueeSkills = [
  "Python", "PyTorch", "React", "Three.js", "Computer Vision",
  "TensorFlow", "Tailwind CSS", "JavaScript ES6+", "C Language", "Java",
  "GSAP", "Machine Learning", "Git & GitHub", "FastAPI", "OpenCV", "Lenis"
];

export const journeyTimeline = [
  {
    year: "2024 — Present",
    period: "PRESENT",
    title: "B.Tech in CSE (Artificial Intelligence)",
    institution: "Thejus Engineering College, Vellarakkad, Thrissur",
    description: "Embarking on foundational engineering in Computer Science with a specialization in Artificial Intelligence. Active contributor in tech clubs, robotics workshops, and open-source explorations.",
    tags: ["Artificial Intelligence", "Neural Networks", "Data Structures", "Academic Excellence"]
  },
  {
    year: "2024",
    period: "SPECIALIZATION",
    title: "Deep Learning & Applied Python Mastery",
    institution: "Self-Directed / Industry Certifications",
    description: "Completed comprehensive certifications in Python for Data Science and Machine Learning algorithms. Implemented hands-on models for image segmentation, sentiment analysis, and predictive metrics.",
    tags: ["Deep Learning", "TensorFlow", "PyTorch", "Certificates"]
  },
  {
    year: "2022 — 2024",
    period: "FOUNDATION",
    title: "Higher Secondary Education (Computer Science & Mathematics)",
    institution: "State Higher Secondary Board",
    description: "Graduated with distinction. Built early coding projects in Python and C++, developing a disciplined passion for logical architecture, competitive mathematics, and algorithm analysis.",
    tags: ["Mathematics", "Computer Science", "Physics", "Merit"]
  },
  {
    year: "2022",
    period: "GENESIS",
    title: "First Lines of Code & Curiosity Spark",
    institution: "Independent Exploration",
    description: "Wrote the initial terminal programs, algorithmic puzzles, and web pages that sparked a lifelong commitment to software craftsmanship and machine intelligence.",
    tags: ["Python 3", "HTML5", "Algorithmic Puzzles"]
  }
];

export const awardsAndHighlights = [
  { title: "First-Year Academic Standing", body: "Enrolled in B.Tech CSE (AI) cohort at Thejus Engineering College." },
  { title: "Continuous Learning", body: "Over 200+ hours dedicated to AI research papers, model fine-tuning, and creative coding." },
  { title: "Design & Logic Synergy", body: "Passionate about combining deep ML engineering with tactile, award-caliber user interfaces." }
];

