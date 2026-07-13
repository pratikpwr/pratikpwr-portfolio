import type {
  AboutMetaRow,
  ContactLink,
  ExperienceItem,
  MethodItem,
  ShowcaseScene,
  StatItem,
  WorkItem,
} from './types';

export const aboutMeta: AboutMetaRow[] = [
  { label: 'Now', valueHtml: '<b>Software Crafter II</b>, Incubyte — remote' },
  { label: 'Education', valueHtml: 'B.E. Computer Science, SITRC Nashik · CGPA 8.8' },
  { label: 'Community', valueHtml: '<b>Speaker</b>, Flutter Nashik · <b>Host</b>, tech meetups' },
  { label: 'Base', valueHtml: 'Nashik, India — remote-ready, IST' },
];

export const stats: StatItem[] = [
  {
    value: '5+',
    label: 'Years shipping mobile',
    detail: 'in production since 2021',
  },
  {
    value: '11',
    label: 'Apps built & shipped',
    detail: '6 on the Play Store, 4 OSS / tools, 1 web',
  },
  {
    value: '−12',
    suffix: '%',
    label: 'Transaction costs',
    detail: 'card-reader integrations at eatOS',
  },
  {
    value: '+30',
    suffix: '%',
    label: 'Weekly active users',
    detail: 'launchpads at FarmSetu',
  },
];

