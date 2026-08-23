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
    subtitle: 'And crash-test them until you can trust they hold',
    organization: 'Ministry of Testing',
    date: 'Recent Keynote',
    format: 'Conference Talk',
    abstract:
      'In an era of non-deterministic LLMs, conventional unit tests fail to catch probabilistic regressions. This talk introduces an engineering blueprint for establishing hard boundary constraints on LLMs, generating automated red-teaming datasets, and running continuous evaluation suites in CI/CD pipelines.',
    keyTakeaways: [
      'Why assertions fail on generative output and how semantic evaluation replaces them.',
      'Building multi-layered guardrails: input filtering, schema adherence, and output validation.',
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
    subtitle:
      'Supercharging quality engineering workflows with custom agent tooling',
    organization: 'Ministry of Testing',
    date: 'Technical Workshop',
    format: 'Technical Workshop',
    abstract:
      'A practical, practitioner-focused session demonstrating how QA engineers can transition from manual test maintenance to building bespoke AI agent skills, plugins, and automation accelerators that automate routine SDLC tasks.',
    keyTakeaways: [
      'Authoring typed, reusable skills for LLM-powered test generators.',
      'Integrating agentic tools directly into Playwright, Cypress, and CI/CD pipelines.',
      'Bridging the gap between QA practitioners and autonomous software development.',
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
