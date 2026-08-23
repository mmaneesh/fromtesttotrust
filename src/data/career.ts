export interface CareerRole {
  title: string;
  period: string;
  highlights: string[];
  metrics?: string[];
  skills?: string[];
}

export interface CareerCompany {
  company: string;
  location: string;
  totalTenure: string;
  isCurrent?: boolean;
  roles: CareerRole[];
}

export const careerTimeline: CareerCompany[] = [
  {
    company: 'Morningstar',
    location: 'Chicago, IL',
    totalTenure: 'Dec 2021 — Present (4 yrs 9 mos)',
    isCurrent: true,
    roles: [
      {
        title: 'Principal QA Automation Engineer',
        period: 'Jan 2025 — Present',
        highlights: [
          "Lead enterprise-wide test automation strategy across UI, API, and performance testing for Morningstar's digital products, embedding quality as a shared cross-functional responsibility.",
          'Architect scalable, production AI systems: Jira-triggered multi-agent SDLC pipelines (agent orchestration, LiteLLM model routing, automated Git operations), evaluation & guardrail frameworks, and shared create/publish/invoke skills platform.',
          'Build and deploy production AI agents for cross-functional teams outside QA — Marketing Ops, SEO, Accessibility, Content — including brand compliance auditing, SEO/GEO reporting, and page-classification agents using Claude Code, Cowork, and Plugins.',
          'Caught a critical integration failure during testing of a major marketing campaign where form submissions silently failed to reach downstream systems; escalated and drove a fix within 24 hours, protecting roughly 20% of expected campaign leads.',
          'Identified synthetic bot traffic inflating Google Analytics metrics by 50–60%; partnered with Ops to implement WAF rules that blocked bad traffic while preserving genuine user data, restoring analytics integrity.',
          'Define test architecture standards and shift-left testing practices adopted across multiple product squads.',
        ],
        metrics: [
          '~20% Campaign Leads Protected',
          '50–60% Bot Traffic Discovered & Blocked',
          'Multi-Agent SDLC & LiteLLM Gateway in Production',
        ],
        skills: [
          'AI SDLC',
          'LiteLLM',
          'Multi-Agent Systems',
          'Claude Plugins',
          'Playwright',
          'TypeScript',
          'AWS',
          'Azure DevOps',
        ],
      },
      {
        title: 'Lead Software Development Engineer in Test (Lead SDET)',
        period: 'Aug 2022 — Dec 2024',
        highlights: [
          "Owned end-to-end automation strategy across UI, API, performance, and accessibility testing for Morningstar's digital platform.",
          'Reduced regression feedback loops from days to hours by architecting standardized multi-framework automation suites (Playwright, Cypress, Nightwatch, Selenium).',
          'Built production-grade API test coverage (Playwright, RestAssured, Postman, Newman) validating critical data services for financial intelligence platforms.',
          'Implemented performance testing infrastructure (K6, Google Lighthouse) for continuous Core Web Vitals monitoring.',
          'Delivered WCAG-compliant accessibility testing and visual regression pipelines, reducing accessibility defect escape rate to near zero.',
          'Integrated Splunk and Kibana for real-time error log analysis, reducing mean time to defect detection across release cycles.',
        ],
        metrics: [
          'Regression: Days → Hours',
          'A11y Defect Escape: Near-Zero',
          'Continuous Core Web Vitals (K6 + Lighthouse)',
        ],
        skills: [
          'Playwright',
          'Cypress',
          'RestAssured',
          'Postman',
          'K6',
          'WCAG 2.2',
          'Splunk',
          'Kibana',
        ],
      },
      {
        title: 'Senior SDET',
        period: 'Dec 2021 — Jul 2022',
        highlights: [
          'Reduced QA project cycle time by 20% by designing process improvements (kick-offs, hand-offs, pair programming, code reviews) adopted across a 6-person distributed US/India team.',
          'Mentored a cross-functional team of 6 QA engineers, establishing automation standards that raised team output quality and consistency.',
          'Delivered a Node.js framework proof of concept, presenting findings directly to senior leadership and influencing technology adoption decisions.',
        ],
        metrics: [
          'QA Cycle Time: -20%',
          'Mentored 6 QA Engineers Across US/India',
          'Node.js Architecture PoC',
        ],
        skills: [
          'Node.js',
          'Process Engineering',
          'Team Leadership',
          'Test Strategy',
          'Agile QA',
        ],
      },
    ],
  },
  {
    company: 'CSG',
    location: 'United States',
    totalTenure: 'Jul 2018 — Dec 2021 (3 yrs 6 mos)',
    roles: [
      {
        title: 'Senior Test Automation Engineer',
        period: 'Jul 2021 — Dec 2021',
        highlights: [
          'Led framework design for UI and API test automation (Cypress, RestAssured) within an Agile delivery model.',
          'Defined non-functional testing requirements across load, performance, and accessibility standards.',
        ],
        skills: [
          'Cypress',
          'RestAssured',
          'Performance Testing',
          'API Automation',
          'Agile Delivery',
        ],
      },
      {
        title: 'Test Automation Engineer II',
        period: 'Jul 2018 — Jun 2021',
        highlights: [
          'Automated full regression suites for Angular and React applications (Cypress, Selenium WebDriver), eliminating manual execution for core user journeys.',
          'Designed BDD/TDD frameworks (Cucumber/Gherkin) improving cross-team test transparency.',
          'Built API automation with Postman and RestAssured, and extended automated test coverage to native mobile via Appium.',
        ],
        skills: [
          'Selenium WebDriver',
          'Cypress',
          'Appium',
          'Cucumber BDD',
          'Postman',
          'React/Angular Testing',
        ],
      },
    ],
  },
  {
    company: 'Creospan Inc.',
    location: 'Northbrook, IL',
    totalTenure: 'May 2016 — Apr 2018 (2 yrs)',
    roles: [
      {
        title: 'Automation Test Engineer',
        period: 'May 2016 — Apr 2018',
        highlights: [
          'Built Selenium (Java) automation frameworks spanning functional UI, integration, regression, performance, and end-to-end testing.',
          'Integrated automated smoke and sanity suites directly into Jenkins CI pipelines.',
          'Developed LoadRunner performance scripts and automated iOS/Android mobile applications.',
        ],
        skills: [
          'Selenium Java',
          'Jenkins CI',
          'LoadRunner',
          'Mobile QA',
          'Integration Testing',
        ],
      },
    ],
  },
  {
    company: 'Tata Consultancy Services (TCS)',
    location: 'Lake Forest, IL & Chennai, India',
    totalTenure: 'Mar 2009 — May 2016 (7 yrs 3 mos)',
    roles: [
      {
        title: 'Test Automation Engineer / IT Analyst',
        period: 'Mar 2009 — May 2016',
        highlights: [
          'Designed template-based test automation frameworks (HP QTP, Quality Center) for enterprise e-commerce and B2B procurement platforms, spanning UI, regression, integration, and performance testing.',
          'Established and managed an onsite-offshore Global Delivery Model, mentoring offshore QA teams and maintaining consistent quality standards across distributed delivery.',
        ],
        skills: [
          'HP QTP',
          'HP Quality Center',
          'Global Delivery',
          'Enterprise E-Commerce',
          'Test Automation Architecture',
        ],
      },
    ],
  },
];

export const educationAndCredentials = {
  education: {
    degree:
      "Bachelor's Degree in Electrical, Electronics and Communications Engineering",
    institution: 'Jawaharlal Nehru Technological University',
    period: '2004 — 2008',
  },
  certifications: [
    'SAFe Agile 4.0',
    'ISTQB Certified Tester',
    'HP-QTP 10.0',
    'ITIL Foundation',
    'HP Quality Center',
  ],
};
