export interface SpeakingEvent {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  format: 'Keynote' | 'Technical Workshop' | 'Conference Talk';
  abstract: string;
  keyTakeaways: string[];
  deckUrl: string;
  repoUrl?: string;
  tags: string[];
}

export const speakingEvents: SpeakingEvent[] = [
  {
    id: 'guardrails-and-evals',
    title: 'Guardrails & Evals: How to Build Hard Constraints for AI',
    subtitle: 'How to test whether constraints hold under pressure',
    organization: 'Ministry of Testing',
    date: 'Recent Keynote',
    format: 'Conference Talk',
    abstract:
      'Traditional unit tests cannot cover every variation in model output. This talk shows how to define output constraints, build red-team datasets, and run continuous evaluations in CI/CD.',
    keyTakeaways: [
      'Why assertions fail on generative output and how semantic evaluation replaces them.',
      'Using input filters, schema checks, and output validation together.',
      'Crash-testing LLM agents against prompt injection and model drift before reaching users.',
    ],
    deckUrl: 'https://guardrails-with-evals.vercel.app/',
    tags: [
      'LLM Evals',
      'Guardrails',
      'Risk Engineering',
      'Red Teaming',
      'CI/CD',
    ],
  },
  {
    id: 'everyday-ai-coding',
    title: 'Everyday AI Coding: Skills & Plugins for Testers',
    subtitle: 'Practical skills and plugins for quality engineering work',
    organization: 'Ministry of Testing',
    date: 'Technical Workshop',
    format: 'Technical Workshop',
    abstract:
      'A practical session on building reusable AI skills and plugins for routine testing and delivery tasks.',
    keyTakeaways: [
      'Authoring typed, reusable skills for LLM-powered test generators.',
      'Connecting AI tools to Playwright, Cypress, and CI/CD pipelines.',
      'Choosing where automation helps and where human review is still required.',
    ],
    deckUrl: 'https://everyday-ai-coding.vercel.app/',
    tags: [
      'Agent Skills',
      'Test Automation',
      'Playwright',
      'TypeScript',
      'Developer Experience',
    ],
  },
];
