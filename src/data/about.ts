export interface EvolutionStage {
  stageNumber: string;
  era: string;
  title: string;
  subtitle: string;
  narrative: string;
  keyPoints: { label: string; text: string }[];
}

export interface CoreRule {
  title: string;
  detail: string;
}

export const aboutData = {
  headline:
    'Quality for me is not a checkbox or a gate at the end of a sprint.',
  subheadline:
    'Over 15+ years, my work has moved through three clear chapters: hands-on manual testing, simple scalable automation, and building trustworthy AI systems.',
  openingQuote:
    'As Jerry Weinberg once said, quality is value to someone who matters. For me, that means finding hidden risks, questioning assumptions, and protecting the person using our product.',
  evolutionStages: [
    {
      stageNumber: '01',
      era: 'Exploratory & Manual Testing',
      title: 'How I Approach Manual and Exploratory Testing',
      subtitle: 'Learning how software actually breaks in the real world.',
      narrative:
        'When I started in QA, I quickly realized that following a written script only catches the bugs you already expected. The worst bugs always hide in the gaps nobody thought to write down. Influenced by thinkers like James Bach and Michael Bolton, I treat testing as an active technical investigation.',
      keyPoints: [
        {
          label: 'I look at the product with fresh eyes:',
          text: 'Developers naturally test what they hope will work. My job is to explore what actually happens when real people touch it.',
        },
        {
          label: 'I put the user first:',
          text: 'What happens when someone clicks too fast, loses connection halfway through a form, or enters messy data?',
        },
        {
          label: 'I ask the uncomfortable questions early:',
          text: 'Finding a flaw during design discussions saves the team weeks of painful rework later.',
        },
      ],
    },
    {
      stageNumber: '02',
      era: 'Test Automation & Architecture',
      title: 'How I Approach Test Automation',
      subtitle: 'Keep it simple. Zero clever code or unwanted abstractions.',
      narrative:
        'When I moved into automation, I saw teams make the same mistake everywhere: they built massive, over-engineered frameworks with too many custom layers. When the author left the company, nobody could maintain the code, and the whole framework fell apart. My motto on every team I lead is simple: keep it simple, stupid (KISS) and do not build things you do not need (YAGNI). If a new engineer joins my team on Monday, I want them to understand our test code and push their first working test on Tuesday with almost no hand-holding.',
      keyPoints: [
        {
          label: 'I use standard tools directly:',
          text: 'I write clean, readable TypeScript using tools like Playwright or Cypress directly, without wrapping them in five layers of custom code.',
        },
        {
          label: 'I test at the right level:',
          text: 'I cover Web UI, API endpoints, visual regression, components, and accessibility (WCAG 2.2 AA) where each test runs fastest and gives the clearest signal.',
        },
        {
          label: 'I build for easy maintenance:',
          text: 'Flaky tests kill developer trust. I make sure our tests run fast in CI/CD pipelines and give an obvious failure trace when something breaks.',
        },
      ],
    },
    {
      stageNumber: '03',
      era: 'AI-First Systems & Governance',
      title: 'How I Build AI Systems',
      subtitle: 'Guardrails, evals, and trust baked into the architecture.',
      narrative:
        'Traditional code is predictable: input A always gives output B. AI is completely different. A model can give a different answer every time, hallucinate facts, or get tricked by prompt injections. You cannot test an AI system with standard assertions. For me, building AI-first systems means engineering trust into the pipeline itself.',
      keyPoints: [
        {
          label: 'I run evals at every step:',
          text: "I build automated evaluation harnesses that score the model's accuracy, safety, and output format before the agent takes any real action.",
        },
        {
          label: 'I put hard guardrails in place:',
          text: 'I do not rely on prompt phrasing alone. I set strict input filters, enforce JSON schema validation on every tool call, and catch injection attempts before they execute.',
        },
        {
          label: 'I use open standards like MCP:',
          text: 'I build custom plugins and Model Context Protocol (MCP) servers so models only have access to the exact tools and data they need to do their job.',
        },
        {
          label: 'I build for resilience:',
          text: 'If an AI provider goes down or slows down, my gateways (like LiteLLM) automatically fail over to backup models without the user ever noticing.',
        },
      ],
    },
  ],
  coreRules: [
    {
      title: '1. Show proof, not opinions',
      detail:
        "In AI and quality, saying something 'works' means nothing without eval scores, test results, and clear logs to back it up.",
    },
    {
      title: '2. Build guardrails inside the system',
      detail:
        'Security, trust, and accuracy must be built directly into the architecture, not patched on after an incident.',
    },
    {
      title: '3. Simplicity always wins',
      detail:
        'A clean, readable system that the whole team can maintain is always better than a complex framework only one person understands.',
    },
  ],
};
