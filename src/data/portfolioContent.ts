import type { Locale } from '../i18n/config';

export interface IdentityRow {
  field: string;
  value: string;
  href?: string;
}

export interface StoryChapter {
  id: string;
  code: string;
  title: string;
  body: string;
}

export interface EducationEntry {
  stage: string;
  institution: string;
  qualification: string;
  detail: string;
}

export interface InfluencePoint {
  title: string;
  description: string;
}

export interface CoreValueItem {
  number: string;
  title: string;
  description: string;
}

export interface UseCaseItem {
  number: string;
  title: string;
  description: string;
}

export interface FeaturedProductItem {
  id: string;
  code: string;
  name: string;
  url: string;
  category: string;
  role: string;
  statusBadge: string;
  isProvisional?: boolean;
  conciseSummary: string;
  overview: string;
  useCases: [UseCaseItem, UseCaseItem, UseCaseItem];
  stack: string[];
  repoUrl?: string;
  relatedLinks?: { label: string; href: string }[];
  note?: string;
}

export interface PrototypeExplorationItem {
  id: string;
  code: string;
  title: string;
  statusBadge: string;
  summary: string;
  details: string;
  links?: { label: string; href: string }[];
}

export interface CapabilityDomainItem {
  domain: string;
  technologies: string;
  evidence: string;
}

export interface LandscapeCategoryItem {
  category: string;
  items: string[];
}

export interface FocusAreaItem {
  id: string;
  title: string;
  description: string;
}

export interface BuilderOfferingItem {
  code: string;
  title: string;
  description: string;
}

export interface ApproachStepItem {
  step: string;
  title: string;
  description: string;
}

export interface TechnicalChallengeItem {
  id: string;
  title: string;
  description: string;
}

export interface SocialChannelItem {
  platform: string;
  handleOrLabel: string;
  href: string;
  note: string;
}

