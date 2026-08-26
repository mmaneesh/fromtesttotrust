export interface SiteConfig {
  name: string;
  brandName: string;
  domain: string;
  tagline: string;
  role: string;
  employer: string;
  location: string;
  email: string;
  bio: string;
  currentFocus: {
    title: string;
    description: string;
    tag: string;
  }[];
  socials: {
    id: 'linkedin' | 'github' | 'speaking';
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
  tagline:
    'Engineering quality, managing risk, and building trustworthy systems.',
  role: 'Principal SDET Engineer',
  employer: 'Morningstar, Inc.',
  location: 'Chicago, IL',
  email: 'maneesh.maddala@gmail.com',
  bio: 'Over 15+ years, I have worked across test architecture, risk engineering, and AI systems in fintech, insurance, and enterprise software. I build evaluation, governance, and automation that teams can understand and maintain.',
  currentFocus: [
    {
      title: 'Multi-Agent SDLC Orchestration',
      description:
        'Jira-based agent workflows for accessibility, SEO, and regression testing.',
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
        'Evaluation and red-team tests for accuracy, safety, and output constraints.',
      tag: 'Risk Engineering',
    },
  ],
  socials: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/maneesh-maddala/',
      label: 'linkedin.com/in/maneesh-maddala',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/mmaneesh',
      label: 'github.com/mmaneesh',
    },
    {
      id: 'speaking',
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
      value: '50-60% Bot Traffic',
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
