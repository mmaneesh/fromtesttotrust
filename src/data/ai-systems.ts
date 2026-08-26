export type AISystemId =
  | 'multi-agent-sdlc'
  | 'litellm-gateway'
  | 'llm-guardrails-evals'
  | 'shared-skills-platform'
  | 'support-intake-agent'
  | 'brand-unification-skill';

export interface AISystem {
  id: AISystemId;
  title: string;
  subtitle: string;
  category:
    | 'Multi-Agent Systems'
    | 'LLM Evals & Guardrails'
    | 'Test Architecture'
    | 'Governance';
  summary: string;
  problem: string;
  architecture: string[];
  impact: string[];
  technologies: string[];
  links?: {
    label: string;
    url: string;
    type: 'deck' | 'code' | 'article' | 'external';
  }[];
  featured: boolean;
  workflow?: {
    nodes: { label: string; command?: string; humanGate?: boolean }[];
    phases: {
      label: string;
      title: string;
      command: string;
      summary: string;
      scenarioFloors?: { label: string; value: string }[];
    }[];
    handoffs: {
      from: string;
      to: string;
      label: string;
      artifact?: string;
      humanReview?: boolean;
    }[];
    roles: {
      name: string;
      model: string;
      reads: string;
      writes: string;
      boundary: string;
    }[];
    guardrails: string[];
    reviewLabel: string;
    futureDirection: string;
  };
}

