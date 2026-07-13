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
    value: '10',
    label: 'Apps built & shipped',
    detail: '6 on the Play Store, 3 open-source, 1 web',
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
      { label: 'graphql_network_devtools ↗', href: 'https://pub.dev/packages/graphql_network_devtools' },
      { label: 'Mason codegen templates ↗', href: 'https://github.com/pratikpwr' },
    ],
    meta: [
      { label: 'Platform', value: 'pub.dev · open source' },
      { label: 'Result', value: 'boilerplate', highlight: '1h → 5m', highlightPosition: 'after' },
      { label: 'Stack', value: 'Dart · DevTools · AI agents' },
    ],
  },
];

export const workItems: WorkItem[] = [
  {
    id: 'eatos-pos',
    title: 'eatOS POS',
    org: 'eatOS · 2023–25',
    href: 'https://play.google.com/store/apps/details?id=com.eatos.pos',
    cta: 'Play Store ↗',
  },
  {
    id: 'eatos-kds',
    title: 'Kitchen Display System',
    org: 'eatOS · 2023–25',
    href: 'https://play.google.com/store/apps/details?id=com.poslabs.eoskds',
    cta: 'Play Store ↗',
  },
  {
    id: 'eatos-pop',
    title: 'Point of Purchase',
    org: 'eatOS · 2023–25',
    href: 'https://www.eatos.com/',
    cta: 'eatos.com ↗',
  },
  {
    id: 'setufarm',
    title: 'SetuFarm',
    org: 'FarmSetu · 2021–23',
    href: 'https://play.google.com/store/apps/details?id=co.setu.farm',
    cta: 'Play Store ↗',
  },
  {
    id: 'setutrade',
    title: 'SetuTrade',
    org: 'FarmSetu · 2021–23',
    href: 'https://play.google.com/store/apps/details?id=co.setu.trade',
    cta: 'Play Store ↗',
  },
  {
    id: 'nearme',
    title: 'Nearme',
    org: 'DreamCare · 2021',
    href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.nearme',
    cta: 'Play Store ↗',
  },
  {
    id: 'police-patil',
    title: 'Police Patil System',
    org: 'DreamCare · 2021',
    href: 'https://play.google.com/store/apps/details?id=com.dcdevelopers.policepatil',
    cta: 'Play Store ↗',
  },
  {
    id: 'safepass',
    title: 'SafePass',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/safepass',
    cta: 'GitHub ↗',
  },
  {
    id: 'college-buddy',
    title: 'College Buddy',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/TimeTable-APP',
    cta: 'GitHub ↗',
  },
  {
    id: 'swipeup-news',
    title: 'SwipeUp News',
    org: 'Open source',
    href: 'https://github.com/pratikpwr/SwipeUp-News',
    cta: 'GitHub ↗',
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
      'Consulting-grade software crafting — client-facing, de-risking delivery early, facilitating scrum.',
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
      'Core features for a US/UK restaurant-tech platform — the engineer who closed the tickets nobody else could.',
    wins: [
      {
        html: 'Physical card-reader integrations — merchants route payments through the cheapest platform, <b>−12% transaction costs</b>.',
      },
      {
        html: 'International payment gateways via <b>native code and method channels</b>.',
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
      'Agri-tech for Indian farmers — laid the app foundation: flavors, analytics, Sentry, notifications, payments.',
    wins: [
      {
        html: 'Custom Mason codegen template — boilerplate from <b>an hour to five minutes</b>.',
      },
      {
        html: 'E-commerce and e-learning launchpads — <b>+30% weekly active users</b>.',
      },
    ],
  },
  {
    year: "'21",
    period: 'Jan — Nov 2021 · Pune',
    company: 'DreamCare Developers',
    companyHref: 'https://dreamcaredevelopers.com/',
    role: 'Software Developer',
    summary: 'First professional role — two products end to end, mobile and web.',
    wins: [
      {
        html: 'Nearme home-services app — fixes and features, <b>+20% performance</b>.',
      },
      {
        html: '<b>Police Patil System</b> built 0→1, plus a Flutter web dashboard for administrators.',
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
      'Cursor and Claude Code as daily drivers — scaffolding, refactors, first-pass reviews.',
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
      '<a href="https://pub.dev/packages/graphql_network_devtools" target="_blank" rel="noopener noreferrer">graphql_network_devtools</a> on pub.dev; Mason templates that erase boilerplate.',
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
