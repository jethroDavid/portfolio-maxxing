export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectSection {
  heading: string;
  points: string[];
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
  story?: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  demos: ProjectDemo[];
  sections?: ProjectSection[];
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
      'Sole owner of a production Ionic/Angular field app serving hundreds of users: review changes, release to iOS and Android 2–3 times a week.',
      'Run every change through a self-built agent QA loop: implement, verify across Chrome + emulator lanes over CDP, review and re-verify so merges land pre-tested.',
      'Rewrote the offline layer (PouchDB/CouchDB) v1 → v2: split the monolith, added a resolve-reference table that cut parent/child sync failures to near zero, plus local-DB snapshots for field debugging.',
      'Built the iOS/Android release process from scratch: TestFlight betas, live-update pipeline across testing/sandbox/UAT/production, JS-gated per-version updates, forced updates.',
      'Migrated more than 500 web components to shared UI, translations and Storybook using self-built AI tooling. Improved marketing-site performance and SEO through prerendering, metadata, canonical URLs and structured data.',
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
      'Resolved a critical checkout issue in production.',
      'Closed most of the team’s tickets by end of contract; picked up safe release habits from weekly storefront releases.',
    ],
  },
  {
    title: 'Full-Stack Developer, Magento & Laravel',
    company: '',
    dates: 'Jul 2019 – Sep 2021',
    bullets: [
      'Worked solo across Magento and Laravel: features from analysis through deploy, shipping over SSH with manual deployments.',
      'Independently migrated Magento 1 to 2 and built login, in-store pickup, payment integrations and other custom modules.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'noted',
    level: 1,
    title: 'noted',
    tagline: 'Shared family board with offline Android and Windows apps',
    demos: [
      {
        src: '/demos/noted/noted-realtime-sync.mp4',
        filename: 'noted-realtime-sync.mp4',
        caption:
          'Demo: one home live on web, desktop, and Android at once — TV clips, fridge notes, and the photobook stay in sync.',
      },
      {
        src: '/demos/noted/noted-signin-tour.mp4',
        filename: 'noted-signin-tour.mp4',
        caption:
          'Demo: Google sign-in with passkey check, then the first-run path from fridge board to photobook.',
      },
    ],
    stack: ['Next.js', 'tRPC', 'PostgreSQL', 'SQLite', 'PowerSync', 'AWS S3', 'AWS CDK', 'Redis', 'QStash', 'Capacitor', 'Electron'],
    highlights: [
      'One shared family board with fridge notes, a TV feed and a photobook for archived photos and clips.',
      'Android and Windows bundle the shared interface and save notes and media locally with SQLite and PowerSync, so work can continue during connection loss.',
      'The web app uses tRPC subscriptions over SSE with Redis fan-out, cache invalidation and presence.',
      'Durable media queues upload originals with checksum verification and retry interrupted transfers. S3 and QStash handle storage and background processing.',
      'Type-safe APIs with tRPC, Zod and Drizzle over PostgreSQL, with Firebase authentication and membership-scoped sync streams.',
      'Automated database migrations between the production build and publish steps, with locking to serialize overlapping releases.',
    ],
    sections: [
      {
        heading: 'shared boards',
        points: [
          'Multi-user homes with invitations, shared fridge notes, a TV feed and a photobook behind Google sign-in.',
          'The illustrated interface is shared across Next.js, Capacitor Android and Electron Windows apps.',
          'Native screens read watched local SQLite data, while the web app uses its online tRPC data path.',
        ],
      },
      {
        heading: 'offline native apps',
        points: [
          'Text edits and pending operations commit locally together before network delivery. Stable operation IDs and server receipts make retries idempotent.',
          'PowerSync streams authorized rows from PostgreSQL into account-scoped SQLite databases, with subscriptions narrowed by home, board and archive month.',
          'Original photos and videos persist before local acknowledgement. Separate metadata and attachment queues preserve pending work across restarts.',
          'System-browser sign-in uses a verifier-bound approval flow. Sign-out offers sync first, retain local work or cancel.',
        ],
      },
      {
        heading: 'web realtime',
        points: [
          'tRPC subscriptions over SSE use Redis pub/sub to fan out board and media invalidation events across server instances.',
          'Reconnect resubscribes and refetches state, keeping PostgreSQL as the source of truth.',
        ],
      },
      {
        heading: 'media delivery and recovery',
        points: [
          'Presigned uploads bind native transfers to a SHA-256 checksum, followed by server verification before acceptance.',
          'Persistent retry state, protected pending originals and recovery jobs handle interrupted uploads and delayed media processing.',
          'QStash workers generate thumbnails and video posters, clean removed variants and archive expired reels.',
          'Android uses native filesystem and transfer plugins; Windows keeps originals in account-scoped browser storage.',
        ],
      },
      {
        heading: 'releases and verification',
        points: [
          'The web backend uses Vercel, Neon PostgreSQL, Upstash Redis/QStash, AWS S3 and Firebase. AWS CDK defines the private bucket and scoped IAM access policies. Tagged workflows build Android APKs and Windows installers.',
          'Added build, migration and publish sequencing, with a PostgreSQL lock to serialize overlapping database releases and fail publication when migrations fail.',
          'Tests cover durable SQLite writes, retry identity, media verification and native transfer behavior. Development sync and Android emulator photo flows were also exercised.',
        ],
      },
    ],
    links: [{ label: 'Live site', url: 'https://noted-six-chi.vercel.app/' }],
  },
  {
    slug: 'zerosum',
    level: 2,
    title: 'zerosum',
    tagline: 'Mobile trading app on Alpaca',
    story:
      "When IBKR access started getting restricted for Filipinos — pushed toward a local market I don't trust with my money — I needed a backup. So I built one I actually use: my own trading app on Alpaca, from portfolio down to the order ticket. No hype, no users to impress. Just the tool I open when I need to invest and don't want to ask permission.",
    demos: [
      {
        src: '/demos/zerosum/zerosum-demo.mp4',
        filename: 'zerosum-demo.mp4',
        caption: 'Demo: zerosum walkthrough (screen recording).',
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
    links: [],
  },
  {
    slug: 'pineapple-agent',
    level: 3,
    title: 'pineapple-agent',
    tagline: 'Multi-agent backend runtime',
    demos: [
      {
        src: '/demos/pineapple-agent/agent-control-loop.mp4',
        filename: 'agent-control-loop.mp4',
        caption: 'Agent control loop: trigger → plan → act → verify from the dev CLI.',
      },
      {
        src: '/demos/pineapple-agent/mobile-audio-loop.mp4',
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
    sections: [
      {
        heading: 'runtime core',
        points: [
          'Trigger → routing → dispatch → approval → recovery pipeline; runs restore from durable Postgres/Drizzle stores.',
          'Agent manifests plus a toolset registry, with pluggable session backends including Codex MCP.',
          'Execution decisions stored separately from executions, so the reasoning behind a run survives restarts.',
        ],
      },
      {
        heading: 'adapters',
        points: [
          'Telegram control plane: webhook intake, thread selection, and send-message tools.',
          'Cron scheduler with a Drizzle job store: reminders, schedules, and list/delete tooling.',
          'Shortcut client: stories, comments, and verified webhook triggers.',
          'Assistant audio bridge: Spotify auth/client plus OpenAI TTS with request and playback tracking.',
        ],
      },
      {
        heading: 'clients',
        points: [
          'Expo mobile app: speech-recognition input, streaming audio replies, React Query + Zustand state.',
          'Static marketing site with run-flow demo clips, hosted on Firebase.',
          'One-command dev runner (`pnpm pineapple`) with Tailscale and mobile-env support.',
        ],
      },
    ],
    links: [
      { label: 'Live site', url: 'https://freshpineappleagent.web.app/' },
    ],
  },
  {
    slug: 'password-manager',
    level: 4,
    title: 'password-manager',
    tagline: 'Encrypted vault for credentials',
    story:
      'The free password manager I relied on suddenly wanted a monthly subscription — just to keep doing the one thing I used it for: holding my passwords. So I built my own. This was before vibe-coding; there was no agent to hand the crypto to. I studied how envelope encryption actually works — PBKDF2 key derivation, AES-GCM, a data key that never leaves memory — and built the vault I wanted to trust.',
    demos: [
      {
        src: '/demos/password-manager/password-manager-demo.mp4',
        filename: 'password-manager-demo.mp4',
        caption: 'Demo: password-manager walkthrough (screen recording).',
      },
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'WebCrypto'],
    highlights: [
      'Client-side envelope encryption: PBKDF2-derived KEK wraps a random 256-bit DEK (AES-GCM).',
      'DEK lives in memory only — lock wipes it; passwords are encrypted before they touch the network.',
      'Cloud-backed with Firebase Auth + Firestore realtime sync and local encrypted cache.',
      'Login/register plus passphrase unlock flow with per-item CRUD and search.',
    ],
    links: [],
  },
  {
    slug: 'automation-system',
    level: 5,
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
    sections: [
      {
        heading: 'n8n car assistant',
        points: [
          'Capture path: free text in → OpenAI extraction → structured notes, events, odometer, and reminders.',
          'Ask path: AI agent with 11 tools over the same tables, plus a chat harness for testing.',
          'Watch loop: daily schedule pushes due reminders to Discord and rolls recurring ones forward.',
          'Six tables: vehicles, notes, events, reminders, service categories, pending actions.',
        ],
      },
      {
        heading: 'openclaw agents',
        points: [
          'Five agents — main, jobs (Egg), products (Scout), general, car — each with its own workspace and SQLite memory.',
          'Egg scans job posts with browser-verified leads and PH/remote filters.',
          'Scout hunts marketplace deals with anti-scam verification rules.',
          'Discord bindings route each agent’s findings to its own channel.',
        ],
      },
      {
        heading: 'safety model',
        points: [
          'Agent edits and deletes go through staged tool sub-workflows, never direct writes.',
          'Deletes land in a pending-actions queue with expiry, then require confirmation.',
        ],
      },
    ],
    links: [],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    name: 'Cloud & Infrastructure',
    items: 'AWS (S3, IAM, CDK), infrastructure as code, Firebase, Vercel',
  },
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