export const showcaseScenes: ShowcaseScene[] = [
  {
    id: 'healthcare',
    sceneClass: 's5',
    title: 'Healthcare',
    ghost: 'Health<br>care',
    indexLabel: '01 / 05',
    image: 'seedpods',
    apps: [{ label: 'Spring Health ↗', href: 'https://www.springhealth.com/' }],
    meta: [
      { label: 'Platform', value: 'Spring Health — mental health benefits' },
      { label: 'Result', value: 'member-facing care & booking flows' },
      { label: 'Stack', value: 'Flutter · Firebase · Telehealth APIs' },
    ],
  },
  {
    id: 'restaurant',
    sceneClass: 's1',
    title: 'Restaurant Tech',
    ghost: 'Restaurant<br>Tech',
    indexLabel: '02 / 05',
    image: 'seedhead',
    apps: [
      { label: 'eatOS POS ↗', href: 'https://play.google.com/store/apps/details?id=com.eatos.pos' },
      { label: 'Kitchen Display System ↗', href: 'https://play.google.com/store/apps/details?id=com.poslabs.eoskds' },
      { label: 'Point of Purchase ↗', href: 'https://www.eatos.com/' },
    ],
    meta: [
      { label: 'Platform', value: 'eatOS — US / UK' },
      { label: 'Result', value: 'transaction costs', highlight: '−12%' },
      { label: 'Stack', value: 'Flutter · Stripe · Adyen · NFC' },
    ],
  },
  {
    id: 'agri',
    sceneClass: 's2',
    title: 'Agri-Tech',
    ghost: 'Agri-<br>Tech',
    indexLabel: '03 / 05',
    image: 'grass',
    apps: [
      { label: 'SetuFarm ↗', href: 'https://play.google.com/store/apps/details?id=co.setu.farm' },
      { label: 'SetuTrade ↗', href: 'https://play.google.com/store/apps/details?id=co.setu.trade' },
    ],
    meta: [
      { label: 'Platform', value: 'FarmSetu — Nashik' },
      { label: 'Result', value: 'weekly active users', highlight: '+30%' },
      { label: 'Stack', value: 'Flutter · Firebase · GraphQL' },
    ],
  },
  {
    id: 'civic',
    sceneClass: 's3',
    title: 'Civic & Home',
    ghost: 'Civic &amp;<br>Home',
    indexLabel: '04 / 05',
    image: 'leaf',
    apps: [
      { label: 'Police Patil System ↗', href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.policepatil' },
      { label: 'Nearme ↗', href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.nearme' },
    ],
    meta: [
      { label: 'Platform', value: 'DreamCare — Pune' },
      { label: 'Result', value: 'app performance', highlight: '+20%' },
      { label: 'Stack', value: 'Flutter · Maps · Web dashboard' },
    ],
  },
  {
    id: 'devtools',
    sceneClass: 's4',
    title: 'Developer Tools',
    ghost: 'Developer<br>Tools',
    indexLabel: '05 / 05',
    image: 'fern',
    apps: [
      { label: 'Nirmo ↗', href: 'https://nirmo.dev' },
      { label: 'graphql_network_devtools ↗', href: 'https://pub.dev/packages/graphql_network_devtools' },
      { label: 'Mason codegen templates ↗', href: 'https://github.com/pratikpwr' },
    ],
    meta: [
      { label: 'Platform', value: 'Nirmo · pub.dev · open source' },
      { label: 'Result', value: 'boilerplate', highlight: '1h → 5m', highlightPosition: 'after' },
      { label: 'Stack', value: 'Flutter · Node.js · LLM · DevTools' },
    ],
  },
];

export const workItems: WorkItem[] = [
  {
    id: 'nirmo',
    title: 'Nirmo',
    org: 'Personal · AI tooling',
    href: 'https://nirmo.dev',
    cta: 'nirmo.dev ↗',
    description:
      'AI-powered Flutter app builder that turns natural-language prompts into create, edit, and live-preview workflows across multiple device form factors — desktop-first tooling with Claude Sonnet and LLM agents in the loop.',
    stack: 'Flutter · Dart · Node.js · TypeScript · Claude · LLM',
  },
  {
    id: 'eatos-pos',
    title: 'eatOS POS',
    org: 'eatOS · 2023–25',
    href: 'https://play.google.com/store/apps/details?id=com.eatos.pos',
    cta: 'Play Store ↗',
    description:
      'Core restaurant POS for US and UK merchants — inventory, menus, employee management, and multi-gateway payments including physical card readers and tap-to-pay.',
    stack: 'Flutter · Stripe · Adyen · NFC · method channels',
  },
  {
    id: 'eatos-kds',
    title: 'Kitchen Display System',
    org: 'eatOS · 2023–25',
    href: 'https://play.google.com/store/apps/details?id=com.poslabs.eoskds',
    cta: 'Play Store ↗',
    description:
      'Synchronized kitchen ticketing across POS, POP, kiosks, and online ordering so ticket flow stays reliable through peak dinner service.',
    stack: 'Flutter · real-time sync · restaurant ops',
  },
  {
    id: 'eatos-pop',
    title: 'Point of Purchase',
    org: 'eatOS · 2023–25',
    href: 'https://www.eatos.com/',
    cta: 'eatos.com ↗',
    description:
      'Handheld ordering and payment companion for floor staff — card and NFC checkout beside the table, wired into the same payment stack as POS.',
    stack: 'Flutter · NFC · payments · handheld UX',
  },
  {
    id: 'setufarm',
    title: 'SetuFarm',
    org: 'FarmSetu · 2021–23',
    href: 'https://play.google.com/store/apps/details?id=co.setu.farm',
    cta: 'Play Store ↗',
    description:
      'Agri-commerce and learning launchpad for Indian farmers — commerce, finance/ops, weather, articles, and courses that helped drive a 30% lift in weekly active users.',
    stack: 'Flutter · Firebase · GraphQL · analytics',
  },
  {
    id: 'setutrade',
    title: 'SetuTrade',
    org: 'FarmSetu · 2021–23',
    href: 'https://play.google.com/store/apps/details?id=co.setu.trade',
    cta: 'Play Store ↗',
    description:
      'Commodity trade recording for buyers and retailers — inbound trade capture built on the same flavors, analytics, Sentry, and payment foundations as SetuFarm.',
    stack: 'Flutter · Firebase · GraphQL · Sentry',
  },
  {
    id: 'nearme',
    title: 'Nearme',
    org: 'DreamCare · 2021',
    href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.nearme',
    cta: 'Play Store ↗',
    description:
      'Home-services marketplace improved end to end — stability fixes, new features, and SEO on the companion web app that lifted performance by ~20% and improved acquisition.',
    stack: 'Flutter · Maps · SEO · web',
  },
  {
    id: 'police-patil',
    title: 'Police Patil System',
    org: 'DreamCare · 2021',
    href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.policepatil',
    cta: 'Play Store ↗',
    description:
      '0→1 digitization of village-assigned activity tracking — mobile reporting plus a Flutter web dashboard with analytics for police administrators.',
    stack: 'Flutter · web dashboard · reporting',
  },
  {
    id: 'safepass',
    title: 'SafePass',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/safepass',
    cta: 'GitHub ↗',
    description:
      'Encrypted offline password manager with local-only storage and a built-in random password generator — security without a cloud dependency.',
    stack: 'Flutter · Dart · Bloc · Encrypt · Hive',
  },
  {
    id: 'college-buddy',
    title: 'College Buddy',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/TimeTable-APP',
    cta: 'GitHub ↗',
    description:
      'Campus timetable and notice app — students see current and upcoming lectures; teachers upload timetables, assignments, and announcements.',
    stack: 'Flutter · Dart · Bloc · Flask · Python',
  },
  {
    id: 'swipeup-news',
    title: 'SwipeUp News',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/SwipeUp-News',
    cta: 'GitHub ↗',
    description:
      'Category-based news reader with detailed article views, powered by NewsAPI.org for live headlines and search.',
    stack: 'Flutter · Dart · REST API',
  },
];

export const experience: ExperienceItem[] = [
  {
    year: "'25",
    period: 'Aug 2025 — now · remote',
    company: 'Incubyte',
    companyHref: 'https://www.incubyte.co/',
    role: 'Software Crafter II',
    summary:
      'Consulting-grade software crafting on client engagements — translating complex requirements into actionable tickets, raising technical and delivery risks early, and facilitating Scrum ceremonies including retrospectives. Advocate for XP practices: TDD, pair programming, continuous integration, and systematic refactoring, with AI agentic tooling in the daily loop.',
    wins: [
      {
        html: 'Published <a href="https://pub.dev/packages/graphql_network_devtools" target="_blank" rel="noopener noreferrer">graphql_network_devtools</a> — <b>GraphQL debugging inside Flutter DevTools</b>.',
      },
      {
        html: 'Built an AI agent that mines PR reviews into <b>shared best practices</b> for the mobile guild.',
      },
      {
        html: '<b>TDD by default</b> — high coverage with AI leverage, humans defining “correct”.',
      },
    ],
  },
  {
    year: "'23",
    period: 'Jul 2023 — Jun 2025 · USA, remote',
    company: 'eatOS',
    companyHref: 'https://www.eatos.com/',
    role: 'Senior Flutter Developer',
    summary:
      'Core features for a US/UK restaurant-tech platform spanning POS, kitchen display, and point-of-purchase — integrating international payment gateways, native code and method channels, and clearing the complex tickets others could not. Continuously improved performance, paid down technical debt, and stepped in to prioritize work and unblock the team when leadership was unavailable.',
    wins: [
      {
        html: 'Physical card-reader and tap-to-pay integrations — merchants route payments through the cheapest platform, <b>−12% transaction costs</b>.',
      },
      {
        html: 'International payment gateways via <b>native code and method channels</b> for UK and USA markets.',
      },
      {
        html: 'Owned hard bugs and feature work across POS / KDS / POP while keeping dinner-rush reliability intact.',
      },
    ],
  },
  {
    year: "'21",
    period: 'Dec 2021 — Jul 2023 · Nashik',
    company: 'FarmSetu',
    companyHref: 'https://www.farmsetu.co/',
    role: 'Mobile Application Developer',
    summary:
      'Agri-tech for Indian farmers and traders — led initial project setup with flavors, analytics, Sentry, notifications, and payments so the apps had a solid production foundation. Built high-impact commerce and e-learning launchpads on SetuFarm, and trade-recording flows on SetuTrade for buyers and retailers.',
    wins: [
      {
        html: 'Custom Mason codegen template — boilerplate from <b>an hour to five minutes</b>.',
      },
      {
        html: 'E-commerce and e-learning launchpads — <b>+30% weekly active users</b>.',
      },
      {
        html: 'Production foundations: <b>flavors, analytics, Sentry, notifications, payments</b>.',
      },
    ],
  },
  {
    year: "'21",
    period: 'Jan — Nov 2021 · Pune',
    company: 'DreamCare Developers',
    companyHref: 'https://dreamcaredevelopers.com/',
    role: 'Flutter Developer',
    summary:
      'First professional Flutter role — shipped two products end to end across mobile and web. Hardened the Nearme home-services app with fixes and features aimed at retention, and designed Police Patil from scratch with reporting, analytics, and an administrative Flutter web dashboard. Also applied SEO on the Nearme web surface to improve visibility and acquisition.',
    wins: [
      {
        html: 'Nearme home-services app — fixes and features, <b>+20% performance</b>, stronger retention.',
      },
      {
        html: '<b>Police Patil System</b> built 0→1, plus a Flutter web dashboard for administrators.',
      },
      {
        html: 'Nearme web SEO optimizations that improved <b>visibility and user acquisition</b>.',
      },
    ],
  },
];

export const methodQuote =
  '“I build with <b>AI agents</b> the way earlier generations used IDEs — agents wrapped in tests, guardrails, and a human who reads every diff.”';

export const methodItems: MethodItem[] = [
  {
    number: '01',
    title: 'Agents in the loop',
    bodyHtml:
      'Cursor and Claude Code as daily drivers — scaffolding, refactors, first-pass reviews, and tools like <a href="https://nirmo.dev" target="_blank" rel="noopener noreferrer">Nirmo</a> that put LLMs inside the Flutter build loop.',
  },
  {
    number: '02',
    title: 'Tests before trust',
    bodyHtml: 'TDD by default. AI maintains coverage; humans decide what “correct” means.',
  },
  {
    number: '03',
    title: 'Tools worth shipping',
    bodyHtml:
      '<a href="https://pub.dev/packages/graphql_network_devtools" target="_blank" rel="noopener noreferrer">graphql_network_devtools</a> on pub.dev; Mason templates that erase boilerplate; Nirmo for prompt-to-Flutter prototyping.',
  },
  {
    number: '04',
    title: 'Compounding learning',
    bodyHtml: 'An agent that distils PR-review history into shared team practice.',
  },
];

export const contactLinks: ContactLink[] = [
  { href: 'tel:+917218172664', label: '+91 72181 72664', detail: 'Phone' },
  {
    href: 'https://github.com/pratikpwr',
    label: 'github.com/pratikpwr',
    detail: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/pratikpwr/',
    label: 'linkedin.com/in/pratikpwr',
    detail: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://x.com/impratikpwr',
    label: 'x.com/impratikpwr',
    detail: 'X',
    external: true,
  },
  {
    href: 'https://drive.google.com/file/d/1leXRA5M61I4nziQzX8AtsRccU00caiI7/view?usp=sharing',
    label: 'Résumé',
    detail: 'PDF ↗',
    external: true,
  },
];

export const resumeHref =
  'https://drive.google.com/file/d/1leXRA5M61I4nziQzX8AtsRccU00caiI7/view?usp=sharing';
