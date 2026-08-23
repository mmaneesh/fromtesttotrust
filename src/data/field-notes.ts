export interface FieldNote {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
}

export const fieldNotes: FieldNote[] = [
  {
    id: 'testing-to-trust',
    title: 'From Testing Software to Engineering Trust',
    date: '2025 Perspective',
    readTime: '4 min read',
    summary:
      'Why the mandate for senior quality leadership has fundamentally shifted from writing test scripts to governing organizational risk and probabilistic systems.',
    content: [
      'For twenty years, quality engineering lived in a deterministic universe: given input X, expect output Y. If the assertion failed, the code was broken.',
      'The arrival of production LLMs and autonomous multi-agent pipelines dismantled that assumption. In an AI-first world, outputs are non-deterministic, systems drift across model updates, and failures occur at the semantic and contextual layer rather than simple syntactic crashes.',
      'This is why the role of the modern quality leader is no longer just finding bugs—it is risk engineering. It means establishing hard boundary constraints, statistical evaluation frameworks, and governance architectures that make trust inevitable, even when the underlying models are probabilistic.',
    ],
    tags: ['Philosophy', 'Trust Engineering', 'AI Leadership'],
  },
  {
    id: 'evals-vs-assertions',
    title: 'Why Unit Assertions Fail on LLMs (And How Evals Fix It)',
    date: '2025 Technical Note',
    readTime: '5 min read',
    summary:
      'Breaking down the transition from binary assert statements to continuous semantic distance, hallucination indexing, and boundary red-teaming.',
    content: [
      'When evaluating generative AI responses, asserting strict string equality is impossible. Even minor temperature adjustments or tokenizer updates alter the wording without altering semantic intent.',
      'To build production-grade trust, quality architecture must move toward multi-tier evaluation:',
      '1. Deterministic schema enforcement (JSON structure, type checks, forbidden tokens).',
      '2. Semantic distance and embedding similarity against verified ground truth sets.',
      '3. Automated LLM-as-a-Judge and red-teaming harnesses testing for hallucination, prompt injection, and compliance boundaries.',
    ],
    tags: ['LLM Evals', 'Architecture', 'Red Teaming'],
  },
];
