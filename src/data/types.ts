export interface AppLink {
  label: string;
  href: string;
}

export interface SceneMeta {
  label: string;
  value: string;
  /** Optional metric rendered in red serif emphasis */
  highlight?: string;
  highlightPosition?: 'before' | 'after';
}

export interface ShowcaseScene {
  id: string;
  /** CSS scene class used by motion styles (s1–s5) */
  sceneClass: string;
  title: string;
  ghost: string;
  indexLabel: string;
  image: 'seedpods' | 'seedhead' | 'grass' | 'leaf' | 'fern';
  apps: AppLink[];
  meta: SceneMeta[];
}

export interface WorkItem {
  id: string;
  title: string;
  org: string;
  href: string;
  cta: string;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  detail: string;
}

export interface AboutMetaRow {
  label: string;
  /** HTML fragment for the definition value (allows <b>) */
  valueHtml: string;
}

export interface ExperienceWin {
  /** HTML fragment for list item content */
  html: string;
}

export interface ExperienceItem {
  year: string;
  period: string;
  company: string;
  companyHref: string;
  role: string;
  summary: string;
  wins: ExperienceWin[];
}

export interface MethodItem {
  number: string;
  title: string;
  /** HTML fragment for body copy */
  bodyHtml: string;
}

export interface ContactLink {
  href: string;
  label: string;
  detail: string;
  external?: boolean;
}
