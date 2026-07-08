export const site = {
  name: "Moldstep",
  legalName: "Moldstep LLC",
  tagline: "Custom AI applications and IT consulting",
  description:
    "Moldstep LLC builds custom AI-powered applications and provides pragmatic IT consulting — from strategy to shipped software.",
  email: "hello@moldstep.com",
  url: "https://moldstep.com",
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

export type SceneKind = "ai" | "auto" | "web" | "plan" | "ops" | "data";

export interface Service {
  num: string;
  kind: SceneKind;
  tag: string;
  title: string;
  /** Short copy for the homepage grid. */
  blurb: string;
  /** Full copy for the services page. */
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    num: "01",
    kind: "ai",
    tag: "AI",
    title: "Custom AI Applications",
    blurb:
      "LLM apps, chat assistants, document intelligence, and decision-support tools built around your data and workflows.",
    description:
      "End-to-end design and development of AI-powered products — LLM apps, chat assistants, document intelligence, and decision-support tools built around your data and workflows.",
    points: [
      "LLM-powered products and copilots",
      "Retrieval-augmented generation (RAG) over your data",
      "Model evaluation, guardrails, and monitoring",
    ],
  },
  {
    num: "02",
    kind: "auto",
    tag: "AI",
    title: "AI Integration & Automation",
    blurb:
      "We plug AI into the systems you already run — document processing, support triage, back-office work with measurable ROI.",
    description:
      "We plug AI into the systems you already run. Automate document processing, support triage, reporting, and repetitive back-office work with measurable ROI.",
    points: [
      "Workflow and back-office automation",
      "AI features inside existing products",
      "Integration with CRMs, ERPs, and internal tools",
    ],
  },
  {
    num: "03",
    kind: "web",
    tag: "Build",
    title: "Web & Mobile Development",
    blurb:
      "Modern, fast, maintainable applications — from marketing sites to complex SaaS platforms — shipped with CI/CD from day one.",
    description:
      "Modern, fast, maintainable applications — from marketing sites to complex SaaS platforms — built with proven stacks and shipped with CI/CD from day one.",
    points: [
      "SaaS platforms and internal tools",
      "High-performance websites and portals",
      "API design and third-party integrations",
    ],
  },
  {
    num: "04",
    kind: "plan",
    tag: "Advise",
    title: "IT Strategy Consulting",
    blurb:
      "Senior technical guidance without the enterprise overhead — architecture, stack, and roadmap before you commit budget.",
    description:
      "Senior technical guidance without the enterprise overhead. We help you choose the right architecture, stack, and roadmap before you commit budget.",
    points: [
      "Technical audits and architecture reviews",
      "AI-readiness and adoption roadmaps",
      "Vendor and build-vs-buy evaluations",
    ],
  },
  {
    num: "05",
    kind: "ops",
    tag: "Operate",
    title: "Cloud & DevOps",
    blurb: "Cloud environments, pipelines, and observability so your team ships faster and sleeps better.",
    description:
      "Reliable infrastructure that scales with you. We set up cloud environments, pipelines, and observability so your team ships faster and sleeps better.",
    points: [
      "Cloud architecture and migrations",
      "CI/CD pipelines and infrastructure as code",
      "Monitoring, alerting, and cost optimization",
    ],
  },
  {
    num: "06",
    kind: "data",
    tag: "Data",
    title: "Data Engineering & Analytics",
    blurb:
      "Pipelines, warehouses, and dashboards that give you one version of the truth — and a foundation for AI.",
    description:
      "Turn scattered data into a foundation for decisions — and for AI. Pipelines, warehouses, and dashboards that give you one version of the truth.",
    points: [
      "Data pipelines and warehousing",
      "Dashboards and reporting",
      "Data preparation for AI and ML workloads",
    ],
  },
];

export type ArtKind = "docs" | "calendar" | "roadmap";

export interface CaseStudy {
  art: ArtKind;
  category: string;
  title: string;
  summary: string;
  /** Headline result for the homepage card footer. */
  result: string;
  results: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    art: "docs",
    category: "Custom AI Application",
    title: "AI document assistant for a logistics operator",
    summary:
      "Replaced manual review of shipping documents with an AI assistant that extracts, validates, and routes paperwork automatically.",
    result: "85% less manual document handling",
    results: [
      "85% less manual document handling",
      "Processing time cut from hours to minutes",
      "Deployed and adopted in under 3 months",
    ],
  },
  {
    art: "calendar",
    category: "Web Development",
    title: "Booking platform for a wellness business",
    summary:
      "Designed and built a full scheduling and booking platform — classes, payments, and an admin panel — on a modern serverless stack.",
    result: "Online bookings from day one",
    results: ["Online bookings from day one", "Zero-maintenance serverless hosting", "Admin time reduced by half"],
  },
  {
    art: "roadmap",
    category: "IT Consulting",
    title: "AI adoption roadmap for a mid-size enterprise",
    summary:
      "Audited existing systems and data, identified high-ROI automation candidates, and delivered a phased AI adoption plan the internal team could execute.",
    result: "3 quick wins shipped in first quarter",
    results: [
      "12 automation opportunities identified",
      "3 quick wins shipped within the first quarter",
      "Clear 18-month technology roadmap",
    ],
  },
];
