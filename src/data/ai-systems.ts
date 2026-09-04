export type AISystemId =
  | 'litellm-gateway'
  | 'shared-skills-platform'
  | 'multi-agent-sdlc'
  | 'defect-triaging-agent'
  | 'support-intake-agent'
  | 'office-hours-agent'
  | 'brand-unification-skill';

export interface AISystem {
  id: AISystemId;
  title: string;
  subtitle: string;
  /** Plain "what it does" line shown on the AI Systems card (2-3 lines, present tense). */
  blurb: string;
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
    id: 'litellm-gateway',
    title: 'Dev Loop: A Sandboxed Multi-Agent Delivery Platform',
    subtitle:
      'From a Jira comment to an isolated agent that opens a pull request, with governed model access and agent-to-agent interop.',
    blurb:
      'Runs each Jira ticket as an isolated agent that works in its own sandbox and opens a pull request, with every model call routed through one governed gateway.',
    category: 'Multi-Agent Systems',
    summary:
      'Our team built Dev Loop as one shared path from a Jira comment to a reviewed pull request. The comment starts an isolated agent, the agent works the ticket in its own sandbox, and every model call goes through one governed route.',
    problem:
      'Across our company, teams were building their own agents, each on the stack that suited them. Every one ran alone, with no shared way to execute safely, reach a model, or hand work to another team’s agent. We watched team after team re-solve the same four problems from scratch: isolation, credentials, model access, and interop.',
    architecture: [
      'A ticket enters through a WAF that only trusts Jira, then passes API Gateway and the dev-loop-api Lambda. The Lambda takes a per-ticket lock in DynamoDB so the same ticket never runs twice, then puts an event on SQS. Anything that fails to start lands in a dead-letter queue we can inspect.',
      'A dispatcher Lambda reads the queue and launches one ephemeral ECS Fargate task per ticket. Each task runs an OpenCode agent in its own sandbox, pulls its image from ECR, and reads short-lived Jira, Git, and LiteLLM credentials from Secrets Manager. An EventBridge reaper shuts down any task that runs past its budget.',
      'From inside the sandbox the agent calls MCP tool servers for its tools and context, commits to a branch, and opens a pull request. It speaks A2A when it needs an agent from another team. Every model call goes through LiteLLM, which authorizes it against an Okta-provisioned identity, routes to OpenRouter or AWS Bedrock, and falls back to the default provider when one is down. Persisting run memory in DynamoDB is the next piece.',
    ],
    impact: [
      'Agents from different teams now take part in the same workflow, and no team had to move to a shared stack to join.',
      'Model access is one policy the platform team owns: LiteLLM checks every call against an Okta identity, so there are no provider keys scattered across repositories.',
      'Every run is isolated, scoped to the credentials it needs, and ends at a pull request a person reviews before merge.',
    ],
    technologies: [
      'A2A',
      'LiteLLM',
      'Okta',
      'OpenCode',
      'AWS',
      'ECS Fargate',
      'Python',
    ],
    featured: true,
  },
  {
    id: 'shared-skills-platform',
    title: 'Shared Skills Repository',
    subtitle:
      'From every team building skills in isolation to one GitHub repository the whole company publishes to and reuses.',
    blurb:
      'A GitHub repository of shared Claude skills, generic and team-specific: developers browse it directly, non-technical staff search it through a Claude Desktop connector.',
    category: 'Governance',
    summary:
      'Our team built a shared skills repository on GitHub where any team can publish its skills and check for an existing one before building a new copy. Every skill carries its author’s username, so a broken or unclear one traces straight back.',
    problem:
      'Across our company, teams were writing their own Claude skills and keeping them to themselves. When two teams worked on similar problems, they often built the same skill twice, because neither could see the other’s. A skill that broke had no name attached, so no one knew who to ask.',
    architecture: [
      'The repository lives in GitHub, where everyone already has access. Skills are split into two groups, generic ones any team can use and team-specific ones, so an author checks the right set first. Developers browse and search it directly.',
      'For staff who do not work in GitHub, a connector links Claude Desktop to the repo. They ask Claude to search for an existing skill and get the same catalog from the chat window they already use.',
      'To add a skill, an author runs /skill-creator, describes what it should do, and gets a working scaffold back. The connector publishes it to the repo with the author’s username attached.',
    ],
    impact: [
      'Teams stopped rebuilding skills that already existed and started pulling the published ones.',
      'Developers and non-developers work from one catalog, one through GitHub and the other through the connector.',
      'Every skill has a named owner, so a broken or unclear one traces back to the person who wrote it.',
    ],
    technologies: [
      'Claude Skills',
      'GitHub',
      'Claude Desktop',
      'MCP Connectors',
      'skill-creator',
      'Claude Enterprise',
      'Knowledge Sharing',
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
    id: 'multi-agent-sdlc',
    title: 'Human-Guided Agentic Test Engineering Pipeline',
    subtitle:
      'From Jira ticket to reviewed test scenarios, TestRail coverage, and Playwright tests.',
    blurb:
      'Turns a Jira ticket into reviewed test scenarios, TestRail coverage, and Playwright tests, stopping for human approval before each stage.',
    category: 'Multi-Agent Systems',
    summary:
      'The workflow I built carries one Jira ticket through scenario design, TestRail coverage, and Playwright automation as a single reviewed path. It stops for a person before it changes coverage, writes code, or opens a pull request.',
    problem:
      'On my team, test planning, case design, and automation were three separate activities, usually picked up by different people at different times. Each hand-off started by rebuilding the same context: the feature, its epic, the repository, and the shape of the existing test suite. Coverage drifted in TestRail as similar cases got written twice, and automation built without that context turned brittle.',
    architecture: [
      'The workflow opens with /start-planning. Before it proposes anything, it reads the ticket in full: acceptance criteria, technical notes, attachments, linked references, the parent epic, and any sibling tickets already done or in review. From that context it drafts risk-tiered scenarios and returns them for review.',
      'Once the scenarios are approved, /test-cases maps them onto the existing TestRail project. It updates the cases that already match, creates the folders and cases that are missing, and returns every affected link so the coverage can be checked before the feature ships.',
      'After deployment, /automate takes the approved cases together with the repository context and writes POM-based tests, each routed to the UI, API, visual, or component suite that fits. It builds on the page objects and fixtures already in the codebase rather than adding parallel ones.',
    ],
    impact: [
      'Scenario depth scales with risk: a floor of 5+ scenarios for low-criticality tickets, 6-8+ for medium, and 10-15+ for critical work.',
      'Three points in the path need a person’s decision: creating the TestRail cases, starting the automation, and delivering the pull request.',
      'A change stays traceable from its planning evidence through the TestRail cases, the test code, and the review that approved it.',
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
    id: 'defect-triaging-agent',
    title: 'Defect Triaging Agent',
    subtitle:
      'We pull recent monocart-html reports from S3 and turn them into a reliability report for the Playwright suite, on demand.',
    blurb:
      'We analyze the latest 1-50 monocart-html reports from S3 and show which specs are flaky, still failing after retries, or getting slower.',
    category: 'Test Architecture',
    summary:
      'We built this agent to turn that report history into a clear reliability picture. Instead of comparing runs by hand, we can ask for the last 30 reports and see the patterns across the suite in one place.',
    problem:
      'Teams struggle to see what automation reports are telling them over time. Most teams open the latest execution report and fix whatever failed. That gives us a view of the last run, but it does not show whether a spec has been flaky for weeks, keeps failing after retries, or is getting slower. We need more reports to find those patterns and make good decisions.',
    architecture: [
      'We choose a window of 1 to 50 monocart-html reports from S3. If a report is incomplete or unreadable, we leave it out and tell the team how many runs we could use.',
      'We parse the usable reports before involving the model. For every spec, we keep its attempt history, final outcome, duration, timestamp, and sanitized error details. The raw HTML stays out of the model context.',
      'We group that evidence by spec and by day. The report separates final failures from retry-hidden flakiness, groups recurring errors, tracks duration changes, and ranks the tests that need attention.',
    ],
    impact: [
      'A flaky spec fails on its first attempt and then passes on retry. A regularly failing spec still fails after both retries.',
      'We can see how failures and durations change day by day, along with each spec’s average execution time. A complex test can stay slow without being treated as a defect; it rises in the queue when it gets slower.',
      'We group similar errors with the affected specs and one sanitized example, so we can investigate the shared cause instead of reading the same failure message repeatedly.',
    ],
    technologies: [
      'Playwright',
      'monocart-html',
      'AWS S3',
      'TypeScript',
      'LLM Analysis',
      'Test Reliability',
    ],
    featured: true,
  },
  {
    id: 'support-intake-agent',
    title: 'Support Intake Agent',
    subtitle:
      'From requests scattered across email, Slack, and Jira to one Teams queue and a routed Asana task.',
    blurb:
      'Funnels support requests from email, Slack, and Jira into one Microsoft Teams queue, then turns a triaged message into a routed Asana task on demand.',
    category: 'Multi-Agent Systems',
    summary:
      'The intake workflow I built for the support team funnels email, Slack, and Jira into one Microsoft Teams channel, where an engineer turns a real request into a routed Asana task with one action.',
    problem:
      'A colleague on the support team told me they were struggling to keep up. Requests reached the team from four places at once: email, Microsoft Teams chat, Slack, and Jira tickets, each with its own queue and its own notifications, and no one could watch all four. Some slipped through, some got worked twice, and there was no record of how a request turned into tracked work.',
    architecture: [
      'Each source has its own webhook, keyed to the support email address, the Slack channel, or the Jira project. When a request lands, the webhook pulls the sender, subject, body, and attachments into a single message and posts it to one Microsoft Teams channel, so the team watches one queue instead of four.',
      'The team triages in that channel. Most messages are noise and go no further. When a request is a real issue, an engineer opens the message actions menu and runs the Support Intake Agent action, which passes that message to a Power Automate flow.',
      'The flow reads the message and its thread for the requestor, the description, and any attachments, then opens an Asana task with those fields copied across. It matches the request type to the team that owns it and assigns the task to that team’s project.',
    ],
    impact: [
      'The support team watches one Teams channel instead of four separate inboxes.',
      'Turning a request into a tracked Asana task is one action, and the task arrives with the requestor, the description, and the files already on it.',
      'Every task lands with the team that owns its request type, and anyone can trace it back to the message it started as.',
    ],
    technologies: [
      'Power Automate',
      'Microsoft Teams',
      'Webhooks',
      'Asana API',
      'Slack',
      'Jira',
      'Workflow Design',
    ],
    featured: true,
  },
  {
    id: 'office-hours-agent',
    title: 'Office Hours Agent',
    subtitle:
      'From raw office-hours recordings to organized answers that span every past session.',
    blurb:
      'Turns recorded office-hours sessions into titled, indexed transcripts, then answers questions from Claude Desktop by drawing on every session that touches the topic.',
    category: 'Multi-Agent Systems',
    summary:
      'The office-hours agent I built converts each recorded session into a titled, indexed transcript, then answers questions from Claude Desktop by pulling from every session that touches the topic. Its answers stay grounded in what was said in the room.',
    problem:
      'My team runs biweekly office hours for the rest of the company: CMS feature demos, content authoring and asset best practices, taxonomy tagging, and how to build each content type, from blogs to product pages. Every session was recorded, but the same questions kept coming back weeks later. The answers were sitting in the recordings, and no one wanted to scrub through hours of video to find them.',
    architecture: [
      'A webhook watches the recordings folder. When a new session lands, a workflow takes its raw .vtt transcript, cleans it into Markdown, titles it after the topic that was discussed, and files it in SharePoint next to the others.',
      'The formatted transcripts are indexed by meaning, so related topics sit near each other. A question about taxonomy tagging pulls the passages where tagging came up, even from sessions months apart.',
      'From Claude Desktop, someone asks a question the way they would ask a colleague. The agent works out which topics it touches, gathers the relevant passages from across sessions, and returns one organized answer instead of scattered fragments.',
    ],
    impact: [
      'The same question stops coming back: the answer from any past session is a chat message away.',
      'An answer can span several sessions, so a topic that was covered in pieces over months reads as one explanation.',
      'New recordings join the knowledge base on their own, with no manual transcription or filing.',
      'It started with our team’s office hours; other teams saw it working and now run their own sessions through the same agent.',
    ],
    technologies: [
      'Claude Desktop',
      'MCP',
      'SharePoint',
      'Webhooks',
      'RAG',
      'Semantic Search',
      'Markdown',
    ],
    featured: true,
  },
  {
    id: 'brand-unification-skill',
    title: 'Brand Unification Skill',
    subtitle:
      'From a public URL to a scored brand-migration audit with a routed escalation.',
    blurb:
      'Audits a URL, doc, PDF, or deck against the unified brand’s rules, scores it on a fixed rubric, rewrites off-brand copy, and routes anything sensitive to the content or legal team.',
    category: 'Governance',
    summary:
      'To address it, I proposed a Claude skill and built it: content and creative teams import it, hand it a URL, and it audits the page against the unified brand’s rules. Every finding traces to a written rule, and the skill rewrites and recommends but never publishes.',
    problem:
      'My company was consolidating several legacy brands into one. Thousands of public pages still named the retired brands: blog posts, articles, research papers, campaign assets. Content writers and creative services had no consistent way to find every reference, judge how far off-brand a page was, or decide what needed legal review.',
    architecture: [
      'A user in Claude Desktop pastes a URL and asks Claude to audit it. That request loads the skill, which pulls the page and, following progressive disclosure, reads only the rule files it needs for the current step, so the context stays small and uncorrupted across a long audit.',
      'The skill runs the content through four ordered rule sets: brand remediation, tone and voice, content rewrite, and escalation. Each set scores the content against its rubric and records the specific rule behind every finding.',
      'It returns a score per rubric, a rewritten draft of the off-brand passages, and an escalation call: keep it with the content team, or send it to legal. The writer applies the changes; the skill never publishes.',
    ],
    impact: [
      'The brand migration finished in about a month against a three-month estimate: one week to build and test the skill, three weeks to work through the content.',
      'Content writers and creative services run the audit themselves in Claude, with no dependency on a central brand reviewer.',
      'What started as a web-page tool now audits Word documents, PDFs, and presentations, and is the organization’s default path for content migration.',
    ],
    technologies: [
      'Claude Skills',
      'Progressive Disclosure',
      'Claude Enterprise',
      'Rubric Scoring',
      'Prompt Engineering',
      'Guardrails',
      'Governance',
    ],
    featured: true,
  },
];
