export interface SiteConfig {
  name: string;
  brandName: string;
  domain: string;
  tagline: string;
  role: string;
  employer: string;
  location: string;
  bio: string;
  currentFocus: {
    title: string;
    description: string;
    tag: string;
  }[];
  socials: {
    name: string;
    url: string;
    label: string;
  }[];
  verifiedMetrics: {
    label: string;
    value: string;
    context: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'Maneesh Maddala',
  brandName: 'From Test to Trust',
  domain: 'fromtesttotrust.com',
  tagline: 'Engineering quality, risk, and trust for an AI-first world.',
  role: 'AI-First Quality Engineering Leader',
  employer: 'Principal QA Automation Engineer at Morningstar',
  location: 'Chicago, IL',
  bio: 'Over 15+ years orchestrating test architecture, risk engineering, and AI-enabled pipelines across fintech, insurance, and enterprise platforms. I design the governance, evaluation harnesses, and multi-agent infrastructure that make software reliability inevitable.',
  currentFocus: [
    {
      title: 'Multi-Agent SDLC Orchestration',
      description:
        'Jira-triggered autonomous agent pipelines validating accessibility, SEO, and regression paths.',
      tag: 'Active Architecture',
    },
    {
      title: 'Model Routing & Cost Control via LiteLLM',
      description:
        'Centralized fallback, latency routing, and token optimization for enterprise agent swarms.',
      tag: 'Infrastructure',
    },
    {
      title: 'Crash-Testing LLM Guardrails & Evals',
      description:
        'Quantitative red-teaming harnesses enforcing deterministic boundaries on generative outputs.',
      tag: 'Risk Engineering',
    },
  ],
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/maneesh-maddala/',
      label: 'linkedin.com/in/maneesh-maddala',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mmaneesh',
      label: 'github.com/mmaneesh',
    },
    {
      name: 'Ministry of Testing',
      url: 'https://guardrails-with-evals.vercel.app/',
      label: 'Presentations & Talks',
    },
  ],
  verifiedMetrics: [
    {
      label: 'Lead Pipeline Protection',
      value: '~20% Leads Saved',
      context:
        'Prevented an integration failure threatening roughly 20% of expected campaign leads.',
    },
    {
      label: 'Data Integrity Restoration',
      value: '50–60% Bot Traffic',
      context:
        'Discovered and isolated synthetic bot traffic inflating analytics, restoring executive data trust.',
    },
    {
      label: 'Cycle Time Optimization',
      value: 'Days → Hours',
      context:
        'Reduced regression feedback from days to hours; lowered QA cycle time by 20%.',
    },
    {
      label: 'Accessibility Compliance',
      value: 'Near-Zero Escape',
      context:
        'Reduced accessibility defect escape rate to near zero across enterprise design systems.',
    },
  ],
};
