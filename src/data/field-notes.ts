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
      'Why senior quality work now includes product risk, model behavior, and system governance.',
    content: [
      'For twenty years, quality engineering lived in a deterministic universe: given input X, expect output Y. If the assertion failed, the code was broken.',
      'Production LLMs changed that assumption. Outputs vary, behavior can shift after model updates, and failures may depend on meaning and context rather than a simple crash.',
      'Quality leaders now need to examine product risk as well as defects. That includes output constraints, measurable evaluations, and governance for probabilistic systems.',
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
      'Production systems need several kinds of evaluation:',
      '1. Deterministic schema enforcement (JSON structure, type checks, forbidden tokens).',
      '2. Semantic distance and embedding similarity against verified ground truth sets.',
      '3. Automated model grading and red-team tests for hallucination, prompt injection, and compliance.',
    ],
    tags: ['LLM Evals', 'Architecture', 'Red Teaming'],
  },
];
