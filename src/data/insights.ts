export interface InsightSection {
  heading: string;
  paragraphs: string[];
  flow?: string[];
  code?: string;
  codeLanguage?: 'ts' | 'json' | 'markdown' | 'yaml' | 'text';
}

export interface InsightEntry {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  format: 'Article' | 'Keynote' | 'Technical Workshop' | 'Conference Talk';
  kind: 'article' | 'speaking';
  abstract: string;
  brief: string;
  keyTakeaways: string[];
  sections?: InsightSection[];
  deckUrl?: string;
  repoUrl?: string;
  tags: string[];
}

export const insightEntries: InsightEntry[] = [
  {
    id: 'playwright-reliability',
    title: 'The Habits That Make Our Tests More Reliable',
    subtitle:
      'Reliable testing starts with risk, data, and the full journey behind a user action.',
    organization: 'Field Notes',
    date: 'September 3, 2026',
    format: 'Article',
    kind: 'article',
    abstract:
      'How we design Playwright coverage around marketing data flows, fast feedback, and failures that point to the right problem.',
    brief:
      'Reliable Playwright tests are built long before we write a locator or add a wait. They reflect the choices we make about risk, data, feedback, and ownership across the whole flow.',
    keyTakeaways: [],
    sections: [
      {
        heading: 'Map the journey before writing the test',
        paragraphs: [
          'Before we automate a step, we need to understand where it begins and where it ends. A visitor may submit a form on a website, but the data can originate in a CMS or CMA, travel through the UI, arrive in Eloqua, and support segmentation, campaign reporting, or downstream systems such as Salesforce.',
          'Mapping the whole path changes the test design. It shows which risk belongs in the browser, which belongs in an API or integration check, and which values need to remain consistent across systems. Without that view, we can test a successful form submission while missing the campaign source, consent value, or content identifier that never reaches Eloqua.',
        ],
        flow: [
          'CMS/CMA campaign metadata',
          'Landing page and hidden form fields',
          'Visitor submits the form',
          'Eloqua contact and activity data',
          'Campaign attribution, segmentation, and reporting',
        ],
      },
      {
        heading: 'Start with risk, not test count',
        paragraphs: [
          'We do not measure a suite by how many tests it contains. We look at the risk it protects. A gated-content form deserves attention because its failure can affect lead capture, campaign attribution, and company KPIs.',
          'A useful test confirms both the visitor-facing result and the data result. The first assertion protects the experience. The second confirms that the information needed by the campaign exists where it should.',
        ],
        code: `await page.getByLabel('Email').fill('test@example.com');
await page.getByRole('button', { name: 'Download guide' }).click();

await expect(
  page.getByText('Your download is ready')
).toBeVisible();

const contact = await eloquaApi.findContact('test@example.com');

expect(contact.fieldValues).toMatchObject({
  emailAddress: 'test@example.com',
  campaignSource: 'download-guide',
  consent: 'true',
});`,
        codeLanguage: 'ts',
      },
      {
        heading: 'Use the fastest feedback loop available',
        paragraphs: [
          'A browser test should not be the first place we discover every broken field mapping or invalid payload. Unit tests can verify local transformation logic. API and integration tests can check required fields, error handling, and the contract between systems.',
          'Playwright is most valuable when the browser contributes risk that those checks cannot cover: validation rules, consent interactions, content variants, hidden fields, and the handoff from a page into a marketing flow. That keeps feedback close to the change and makes failures cheaper to investigate.',
        ],
      },
      {
        heading: 'Run the right tests at the right CI/CD stage',
        paragraphs: [
          'Running every browser test on every pull request can make feedback slow. Skipping browser checks until after merge can leave critical failures too late.',
          'A tiered pipeline gives us a better balance. Run unit and API tests on every pull request. Run a small Playwright smoke suite for critical journeys, such as lead capture or sign-in. Run broader E2E coverage after merge, on a scheduled run, or before a release. The exact split depends on the application and deployment frequency, but the principle stays the same: give developers fast feedback first, then build confidence in the integrated system.',
        ],
      },
      {
        heading: 'Make tests independent and data intentional',
        paragraphs: [
          'Shared test accounts create failures that are hard to explain. One test changes a contact record; another assumes that contact is new. A test passes in isolation but fails after a campaign runs against the same environment.',
          'Each test should create the state it needs and use data that belongs to that run. If we need a contact from a specific campaign, we create it with a unique identifier and verify its record directly. That removes assumptions about execution order and stale data.',
        ],
      },
      {
        heading: 'Treat the UI and data as contracts',
        paragraphs: [
          'The UI has a contract with visitors and with the systems that rely on the information it collects. Semantic locators make the visitor-facing contract clear, while accessible labels and controls make the interaction easier to understand and maintain.',
          'The data contract matters just as much. If the CMS or CMA supplies a campaign identifier, the UI must submit it correctly, and Eloqua must store it in a form that supports attribution and segmentation. A lead with missing campaign data may still exist, but it no longer tells us which campaign generated it.',
        ],
        code: `await page.getByRole('checkbox', {
  name: 'I agree to receive marketing communications',
}).check();`,
        codeLanguage: 'ts',
      },
      {
        heading: 'Make failures explain themselves',
        paragraphs: [
          'Imagine a test that submits a campaign form. The screenshot shows the success message, so the visitor-facing interaction completed. The test record includes a unique email address and correlation ID. When we look up the contact in Eloqua, the contact exists but campaignSource is blank.',
          'That evidence narrows the problem. The UI may have sent the wrong hidden field; the CMS or CMA may have published incorrect metadata; or an integration may have transformed the payload incorrectly. The problem is no longer reported as a generic form failure. It points to a specific break in the flow and helps the right team investigate.',
          'Traces, screenshots, request payloads, responses, and system records turn a failed test into useful feedback.',
        ],
      },
      {
        heading: 'Build trust in the signal',
        paragraphs: [
          'The target is a suite people trust when making release decisions. We build that trust by reviewing recurring failures, removing checks that no longer protect meaningful risk, fixing weak test-data setup, and keeping evidence close to each failure.',
          'Playwright gives us strong browser automation. The confidence comes from the system we build around it: clear risk, fast feedback, intentional data, and evidence that helps us act on failures.',
        ],
      },
    ],
    tags: [
      'Playwright',
      'Test Automation',
      'Marketing Technology',
      'Eloqua',
      'CI/CD',
    ],
  },
  {
    id: 'output-format-types',
    title: 'JSON vs. TOON vs. JSONL vs. Markdown vs. YAML',
    subtitle: 'Choosing a format for AI context, model output, and test data',
    organization: 'Field Notes',
    date: 'September 3, 2026',
    format: 'Article',
    kind: 'article',
    abstract:
      'The same data can be easy to read, cheap to send, simple to stream, or safe to validate. The format decides which trade-off we make.',
    brief:
      'We do not start by asking which format is best. We start with the job: are we giving a model context, collecting its output, processing many records, or writing something people need to edit? The same task data makes the differences clearer.',
    keyTakeaways: [],
    sections: [
      {
        heading: 'The same data, five formats',
        paragraphs: [
          'Imagine an assistant that helps a QA team prepare a checkout release. It needs the test run, the cases in scope, their owners, and the result of each run. Each format below represents a realistic part of that work, but they are not interchangeable. Some make strict integration contracts easier. Some suit long streams. Some work better when a human is going to read or edit the file.',
        ],
      },
      {
        heading: 'JSON',
        paragraphs: [
          'JSON is our default at system boundaries. APIs, tool calls, and application code already understand it, and nesting stays explicit. That makes it a good choice when the model output needs to become an object that another service can validate and use.',
          'The trade-off is repetition. Field names, braces, quotes, and commas appear in every record. For a few objects, that cost is small. For a large prompt full of similar rows, it adds up.',
        ],
        code: `{
  "run": {
    "id": "checkout-regression-2026-09-03",
    "environment": "staging",
    "browser": "chromium"
  },
  "testCases": [
    {
      "id": "TC-101",
      "title": "Guest checkout with a valid card",
      "priority": "P0",
      "owner": "Ava",
      "status": "ready"
    },
    {
      "id": "TC-102",
      "title": "Order confirmation after payment retry",
      "priority": "P1",
      "owner": "Sam",
      "status": "blocked"
    }
  ]
}`,
        codeLanguage: 'json',
      },
      {
        heading: 'TOON',
        paragraphs: [
          'TOON, or Token-Oriented Object Notation, is built for structured input to language models. It removes repeated punctuation and declares the fields once, so a uniform list can take fewer tokens than the equivalent JSON. It is most useful when the prompt contains many rows with the same shape.',
          'We would still keep JSON at the integration boundary. TOON is a newer working-draft format, so we should measure token savings with our own data and convert it back to JSON before handing the result to systems that expect a stable contract.',
        ],
        code: `testCases[3]{id,area,priority,status,owner}:
  TC-101,checkout,P0,ready,Ava
  TC-102,payment,P1,blocked,Sam
  TC-103,confirmation,P1,ready,Ava`,
        codeLanguage: 'text',
      },
      {
        heading: 'JSONL',
        paragraphs: [
          'JSONL, also called newline-delimited JSON, puts one complete JSON value on each line. That small difference makes it practical for batches, logs, and evaluation data because a process can read or write one record at a time. A broken record is easier to isolate, and a large file does not have to be loaded as one array.',
          'We reach for JSONL when the unit of work is a record, not a document. It is a poor fit when the records need to share a nested structure or when a person needs to scan the file as a single narrative.',
        ],
        code: `{"event":"test_result","runId":"checkout-regression-2026-09-03","testId":"TC-101","status":"passed","durationMs":1842}
{"event":"test_result","runId":"checkout-regression-2026-09-03","testId":"TC-102","status":"failed","durationMs":3960,"error":"Payment retry button stayed disabled"}
{"event":"test_result","runId":"checkout-regression-2026-09-03","testId":"TC-103","status":"passed","durationMs":1299}`,
        codeLanguage: 'json',
      },
      {
        heading: 'Markdown',
        paragraphs: [
          'Markdown is not a replacement for a data contract. It is a strong format for instructions, retrieved documentation, and examples because people can read and edit it without a special tool. Headings and lists also give a model useful structure without making the document difficult to maintain.',
          'We use Markdown when meaning lives in the explanation around the data. If a downstream service needs to parse the result reliably, we pair that explanation with a structured output format instead of asking it to extract facts from prose.',
        ],
        code: `## Release candidate: checkout

**Environment:** staging  
**Run:** checkout-regression-2026-09-03

### Current risks

- **TC-102: payment retry** is blocked by the payment sandbox.
- **TC-101: guest checkout** passed in Chromium and Safari.
- Confirm the order confirmation email after the sandbox is available.`,
        codeLanguage: 'markdown',
      },
      {
        heading: 'YAML',
        paragraphs: [
          'YAML is often easier for people to write than JSON. It is common in configuration files and prompt templates because indentation makes simple structures compact and readable. If a team needs to maintain a small configuration by hand, YAML can feel less noisy than JSON.',
          'That convenience needs care. Indentation is part of the syntax, and parsers can differ in how they handle ambiguous values. We avoid using YAML for model output that must pass a strict machine contract. JSON with a schema gives a cleaner boundary there.',
        ],
        code: `run:
  id: checkout-regression-2026-09-03
  environment: staging
  browsers:
    - chromium
    - webkit
  includeTags:
    - checkout
    - payment
  notify:
    channel: qa-release`,
        codeLanguage: 'yaml',
      },
      {
        heading: 'The format is only part of the contract',
        paragraphs: [
          'A valid JSON response can still be wrong. It may omit a required field, use an unexpected value, or return an array where the next system expects an object. For model output, we define the expected shape with JSON Schema or the equivalent tool schema, then test the result against it.',
          'Our rule is straightforward: use JSON and a schema when a system needs reliable output; use JSONL for streams and batch records; use Markdown or YAML when people need to maintain context or configuration; and try TOON when large, regular prompt data makes token cost worth measuring.',
        ],
      },
    ],
    tags: ['AI', 'Structured Output', 'JSON', 'Test Data', 'LLM Context'],
  },
  {
    id: 'everyday-ai-coding',
    title: 'Everyday AI Coding: Skills & Plugins for Testers',
    subtitle: 'Practical skills and plugins for quality engineering work',
    organization: 'Ministry of Testing',
    date: 'July 30, 2026',
    format: 'Technical Workshop',
    kind: 'speaking',
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
    kind: 'speaking',
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
