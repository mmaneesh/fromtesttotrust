export interface EvolutionStage {
  stageNumber: string;
  era: string;
  title: string;
  subtitle: string;
  narrative: string;
  keyPoints: { label: string; text: string }[];
}

export const aboutData = {
  introduction:
    'Over 15+ years, my work has evolved from hands-on testing to automation architecture and building trustworthy AI systems. Today, as a Principal SDET Engineer, I build evaluation harnesses, guardrails, and human-guided agent workflows that turn quality from a final checkpoint into evidence that systems deliver real value. Across fintech, insurance, and enterprise platforms, I uncover hidden risk, challenge assumptions early, and engineer trust into how software is designed and delivered.',
  evolutionStages: [
    {
      stageNumber: '01',
      era: 'Exploratory & Manual Testing',
      title: 'Exploration',
      subtitle: 'Learning how software actually breaks in the real world.',
      narrative:
        'Following a written script only catches the bugs already expected. The failures that matter most usually live between assumptions, so I treat testing as an active technical investigation grounded in how real people use the product.',
      keyPoints: [
        {
          label: 'Fresh eyes',
          text: 'Test what actually happens, not just what the team expects.',
        },
        {
          label: 'User first',
          text: 'Test interruptions, messy data, and real-world edge cases.',
        },
        {
          label: 'Ask early',
          text: 'Challenge risky assumptions before implementation begins.',
        },
      ],
    },
    {
      stageNumber: '02',
      era: 'Test Automation & Architecture',
      title: 'Automation',
      subtitle: 'Keep it simple. Zero clever code or unwanted abstractions.',
      narrative:
        'Automation should shorten feedback without creating a framework only its author understands. I favor direct tools, readable code, and the smallest architecture that the whole team can maintain.',
      keyPoints: [
        {
          label: 'Use tools directly',
          text: 'Use Playwright or Cypress directly without wrapper layers.',
        },
        {
          label: 'Test at the right level',
          text: 'Run UI, API, visual, and a11y checks where signal is clearest.',
        },
        {
          label: 'Maintain trust',
          text: 'Keep suites credible with fast runs and clear failure traces.',
        },
      ],
    },
    {
      stageNumber: '03',
      era: 'AI Systems & Governance',
      title: 'Trustworthy AI',
      subtitle: 'Guardrails, evals, and trust baked into the architecture.',
      narrative:
        'AI systems are probabilistic, exposed to injection, and capable of confident error. Trust has to be engineered into the architecture through measurable evaluation, constrained access, resilience, and human review.',
      keyPoints: [
        {
          label: 'Evaluate continuously',
          text: 'Score accuracy, safety, and structure before any agent acts.',
        },
        {
          label: 'Constrain behavior',
          text: 'Validate prompts, schemas, tool calls, and model responses.',
        },
        {
          label: 'Design for resilience',
          text: 'Combine scoped tools, observable routing, and safe failover.',
        },
      ],
    },
  ],
};
