export interface InsightSection {
  heading: string;
  paragraphs: string[];
  flow?: string[];
  code?: string;
  codeLanguage?: 'ts';
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
