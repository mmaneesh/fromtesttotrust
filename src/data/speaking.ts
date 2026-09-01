export interface SpeakingEvent {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  format: 'Keynote' | 'Technical Workshop' | 'Conference Talk';
  abstract: string;
  brief: string;
  keyTakeaways: string[];
  deckUrl: string;
  repoUrl?: string;
  tags: string[];
}

export const speakingEvents: SpeakingEvent[] = [
  {
    id: 'everyday-ai-coding',
    title: 'Everyday AI Coding: Skills & Plugins for Testers',
    subtitle: 'Practical skills and plugins for quality engineering work',
    organization: 'Ministry of Testing',
    date: 'July 30, 2026',
    format: 'Technical Workshop',
    abstract:
      'A practical session on building reusable AI skills and plugins for routine testing and delivery tasks.',
    brief:
      'I ran a technical workshop for the Ministry of Testing community on putting AI skills and plugins to work in a tester’s daily workflow. It sets the vocabulary first, then walks through the problem teams keep hitting: re-explaining the same conventions on every task, and how one skill captures them for good. A live demo builds a Playwright framework for the Sauce Demo app and puts a skill-guided run next to one without. The close marks where the automation helps and where a tester still reviews what it produces.',
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
  {
    id: 'guardrails-and-evals',
    title: 'Guardrails & Evals: How to Build Hard Constraints for AI',
    subtitle: 'How to test whether constraints hold under pressure',
    organization: 'Ministry of Testing',
    date: 'September 23, 2026',
    format: 'Technical Workshop',
    abstract:
      'Traditional unit tests cannot cover every variation in model output. This talk shows how to define output constraints and run continuous evaluations in CI/CD.',
    brief:
      'I ran a technical workshop for the Ministry of Testing community on building hard constraints for AI systems and testing whether they hold under pressure. It separates the guardrail from the eval that tries to break it, then uses a case study of 22 agent runs to show why checking every constraint with an LLM does not scale. The answer is a tiered suite: deterministic schema checks at the base, mechanical checks on each pull request, and a few LLM-judged evals kept for the cases that need them. A live demo runs a 14-eval suite against contract-drift detection.',
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
];
