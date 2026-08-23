export interface AISystem {
  id: string;
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
}

export const aiSystems: AISystem[] = [
  {
    id: 'multi-agent-sdlc',
    title: 'Multi-Agent SDLC Orchestration & Jira Triggers',
    subtitle:
      'Autonomous agent execution embedded into enterprise development lifecycles',
    category: 'Multi-Agent Systems',
    summary:
      'Architected an end-to-end multi-agent pipeline where Jira issue transitions trigger autonomous agent workflows for marketing operations, content consistency, accessibility audits, and regression verification.',
    problem:
      'Manual verification across high-velocity marketing campaigns and enterprise content pipelines was creating multi-day bottlenecks and vulnerability to defect escapes.',
    architecture: [
      'Event-driven webhook listeners hooked into Jira status transitions and Azure DevOps CI/CD triggers.',
      'Specialized agent roles: SEO validator, a11y auditor (WCAG 2.2 AA), copy compliance agent, and Playwright test orchestrator.',
      'Centralized orchestration bus managing agent state, tool execution, and PR validation comments.',
    ],
    impact: [
      'Automated verification for continuous marketing and content releases.',
      'Reduced cycle time by 20% while enforcing strict quality baselines.',
      'Created unified visibility for engineering and business stakeholders.',
    ],
    technologies: [
      'TypeScript',
      'Playwright',
      'Azure DevOps',
      'Jira API',
      'Docker',
      'Node.js',
    ],
    featured: true,
  },
  {
    id: 'litellm-gateway',
    title: 'Enterprise Model Gateway & Routing via LiteLLM',
    subtitle:
      'Centralized fallback, latency routing, and token cost governance',
    category: 'Governance',
    summary:
      'Designed and deployed a unified model routing layer utilizing LiteLLM to decouple application agents from individual model providers, manage failover cascades, and optimize token spend.',
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
      'Engineered an automated evaluation framework to crash-test generative model outputs before deployment, validating prompt robustness, injection defenses, and brand fidelity under non-deterministic conditions.',
    problem:
      'Generative AI systems cannot be verified with traditional assert statements due to output non-determinism, requiring programmatic statistical and semantic evaluation.',
    architecture: [
      'Synthetically generated edge-case suites and red-teaming adversarial prompts.',
      'Multi-metric evaluation harnesses: semantic similarity, hallucination scoring, and PII leakage checks.',
      'Integration into CI/CD pipelines as non-negotiable pull-request quality gates.',
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
    subtitle:
      'Democratizing reusable AI tooling and agent skills across squads',
    category: 'Test Architecture',
    summary:
      'Built a shared internal platform for teams to define, test, publish, and invoke custom AI skills and tools, accelerating squad-level AI adoption with standardized guardrails.',
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
];
