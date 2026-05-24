export const CV_DATA = {
  identity: {
    name: "Aiden Kim",
    nameKo: "김근형",
    role: "Aerospace Engineer · Agent Infrastructure",
    location: "Daejeon, KR",
    tz: "Asia/Seoul",
    status: "Building Pathtent · Airbus FYI Phase 2",
    blurb: "Aerospace engineer from Busan, now based in Daejeon. KAIST Aerospace, expected graduation early 2028. I work across guidance & control and token-efficient agent systems.",
  },

  socials: [
    { label: "skybluejacket@kaist.ac.kr", short: "EMAIL", href: "mailto:skybluejacket@kaist.ac.kr", kind: "email" },
    { label: "@AidenGeunGeun", short: "GH", href: "https://github.com/AidenGeunGeun", kind: "github" },
    { label: "@VibeCodeAiden", short: "X", href: "https://x.com/VibeCodeAiden", kind: "x" },
    { label: "geun._.daeng", short: "IG", href: "https://instagram.com/geun._.daeng", kind: "ig" },
  ],

  currently: [
    {
      org: "Pathtent",
      role: "Co-founder & CTO",
      status: "PRE-LAUNCH",
      statusTone: "amber",
      detail: "Patents without the pain. Drafts spec documents alongside you and surfaces the closest prior art — replacing KIPRIS-dependent workflows with a purpose-built database.",
      meta: "B2B SaaS",
    },
    {
      org: "Airbus Fly Your Ideas",
      role: "Team lead — In Vitro Firmware Red-Teaming",
      status: "PHASE 2",
      statusTone: "sky",
      detail: "Autonomous firmware verification pipeline for aerospace supply-chain security. Competing for one of three global finalist slots. Mentored by Prof. Yongdae Kim (KAIST SSL).",
      meta: "Submission · May 2026",
    },
    {
      org: "KAIST Aerospace Engineering",
      role: "Undergraduate · expected Feb 2028",
      status: "ON LEAVE",
      statusTone: "muted",
      detail: "On semester leave. Splitting time across aerospace, ML, and agent infrastructure.",
      meta: "B.S. · 2022–2028",
    },
  ],

  projects: [
    { name: "recall", cat: "agent", lang: "TypeScript", desc: "Semantic memory for AI agents. Cross-session continuity without bloating context.", href: "https://github.com/AidenGeunGeun/recall" },
    { name: "transcribe-cli", cat: "agent", lang: "TypeScript", desc: "Local document-to-markdown OCR for PDFs, DOCX, images, and more.", href: "https://github.com/AidenGeunGeun/transcribe-cli" },
    { name: "code-intel", cat: "agent", lang: "TypeScript", desc: "Lightweight code intelligence and navigation for agent workflows.", href: "https://github.com/AidenGeunGeun/code-intel" },
    { name: "exa-cli", cat: "agent", lang: "TypeScript", desc: "Three-tier web research via the Exa Search API for agents.", href: "https://github.com/AidenGeunGeun/exa-cli" },
    { name: "todoist-cli", cat: "agent", lang: "TypeScript", desc: "JSON-first Todoist CLI for agent task and project workflows.", href: "https://github.com/AidenGeunGeun/todoist-cli" },
    { name: "OpencodeOrchestra", cat: "agent", lang: "TypeScript", desc: "Multi-layer agent orchestration. PM plans, specialists execute.", href: "https://github.com/AidenGeunGeun/OpencodeOrchestra" },
    { name: "opencode-context-compress", cat: "agent", lang: "TypeScript", desc: "Manual-first context compression. You own the when.", href: "https://github.com/AidenGeunGeun/opencode-context-compress" },
    { name: "the-hive", cat: "agent", lang: "TypeScript", desc: "Swarm coordination layer for multi-agent task execution.", href: "https://github.com/AidenGeunGeun/the-hive" },
    { name: "image-gen", cat: "agent", lang: "TypeScript", desc: "JSON-in / JSON-out image generation CLI for agents.", href: "https://github.com/AidenGeunGeun/image-gen", extra: "npm @skybluejacket/image-gen" },
    { name: "thinking-token", cat: "research", lang: "TypeScript", desc: "Token budget reasoning and introspection for LLM agents.", href: "https://github.com/AidenGeunGeun/thinking-token" },
    { name: "PINN_Guidance", cat: "aerospace", lang: "Python", desc: "Physics-informed neural networks for missile guidance.", href: "https://github.com/AidenGeunGeun/PINN_Guidance" },
    { name: "hvt-missile-sim", cat: "aerospace", lang: "Python", desc: "High-value target missile engagement simulation.", href: "https://github.com/AidenGeunGeun/hvt-missile-sim" },
    { name: "6dofsim", cat: "aerospace", lang: "MATLAB", desc: "Six-degree-of-freedom flight dynamics simulator.", href: "https://github.com/AidenGeunGeun/6dofsim" },
    { name: "Coop_guidance", cat: "aerospace", lang: "MATLAB", desc: "Cooperative guidance law design and analysis.", href: "https://github.com/AidenGeunGeun/Coop_guidance" },
    { name: "GraduateKAIST", cat: "web", lang: "TypeScript", desc: "KAIST graduation planning tool. Live at graduatekaist.vercel.app.", href: "https://github.com/AidenGeunGeun/GraduateKAIST", extra: "graduatekaist.vercel.app" },
    { name: "ZoomToText", cat: "systems", lang: "Python", desc: "Real-time Zoom audio transcription and text extraction pipeline.", href: "https://github.com/AidenGeunGeun/ZoomToText" },
  ],

  categories: [
    { id: "all", label: "All" },
    { id: "agent", label: "Agent Infra" },
    { id: "aerospace", label: "Aerospace" },
    { id: "research", label: "Research" },
    { id: "web", label: "Web" },
    { id: "systems", label: "Systems" },
  ],

  research: [
    {
      title: "KAIST Flight Dynamics & Control Lab (FDCL)",
      advisor: "Prof. Chang Hoon Lee",
      span: "2025",
      role: "Undergraduate Research Program",
      detail: "Air-to-air missile range estimation — targeting 60Hz computation of the no-escape zone for HUD rendering. Hit the rate with comfortable margin on conventional hardware; deployment on actual embedded cockpit avionics was out of scope.",
      tags: ["Guidance & Control", "Real-time", "HUD"],
    },
    {
      title: "Cooperative Missile Interception",
      advisor: "Undergraduate research",
      span: "2024 — 2025",
      role: "Undergraduate researcher",
      detail: "Cooperative guidance and engagement geometry for multi-interceptor scenarios. Sim-driven study of coordination strategies against high-value targets.",
      tags: ["Cooperative Guidance", "6-DoF Sim", "Engagement Geometry"],
    },
    {
      title: "PINNs for Aerospace Guidance",
      advisor: "Independent track · on hold",
      span: "mid-2025 — Jan 2026",
      role: "Independent research",
      detail: "Physics-informed neural networks as learned surrogates for guidance and trajectory estimation. Ran from mid-2025 to January 2026, then placed on hold.",
      tags: ["PINNs", "Trajectory", "ML × Aerospace"],
    },
  ],

  timeline: [
    { year: "2026", title: "CTO, Pathtent", detail: "Pre-launch B2B SaaS, building from zero.", kind: "primary" },
    { year: "2026", title: "Airbus Fly Your Ideas — Phase 2", detail: "Submission end of May 2026.", kind: "primary" },
    { year: "2025", title: "Hanwha Aerospace Special Award", detail: "ROK Air Force Academy Academic Conference.", kind: "award" },
    { year: "2025", title: "Undergraduate Research Program — KAIST FDCL", detail: "Prof. Chang Hoon Lee. 60Hz range estimation for HUD rendering — hit on conventional hardware, embedded avionics out of scope.", kind: "research" },
    { year: "2025 — 2026", title: "PINNs for Aerospace — on hold", detail: "Independent ML × aerospace track. Ran mid-2025 to Jan 2026, currently paused.", kind: "research" },
    { year: "2024 — 2025", title: "President, ASCEND", detail: "KAIST's fastest-growing & largest student organization during my term.", kind: "org" },
    { year: "2024 — 2025", title: "Undergraduate Research — Cooperative Interception", detail: "Cooperative guidance for multi-interceptor engagement against high-value targets.", kind: "research" },
    { year: "2023", title: "Vice President, Silver Lining", detail: "First international-focused KAIST club to earn official 정동아리 status.", kind: "org" },
    { year: "2023", title: "Declared Aerospace Engineering", detail: "KAIST.", kind: "edu" },
    { year: "2022", title: "Freshman Student Council — Design & Planning", detail: "KAIST.", kind: "org" },
    { year: "2022", title: "Entered KAIST", detail: "Class of 2028 (expected).", kind: "edu" },
    { year: "—", title: "Busan Science High School (부산과학고, 17기)", detail: "Graduated.", kind: "edu" },
  ],

  orgs: [
    { role: "President", org: "ASCEND", span: "2024 — 2025", note: "KAIST's international sports club. Fastest-growing and largest student organization during my term." },
    { role: "Vice President", org: "Silver Lining", span: "2023", note: "International-focused student club. First of its kind to earn 정동아리 status at KAIST." },
    { role: "Design & Planning", org: "Freshman Council", span: "2022", note: "KAIST freshman student council." },
  ],

  stack: {
    Languages: ["Python", "TypeScript", "MATLAB", "Bash", "LaTeX"],
    ML: ["PyTorch", "MLX", "PINNs"],
    Web: ["React", "Next.js", "FastAPI", "PostgreSQL"],
    Aerospace: ["6-DoF Sim", "Guidance Laws", "Real-time HUD"],
  },

  stats: [
    { value: "16", unit: "", label: "Open-source repos in flight" },
    { value: "5", unit: "th", label: "Year at KAIST, on semester leave" },
    { value: "3", unit: "", label: "KAIST student orgs led, 2022–2025" },
    { value: "1", unit: "", label: "Hanwha Aerospace Special Award · 2025" },
  ],
};