export interface SectionMeta {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface LocalizedPortfolioUI {
  eyebrow: string;
  fullName: string;
  displayName: string;
  headline: string;
  secondaryHeadline: string;
  location: string;
  positioningQuote: string;
  oneLinePositioning: string;
  exploreProductsBtn: string;
  contactBtn: string;
  expandAllLabel: string;
  collapseAllLabel: string;
  clickToExpandHint: string;
  clickToCollapseHint: string;
  overviewLabel: string;
  useCasesLabel: string;
  techStackLabel: string;
  visitSiteLabel: string;
  sourceCodeLabel: string;
  copyEmailLabel: string;
  copiedEmailLabel: string;
  shortBioTitle: string;
  mediumBioTitle: string;
  extendedBioTitle: string;
  identityTableTitle: string;
  formalEducationTitle: string;
  selfDirectedTitle: string;
  backgroundInfluenceTitle: string;
  personalVisionTitle: string;
  personalMissionTitle: string;
  brandVisionTitle: string;
  brandMissionTitle: string;
  coreValuesTitle: string;
  brandMessagingTitle: string;
  workingStrengthsTitle: string;
  learningLandscapeTitle: string;
  focusAreasTitle: string;
  designPhilosophyTitle: string;
  engineeringPhilosophyTitle: string;
  whatIOfferTitle: string;
  projectApproachTitle: string;
  technicalChallengesTitle: string;
  highlightsTitle: string;
  closingStatementTitle: string;
  sections: {
    profile: SectionMeta;
    story: SectionMeta;
    education: SectionMeta;
    vision: SectionMeta;
    ecosystem: SectionMeta;
    products: SectionMeta;
    prototypes: SectionMeta;
    capabilities: SectionMeta;
    practice: SectionMeta;
    contact: SectionMeta;
  };
  shortBio: string;
  mediumBio: string;
  extendedBio: string[];
  identityRows: IdentityRow[];
  storyChapters: StoryChapter[];
  educationEntries: EducationEntry[];
  selfDirectedEducation: string;
  backgroundInfluences: InfluencePoint[];
  personalVisionHeadline: string;
  personalVisionBody: string;
  personalMissionHeadline: string;
  personalMissionBody: string;
  ladestackVisionHeadline: string;
  ladestackVisionBody: string;
  ladestackMissionHeadline: string;
  ladestackMissionBody: string;
  coreValues: CoreValueItem[];
  brandMessages: { label: string; quote: string }[];
  ecosystemBlocks: {
    whatItIsTitle: string;
    whatItIsBody: string;
    problemTitle: string;
    problemBody: string;
    audienceTitle: string;
    audiences: { group: string; detail: string }[];
    architectureTitle: string;
    architectureBody: string;
    i18nTitle: string;
    i18nBody: string;
    ownershipTitle: string;
    ownershipItems: { label: string; value: string; href?: string }[];
  };
  featuredProducts: FeaturedProductItem[];
  prototypes: PrototypeExplorationItem[];
  capabilityDomains: CapabilityDomainItem[];
  landscapeCategories: LandscapeCategoryItem[];
  focusAreas: FocusAreaItem[];
  designPhilosophy: string;
  engineeringPhilosophy: string;
  offerings: BuilderOfferingItem[];
  approachSteps: ApproachStepItem[];
  technicalChallenges: TechnicalChallengeItem[];
  highlights: string[];
  contactHeadline: string;
  contactBody: string;
  socialChannels: SocialChannelItem[];
  closingParagraph: string;
  closingGoal: string;
}

const BASE_EN_CONTENT: LocalizedPortfolioUI = {
  eyebrow: 'FOUNDER · LADESTACK',
  fullName: 'Girish Balaso Lade',
  displayName: 'Girish Lade',
  headline: 'UI/UX Designer · Full-Stack Developer · Founder of LadeStack',
  secondaryHeadline: 'Engineer by training. Product builder by choice.',
  location: 'Pune, India',
  positioningQuote:
    'Building fast, accessible, privacy-first web utilities, developer tools, and AI workflows that help people get work done without friction.',
  oneLinePositioning:
    'Independent developer and product designer building LadeStack — browser-first developer utilities, AI workflows, and practical web applications.',
  exploreProductsBtn: 'Products',
  contactBtn: 'Contact',
  expandAllLabel: 'Expand all',
  collapseAllLabel: 'Collapse all',
  clickToExpandHint: 'Expand section',
  clickToCollapseHint: 'Collapse section',
  overviewLabel: 'Overview',
  useCasesLabel: 'Key Use Cases',
  techStackLabel: 'Tech Stack',
  visitSiteLabel: 'Live App',
  sourceCodeLabel: 'GitHub',
  copyEmailLabel: 'Copy Email',
  copiedEmailLabel: 'Copied',
  shortBioTitle: 'Short',
  mediumBioTitle: 'Summary',
  extendedBioTitle: 'Full Story',
  identityTableTitle: 'Quick Facts',
  formalEducationTitle: 'Academic Background',
  selfDirectedTitle: 'Self-Taught Engineering',
  backgroundInfluenceTitle: 'Engineering Mindset',
  personalVisionTitle: 'Personal Vision',
  personalMissionTitle: 'Personal Mission',
  brandVisionTitle: 'LadeStack Vision',
  brandMissionTitle: 'LadeStack Mission',
  coreValuesTitle: 'Core Principles',
  brandMessagingTitle: 'Philosophy',
  workingStrengthsTitle: 'Core Domains',
  learningLandscapeTitle: 'Tech Landscape',
  focusAreasTitle: 'Focus Areas',
  designPhilosophyTitle: 'Design Philosophy',
  engineeringPhilosophyTitle: 'Engineering Philosophy',
  whatIOfferTitle: 'What I Offer',
  projectApproachTitle: '8-Step Workflow',
  technicalChallengesTitle: 'Architecture Focus',
  highlightsTitle: 'Key Highlights',
  closingStatementTitle: 'Closing Note',
  sections: {
    profile: {
      id: 'profile',
      index: '01',
      title: 'About & Identity',
      subtitle: 'Bio, roles & quick facts',
      badge: 'Profile',
    },
    story: {
      id: 'story',
      index: '02',
      title: 'Experience & Journey',
      subtitle: 'Engineering to LadeStack founder',
      badge: '5 Chapters',
    },
    education: {
      id: 'education',
      index: '03',
      title: 'Education',
      subtitle: 'Academic & self-taught engineering',
      badge: 'Academic',
    },
    vision: {
      id: 'vision',
      index: '04',
      title: 'Vision & Values',
      subtitle: 'Mission & 10 core principles',
      badge: '10 Principles',
    },
    ecosystem: {
      id: 'ecosystem',
      index: '05',
      title: 'LadeStack Ecosystem',
      subtitle: 'Browser-first tools & local privacy',
      badge: 'ladestack.in',
    },
    products: {
      id: 'products',
      index: '06',
      title: 'Products & Web Apps',
      subtitle: '9 live apps, use cases & source code',
      badge: '9 Apps',
    },
    prototypes: {
      id: 'prototypes',
      index: '07',
      title: 'Prototypes & R&D',
      subtitle: 'AI builders & web experiments',
      badge: '9 Labs',
    },
    capabilities: {
      id: 'capabilities',
      index: '08',
      title: 'Skills & Tech Stack',
      subtitle: 'Frontend, backend, AI & architecture',
      badge: '10 Domains',
    },
    practice: {
      id: 'practice',
      index: '09',
      title: 'Workflow & Approach',
      subtitle: 'Capabilities & 8-step process',
      badge: 'Process',
    },
    contact: {
      id: 'contact',
      index: '10',
      title: 'Contact & Socials',
      subtitle: 'Email, GitHub, LinkedIn & links',
      badge: 'Connect',
    },
  },
  shortBio:
    "I'm Girish Lade, a UI/UX designer, full-stack developer, and founder of LadeStack. I combine an engineering mindset with design-led product development to build free, useful, and privacy-conscious tools for developers, students, and creators.",
  mediumBio:
    "I'm Girish Balaso Lade, an independent developer and product designer based in Pune, India. My academic path began in Mechanical Engineering, while my professional curiosity took me into web development, interaction design, AI-assisted software creation, and browser-native computing. I founded LadeStack to bring practical tools into one developer-friendly ecosystem: an in-browser code studio, local-first PDF and image utilities, Markdown publishing workflows, a resume builder, a regional land-measurement converter, and additional product experiments. I care about polished interfaces, predictable workflows, responsible privacy design, and removing unnecessary costs or setup barriers.",
  extendedBio: [
    "I'm an engineer by education and a software product builder by choice. My background in Mechanical Engineering shaped how I approach problems: identify constraints, understand the system, simplify the process, and iterate until the result becomes dependable. Over time, that problem-solving mindset found a new outlet in software engineering, UI/UX design, and product architecture.",
    'Today, I design and develop modern websites, full-stack applications, browser-based utilities, and experimental AI-powered developer tools. My work spans the experience users see — information architecture, visual systems, responsive interaction, and accessibility — and the systems that make those experiences possible: TypeScript and Node.js applications, modern frontend frameworks, storage design, authentication patterns, deployment pipelines, and client-side execution environments.',
    'I started LadeStack as an independent product brand built around a straightforward belief: everyday software should be useful before it is complicated. A developer should be able to open an IDE without a burdensome setup; a student should be able to turn notes into a clean PDF; a job seeker should be able to create a professional resume; and someone working with personal documents should not be forced to upload them to an unknown processing server when local processing is practical.',
    'I enjoy turning rough concepts into working product experiences — moving between research, interface design, implementation, debugging, documentation, SEO, and deployment. I frequently explore AI coding agents and multi-model workflows, but treat AI as a development accelerator rather than a substitute for verification, architecture, or user-centered thinking. My long-term goal is to grow LadeStack into a coherent, trustworthy ecosystem that helps more people learn, build, and create.',
  ],
  identityRows: [
    { field: 'Full Name', value: 'Girish Balaso Lade' },
    { field: 'Public Display Name', value: 'Girish Lade' },
    { field: 'Current Base', value: 'Pune, Maharashtra, India' },
    {
      field: 'Professional Roles',
      value:
        'UI/UX Designer · Full-Stack Developer · Developer Tool Builder · Independent Product Creator · Founder of LadeStack',
    },
    {
      field: 'Educational Foundation',
      value:
        "Mechanical Engineering — Diploma (Fabtech Technical Campus); Mechanical Engineering studies at SVERI's College of Engineering, Pandharpur",
    },
    {
      field: 'Primary Focus',
      value:
        'Browser-first developer tools, privacy-first utilities, practical SaaS products, thoughtful UI/UX, and AI-augmented engineering',
    },
    { field: 'Main Brand', value: 'LadeStack' },
    { field: 'Official Website', value: 'https://ladestack.in/', href: 'https://ladestack.in/' },
    {
      field: 'Work Philosophy',
      value:
        'Build practical software with simple onboarding, clean design, useful functionality, and clear privacy boundaries',
    },
    {
      field: 'Product Audience',
      value: 'Developers, students, creators, job seekers, engineers, and everyday internet users',
    },
  ],
  storyChapters: [
    {
      id: 'engineering-foundation',
      code: '2.1',
      title: 'Engineering Foundation',
      body: 'My formal education is rooted in Mechanical Engineering. That foundation introduced me to structured thinking, precision, trade-offs, and the discipline of solving problems within practical limitations. I later applied those same ideas to interface design and software systems: understand the user, define the constraints, make deliberate architectural choices, and improve the solution through iteration.',
    },
    {
      id: 'shift-to-software',
      code: '2.2',
      title: 'Shift to Software & UI/UX',
      body: 'My growing interest in programming and digital products led me into website development, frontend engineering, UI/UX design, and full-stack application development. Instead of thinking of design and engineering as separate disciplines, I learned to connect them. A visually appealing product needs usable interactions; a technically capable product needs clear information architecture and a reliable experience.',
    },
    {
      id: 'building-with-ai',
      code: '2.3',
      title: 'Building With AI Workflows',
      body: 'I actively explore AI-assisted development tools and coding agents to move from concept to prototype faster. This includes using agentic editors, model APIs, code-generation workflows, and review tools as part of a broader engineering process. My interest is especially strong in AI-enhanced developer experiences, BYOK architectures, multi-provider integrations, and the question of which work belongs in the browser versus on a backend.',
    },
    {
      id: 'why-ladestack',
      code: '2.4',
      title: 'Why I Started LadeStack',
      body: "Too many common tasks are made harder by forced registration, intrusive interfaces, limited free tiers, unnecessary file uploads, or fragmented tool choices. LadeStack is my attempt to make the opposite kind of product: focused software that opens quickly, communicates clearly, respects the user's work, and gets out of the way. The ecosystem started with developer-facing ideas and now spans coding, PDF workflows, images, career tools, measurement utilities, and experimental products.",
    },
    {
      id: 'what-drives-me',
      code: '2.5',
      title: 'What Drives My Work',
      body: 'I am especially motivated by software people can actually use, not merely showcase. I value a working prototype over a perfect-looking mockup with no behavior, but I also believe a working product deserves careful typography, responsive layouts, intuitive navigation, and meaningful documentation. I want my work to be approachable for beginners while still useful for experienced developers.',
    },
  ],
  educationEntries: [
    {
      stage: 'Engineering Studies',
      institution: "SVERI's College of Engineering, Pandharpur",
      qualification: 'Mechanical Engineering / B.Tech Studies',
      detail: 'Academic mechanical engineering studies and systems problem-solving foundation.',
    },
    {
      stage: 'Diploma in Engineering',
      institution: 'Fabtech Technical Campus',
      qualification: 'Diploma in Mechanical Engineering',
      detail: 'Completed in 2021 with core training in mechanical systems, precision, and applied engineering.',
    },
    {
      stage: 'Higher Secondary Education',
      institution: 'Higher Secondary Board',
      qualification: '12th Standard',
      detail: 'Higher secondary academic foundation.',
    },
    {
      stage: 'Secondary Education',
      institution: 'Secondary Board',
      qualification: '10th Standard',
      detail: 'Completed secondary schooling foundation.',
    },
  ],
  selfDirectedEducation:
    'Alongside formal engineering studies, I have developed a sustained interest in interface design, frontend and backend application development, databases, cloud services, APIs, developer tooling, and AI systems. My learning approach is project-driven: choose a concrete problem, study the relevant technologies, build a usable version, document shortcomings, and iterate on the implementation.',
  backgroundInfluences: [
    {
      title: 'Systems Thinking',
      description:
        'I approach a product as a connected system involving user flows, state, data, runtime constraints, accessibility, and deployment rather than a collection of isolated screens.',
    },
    {
      title: 'Design & Implementation Together',
      description:
        'I pay attention to both the user-visible interface and the engineering decisions required to make that interface functional.',
    },
    {
      title: 'Continuous Experimentation',
      description:
        'I test unfamiliar frameworks, models, tools, and architecture patterns through actual prototypes rather than treating the popularity of a technology as proof that it is the right choice.',
    },
  ],
  personalVisionHeadline:
    'To help make sophisticated software creation and everyday digital productivity more accessible through practical tools, intuitive design, and open technologies.',
  personalVisionBody:
    'I envision an environment where students, solo developers, emerging founders, and curious creators can move from learning to making without being blocked by high prices, complex setup, fragmented workflows, or a lack of technical resources. Browser technologies and responsible AI assistance have the potential to make powerful capabilities available on ordinary devices. My work is directed toward bringing that potential into usable products.',
  personalMissionHeadline:
    'To design, build, document, and continuously improve software that saves time, respects users, and removes unnecessary barriers to creation.',
  personalMissionBody:
    'My mission is not simply to release more applications. It is to solve concrete problems with a consistent standard of usability: clear interfaces, predictable behavior, practical defaults, transparent limitations, and strong attention to data handling. I want users to understand what a tool does, how it handles their information, and how they can retain ownership of their output.',
  ladestackVisionHeadline:
    'A developer-friendly ecosystem where high-quality tools are accessible, connected by a consistent product philosophy, and useful from the first click.',
  ladestackVisionBody:
    'LadeStack aims to bring together browser-native development, document and media processing, and productivity utilities into an approachable ecosystem. The long-term direction includes more seamless workflows, stronger open-source participation where appropriate, and selective use of AI where it provides clear user benefit.',
  ladestackMissionHeadline:
    'Make essential developer and productivity workflows faster, simpler, more private, and less expensive.',
  ladestackMissionBody:
    'LadeStack prioritizes direct access to practical tools and seeks to avoid unnecessary account creation or server-side handling of user documents where on-device processing is feasible.',
  coreValues: [
    {
      number: '01',
      title: 'Utility Before Hype',
      description: 'A product should solve a real problem and make its value obvious through use.',
    },
    {
      number: '02',
      title: 'Privacy by Architecture',
      description:
        'Prefer local execution, data minimization, and transparent handling of files and API keys when the problem allows it.',
    },
    {
      number: '03',
      title: 'Accessible by Default',
      description:
        'Make important workflows approachable for students, beginners, and independent developers, not only professionals with large budgets.',
    },
    {
      number: '04',
      title: 'Design Clarity',
      description:
        'Make complex functionality understandable through clean hierarchy, useful feedback, accessible controls, and well-organized workflows.',
    },
    {
      number: '05',
      title: 'Technical Honesty',
      description:
        'Distinguish a proposal from a shipped feature; never imply unverified guarantees or synthetic performance figures.',
    },
    {
      number: '06',
      title: 'Ownership & Portability',
      description:
        'Where practical, let users export their documents, source code, or application data in useful standard formats.',
    },
    {
      number: '07',
      title: 'Iteration & Learning',
      description:
        'Treat bugs, testing, documentation, and user feedback as normal parts of creating serious software.',
    },
    {
      number: '08',
      title: 'Open Technologies',
      description:
        'Prefer documented standards, interoperable formats, and open-source components with their licenses respected.',
    },
    {
      number: '09',
      title: 'Performance Consciousness',
      description:
        'Design for responsive experiences, reasonable bundle sizes, and efficient client-side work.',
    },
    {
      number: '10',
      title: 'Responsible AI',
      description:
        'Use AI where it helps, preserve human review and control, and communicate third-party API dependencies clearly.',
    },
  ],
  brandMessages: [
    { label: 'Primary Positioning', quote: 'Useful software. Thoughtful design. Fewer barriers.' },
    { label: 'Developer Focus', quote: 'Building tools that help builders build.' },
    { label: 'Privacy Principle', quote: 'Your tools should work for you — not collect your work.' },
    { label: 'Creator Focus', quote: 'From idea to practical product, one useful tool at a time.' },
  ],
  ecosystemBlocks: {
    whatItIsTitle: 'What LadeStack Is',
    whatItIsBody:
      'LadeStack (https://ladestack.in/) is my independent software product brand and the home for a growing collection of developer utilities, creative productivity tools, and practical web applications. It serves as both a central product directory and a place to communicate engineering principles, product documentation, and development experiments. Its emphasis is on browser-first access, useful free tooling, and local processing where technically practical.',
    problemTitle: 'The Problem LadeStack Addresses',
    problemBody:
      'Common web utilities often require users to juggle multiple websites, upload files they would rather keep locally, pay for basic functionality, or navigate interfaces that are more complicated than the task. LadeStack approaches these workflows as focused product experiences: get to the tool quickly, understand the available actions, complete the task, and leave with a usable result.',
    audienceTitle: 'Who LadeStack Is For',
    audiences: [
      {
        group: 'Students & Learners',
        detail:
          'Quick access to coding, documentation, PDF, resume, and other practical tools without complicated onboarding.',
      },
      {
        group: 'Independent Developers & Small Teams',
        detail:
          'Lightweight prototyping, file processing, project exports, and productivity workflows that complement normal development tools.',
      },
      {
        group: 'Designers & Content Creators',
        detail:
          'Image optimization, polished interfaces, and rapid experimentation with frontend components.',
      },
      {
        group: 'Job Seekers & Early-Career Professionals',
        detail: 'Resume preparation and clearer presentation of skills, education, and projects.',
      },
      {
        group: 'Engineers & Everyday Users',
        detail: 'Helpful regional conversion utilities and convenient document workflows.',
      },
    ],
    architectureTitle: 'Product Principles & Architecture',
    architectureBody:
      "LadeStack's approach favors modern web standards, TypeScript-based interfaces, client-side file transformations, reusable UI patterns, and progressive enhancement. Depending on the tool, the architecture involves Monaco Editor, WebContainers, WebAssembly, Web Workers, Canvas APIs, IndexedDB, browser print capabilities, or a dedicated backend service where synchronization genuinely requires it.",
    i18nTitle: 'International Audience & Multilingual Content Strategy',
    i18nBody:
      'Built with Astro and a native 9-language content architecture covering English (en), Japanese (jp), Korean (ko), Simplified Chinese (zh), Russian (ru), Brazilian Portuguese (pt), Turkish (tr), French (fr), and Spanish (es). Includes semantic HTML, canonical URLs, hreflang metadata, sitemaps, structured data, and static delivery.',
    ownershipTitle: 'Brand Identity & Ownership',
    ownershipItems: [
      { label: 'Independent Brand', value: 'LadeStack (founded & created by Girish Balaso Lade)' },
      { label: 'Primary Domain', value: 'ladestack.in', href: 'https://ladestack.in/' },
      { label: 'Public Contact', value: 'admin@ladestack.in', href: 'mailto:admin@ladestack.in' },
      {
        label: 'GitHub Profile',
        value: 'github.com/girishlade111',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  featuredProducts: [
    {
      id: 'ladestack',
      code: '7.1',
      name: 'LadeStack — Main Platform & Product Directory',
      url: 'https://ladestack.in/',
      category: 'Brand Platform · Developer Ecosystem · Product Directory',
      role: 'Founder, Product Direction, Design, Development & Maintenance',
      statusBadge: 'Flagship Hub',
      conciseSummary:
        'A developer-friendly home for browser-first utilities, product documentation, and practical software.',
      overview:
        "LadeStack is the central home of my independent developer-tool ecosystem. It introduces the brand's mission, organizes specialized applications, and provides routes into product descriptions, technical documentation, FAQs, articles, and contact channels. Built around a browser-first philosophy, its Astro-based multilingual content direction combines product discoverability with practical technical education and a unified presentation of the tools I build.",
      useCases: [
        {
          number: '01',
          title: 'Find the Right Tool for a Specific Task',
          description:
            'A student or developer who needs to edit code, process PDFs, compress an image, or create a resume can browse a central catalog instead of discovering each tool independently. Product summaries communicate intended capabilities and route users to the right application.',
        },
        {
          number: '02',
          title: 'Learn How Browser-First Tools Work',
          description:
            'A technically curious visitor can explore documentation and explanatory articles covering browser-based development, client-side execution, local persistence, and document-processing concepts.',
        },
        {
          number: '03',
          title: 'Discover a Product Builder & Collaborate',
          description:
            'Collaborators, open-source contributors, and developers can understand what LadeStack stands for, review current products, explore connected GitHub repositories, and identify the right contact channel.',
        },
      ],
      stack: ['Astro', 'TypeScript', 'Static Rendering', 'Multilingual i18n', 'SEO & Schema', 'Responsive UI'],
      relatedLinks: [
        { label: 'Products (/apps)', href: 'https://ladestack.in/apps' },
        { label: 'About (/about)', href: 'https://ladestack.in/about' },
        { label: 'Documentation (/docs)', href: 'https://ladestack.in/docs' },
        { label: 'GitHub', href: 'https://github.com/girishlade111' },
      ],
    },
    {
      id: 'gb-coder',
      code: '7.2',
      name: 'GB Coder — Browser-Based IDE & Code Studio',
      url: 'https://code.ladestack.in/',
      category: 'Developer Tools · Online IDE · Code Prototyping',
      role: 'Founder & Product Creator',
      statusBadge: 'Web IDE',
      conciseSummary:
        'A Monaco-based browser IDE for static web prototyping and compatible Node.js/WebContainer workflows.',
      overview:
        'GB Coder is a browser-based development studio for writing, editing, previewing, and experimenting with web applications. It offers a lightweight static-editor workflow for HTML, CSS, and JavaScript, and an advanced WebContainer-powered environment for Node.js-oriented development in compatible browsers. Monaco Editor supplies syntax highlighting, autocomplete, and diagnostics, while local-first IndexedDB persistence preserves workspaces in the browser.',
      useCases: [
        {
          number: '01',
          title: 'Prototype Interfaces Without Local Setup',
          description:
            'A designer, student, or frontend developer can sketch an HTML/CSS/JavaScript component, inspect the immediate preview, and iterate on styling without configuring a local development server.',
        },
        {
          number: '02',
          title: 'Experiment With Framework Projects in the Browser',
          description:
            'A developer working on React, Vue, or a Node.js-compatible starter can use the WebContainer environment on a supported browser to explore package scripts, run a dev server, and test architectural ideas.',
        },
        {
          number: '03',
          title: 'Maintain & Export Portable Learning Projects',
          description:
            'Save work in browser-based local storage and export a ZIP project archive to move seamlessly into a local code editor, a Git repository, or a deployment pipeline.',
        },
      ],
      stack: [
        'Monaco Editor',
        'TypeScript',
        'WebContainers',
        'Node.js Runtime',
        'Sandboxed Previews',
        'IndexedDB',
        'ZIP Export',
      ],
      repoUrl: 'https://github.com/girishlade111/GB-CODER-PUBLIC-ALPHA',
    },
    {
      id: 'ls-pdf',
      code: '7.3',
      name: 'LS PDF — Privacy-First PDF Toolkit',
      url: 'https://pdf.ladestack.in/',
      category: 'Documents · PDF Editing & Conversion',
      role: 'Product Creator & Maintainer',
      statusBadge: '17 PDF Functions',
      conciseSummary:
        'A local-first toolkit for editing, organizing, converting, and processing PDF documents.',
      overview:
        'LS PDF is a browser-oriented PDF utility suite designed to handle common document operations while minimizing unnecessary server-side file handling. Its documented toolkit includes 17 functions covering merging, splitting, compression, page rotation and rearrangement, image/PDF conversion, text extraction, watermarking, metadata, password-related workflows, and repair of damaged PDFs.',
      useCases: [
        {
          number: '01',
          title: 'Organize Everyday PDFs',
          description:
            'A student or professional preparing an application packet can combine multiple PDF documents into a single file, remove unneeded pages, rearrange page order, add page numbers, or rotate scanned pages.',
        },
        {
          number: '02',
          title: 'Prepare Documents for Sharing & Archiving',
          description:
            'Reduce PDF file size, convert image scans into a PDF, export pages as images, or extract text and embedded images when email attachment limits or mobile storage create friction.',
        },
        {
          number: '03',
          title: 'Handle Sensitive Files Locally',
          description:
            'Process personal records, contracts, or confidential drafts directly through in-browser operations and downloadable outputs rather than uploading files to an external conversion server.',
        },
      ],
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'PDF.js',
        'pdf-lib',
        'JSZip',
        'Web Workers',
        'IndexedDB',
        'PWA / Capacitor',
      ],
      repoUrl: 'https://github.com/girishlade111/LS-PDF',
    },
    {
      id: 'md2pdf',
      code: '7.4',
      name: 'MD2PDF — Markdown to PDF & Documentation Book Builder',
      url: 'https://md2pdf.ladestack.in/',
      category: 'Documentation · Markdown Publishing · PDF Creation',
      role: 'Creator & Product Owner under LadeStack',
      statusBadge: 'Docs Publishing',
      conciseSummary:
        'Turn Markdown and repository documentation into polished PDFs and organized document books.',
      overview:
        'MD2PDF (formerly ReadmePDF) is a developer-friendly Markdown publishing tool for transforming Markdown text, local .md files, and compatible GitHub repository content into readable PDF documents. Beyond single-file conversion, it includes a documentation workflow for selecting and ordering repository Markdown chapters, generating a cover and table of contents, and exporting a consolidated book with GitHub-Flavored Markdown, KaTeX math, and syntax highlighting.',
      useCases: [
        {
          number: '01',
          title: 'Convert Technical Notes & READMEs Into Shareable PDFs',
          description:
            'Write Markdown documentation with headings, lists, tables, links, and code blocks, then turn it into a portable PDF for project handoffs, offline reading, or class notes.',
        },
        {
          number: '02',
          title: 'Assemble Multi-File Documentation Books',
          description:
            'Select relevant Markdown files from a repository, organize chapter order, include a contents page, and produce a cohesive documentation package for onboarding or offline distribution.',
        },
        {
          number: '03',
          title: 'Create Consistent Academic & Professional Documents',
          description:
            'Work with styled Markdown, KaTeX mathematical expressions, syntax-highlighted code examples, local draft history, and print-oriented layout settings to create polished deliverables.',
        },
      ],
      stack: [
        'Astro',
        'Markdown / GFM',
        'DOMPurify',
        'KaTeX',
        'Syntax Highlighting',
        'pdf-lib',
        'JSZip',
        'IndexedDB',
        'Print CSS',
      ],
      repoUrl: 'https://github.com/girishlade111/ReadmePDF',
    },
    {
      id: 'bharat-land-converter',
      code: '7.5',
      name: 'Bharat Land Converter — Indian Land Area Unit Converter',
      url: 'https://land.ladestack.in/',
      category: 'Engineering & Measurement · Regional Unit Converter',
      role: 'Product Creator',
      statusBadge: 'Regional Utility',
      conciseSummary:
        'Compare standard and regional Indian land-area units through a region-aware conversion interface.',
      overview:
        'Bharat Land Converter is a land-area conversion tool designed around the practical complexity of Indian measurement systems. Standard units such as square feet, square meters, square yards, acres, and hectares sit alongside regional terms such as Guntha, Bigha, Biswa, Kattha, Dhur, Kanal, Marla, Cent, and Ground, making state-specific reference factors clear and understandable.',
      useCases: [
        {
          number: '01',
          title: 'Compare Regional & Standard Land Units',
          description:
            'Enter an area in a local unit and see equivalent values in square feet, square meters, acres, or hectares for a quick shared frame of reference.',
        },
        {
          number: '02',
          title: 'Understand Cross-State Measurement Differences',
          description:
            'Compare land measurement conventions across Maharashtra, Uttar Pradesh, Bihar, Rajasthan, and other regions where traditional units like Bigha vary by locality.',
        },
        {
          number: '03',
          title: 'Support Preliminary Planning & Field Calculations',
          description:
            'Use for rapid estimation, preliminary planning, and communication before cross-checking against official district survey and land-revenue standards.',
        },
      ],
      stack: [
        'Browser-Side Calculation',
        'Region-Specific Factors',
        'Responsive Numeric UI',
        'Standard & Indian Units',
      ],
      note: 'Designed for estimation and educational reference; always verify formal transactions with official local survey records.',
    },
    {
      id: 'swift-resume',
      code: '7.6',
      name: 'Swift Resume — ATS-Friendly Resume Builder',
      url: 'https://resume.ladestack.in/',
      category: 'Career Productivity · Resume Creation',
      role: 'Product Creator',
      statusBadge: 'Career Tool',
      conciseSummary:
        'Create structured, recruiter-friendly resumes with live A4 preview and PDF export.',
      overview:
        'Swift Resume is a free browser-based resume builder created to simplify presenting education, work experience, skills, projects, and professional contact details in a structured document. It combines responsive form-based editing, template selection, an A4 live preview, PDF export, and browser-local draft persistence without requiring a hosted account.',
      useCases: [
        {
          number: '01',
          title: 'Build a First Professional Resume',
          description:
            'Gather education history, technical skills, personal projects, and contact links into a coherent resume without fighting complex document layout software.',
        },
        {
          number: '02',
          title: 'Tailor a Resume for Different Opportunities',
          description:
            'Adjust the professional summary, reorder skills, and emphasize relevant projects while inspecting the immediate effect in a live A4 preview.',
        },
        {
          number: '03',
          title: 'Export a Clean, Portable Application Document',
          description:
            'Prepare a print-ready PDF for job portals, email applications, or interviews while keeping draft data stored locally in the browser.',
        },
      ],
      stack: [
        'React',
        'TypeScript',
        'Responsive Form Engine',
        'A4 Live Preview',
        'Local Draft Persistence',
        'PDF Output',
      ],
      repoUrl: 'https://github.com/girishlade111/swift-resume-builder',
    },
    {
      id: 'ls-image-compressor',
      code: '7.7',
      name: 'LS Image Compressor — Client-Side Image Optimizer',
      url: 'https://img.ladestack.in/',
      category: 'Image Utilities · Web Performance · File Conversion',
      role: 'Product Creator & Repository Maintainer',
      statusBadge: 'On-Device Media',
      conciseSummary:
        'Resize, optimize, and convert images through a privacy-conscious browser workflow.',
      overview:
        "LS Image Compressor is a browser-based image optimization tool focused on reducing file size, adjusting image dimensions, and converting common image formats while keeping processing on the user's device. Workflows include quality controls, target output size, maximum dimension constraints, clipboard paste, and format conversion across JPEG, PNG, and WebP.",
      useCases: [
        {
          number: '01',
          title: 'Optimize Website Images for Faster Pages',
          description:
            'Reduce the size of photos, illustrations, and content assets before adding them to static sites, CMS pages, or web application builds.',
        },
        {
          number: '02',
          title: 'Prepare Images for Upload Limits & Sharing',
          description:
            'Resize an image or tune compression to meet strict file-size limits on application portals, forms, email attachments, or social platforms.',
        },
        {
          number: '03',
          title: 'Convert & Process Personal Images Locally',
          description:
            'Work with personal images on-device without uploading originals to a remote third-party conversion server.',
        },
      ],
      stack: [
        'Client-Side Canvas API',
        'Quality & Size Targeting',
        'Format Conversion',
        'Clipboard Input',
        'PWA / Offline Ready',
      ],
      repoUrl: 'https://github.com/girishlade111/Image-Compressor',
    },
    {
      id: 'gamehub',
      code: '7.8',
      name: 'GameHub — Instant-Play Browser Games',
      url: 'https://games-ladestack.vercel.app/',
      category: 'Games · Interactive Frontend Experiences',
      role: 'Project Builder & Developer',
      statusBadge: '33 Mini-Games',
      conciseSummary:
        'Browse and play a repository-documented collection of 33 small browser games.',
      overview:
        'GameHub is an instant-play browser gaming catalog built with Next.js, React, and TypeScript. Its repository documents 33 small games organized across arcade, puzzle, action, strategy, word, and card categories with dynamic code splitting, responsive interfaces, and canvas animation-frame game loops.',
      useCases: [
        {
          number: '01',
          title: 'Enjoy Short Games During a Break',
          description:
            'Pick a lightweight browser game such as Snake, Tetris, or 2048 and play immediately without installing packages or creating accounts.',
        },
        {
          number: '02',
          title: 'Practice Logic, Memory & Reaction Skills',
          description:
            'Explore puzzle, word, memory, and reaction-oriented mini-games offering varied interactive patterns in one unified portal.',
        },
        {
          number: '03',
          title: 'Explore Interactive Web Development Patterns',
          description:
            'Demonstrates how to organize 33 interactive mini-apps behind one catalog, lazily load components, run canvas game loops, and manage UI state.',
        },
      ],
      stack: [
        'Next.js 15',
        'React 19',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Dynamic Code Splitting',
        'HTML5 Canvas Loops',
      ],
      repoUrl: 'https://github.com/girishlade111/games-ladestack',
    },
    {
      id: 'ladestack-drive',
      code: '7.9',
      name: 'LadeStack Drive — File Management & Cloud Storage Exploration',
      url: 'https://drive.ladestack.in/',
      category: 'File Management · Storage & Sharing Exploration',
      role: 'Product Exploration',
      statusBadge: 'Experimental · Verification Pending',
      isProvisional: true,
      conciseSummary:
        'File-management project exploring organized digital file workflows; exact deployment status pending review.',
      overview:
        'LadeStack Drive is part of my broader exploration of digital file organization, storage, and sharing interfaces using modern web stacks and database/storage services. Treated as an experimental / provisional entry while production deployment capabilities are reviewed.',
      useCases: [
        {
          number: '01',
          title: 'Organize Project & Personal Files (Proposed Workflow)',
          description:
            'Keep working documents, exported assets, notes, and project files organized through a clean, navigable folder structure.',
        },
        {
          number: '02',
          title: 'Access Files Across Workflows (Proposed Workflow)',
          description:
            'Explore durable backend patterns and account controls for reaching working files across sessions.',
        },
        {
          number: '03',
          title: 'Share Specific Assets With Scoped Links (Proposed Workflow)',
          description:
            'Investigate scoped download links, expiring permissions, and selected-file handoffs without large email attachments.',
        },
      ],
      stack: ['Web File Interfaces', 'Storage Architecture Exploration'],
      note: 'Experimental / Verification Pending — listed as an exploratory project rather than a confirmed production service.',
    },
  ],
  prototypes: [
    {
      id: 'ai-app-builder',
      code: '8.1',
      title: 'AI Website & Application Builder — build.ladestack.in Concept',
      statusBadge: 'Concept · In Development',
      summary:
        'Browser-oriented AI website/app builder concept with local-first core and BYOK AI providers.',
      details:
        'Explores bring-your-own-key (BYOK) AI providers, agentic coding workflows, file editing, Monaco integration, checkpoint management, local IndexedDB persistence, and ZIP project export alongside a multilingual Astro marketing experience.',
    },
    {
      id: 'ladestack-labs',
      code: '8.2',
      title: 'LadeStack Labs — Product Gallery & Design Exploration',
      statusBadge: 'Design & Planning',
      summary:
        'Astro-first product showcase emphasizing discoverable static HTML, original visual identity, and curated gallery cards.',
      details:
        'Explores editorial and typographic design directions, responsive layouts, and a multilingual content structure for presenting experimental LadeStack tools.',
    },
    {
      id: 'visual-bookmark-manager',
      code: '8.3',
      title: 'Personal Visual Bookmark Manager',
      statusBadge: 'Planned · Phase-Wise',
      summary:
        'Private visual bookmark application for organizing large collections of saved URLs with strict data integrity rules.',
      details:
        'Enforces duplicate detection at the normalized full-URL level (not domain-only), prioritizes user-selected categories over automatic categorization, and uses a deterministic non-AI categorization engine for the baseline version.',
    },
    {
      id: 'ecommerce-experiments',
      code: '8.4',
      title: 'E-Commerce Application Experiments',
      statusBadge: 'Prototype',
      summary:
        'Full-stack commerce designs exploring catalogs, categories, filters, wishlists, carts, orders, and admin workflows.',
      details:
        'Built around Next.js, React, TypeScript, and Supabase with structured inventory and order data models.',
    },
    {
      id: 'multi-llm-chat',
      code: '8.5',
      title: 'Multi-LLM Chat & AI Agent Experiments',
      statusBadge: 'Experimentation',
      summary:
        'Multi-provider AI experiences using Gemini, OpenRouter, and other model APIs.',
      details:
        'Explores provider switching, BYOK settings, conversation interfaces, prompt context, tool calling, failure handling, and cost-aware architecture.',
    },
    {
      id: 'api-testing-tools',
      code: '8.6',
      title: 'API Testing & Documentation Tools',
      statusBadge: 'Concept',
      summary:
        'Product ideas for simplifying HTTP request workflows, request collections, response inspection, and API documentation.',
      details:
        'Connects practical developer productivity with accessible browser interfaces and repeatable testing workflows.',
    },
    {
      id: 'notes-intelligence',
      code: '8.7',
      title: 'Notes & Document Intelligence',
      statusBadge: 'Exploratory',
      summary:
        'Explorations around summarizing, organizing, and retrieving useful information from notes and documents.',
      details:
        'Focuses on source quality, privacy, citation fidelity, and clear boundaries between extracted facts and model-generated interpretation.',
    },
    {
      id: 'file-sharing-prototypes',
      code: '8.8',
      title: 'File-Sharing & Storage Prototypes',
      statusBadge: 'Repository Prototypes',
      summary:
        'Repository-backed experiments with Supabase upload/share dashboards and expiring link-based sharing concepts.',
      details:
        'Illustrates authentication, storage buckets, relational data modeling, expiring links, and operational security boundaries.',
      links: [
        {
          label: 'File-Sharing Webapp Demo',
          href: 'https://github.com/girishlade111/File-Sharing-Webapp-Demo',
        },
        {
          label: 'Secure File Share Link',
          href: 'https://github.com/girishlade111/secure-file-share-link',
        },
      ],
    },
    {
      id: 'other-utility-projects',
      code: '8.9',
      title: 'Other Learning & Utility Projects',
      statusBadge: 'Selected Explorations',
      summary:
        'Additional explorations across spreadsheet/database directories, world-radio streaming, expense tracking, and Android file tools.',
      details:
        'Project-driven prototypes used to test unfamiliar APIs, data flows, and mobile/web interface patterns.',
    },
  ],
  capabilityDomains: [
    {
      domain: 'Frontend Engineering',
      technologies: 'HTML, CSS, JavaScript, TypeScript, React, Astro, Next.js, Vite',
      evidence:
        'Interactive product sites, component architecture, local-first web apps, static and dynamic interfaces',
    },
    {
      domain: 'UI/UX Design',
      technologies:
        'Figma-oriented design workflows, responsive design, typography, interaction design, accessibility, information architecture',
      evidence:
        'Portfolio and SaaS landing pages, tool dashboards, editor workspaces, multi-theme interfaces',
    },
    {
      domain: 'Backend & API Design',
      technologies: 'Node.js, REST concepts, server routes, API integrations',
      evidence:
        'AI and file-sharing product prototypes, remote API connections, SaaS architecture exploration',
    },
    {
      domain: 'Browser Execution',
      technologies: 'Monaco Editor, WebContainers, sandboxed iframe previews, browser runtime constraints',
      evidence: "GB Coder's static and advanced coding environments",
    },
    {
      domain: 'Browser Data & Processing',
      technologies:
        'IndexedDB, localStorage, Web Workers, Canvas, WebAssembly/WASM concepts, Blob/ArrayBuffer flows',
      evidence: 'Project persistence, PDF transformations, image processing, local export',
    },
    {
      domain: 'Document Systems',
      technologies: 'Markdown, GitHub-Flavored Markdown, PDF tooling, KaTeX, print layouts, ZIP exports',
      evidence: 'MD2PDF, LS PDF, documentation workflows',
    },
    {
      domain: 'Databases & Auth Patterns',
      technologies:
        'Supabase, Firebase, PostgreSQL concepts, document and relational data models, authentication flows',
      evidence: 'E-commerce, sharing, project synchronization, SaaS planning and implementations',
    },
    {
      domain: 'Developer Workflow',
      technologies: 'Git, GitHub, branches/PRs, CI/CD, Vercel, technical documentation, bug triage',
      evidence: 'Continuous development and deployment across LadeStack products',
    },
    {
      domain: 'Web Performance & SEO',
      technologies:
        'Astro static generation, metadata, canonical/hreflang, Core Web Vitals, Lighthouse, sitemap, structured data',
      evidence: 'LadeStack and MD2PDF multilingual growth and quality work',
    },
    {
      domain: 'AI-Assisted Engineering',
      technologies:
        'Prompt orchestration, agent workflows, BYOK architecture, LLM API integrations, model comparison, code review assistance',
      evidence:
        'GB Assist/GB Coder development, experimental multi-LLM projects, AI-assisted coding',
    },
  ],
  landscapeCategories: [
    {
      category: 'Languages & Runtimes',
      items: [
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Python (Tooling & Automation)',
        'WebAssembly',
        'Web Workers',
        'Browser Sandboxes',
        'Kotlin & Swift (Learning)',
      ],
    },
    {
      category: 'Frontend & App Stacks',
      items: [
        'Astro.js',
        'Next.js',
        'React',
        'Tailwind CSS',
        'React Bits UI',
        'shadcn/ui',
        'Radix UI',
        'Monaco Editor',
        'WebContainers',
        'Angular (Exploration)',
      ],
    },
    {
      category: 'Databases & Backends',
      items: [
        'Supabase',
        'Firebase',
        'PostgreSQL / Neon',
        'IndexedDB',
        'Appwrite',
        'MongoDB',
        'Airtable',
        'libSQL / Turso Concepts',
      ],
    },
    {
      category: 'Hosting, Operations & Observability',
      items: [
        'Vercel',
        'Netlify',
        'Railway',
        'Render',
        'GitHub Actions',
        'Sentry',
        'AWS / Azure / DigitalOcean',
        'Lighthouse Auditing',
      ],
    },
    {
      category: 'AI Providers & Coding Agents',
      items: [
        'Gemini / Google AI',
        'Claude / Anthropic',
        'OpenAI / ChatGPT / Codex',
        'OpenRouter',
        'Cursor / Windsurf / Trae',
        'Vertex AI',
        'CodeRabbit',
        'Firecrawl / n8n / ElevenLabs',
      ],
    },
    {
      category: 'Communication & Infrastructure',
      items: ['Resend', 'REST API Integrations', 'Serverless Functions', 'OAuth Flows', 'Webhooks & Automation'],
    },
  ],
  focusAreas: [
    {
      id: 'browser-dev-envs',
      title: 'Browser-Based Developer Environments',
      description:
        'Making a browser behave like a useful development workspace: editable project trees, code intelligence, instant previews, terminal/runtime support where compatible, keyboard-oriented workflows, and durable local projects.',
    },
    {
      id: 'privacy-client-computing',
      title: 'Privacy-Conscious Client-Side Computing',
      description:
        'Keeping user documents and working files on their own devices whenever possible by analyzing what can safely run in browser memory, what persists in IndexedDB, and where a backend is genuinely required.',
    },
    {
      id: 'fullstack-architecture',
      title: 'Full-Stack Product Architecture',
      description:
        'Designing the relationship between interfaces, data storage, authentication, services, caching, deployment, error handling, and export paths — knowing when a local-first product should stay account-free.',
    },
    {
      id: 'ai-agents-multimodel',
      title: 'AI Agents & Multi-Model Development',
      description:
        'Experimenting with AI coding assistants, agentic workflows, provider-independent designs, and BYOK integrations that keep users in control of which models and accounts they use.',
    },
    {
      id: 'seo-content-i18n',
      title: 'SEO, Content & Internationalization',
      description:
        'Building semantic structure, clear product copy, localized routes, technical metadata, internal links, accessibility, and fast static delivery with Astro.',
    },
  ],
  designPhilosophy:
    'My preferred visual direction is modern, clean, responsive, and deliberately restrained. I value strong hierarchy, typography, accessible contrast, comfortable whitespace, clear functional controls, and motion that supports comprehension rather than distracting from it. The goal is not to make every product look identical; it is to maintain a consistent quality of interaction while allowing each product its own appropriate identity.',
  engineeringPhilosophy:
    'I aim to choose architectures based on the real workflow rather than popularity. If a tool can run locally, I prefer to consider a local-first design. If an application needs secure authentication, shared data, and durable synchronization, a backend is warranted. I think through portability, recovery, deployment, observability, browser support, and security boundaries early enough to avoid turning them into afterthoughts.',
  offerings: [
    {
      code: '9.1',
      title: 'UI/UX & Interface Design',
      description:
        'Turn a vague product idea into a clear interface direction through user flows, page hierarchy, component planning, responsive behavior, visual systems, and accessible interaction patterns.',
    },
    {
      code: '9.2',
      title: 'Frontend Web Development',
      description:
        'Build modern web interfaces using React, Next.js, Astro, JavaScript, and TypeScript — including interactive dashboards, product showcases, content-led websites, and client-side utilities.',
    },
    {
      code: '9.3',
      title: 'Product Prototyping & Full-Stack Integration',
      description:
        'Explore complete application flows: user input, validation, APIs, data modeling, authentication where needed, persistence, background concerns, and deployment.',
    },
    {
      code: '9.4',
      title: 'Developer Tooling & AI Integration',
      description:
        'Build products that help developers write, test, run, transform, or document their work, integrating AI model APIs transparently and responsibly.',
    },
    {
      code: '9.5',
      title: 'Technical Content, SEO & Localization',
      description:
        'Craft Astro-based crawlable content, semantic page structure, metadata, multilingual routing, schema markup, technical articles, and performance-oriented delivery.',
    },
  ],
  approachSteps: [
    {
      step: '01',
      title: 'Define the Real Problem',
      description:
        'Identify the user, the task, the existing friction, and what a successful result should make easier.',
    },
    {
      step: '02',
      title: 'Separate Essentials From Extras',
      description:
        'Establish the simplest working experience before adding optional integrations, automation, or advanced settings.',
    },
    {
      step: '03',
      title: 'Choose an Appropriate Architecture',
      description:
        'Decide what belongs in static HTML, client-side processing, local storage, APIs, databases, authentication, or an external service.',
    },
    {
      step: '04',
      title: 'Design the Interaction',
      description:
        'Build clear navigation, readable content, responsive layouts, error states, and appropriate keyboard/accessibility support.',
    },
    {
      step: '05',
      title: 'Build in Small, Reviewable Increments',
      description:
        'Implement functioning features, inspect the behavior, document decisions, and revise when needed.',
    },
    {
      step: '06',
      title: 'Consider Privacy & Safety Boundaries',
      description:
        'Avoid unnecessary collection, expose trade-offs, and make it clear which operations involve third-party providers.',
    },
    {
      step: '07',
      title: 'Document & Release Carefully',
      description:
        'Maintain usable project notes, deployment settings, version control, and a path to reproduce or investigate errors.',
    },
    {
      step: '08',
      title: 'Measure & Improve',
      description:
        'Use real feedback, runtime evidence, browser behavior, and performance metrics rather than assuming a polished interface proves product quality.',
    },
  ],
  technicalChallenges: [
    {
      id: 'local-first-apps',
      title: 'Designing Local-First Applications',
      description:
        'Browser-local persistence improves onboarding and data control but introduces storage quotas, data loss when site data is cleared, export/import portability, multi-tab changes, and recovery after refresh.',
    },
    {
      id: 'browser-dev-workflows',
      title: 'Running Development Workflows in a Browser',
      description:
        'Monaco-based editing and WebContainer execution make coding accessible, while requiring careful handling of cross-origin isolation headers, runtime limitations, package behavior, and memory constraints.',
    },
    {
      id: 'documentation-systems',
      title: 'Building Useful Documentation Systems',
      description:
        'Markdown-to-PDF conversion involves content parsing, sanitization, code highlighting, KaTeX math rendering, image resolution, page breaks, font embedding, chapter ordering, and TOC generation.',
    },
    {
      id: 'balancing-ai-control',
      title: 'Balancing AI Assistance With User Control',
      description:
        'AI-assisted products need explicit provider boundaries, understandable costs, error handling, reviewable suggestions, and safe handling of prompts and BYOK keys.',
    },
    {
      id: 'multilingual-websites',
      title: 'Shipping Discoverable Multilingual Websites',
      description:
        'Localized websites require deliberate architectural decisions around URL structure, content parity, canonical pages, hreflang relationships, metadata, accessibility, and static performance.',
    },
  ],
  highlights: [
    'Founded and continue to shape LadeStack, an independent brand for useful developer and productivity tools.',
    'Developed and explored products across browser IDEs, PDF processing, Markdown publishing, image optimization, resume creation, land-area conversion, games, and file workflows.',
    'Worked with Astro, React, Next.js, TypeScript, browser storage, Monaco Editor, WebContainers, and PDF/image libraries through tangible product contexts.',
    'Invested in UI/UX, technical SEO, localized web content, privacy-conscious design, and practical deployment workflows.',
    'Maintain a visible public development presence through GitHub and product repositories.',
    'Continue learning and experimenting with AI agents, model APIs, full-stack architecture, and local-first developer experiences.',
  ],
  contactHeadline: "Let's build something useful.",
  contactBody:
    "Have an interesting project, collaboration idea, or useful tool suggestion? I enjoy discussing developer experience, web products, thoughtful UI/UX, AI integrations, and practical software ideas. Explore my work on GitHub or contact me through LadeStack's official email.",
  socialChannels: [
    {
      platform: 'Official Brand Website',
      handleOrLabel: 'ladestack.in',
      href: 'https://ladestack.in/',
      note: 'Central brand and product ecosystem hub',
    },
    {
      platform: 'Primary Email',
      handleOrLabel: 'admin@ladestack.in',
      href: 'mailto:admin@ladestack.in',
      note: 'Official LadeStack & portfolio contact',
    },
    {
      platform: 'GitHub',
      handleOrLabel: 'github.com/girishlade111',
      href: 'https://github.com/girishlade111',
      note: 'Public projects, repositories, and source code',
    },
    {
      platform: 'LinkedIn',
      handleOrLabel: 'linkedin.com/in/girish-lade',
      href: 'https://www.linkedin.com/in/girish-lade/',
      note: 'Professional profile and network',
    },
    {
      platform: 'Instagram',
      handleOrLabel: '@girish_lade_',
      href: 'https://www.instagram.com/girish_lade_/',
      note: 'Personal & creator updates',
    },
    {
      platform: 'CodePen',
      handleOrLabel: 'codepen.io/Girish-Lade-the-looper',
      href: 'https://codepen.io/Girish-Lade-the-looper',
      note: 'Frontend UI and interaction experiments',
    },
  ],
  closingParagraph:
    'I am building toward a career and an ecosystem defined by practical output: products that are approachable, thoughtfully designed, and worth returning to. My background in engineering gives me a systems perspective; my work in UI/UX and software development gives me the means to shape that perspective into usable digital experiences; and my interest in AI and modern browser technology keeps me exploring what can be built next.',
  closingGoal:
    'The goal is simple: make useful software easier to access, easier to understand, and better to use.',
};

type LocaleOverrides = Partial<
  Pick<
    LocalizedPortfolioUI,
    | 'eyebrow'
    | 'headline'
    | 'secondaryHeadline'
    | 'location'
    | 'positioningQuote'
    | 'oneLinePositioning'
    | 'exploreProductsBtn'
    | 'contactBtn'
    | 'expandAllLabel'
    | 'collapseAllLabel'
    | 'clickToExpandHint'
    | 'clickToCollapseHint'
    | 'overviewLabel'
    | 'useCasesLabel'
    | 'techStackLabel'
    | 'visitSiteLabel'
    | 'sourceCodeLabel'
    | 'copyEmailLabel'
    | 'copiedEmailLabel'
    | 'shortBio'
    | 'mediumBio'
    | 'contactHeadline'
    | 'contactBody'
    | 'closingParagraph'
    | 'closingGoal'
  >
> & {
  sectionTitles?: Record<
    keyof LocalizedPortfolioUI['sections'],
    { title: string; subtitle: string; badge: string }
  >;
};

const LOCALE_OVERRIDES: Record<Exclude<Locale, 'en'>, LocaleOverrides> = {
  jp: {
    eyebrow: 'GIRISH BALASO LADE · ポートフォリオ＆プロダクトエコシステム',
    headline: 'UI/UXデザイナー · フルスタック開発者 · LadeStack 創設者',
    secondaryHeadline: '工学を礎にし、自らの選択でプロダクトビルダーへ。',
    location: 'インド・マハーラーシュトラ州プネー',
    positioningQuote:
      '開発者、学生、クリエイター、そして日常のユーザーが余計な摩擦なく目的を達成できる、実用的でアクセシブルかつプライバシーに配慮したソフトウェアを構築しています。',
    oneLinePositioning:
      'ブラウザファーストの開発ツール、AI支援ワークフロー、実用的なWebアプリ群「LadeStack」を構築する独立系開発者・プロダクトデザイナー。',
    exploreProductsBtn: 'プロダクトを見る',
    contactBtn: 'お問い合わせ',
    expandAllLabel: 'すべてのセクションを展開',
    collapseAllLabel: 'すべて折りたたむ',
    clickToExpandHint: 'クリックして詳細を表示',
    clickToCollapseHint: 'クリックして閉じる',
    overviewLabel: '概要 (Overview)',
    useCasesLabel: '3つの主要ユースケース',
    techStackLabel: '技術スタック・アーキテクチャ',
    visitSiteLabel: 'Webサイトを開く',
    sourceCodeLabel: 'GitHub リポジトリ',
    copyEmailLabel: 'admin@ladestack.in をコピー',
    copiedEmailLabel: 'コピーしました',
    shortBio:
      '私はUI/UXデザイナー、フルスタック開発者、そしてLadeStackの創設者であるGirish Ladeです。工学的な思考とデザイン主導のプロダクト開発を融合させ、開発者・学生・クリエイター向けに無料で実用的かつプライバシー重視のツールを開発しています。',
    mediumBio:
      'インド・プネーを拠点とする独立系開発者・プロダクトデザイナーのGirish Balaso Ladeです。機械工学から学業を始め、Web開発、インタラクションデザイン、AI支援ソフトウェア開発、ブラウザネイティブ技術へと領域を広げました。ブラウザIDE、ローカル優先のPDF・画像ツール、Markdown出版ワークフロー、履歴書ビルダー、土地面積換算ツールなどを備えた「LadeStack」を創設しました。',
    contactHeadline: '本当に役立つものを一緒に作りましょう。',
    contactBody:
      'プロジェクトの相談、コラボレーション、新しいツールのアイデアはありますか？GitHubで公開コードをご覧いただくか、LadeStack公式メールまでお気軽にご連絡ください。',
    closingParagraph:
      '私は親しみやすく、丁寧に設計され、何度も使いたくなる実用的なプロダクト群の構築を目指しています。工学の背景がシステム思考を与え、UI/UXとソフトウェア開発がそれを形にする力を与えてくれます。',
    closingGoal:
      '目標はシンプルです。便利なソフトウェアをよりアクセスしやすく、理解しやすく、使いやすくすること。',
    sectionTitles: {
      profile: {
        title: 'エグゼクティブプロフィール＆アイデンティティ',
        subtitle: 'ショート・ミディアム・詳細バイオグラフィと専門アイデンティティ一覧',
        badge: 'プロフィール',
      },
      story: {
        title: 'マイストーリー — 機械工学からソフトウェアへ',
        subtitle: '工学の基礎からUI/UXデザイン、フルスタック開発、AIワークフローへの歩み',
        badge: '全5章',
      },
      education: {
        title: '学歴と学習の歩み',
        subtitle: '機械工学の学術的基盤、独学によるソフトウェア習得、システム思考',
        badge: '学歴・独学',
      },
      vision: {
        title: 'ビジョン・ミッション・10のコアバリュー',
        subtitle: '個人およびLadeStackの使命・10の基本原則',
        badge: '10の原則',
      },
      ecosystem: {
        title: 'LadeStack — ブランド＆プロダクトエコシステム',
        subtitle: 'ブラウザファーストの開発ツール、ローカル処理ワークフロー、9言語展開',
        badge: 'ladestack.in',
      },
      products: {
        title: '主要プロダクト＆公開Webサイト',
        subtitle: '9つのプロダクトの詳細概要、各3つの主要ユースケース、技術スタックとリンク',
        badge: '9プロダクト',
      },
      prototypes: {
        title: '選定プロトタイプ＆今後の研究開発',
        subtitle: 'AIアプリビルダー、ブックマーク管理、マルチLLM、ファイル共有プロトタイプ',
        badge: '9つのR&D',
      },
      capabilities: {
        title: '技術ケイパビリティ＆専門領域',
        subtitle: '実績に基づく10の技術領域、技術評価ランドスケープ、デザイン・設計哲学',
        badge: '10領域',
      },
      practice: {
        title: '提供価値・8段階の開発アプローチ・技術課題',
        subtitle: 'ビルダーとしての強み、8ステップの進行手法、ローカルファーストの課題と実績',
        badge: '方法論',
      },
      contact: {
        title: 'コンタクト・SNS＆クロージング',
        subtitle: 'LadeStack公式リンク、GitHub、LinkedIn、Instagram、CodePen、メール連絡先',
        badge: '連絡先',
      },
    },
  },
  ko: {
    eyebrow: 'GIRISH BALASO LADE · 포트폴리오 및 프로덕트 생태계',
    headline: 'UI/UX 디자이너 · 풀스택 개발자 · LadeStack 창립자',
    secondaryHeadline: '공학도에서 시작해 스스로 선택한 프로덕트 빌더.',
    location: '인도 마하라슈트라주 푸네',
    positioningQuote:
      '개발자, 학생, 크리에이터, 일반 사용자가 불필요한 장벽 없이 작업을 완수할 수 있도록 유용하고 접근성 높으며 프라이버시를 존중하는 소프트웨어를 만듭니다.',
    oneLinePositioning:
      '브라우저 우선 개발 유틸리티, AI 보조 워크플로, 실용적인 웹 애플리케이션 생태계인 LadeStack을 구축하는 독립 개발자이자 프로덕트 디자이너.',
    exploreProductsBtn: '프로덕트 살펴보기',
    contactBtn: '연락하기',
    expandAllLabel: '모든 섹션 펼치기',
    collapseAllLabel: '모두 접기',
    clickToExpandHint: '클릭하여 섹션 펼치기',
    clickToCollapseHint: '클릭하여 접기',
    overviewLabel: '개요 (Overview)',
    useCasesLabel: '3가지 핵심 활용 사례',
    techStackLabel: '기술 스택 및 아키텍처',
    visitSiteLabel: '웹사이트 방문',
    sourceCodeLabel: 'GitHub 저장소',
    copyEmailLabel: 'admin@ladestack.in 복사',
    copiedEmailLabel: '이메일 복사됨',
    shortBio:
      '저는 UI/UX 디자이너이자 풀스택 개발자이며 LadeStack의 창립자인 Girish Lade입니다. 공학적 사고방식과 디자인 중심 제품 개발을 결합하여 개발자, 학생, 창작자를 위한 무료 프라이버시 중심 도구를 만듭니다.',
    mediumBio:
      '인도 푸네에서 활동하는 독립 개발자 겸 프로덕트 디자이너 Girish Balaso Lade입니다. 기계공학에서 학업을 시작해 웹 개발, 인터랙션 디자인, AI 기반 소프트웨어 엔지니어링, 브라우저 네이티브 컴퓨팅으로 영역을 확장하며 LadeStack 생태계를 설립했습니다.',
    contactHeadline: '유용한 프로덕트를 함께 만들어 봅시다.',
    contactBody:
      '흥미로운 프로젝트, 협업 아이디어 또는 도구 제안이 있으신가요? GitHub에서 작업을 확인하거나 LadeStack 공식 이메일로 연락해 주세요.',
    closingParagraph:
      '저는 누구나 쉽게 접근할 수 있고 사려 깊게 디자인된 실용적인 프로덕트 생태계를 구축하고 있습니다.',
    closingGoal:
      '목표는 단순합니다. 유용한 소프트웨어를 더 쉽게 접하고, 더 쉽게 이해하며, 더 편리하게 사용할 수 있도록 만드는 것입니다.',
    sectionTitles: {
      profile: {
        title: '핵심 프로필 및 아이덴티티',
        subtitle: '요약·중간·상세 소개 및 전문 아이덴티티 매트릭스',
        badge: '프로필',
      },
      story: {
        title: '나의 이야기 — 기계공학에서 소프트웨어까지',
        subtitle: '공학적 기반에서 UI/UX 디자인, 풀스택 개발, AI 워크플로로 이어진 여정',
        badge: '5개 챕터',
      },
      education: {
        title: '교육 및 자기주도 학습 여정',
        subtitle: '기계공학 학업 배경, 프로젝트 중심 소프트웨어 학습, 시스템 사고',
        badge: '학력·학습',
      },
      vision: {
        title: '비전, 미션 및 10대 핵심 가치',
        subtitle: '개인 및 LadeStack의 목적과 10가지 핵심 제품 철학',
        badge: '10대 가치',
      },
      ecosystem: {
        title: 'LadeStack — 브랜드 및 프로덕트 생태계',
        subtitle: '브라우저 우선 개발 도구, 로컬 우선 문서 처리, 9개 국어 다국어 전략',
        badge: 'ladestack.in',
      },
      products: {
        title: '주요 프로덕트 및 배포된 웹사이트',
        subtitle: '9개 생태계 앱의 상세 개요, 각 3가지 핵심 활용 사례, 기술 스택 및 링크',
        badge: '9개 프로덕트',
      },
      prototypes: {
        title: '선정된 프로토타입 및 향후 연구 방향',
        subtitle: 'AI 앱 빌더, 비주얼 북마크 매니저, 멀티 LLM, 파일 공유 프로토타입',
        badge: '9개 탐색 과제',
      },
      capabilities: {
        title: '기술 역량 및 실천 영역',
        subtitle: '프로젝트로 입증된 10개 기술 영역, 기술 탐색 스펙트럼, 디자인·엔지니어링 철학',
        badge: '10개 도메인',
      },
      practice: {
        title: '제공 역량, 8단계 프로젝트 접근법 및 기술 과제',
        subtitle: '빌더로서의 역할, 8단계 개발 프로세스, 로컬 우선 아키텍처 과제와 주요 성과',
        badge: '방법론',
      },
      contact: {
        title: '연락처, 소셜 채널 및 맺음말',
        subtitle: 'LadeStack 공식 채널, GitHub, LinkedIn, Instagram, CodePen 및 이메일',
        badge: '연결',
      },
    },
  },
  zh: {
    eyebrow: 'GIRISH BALASO LADE · 个人作品集与产品生态',
    headline: 'UI/UX 设计师 · 全栈开发者 · LadeStack 创始人',
    secondaryHeadline: '科班机械工程背景，遵从内心成为软件产品构建者。',
    location: '印度马哈拉施特拉邦浦那',
    positioningQuote:
      '我致力于构建实用、易用且注重隐私的软件——帮助开发者、学生、独立创作者与日常用户毫无阻碍地高效完成工作。',
    oneLinePositioning:
      '独立开发者与产品设计师，正在打造 LadeStack —— 一个涵盖浏览器端开发工具、AI 辅助工作流与实用 Web 应用的产品生态。',
    exploreProductsBtn: '浏览产品矩阵',
    contactBtn: '联系我',
    expandAllLabel: '展开全部章节',
    collapseAllLabel: '收起全部章节',
    clickToExpandHint: '点击展开详情',
    clickToCollapseHint: '点击收起',
    overviewLabel: '产品概述 (Overview)',
    useCasesLabel: '三大核心使用场景',
    techStackLabel: '技术栈与架构',
    visitSiteLabel: '访问网站',
    sourceCodeLabel: 'GitHub 仓库',
    copyEmailLabel: '复制 admin@ladestack.in',
    copiedEmailLabel: '邮箱已复制',
    shortBio:
      '我是 Girish Lade，UI/UX 设计师、全栈开发者及 LadeStack 创始人。我将工程思维与设计驱动的产品开发相结合，为开发者、学生和创作者打造免费、实用且注重隐私的工具。',
    mediumBio:
      '我是常驻印度浦那的独立开发者与产品设计师 Girish Balaso Lade。从机械工程起步，我深入探索了 Web 开发、交互设计、AI 辅助软件工程与浏览器原生计算，并创立了 LadeStack 工具生态。',
    contactHeadline: '让我们一起构建真正有用的产品。',
    contactBody:
      '有合作想法、项目交流或工具建议？欢迎访问我的 GitHub 仓库或通过 LadeStack 官方邮箱与我联系。',
    closingParagraph:
      '我致力于打造以实际产出为核心的职业与产品生态：易用、设计考究且值得反复使用的数字产品。',
    closingGoal: '目标很简单：让实用的软件更容易获取、更容易理解、更好用。',
    sectionTitles: {
      profile: {
        title: '个人简介与专业身份',
        subtitle: '简短、中等与完整版个人履历 · 核心专业身份矩阵',
        badge: '个人档案',
      },
      story: {
        title: '我的故事 — 从机械工程到软件构建',
        subtitle: '从工程思维基础走向 UI/UX 设计、全栈产品与 AI 辅助开发',
        badge: '5 个篇章',
      },
      education: {
        title: '教育背景与自驱学习历程',
        subtitle: '机械工程学术基础、项目驱动技术学习与系统化工程思维',
        badge: '教育与成长',
      },
      vision: {
        title: '愿景、使命与十大核心价值观',
        subtitle: '个人与 LadeStack 品牌使命 · 10 项软件构建原则',
        badge: '10 项价值观',
      },
      ecosystem: {
        title: 'LadeStack — 品牌与产品生态系统',
        subtitle: '浏览器优先开发工具、本地优先文档处理与 9 语言国际化策略',
        badge: 'ladestack.in',
      },
      products: {
        title: '精选产品与已部署网站',
        subtitle: '9 款核心生态产品详解、每款产品的 3 大应用场景、技术栈与仓库链接',
        badge: '9 款产品',
      },
      prototypes: {
        title: '精选原型与未来研发方向',
        subtitle: 'AI 应用构建器、视觉书签管理器、多模型对话与文件共享原型',
        badge: '9 项探索',
      },
      capabilities: {
        title: '技术能力与实践领域',
        subtitle: '10 大项目验证技术领域、技术评估版图以及设计与工程哲学',
        badge: '10 大领域',
      },
      practice: {
        title: '服务价值、8 步项目方法论与技术挑战',
        subtitle: '构建者能力、8 步工程方法、本地优先架构挑战与核心亮点',
        badge: '方法论',
      },
      contact: {
        title: '联系方式、社交主页与结语',
        subtitle: 'LadeStack 官方渠道、GitHub、LinkedIn、Instagram、CodePen 与官方邮箱',
        badge: '保持联系',
      },
    },
  },
  ru: {
    eyebrow: 'GIRISH BALASO LADE · ПОРТФОЛИО И ЭКОСИСТЕМА ПРОДУКТОВ',
    headline: 'UI/UX-дизайнер · Full-Stack разработчик · Основатель LadeStack',
    secondaryHeadline: 'Инженер по образованию. Создатель продуктов по призванию.',
    location: 'Пуна, Махараштра, Индия',
    positioningQuote:
      'Я создаю полезное, доступное и бережное к приватности ПО — инструменты, помогающие разработчикам, студентам, авторам и обычным пользователям решать задачи без лишних преград.',
    oneLinePositioning:
      'Независимый разработчик и продуктовый дизайнер, создающий LadeStack — экосистему браузерных утилит, AI-инструментов и практичных веб-приложений.',
    exploreProductsBtn: 'Смотреть продукты',
    contactBtn: 'Связаться',
    expandAllLabel: 'Развернуть все разделы',
    collapseAllLabel: 'Свернуть все разделы',
    clickToExpandHint: 'Нажмите, чтобы развернуть',
    clickToCollapseHint: 'Нажмите, чтобы свернуть',
    overviewLabel: 'Обзор (Overview)',
    useCasesLabel: 'Три основных сценария использования',
    techStackLabel: 'Технологии и архитектура',
    visitSiteLabel: 'Открыть сайт',
    sourceCodeLabel: 'GitHub репозиторий',
    copyEmailLabel: 'Скопировать admin@ladestack.in',
    copiedEmailLabel: 'Скопировано',
    shortBio:
      'Я Гириш Ладе — UI/UX-дизайнер, full-stack разработчик и основатель LadeStack. Сочетаю инженерное мышление с продуманным продуктовым дизайном для создания бесплатных и приватных веб-инструментов.',
    mediumBio:
      'Я Гириш Баласо Ладе, независимый разработчик и продуктовый дизайнер из Пуны, Индия. Начав путь с машиностроения, я перешёл в веб-разработку, проектирование интерфейсов, AI-инженерию и браузерные вычисления, основав экосистему LadeStack.',
    contactHeadline: 'Давайте создадим что-то по-настоящему полезное.',
    contactBody:
      'Есть идея проекта, предложение о сотрудничестве или вопрос по разработке? Изучите мои репозитории на GitHub или напишите на официальную почту LadeStack.',
    closingParagraph:
      'Я строю экосистему продуктов, определяемую практической пользой: доступные, продуманные и надёжные цифровые инструменты.',
    closingGoal:
      'Цель проста: сделать полезное программное обеспечение более доступным, понятным и удобным.',
    sectionTitles: {
      profile: {
        title: 'Профиль и профессиональная идентичность',
        subtitle: 'Краткая, средняя и полная биография · Матрица профессиональной идентичности',
        badge: 'Профиль',
      },
      story: {
        title: 'Моя история — От инженерии к разработке ПО',
        subtitle: 'От базы в машиностроении к UI/UX-дизайну, full-stack продуктам и AI-инструментам',
        badge: '5 глав',
      },
      education: {
        title: 'Образование и путь самообучения',
        subtitle: 'Инженерный фундамент, проектно-ориентированное изучение кода и системное мышление',
        badge: 'Образование',
      },
      vision: {
        title: 'Видение, миссия и 10 ключевых ценностей',
        subtitle: 'Личная миссия и философия LadeStack · 10 принципов создания продуктов',
        badge: '10 ценностей',
      },
      ecosystem: {
        title: 'LadeStack — Бренд и продуктовая экосистема',
        subtitle: 'Браузерные инструменты, локальная обработка файлов и мультиязычность на 9 языках',
        badge: 'ladestack.in',
      },
      products: {
        title: 'Флагманские продукты и веб-сайты',
        subtitle: '9 продуктов экосистемы: подробный обзор, по 3 сценария использования, стек и ссылки',
        badge: '9 продуктов',
      },
      prototypes: {
        title: 'Избранные прототипы и R&D направления',
        subtitle: 'Концепт AI-билдера, визуальные закладки, мульти-LLM чаты и облачные прототипы',
        badge: '9 концептов',
      },
      capabilities: {
        title: 'Технические компетенции и стек',
        subtitle: '10 подтверждённых проектами направлений, стек технологий и инженерная философия',
        badge: '10 областей',
      },
      practice: {
        title: 'Компетенции, 8 этапов работы и инженерные вызовы',
        subtitle: 'Что я предлагаю, 8 шагов реализации проекта, задачи local-first архитектуры и итоги',
        badge: 'Методология',
      },
      contact: {
        title: 'Контакты, социальные профили и заключение',
        subtitle: 'Официальные ссылки LadeStack, GitHub, LinkedIn, Instagram, CodePen и почта',
        badge: 'Контакты',
      },
    },
  },
  pt: {
    eyebrow: 'GIRISH BALASO LADE · PORTFÓLIO & ECOSSISTEMA DE PRODUTOS',
    headline: 'UI/UX Designer · Desenvolvedor Full-Stack · Fundador da LadeStack',
    secondaryHeadline: 'Engenheiro por formação. Construtor de produtos por escolha.',
    location: 'Pune, Maharashtra, Índia',
    positioningQuote:
      'Construo software útil, acessível e consciente da privacidade — ferramentas que ajudam desenvolvedores, estudantes, criadores independentes e usuários a realizar tarefas sem atrito desnecessário.',
    oneLinePositioning:
      'Desenvolvedor independente e designer de produto construindo a LadeStack, um ecossistema de utilitários browser-first, fluxos com IA e aplicações web práticas.',
    exploreProductsBtn: 'Explorar Produtos',
    contactBtn: 'Entrar em Contato',
    expandAllLabel: 'Expandir todas as seções',
    collapseAllLabel: 'Recolher todas as seções',
    clickToExpandHint: 'Clique para expandir a seção',
    clickToCollapseHint: 'Clique para recolher',
    overviewLabel: 'Visão Geral (Overview)',
    useCasesLabel: 'Três Casos de Uso Principais',
    techStackLabel: 'Tecnologias & Arquitetura',
    visitSiteLabel: 'Visitar Site',
    sourceCodeLabel: 'Repositório GitHub',
    copyEmailLabel: 'Copiar admin@ladestack.in',
    copiedEmailLabel: 'E-mail Copiado',
    shortBio:
      'Sou Girish Lade, UI/UX designer, desenvolvedor full-stack e fundador da LadeStack. Combino mentalidade de engenharia com design de produto para criar ferramentas gratuitas, úteis e focadas em privacidade.',
    mediumBio:
      'Sou Girish Balaso Lade, desenvolvedor independente e designer de produto baseado em Pune, Índia. Minha trajetória começou na Engenharia Mecânica e evoluiu para desenvolvimento web, design de interação, engenharia assistida por IA e computação no navegador com a LadeStack.',
    contactHeadline: 'Vamos construir algo útil juntos.',
    contactBody:
      'Tem uma ideia de projeto, colaboração ou sugestão de ferramenta? Explore meu código no GitHub ou entre em contato pelo e-mail oficial da LadeStack.',
    closingParagraph:
      'Estou construindo uma carreira e um ecossistema definidos por entregas práticas: produtos acessíveis, bem projetados e aos quais vale a pena retornar.',
    closingGoal:
      'O objetivo é simples: tornar softwares úteis mais fáceis de acessar, entender e usar.',
    sectionTitles: {
      profile: {
        title: 'Perfil Executivo & Identidade',
        subtitle: 'Biografia curta, média e estendida · Matriz de identidade profissional',
        badge: 'Perfil',
      },
      story: {
        title: 'Minha História — Da Engenharia ao Software',
        subtitle: 'Da base em Engenharia Mecânica ao UI/UX design, produtos full-stack e fluxos de IA',
        badge: '5 Capítulos',
      },
      education: {
        title: 'Educação & Jornada de Aprendizado',
        subtitle: 'Formação acadêmica em engenharia, aprendizado autodirigido e pensamento sistêmico',
        badge: 'Formação',
      },
      vision: {
        title: 'Visão, Missão & 10 Valores Fundamentais',
        subtitle: 'Propósito pessoal e da LadeStack · 10 princípios de produto',
        badge: '10 Valores',
      },
      ecosystem: {
        title: 'LadeStack — Marca & Ecossistema de Produtos',
        subtitle: 'Utilitários browser-first, processamento local e estratégia multilíngue em 9 idiomas',
        badge: 'ladestack.in',
      },
      products: {
        title: 'Produtos em Destaque & Sites Publicados',
        subtitle: '9 aplicações do ecossistema com visão geral, 3 casos de uso cada, stack e links',
        badge: '9 Produtos',
      },
      prototypes: {
        title: 'Protótipos Selecionados & Direções Futuras',
        subtitle: 'Construtor de apps com IA, gerenciador de favoritos, multi-LLM e experimentos',
        badge: '9 Explorações',
      },
      capabilities: {
        title: 'Capacidades Técnicas & Áreas de Prática',
        subtitle: '10 domínios comprovados em projetos, panorama tecnológico e filosofia de engenharia',
        badge: '10 Domínios',
      },
      practice: {
        title: 'O Que Ofereço, Abordagem em 8 Etapas & Desafios',
        subtitle: 'Atuação como builder, metodologia em 8 passos, desafios local-first e destaques',
        badge: 'Metodologia',
      },
      contact: {
        title: 'Contato, Redes Sociais & Declaração Final',
        subtitle: 'Canais oficiais da LadeStack, GitHub, LinkedIn, Instagram, CodePen e e-mail',
        badge: 'Contato',
      },
    },
  },
  tr: {
    eyebrow: 'GIRISH BALASO LADE · PORTFOLYO VE ÜRÜN EKOSİSTEMİ',
    headline: 'UI/UX Tasarımcısı · Full-Stack Geliştirici · LadeStack Kurucusu',
    secondaryHeadline: 'Eğitimiyle mühendis. Tercihiyle ürün geliştirici.',
    location: 'Pune, Maharashtra, Hindistan',
    positioningQuote:
      'Geliştiricilerin, öğrencilerin, bağımsız üreticilerin ve günlük kullanıcıların gereksiz engeller olmadan işlerini tamamlamasına yardımcı olan kullanışlı, erişilebilir ve gizlilik odaklı yazılımlar geliştiriyorum.',
    oneLinePositioning:
      'Tarayıcı öncelikli geliştirici araçları, yapay zeka destekli iş akışları ve pratik web uygulamalarından oluşan LadeStack ekosistemini inşa eden bağımsız geliştirici ve ürün tasarımcısı.',
    exploreProductsBtn: 'Ürünleri Keşfet',
    contactBtn: 'İletişime Geç',
    expandAllLabel: 'Tüm bölümleri genişlet',
    collapseAllLabel: 'Tümünü daralt',
    clickToExpandHint: 'Bölümü açmak için tıklayın',
    clickToCollapseHint: 'Daraltmak için tıklayın',
    overviewLabel: 'Genel Bakış (Overview)',
    useCasesLabel: 'Üç Temel Kullanım Senaryosu',
    techStackLabel: 'Teknolojiler ve Mimari',
    visitSiteLabel: 'Web Sitesini Ziyaret Et',
    sourceCodeLabel: 'GitHub Deposu',
    copyEmailLabel: 'admin@ladestack.in Kopyala',
    copiedEmailLabel: 'E-posta Kopyalandı',
    shortBio:
      "Ben Girish Lade; UI/UX tasarımcısı, full-stack geliştirici ve LadeStack'in kurucusuyum. Mühendislik yaklaşımını tasarım odaklı ürün geliştirmeyle birleştirerek ücretsiz, kullanışlı ve gizlilik dostu araçlar üretiyorum.",
    mediumBio:
      "Hindistan'ın Pune şehrinde yaşayan bağımsız geliştirici ve ürün tasarımcısı Girish Balaso Lade'yim. Makine Mühendisliği ile başlayan akademik yolculuğum; web geliştirme, etkileşim tasarımı, yapay zeka destekli yazılım mühendisliği ve LadeStack ekosistemine dönüştü.",
    contactHeadline: 'Birlikte gerçekten faydalı bir şey inşa edelim.',
    contactBody:
      'İlginç bir proje, iş birliği fikri veya araç öneriniz mi var? Çalışmalarımı GitHub üzerinden inceleyebilir veya LadeStack resmi e-postası aracılığıyla bana ulaşabilirsiniz.',
    closingParagraph:
      'Ulaşılabilir, özenle tasarlanmış ve tekrar kullanmaya değer pratik ürünlerle tanımlanan bir ekosistem inşa ediyorum.',
    closingGoal:
      'Hedef basit: faydalı yazılımları erişilmesi, anlaşılması ve kullanılması daha kolay hale getirmek.',
    sectionTitles: {
      profile: {
        title: 'Yönetici Profili ve Kimlik',
        subtitle: 'Kısa, orta ve kapsamlı biyografi · Kişisel ve profesyonel kimlik tablosu',
        badge: 'Profil',
      },
      story: {
        title: 'Hikayem — Makine Mühendisliğinden Yazılıma',
        subtitle: 'Mühendislik temelinden UI/UX tasarımına, full-stack ürünlere ve AI iş akışlarına geçiş',
        badge: '5 Bölüm',
      },
      education: {
        title: 'Eğitim ve Öğrenme Yolculuğu',
        subtitle: 'Akademik mühendislik temeli, proje odaklı yazılım gelişimi ve sistem düşüncesi',
        badge: 'Eğitim',
      },
      vision: {
        title: 'Vizyon, Misyon ve 10 Temel Değer',
        subtitle: 'Kişisel ve LadeStack vizyonu · 10 temel ürün ve mühendislik ilkesi',
        badge: '10 Değer',
      },
      ecosystem: {
        title: 'LadeStack — Marka ve Ürün Ekosistemi',
        subtitle: 'Tarayıcı öncelikli araçlar, yerel dosya işleme ve 9 dilli uluslararası strateji',
        badge: 'ladestack.in',
      },
      products: {
        title: 'Öne Çıkan Ürünler ve Yayınlanan Siteler',
        subtitle: '9 ekosistem ürünü: genel bakış, her biri için 3 kullanım senaryosu, teknoloji ve bağlantılar',
        badge: '9 Ürün',
      },
      prototypes: {
        title: 'Seçili Prototipler ve Gelecek Yönelimleri',
        subtitle: 'AI uygulama oluşturucu, görsel yer imi yöneticisi, çoklu LLM ve depolama deneyleri',
        badge: '9 Keşif',
      },
      capabilities: {
        title: 'Teknik Yetenekler ve Uygulama Alanları',
        subtitle: 'Projelerle kanıtlanmış 10 teknik alan, teknoloji değerlendirme haritası ve tasarım felsefesi',
        badge: '10 Alan',
      },
      practice: {
        title: 'Sunduklarım, 8 Adımlı Yaklaşım ve Teknik Zorluklar',
        subtitle: 'Üretici yetkinlikleri, 8 adımlı proje metodolojisi, local-first mimari zorlukları ve öne çıkanlar',
        badge: 'Metodoloji',
      },
      contact: {
        title: 'İletişim, Sosyal Profiller ve Kapanış',
        subtitle: 'Resmi LadeStack kanalları, GitHub, LinkedIn, Instagram, CodePen ve doğrudan e-posta',
        badge: 'İletişim',
      },
    },
  },
  fr: {
    eyebrow: 'GIRISH BALASO LADE · PORTFOLIO & ÉCOSYSTÈME PRODUIT',
    headline: 'Designer UI/UX · Développeur Full-Stack · Fondateur de LadeStack',
    secondaryHeadline: 'Ingénieur de formation. Créateur de produits par choix.',
    location: 'Pune, Maharashtra, Inde',
    positioningQuote:
      'Je conçois des logiciels utiles, accessibles et respectueux de la vie privée — des outils qui aident les développeurs, les étudiants, les créateurs indépendants et les utilisateurs à accomplir leurs tâches sans friction.',
    oneLinePositioning:
      'Développeur indépendant et product designer bâtissant LadeStack, un écosystème d’utilitaires browser-first, de workflows assistés par IA et d’applications web pratiques.',
    exploreProductsBtn: 'Explorer les Produits',
    contactBtn: 'Me Contacter',
    expandAllLabel: 'Tout développer',
    collapseAllLabel: 'Tout réduire',
    clickToExpandHint: 'Cliquer pour développer la section',
    clickToCollapseHint: 'Cliquer pour réduire',
    overviewLabel: 'Présentation (Overview)',
    useCasesLabel: 'Trois Cas d’Usage Principaux',
    techStackLabel: 'Technologies & Architecture',
    visitSiteLabel: 'Visiter le Site',
    sourceCodeLabel: 'Dépôt GitHub',
    copyEmailLabel: 'Copier admin@ladestack.in',
    copiedEmailLabel: 'E-mail Copié',
    shortBio:
      'Je suis Girish Lade, designer UI/UX, développeur full-stack et fondateur de LadeStack. Je combine une approche d’ingénieur avec un développement produit guidé par le design pour créer des outils gratuits, utiles et respectueux de la vie privée.',
    mediumBio:
      'Je suis Girish Balaso Lade, développeur indépendant et product designer basé à Pune, en Inde. Mon parcours a débuté en génie mécanique avant de s’orienter vers le développement web, le design d’interaction, l’ingénierie assistée par IA et l’écosystème LadeStack.',
    contactHeadline: 'Construisons quelque chose d’utile ensemble.',
    contactBody:
      'Vous avez une idée de projet, une proposition de collaboration ou une suggestion d’outil ? Découvrez mes travaux sur GitHub ou contactez-moi via l’adresse officielle de LadeStack.',
    closingParagraph:
      'Je construis un écosystème défini par des réalisations concrètes : des produits accessibles, soigneusement conçus et auxquels on revient volontiers.',
    closingGoal:
      'L’objectif est simple : rendre les logiciels utiles plus accessibles, plus compréhensibles et plus agréables à utiliser.',
    sectionTitles: {
      profile: {
        title: 'Profil Exécutif & Identité Professionnelle',
        subtitle: 'Biographies courte, moyenne et détaillée · Matrice d’identité professionnelle',
        badge: 'Profil',
      },
      story: {
        title: 'Mon Histoire — De l’Ingénierie au Logiciel',
        subtitle: 'Du génie mécanique au design UI/UX, aux produits full-stack et à l’IA',
        badge: '5 Chapitres',
      },
      education: {
        title: 'Parcours Académique & Auto-Formation',
        subtitle: 'Formation en génie mécanique, apprentissage logiciel par projets et pensée systémique',
        badge: 'Formation',
      },
      vision: {
        title: 'Vision, Mission & 10 Valeurs Fondamentales',
        subtitle: 'Mission personnelle et vision LadeStack · 10 principes directeurs',
        badge: '10 Valeurs',
      },
      ecosystem: {
        title: 'LadeStack — Marque & Écosystème de Produits',
        subtitle: 'Outils browser-first, exécution locale et stratégie multilingue en 9 langues',
        badge: 'ladestack.in',
      },
      products: {
        title: 'Produits Phares & Sites Déployés',
        subtitle: '9 applications de l’écosystème avec présentation, 3 cas d’usage chacune, stack et liens',
        badge: '9 Produits',
      },
      prototypes: {
        title: 'Prototypes Sélectionnés & Explorations R&D',
        subtitle: 'Constructeur d’apps IA, gestionnaire de favoris visuels, multi-LLM et prototypes cloud',
        badge: '9 Explorations',
      },
      capabilities: {
        title: 'Compétences Techniques & Domaines de Pratique',
        subtitle: '10 domaines démontrés par des projets, paysage technologique et philosophie d’ingénierie',
        badge: '10 Domaines',
      },
      practice: {
        title: 'Ce Que J’Offre, Méthodologie en 8 Étapes & Défis',
        subtitle: 'Savoir-faire, approche projet en 8 étapes, défis local-first et points forts',
        badge: 'Méthodologie',
      },
      contact: {
        title: 'Contact, Réseaux Sociaux & Mot de la Fin',
        subtitle: 'Canaux officiels LadeStack, GitHub, LinkedIn, Instagram, CodePen et e-mail direct',
        badge: 'Contact',
      },
    },
  },
  es: {
    eyebrow: 'GIRISH BALASO LADE · PORTAFOLIO Y ECOSISTEMA DE PRODUCTOS',
    headline: 'Diseñador UI/UX · Desarrollador Full-Stack · Fundador de LadeStack',
    secondaryHeadline: 'Ingeniero de formación. Creador de productos por elección.',
    location: 'Pune, Maharashtra, India',
    positioningQuote:
      'Construyo software útil, accesible y consciente de la privacidad: herramientas que ayudan a desarrolladores, estudiantes, creadores independientes y usuarios a resolver tareas sin fricción innecesaria.',
    oneLinePositioning:
      'Desarrollador independiente y diseñador de producto construyendo LadeStack, un ecosistema de utilidades browser-first, flujos asistidos por IA y aplicaciones web prácticas.',
    exploreProductsBtn: 'Explorar Productos',
    contactBtn: 'Contactar',
    expandAllLabel: 'Expandir todas las secciones',
    collapseAllLabel: 'Contraer todas las secciones',
    clickToExpandHint: 'Haz clic para expandir la sección',
    clickToCollapseHint: 'Haz clic para contraer',
    overviewLabel: 'Descripción General (Overview)',
    useCasesLabel: 'Tres Casos de Uso Principales',
    techStackLabel: 'Tecnologías y Arquitectura',
    visitSiteLabel: 'Visitar Sitio Web',
    sourceCodeLabel: 'Repositorio GitHub',
    copyEmailLabel: 'Copiar admin@ladestack.in',
    copiedEmailLabel: 'Correo Copiado',
    shortBio:
      'Soy Girish Lade, diseñador UI/UX, desarrollador full-stack y fundador de LadeStack. Combino una mentalidad de ingeniería con el desarrollo de productos guiado por el diseño para crear herramientas gratuitas, útiles y enfocadas en la privacidad.',
    mediumBio:
      'Soy Girish Balaso Lade, desarrollador independiente y diseñador de producto radicado en Pune, India. Mi camino académico comenzó en la Ingeniería Mecánica y evolucionó hacia el desarrollo web, el diseño de interacción, la ingeniería asistida por IA y el ecosistema LadeStack.',
    contactHeadline: 'Construyamos algo útil juntos.',
    contactBody:
      '¿Tienes un proyecto interesante, una idea de colaboración o una sugerencia de herramienta? Explora mi trabajo en GitHub o contáctame a través del correo oficial de LadeStack.',
    closingParagraph:
      'Estoy construyendo una carrera y un ecosistema definidos por resultados prácticos: productos accesibles, cuidadosamente diseñados y a los que vale la pena volver.',
    closingGoal:
      'El objetivo es simple: hacer que el software útil sea más fácil de acceder, más fácil de entender y mejor de usar.',
    sectionTitles: {
      profile: {
        title: 'Perfil Ejecutivo e Identidad Profesional',
        subtitle: 'Biografía corta, media y extendida · Matriz de identidad personal y profesional',
        badge: 'Perfil',
      },
      story: {
        title: 'Mi Historia — De la Ingeniería al Software',
        subtitle: 'De la Ingeniería Mecánica al diseño UI/UX, productos full-stack y flujos con IA',
        badge: '5 Capítulos',
      },
      education: {
        title: 'Educación y Ruta de Aprendizaje',
        subtitle: 'Base académica en ingeniería, aprendizaje autodirigido por proyectos y pensamiento sistémico',
        badge: 'Educación',
      },
      vision: {
        title: 'Visión, Misión y 10 Valores Fundamentales',
        subtitle: 'Propósito personal y de LadeStack · 10 principios esenciales de producto',
        badge: '10 Valores',
      },
      ecosystem: {
        title: 'LadeStack — Marca y Ecosistema de Productos',
        subtitle: 'Utilidades browser-first, procesamiento local y estrategia multilingüe en 9 idiomas',
        badge: 'ladestack.in',
      },
      products: {
        title: 'Productos Destacados y Sitios Desplegados',
        subtitle: '9 aplicaciones del ecosistema con descripción, 3 casos de uso cada una, stack y enlaces',
        badge: '9 Productos',
      },
      prototypes: {
        title: 'Prototipos Seleccionados y Direcciones Futuras',
        subtitle: 'Creador de apps con IA, gestor visual de marcadores, multi-LLM y prototipos en la nube',
        badge: '9 Exploraciones',
      },
      capabilities: {
        title: 'Capacidades Técnicas y Áreas de Práctica',
        subtitle: '10 dominios respaldados por proyectos, panorama tecnológico y filosofía de ingeniería',
        badge: '10 Dominios',
      },
      practice: {
        title: 'Qué Ofrezco, Enfoque en 8 Pasos y Desafíos Técnicos',
        subtitle: 'Aporte como builder, metodología de 8 pasos, retos local-first y logros clave',
        badge: 'Metodología',
      },
      contact: {
        title: 'Contacto, Perfiles Sociales y Cierre',
        subtitle: 'Canales oficiales de LadeStack, GitHub, LinkedIn, Instagram, CodePen y correo directo',
        badge: 'Contacto',
      },
    },
  },
};

export function getPortfolioContent(locale: Locale): LocalizedPortfolioUI {
  if (locale === 'en') {
    return BASE_EN_CONTENT;
  }
  const overrides = LOCALE_OVERRIDES[locale];
  if (!overrides) {
    return BASE_EN_CONTENT;
  }

  const mergedSections = { ...BASE_EN_CONTENT.sections };
  if (overrides.sectionTitles) {
    for (const key of Object.keys(overrides.sectionTitles) as Array<
      keyof LocalizedPortfolioUI['sections']
    >) {
      mergedSections[key] = {
        ...mergedSections[key],
        ...overrides.sectionTitles[key],
      };
    }
  }

  return {
    ...BASE_EN_CONTENT,
    ...overrides,
    sections: mergedSections,
  };
}
