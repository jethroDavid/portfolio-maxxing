export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDemo {
  src: string;
  filename: string;
  caption: string;
}

export interface Project {
  slug: string;
  level: number;
  title: string;
  tagline: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  demos: ProjectDemo[];
}

export interface Job {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface SkillGroup {
  name: string;
  items: string;
}

export const PROFILE = {
  name: 'Jethro Clein David',
  role: 'Senior Software Engineer',
  tagline: 'Web · Mobile · Commerce · AI Systems',
  location: 'Philippines (Remote)',
  email: 'jethrodavid6@gmail.com',
  phone: '+63 908 486 0092',
  github: 'https://github.com/jethroDavid',
  linkedin: 'https://www.linkedin.com/in/jethro-clein-david/',
  summary:
    'Senior Software Engineer with 7 years shipping production web, mobile, and commerce systems. Contractor since 2024 as the sole mobile owner of a production Ionic/Angular app, leading its offline-first v2. Background spans enterprise Angular, Magento/Adobe Commerce, Laravel, security remediation, and self-built AI agent runtimes and personal automation.',
};

export const STATS = [
  { value: '7+', label: 'Years of XP' },
  { value: '5', label: 'Flagship projects' },
  { value: '2-3', label: 'Releases per week' },
];

export const STAT_BARS = [
  { name: 'Angular / Ionic / Mobile', level: 95 },
  { name: 'Offline-first & sync', level: 92 },
  { name: 'React / TypeScript', level: 90 },
  { name: 'AI agents & automation', level: 88 },
  { name: 'Laravel / PHP', level: 85 },
  { name: 'Magento / Commerce', level: 82 },
];

export const JOBS: Job[] = [
  {
    title: 'Senior Software Engineer (Contractor), Mobile Lead & Release Owner',
    company: 'TabLogs',
    dates: '2024 – Present',
    bullets: [
      'Sole owner of a production Ionic/Angular field app serving hundreds of users: review and merge work from 2 developers, release to iOS and Android 2–3 times a week.',
      'Run every change through a self-built agent QA loop: implement, verify across Chrome + emulator lanes over CDP, review and re-verify so merges land pre-tested.',
      'Rewrote the offline layer (PouchDB/CouchDB) v1 → v2: split the monolith, added a resolve-reference table that cut parent/child sync failures to near zero, plus local-DB snapshots for field debugging.',
      'Built the iOS/Android release process from scratch: TestFlight betas, live-update pipeline across testing/sandbox/UAT/production, JS-gated per-version updates, forced updates.',
      'Migrated ~500 of ~700 web components to Shared UI + i18n + Storybook with a self-built agent wrapper, and took the marketing site from PageSpeed 67 to 94 with zero regressions.',
    ],
  },
  {
    title: 'Ionic Angular Developer',
    company: 'Accenture (internal tool)',
    dates: '2022 – 2024',
    bullets: [
      'Built and maintained Ionic/Angular/Capacitor features for an internal tool used by Accenture employees in China — one of the apps that survived a company-wide cull.',
      'Worked through the full compliance backlog solo: SSL pinning, auth gaps, root/jailbreak detection, dependency cleanup — all from docs and forums, pre-AI-tools.',
      'Learned Ionic and Angular on the job through Accenture training; refreshed Magento along the way.',
    ],
  },
  {
    title: 'Magento 2 Developer',
    company: 'Accenture (client delivery)',
    dates: 'Sep 2021 – 2022',
    bullets: [
      "Joined as the most junior member of a 7–10 person PH/India team on the L'OR Espresso and Tassimo storefronts; became a relied-on contributor and was promoted.",
      'Pinpointed the fix for a post-release bug that stopped all checkouts, tracing it through Knockout.js while client and senior teams were still investigating.',
      'Closed most of the team’s tickets by end of contract; picked up safe release habits from weekly storefront releases.',
    ],
  },
  {
    title: 'Full-Stack Developer, Magento & Laravel',
    company: 'Independent',
    dates: 'Jul 2019 – Sep 2021',
    bullets: [
      'Worked solo across Magento and Laravel: features from analysis through deploy, shipping over SSH with manual deployments.',
      'Migrated Magento 1 → Magento 2 alone with no AI help; built custom modules that all shipped working: mobile-number login, ISP plan-inquiry pages, in-store-pickup shipping, Home Credit / Akulaku payment integrations.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'zerosum',
    level: 1,
    title: 'zerosum',
    tagline: 'Mobile trading app on Alpaca',
    demos: [
      {
        src: '/demos/placeholder.mp4',
        filename: 'placeholder.mp4',
        caption: 'Placeholder — final cut: portfolio overview → stock detail → trade preview → order confirm.',
      },
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Laravel', 'Alpaca API'],
    highlights: [
      'Portfolio tracking, positions, orders, and watchlists with live market-data and order streams.',
      'Full trade flow: stock detail → preview → confirm → success, plus order cancellation.',
      'AES-encrypted on-device Alpaca credentials with auto-lock after background inactivity.',
      'Laravel 12 backend: Passport OAuth, Google login, and a typed Alpaca Broker API wrapper.',
      'News, financial statements, and Chart.js balance history per symbol.',
    ],
    links: [{ label: 'GitHub (app)', url: 'https://github.com/jethroDavid/zerosumx' }],
  },
  {
    slug: 'pineapple-agent',
    level: 2,
    title: 'pineapple-agent',
    tagline: 'Multi-agent backend runtime',
    demos: [
      {
        src: 'https://freshpineappleagent.web.app/assets/demos/agent-control-loop.mp4',
        filename: 'agent-control-loop.mp4',
        caption: 'Agent control loop: trigger → plan → act → verify from the dev CLI.',
      },
      {
        src: 'https://freshpineappleagent.web.app/assets/demos/mobile-audio-loop.mp4',
        filename: 'mobile-audio-loop.mp4',
        caption: 'Mobile audio loop: voice request in the Expo app → spoken agent reply.',
      },
    ],
    stack: ['TypeScript', 'Fastify', 'OpenAI Agents', 'PostgreSQL', 'Drizzle', 'Expo'],
    highlights: [
      'Custom agent runtime: trigger → routing → dispatch → approval → recovery pipeline with resumable runs.',
      'Plugin adapters for Telegram control, cron reminders, Shortcut, and a Spotify/audio assistant bridge.',
      'Durable execution + decision stores on Postgres/Drizzle; MCP session backends.',
      'Expo mobile client with voice input and streaming audio playback.',
      'Static marketing site with run-flow demos, hosted on Firebase.',
    ],
    links: [
      { label: 'Live site', url: 'https://freshpineappleagent.web.app/' },
      { label: 'GitHub', url: 'https://github.com/jethroDavid/pineapple-agent' },
    ],
  },
  {
    slug: 'password-manager',
    level: 3,
    title: 'password-manager',
    tagline: 'Encrypted vault for credentials',
    demos: [
      {
        src: '/demos/placeholder.mp4',
        filename: 'placeholder.mp4',
        caption: 'Placeholder — final cut: passphrase unlock → vault search → add + autofill an item.',
      },
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'WebCrypto'],
    highlights: [
      'Client-side envelope encryption: PBKDF2-derived KEK wraps a random 256-bit DEK (AES-GCM).',
      'DEK lives in memory only — lock wipes it; passwords are encrypted before they touch the network.',
      'Cloud-backed with Firebase Auth + Firestore realtime sync and local encrypted cache.',
      'Login/register plus passphrase unlock flow with per-item CRUD and search.',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/jethroDavid/passsword-manager' }],
  },
  {
    slug: 'automation-system',
    level: 4,
    title: 'automation-system',
    tagline: 'n8n + OpenClaw + Discord personal ops',
    demos: [
      {
        src: '/demos/placeholder.mp4',
        filename: 'placeholder.mp4',
        caption: 'Placeholder — final cut: Discord capture → structured record → daily watch reminder.',
      },
    ],
    stack: ['n8n', 'OpenClaw', 'OpenAI', 'SQLite', 'Discord'],
    highlights: [
      'Car assistant over Discord: free-text capture → structured records, AI ask agent, daily due-reminder watch loop.',
      'Staged edit/confirm-delete safety pattern so the agent never deletes outright.',
      'Job-post scanner ("Egg") with browser-verified leads and ranked daily scans.',
      'Marketplace bargain hunter ("Scout") for used Mac deals with anti-scam verification rules.',
    ],
    links: [],
  },
  {
    slug: 'noted',
    level: 5,
    title: 'noted',
    tagline: 'Shared family kitchen board',
    demos: [
      {
        src: '/demos/placeholder.mp4',
        filename: 'placeholder.mp4',
        caption: 'Placeholder — final cut: fridge note → realtime sync → TV feed + photo book.',
      },
    ],
    stack: ['Next.js', 'React', 'tRPC', 'Drizzle', 'PostgreSQL', 'Firebase Auth'],
    highlights: [
      'One shared board: fridge notes, a reels-style TV feed, and a photo book that auto-archives removed photos.',
      'Realtime sync with caching and background media workers on a Turbo monorepo foundation.',
      'Type-safe end to end: tRPC + zod validators shared across web, API, and worker packages.',
    ],
    links: [],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    name: 'Frontend & Mobile',
    items:
      'Angular, Ionic, React, Next.js, Capacitor, TypeScript, offline-first (SQLite sync, offline CRUD), Android builds, responsive UI',
  },
  {
    name: 'Backend & Data',
    items: 'Node.js, Fastify, tRPC, Laravel, PHP, REST APIs, PostgreSQL, MySQL, Drizzle',
  },
  {
    name: 'Commerce',
    items: 'Magento 2 / Adobe Commerce (certified 2021–2023), custom modules, payment integrations',
  },
  {
    name: 'AI & Automation',
    items:
      'OpenAI Agents, n8n, OpenClaw, Discord delivery, queues/workers, Redis cache + pub/sub, WebSockets',
  },
  {
    name: 'Quality & Delivery',
    items:
      'Security remediation (SSL pinning, auth hardening), Storybook, lint/typecheck/test/build gates, remote contractor delivery',
  },
];

export const EDUCATION = [
  'Adobe Certified Professional – Adobe Commerce Developer (Nov 2021 – Nov 2023)',
  'BS Information Technology, Bulacan State University (2015 – 2019)',
];
