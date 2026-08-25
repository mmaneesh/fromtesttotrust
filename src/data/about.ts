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
          text: 'Explore what actually happens, not only what the team hopes will happen.',
        },
        {
          label: 'User first',
          text: 'Test interruptions, messy data, rapid actions, and real-world constraints.',
        },
        {
          label: 'Ask early',
          text: 'Challenge risky assumptions before they become expensive implementation.',
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
          text: 'Build with Playwright or Cypress without unnecessary wrapper layers.',
        },
        {
          label: 'Test at the right level',
          text: 'Place UI, API, visual, component, and accessibility coverage where each gives the clearest signal.',
        },
        {
          label: 'Maintain trust',
          text: 'Fast, stable tests and obvious failure traces keep the suite credible.',
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
          text: 'Score accuracy, safety, and structure before an agent takes action.',
        },
        {
          label: 'Constrain behavior',
          text: 'Validate inputs, schemas, tool calls, and outputs beyond prompt wording.',
        },
        {
          label: 'Design for resilience',
          text: 'Use scoped tools, observable routing, and graceful provider failover.',
        },
      ],
    },
  ],
};