export const aiSystems: AISystem[] = [
  {
    id: 'multi-agent-sdlc',
    title: 'Human-Guided Agentic Test Engineering Pipeline',
    subtitle:
      'Jira-triggered planning, test design, and repository-aware automation',
    category: 'Multi-Agent Systems',
    summary:
      'Built a workflow that turns Jira tickets into reviewed scenarios, TestRail cases, and maintainable Playwright tests. A person approves each consequential step.',
    problem:
      'Planning, test-case design, and automation were disconnected activities. Engineers repeatedly reconstructed ticket context, duplicated TestRail coverage, and implemented brittle automation without a consistent view of the feature, epic, repository, or existing test architecture.',
    architecture: [
      '/start-planning uses Jira MCP to assemble ticket, acceptance criteria, documentation, attachments, references, parent epic, and completed or in-review sibling-ticket context before proposing risk-tiered scenarios.',
      '/test-cases uses TestRail MCP to inspect projects and folders, update matching coverage, or create the missing folders and cases.',
      '/automate uses Playwright MCP and repository context to implement POM-based UI, API, visual, or component tests after deployment.',
    ],
    impact: [
      'Established minimum scenario floors by ticket criticality: 5+ low, 6-8+ medium, and 10-15+ critical.',
      'Kept a human in control before test-case creation, automation implementation, and pull-request delivery.',
      'Connected planning evidence, test management, repository-aware automation, and PR review in one traceable workflow.',
    ],
    technologies: [
      'Jira MCP',
      'TestRail MCP',
      'Playwright MCP',
      'TypeScript',
      'AWS',
      'Git',
      'POM',
    ],
    featured: true,
    workflow: {
      nodes: [
        { label: 'Jira ticket', command: '/start-planning' },
        { label: 'Context + scenarios' },
        {
          label: 'Human review',
          command: '/test-cases',
          humanGate: true,
        },
        { label: 'TestRail coverage' },
        {
          label: 'Deploy + approve',
          command: '/automate',
          humanGate: true,
        },
        { label: 'Playwright implementation' },
        { label: 'Review + PR', humanGate: true },
      ],
      phases: [
        {
          label: '01 // Plan',
          title: 'Context + scenario design',
          command: '/start-planning',
          summary:
            'Read acceptance criteria, technical notes, attachments, references, the parent epic, and completed or in-review sibling tickets.',
          scenarioFloors: [
            { label: 'Low', value: '5+' },
            { label: 'Medium', value: '6-8+' },
            { label: 'Critical', value: '10-15+' },
          ],
        },
        {
          label: '02 // Cover',
          title: 'TestRail coverage',
          command: '/test-cases',
          summary:
            'Inspect project folders, update matching cases, or create missing structure and coverage; then return every case link for review.',
        },
        {
          label: '03 // Automate',
          title: 'Playwright implementation',
          command: '/automate',
          summary:
            'Route UI, API, visual, or component work; reuse page objects and fixtures, prefer user-facing locators, and run focused tests.',
        },
      ],
      handoffs: [
        {
          from: 'Human',
          to: 'Planner',
          label: 'Request ticket plan',
        },
        {
          from: 'Planner',
          to: 'Human',
          label: 'Return risk-tiered scenarios',
          artifact: 'scenarios.md',
          humanReview: true,
        },
        {
          from: 'Human',
          to: 'TestRail',
          label: 'Send approved scenarios',
        },
        {
          from: 'TestRail',
          to: 'Human',
          label: 'Return mapped coverage',
          artifact: 'testrail-cases.md',
          humanReview: true,
        },
        {
          from: 'Human',
          to: 'Coder',
          label: 'Send approved test cases',
        },
        {
          from: 'Coder',
          to: 'Human',
          label: 'Return scoped implementation',
          artifact: 'changes.md',
          humanReview: true,
        },
        {
          from: 'Human',
          to: 'Tester',
          label: 'Send approved changes',
        },
        {
          from: 'Tester',
          to: 'Human',
          label: 'Return execution evidence',
          artifact: 'test-results.md',
          humanReview: true,
        },
        {
          from: 'Human',
          to: 'Reviewer',
          label: 'Request final review',
        },
        {
          from: 'Reviewer',
          to: 'Human',
          label: 'Return verdict',
          artifact: 'review.md',
          humanReview: true,
        },
      ],
      roles: [
        {
          name: 'Human',
          model: 'Decision owner',
          reads: 'Every stage artifact and the execution evidence.',
          writes:
            'Approvals, refinements, commands, and the final PR decision.',
          boundary:
            'No consequential stage advances without explicit human approval.',
        },
        {
          name: 'Planner',
          model: 'Opus',
          reads:
            'Jira ticket, acceptance criteria, epic history, attachments, technical notes, and design references.',
          writes: 'scenarios.md with cited, risk-tiered coverage.',
          boundary: 'Cannot write test code, page objects, or TestRail cases.',
        },
        {
          name: 'TestRail',
          model: 'Sonnet',
          reads: 'Approved scenarios.md and existing TestRail structure.',
          writes:
            'testrail-cases.md plus links to updated or newly created coverage.',
          boundary: 'Cannot modify repository source or implement automation.',
        },
        {
          name: 'Coder',
          model: 'Sonnet',
          reads:
            'Approved testrail-cases.md, repository conventions, page objects, fixtures, and suite structure.',
          writes: 'Scoped page objects, specs, and changes.md.',
          boundary:
            'Cannot alter package, config, or CI files, run the full suite, or perform git actions.',
        },
        {
          name: 'Tester',
          model: 'Sonnet',
          reads: 'changes.md and the approved implementation scope.',
          writes: 'Root-cause fixes within scope and test-results.md.',
          boundary:
            'Cannot touch files outside the approved change set or broaden the requested scope.',
        },
        {
          name: 'Reviewer',
          model: 'Opus',
          reads: 'The full diff, test-results.md, and repository checklist.',
          writes: 'review.md with a final verdict and actionable findings.',
          boundary: 'Cannot edit code, merge, push, or open a pull request.',
        },
      ],
      guardrails: [
        'File-scope discipline: each stage changes only the files required for its assigned job; anything outside that boundary is flagged for a human.',
        'No silent scope creep: implementation stays anchored to the Jira ticket and approved scenarios.',
        'End-to-end traceability: Jira acceptance criteria, epic context, and design references remain connected through TestRail coverage and final test source.',
        'No false-green results: test.skip() requires a Jira-tracked TODO; assertions are never weakened and valid cases are never deleted to force a pass.',
        'Merge and pull-request actions remain human decisions.',
      ],
      reviewLabel: 'Human Review',
      futureDirection: 'Future: evidence-gated autonomy',
    },
  },
  {
    id: 'litellm-gateway',
    title: 'Enterprise Model Gateway & Routing via LiteLLM',
    subtitle:
      'Centralized fallback, latency routing, and token cost governance',
    category: 'Governance',
    summary:
      'Built a LiteLLM routing layer that separates applications from model providers, handles failover, and tracks token cost.',
    problem:
      'Direct provider coupling created systemic single-points-of-failure during rate limits and API outages, with no unified observability over token costs.',
    architecture: [
      'Dynamic routing based on task complexity, latency SLAs, and cost thresholds.',
      'Automatic fallback cascades (Claude 3.5 Sonnet → GPT-4o → Mistral Large) with zero client downtime.',
      'Centralized prompt caching and telemetry logging for rate limits, token consumption, and response drift.',
    ],
    impact: [
      '99.9% uptime for AI-assisted QA agents through automated provider failovers.',
      'Actionable cost governance and usage telemetry across engineering teams.',
    ],
    technologies: [
      'LiteLLM',
      'Python',
      'FastAPI',
      'Redis',
      'Docker',
      'OpenTelemetry',
    ],
    featured: true,
  },
  {
    id: 'llm-guardrails-evals',
    title: 'LLM Guardrails & Continuous Red-Teaming Harness',
    subtitle: 'Automated boundary testing and hallucination defense in CI/CD',
    category: 'LLM Evals & Guardrails',
    summary:
      'Built automated evaluations for model outputs before deployment, covering prompt injection, hallucination, output structure, and brand requirements.',
    problem:
      'Generative AI systems cannot be verified with traditional assert statements due to output non-determinism, requiring programmatic statistical and semantic evaluation.',
    architecture: [
      'Synthetically generated edge-case suites and red-teaming adversarial prompts.',
      'Evaluation metrics for semantic similarity, hallucinations, and PII leakage.',
      'Required evaluation checks in CI/CD before pull requests can merge.',
    ],
    impact: [
      'Near-zero critical defect escape across generative AI features.',
      'Presented as a benchmark methodology at the Ministry of Testing (2024).',
    ],
    technologies: [
      'LLM Evals',
      'Python',
      'TypeScript',
      'Prompt Engineering',
      'CI/CD Gates',
      'Statistical Testing',
    ],
    links: [
      {
        label: 'View Ministry of Testing Slide Deck ↗',
        url: 'https://guardrails-with-evals.vercel.app/',
        type: 'deck',
      },
    ],
    featured: true,
  },
  {
    id: 'shared-skills-platform',
    title: 'Shared Create/Publish/Invoke Skills Platform',
    subtitle: 'Reusable AI tools and agent skills for product teams',
    category: 'Test Architecture',
    summary:
      'Built an internal platform where teams define, test, publish, and use shared AI skills with common security and quality checks.',
    problem:
      'Siloed engineering teams were duplicating custom scripts and prompts without central quality oversight or security validation.',
    architecture: [
      'Standardized skill schema with typed parameter definitions and execution sandboxes.',
      'Version-controlled registry for team-authored skills (Playwright automation, API mocking, data synthesis).',
      'Automated linting and security scanning for all published skills.',
    ],
    impact: [
      'Accelerated cross-functional AI adoption across testing, dev, and content teams.',
      'Standardized security and quality baselines across dozens of custom plugins.',
    ],
    technologies: [
      'TypeScript',
      'JSON Schema',
      'Git Workflows',
      'API Gateway',
      'Playwright',
    ],
    links: [
      {
        label: 'View Everyday AI Coding Slides ↗',
        url: 'https://everyday-ai-coding.vercel.app/',
        type: 'deck',
      },
    ],
    featured: false,
  },
  {
    id: 'support-intake-agent',
    title: 'Support Intake Agent',
    subtitle:
      'Structured triage and context-aware routing for incoming requests',
    category: 'Multi-Agent Systems',
    summary:
      'Built an intake agent that turns scattered incoming requests into structured cases, clarifies the relevant context, and routes each case to the right next step.',
    problem:
      'Support requests arrived with uneven detail and often required manual follow-up before the right team could act, slowing response and making handoffs difficult to trace.',
    architecture: [
      'Collects incoming requests and extracts the context needed to understand the case.',
      'Applies a consistent triage structure before recommending the appropriate owner or workflow.',
      'Keeps the final routing decision visible and reviewable by the people responsible for the outcome.',
    ],
    impact: [
      'Reduced the effort required to turn incomplete requests into actionable cases.',
      'Established a consistent handoff pattern without exposing internal support operations.',
    ],
    technologies: ['AI Agents', 'Workflow Design', 'Human Review'],
    featured: true,
  },
  {
    id: 'brand-unification-skill',
    title: 'Brand Unification Skill',
    subtitle: 'Shared standards for consistent AI-assisted work',
    category: 'Governance',
    summary:
      'Built a reusable skill that helps teams apply shared brand standards consistently across AI-assisted work without exposing the underlying internal guidance.',
    problem:
      'Different teams were applying brand guidance inconsistently across AI-assisted work, creating avoidable review cycles and uneven output quality.',
    architecture: [
      'Centralizes shared brand considerations in a reusable, governed skill.',
      'Guides teams toward consistent decisions while preserving the context of each request.',
      'Keeps the internal standards private while making their intended outcomes repeatable.',
    ],
    impact: [
      'Improved consistency across AI-assisted work without requiring each team to recreate the same guidance.',
      'Created a safer path for broad adoption of shared brand standards.',
    ],
    technologies: ['AI Skills', 'Governance', 'Prompt Engineering'],
    featured: true,
  },
];
