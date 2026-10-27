export interface CareerRole {
  title: string;
  period: string;
  highlights: string[];
}

export interface CareerCompany {
  company: string;
  location: string;
  isCurrent?: boolean;
  roles: CareerRole[];
}

export const careerTimeline: CareerCompany[] = [
  {
    company: 'Morningstar, Inc.',
    location: 'Chicago, IL',
    isCurrent: true,
    roles: [
      {
        title: 'Principal SDET Engineer',
        period: 'Jan 2025 - Present',
        highlights: [
          "Lead enterprise-wide test automation strategy across UI, API, and performance testing for Morningstar, Inc.'s digital products, embedding quality as a shared cross-functional responsibility.",
          'Build production AI systems for Jira-based test planning, model routing, evaluation, and guardrails, plus tools used by Marketing Ops, SEO, Accessibility, and Content teams.',
          'Caught a critical integration failure during testing of a major marketing campaign where form submissions silently failed to reach downstream systems; escalated and drove a fix within 24 hours, protecting roughly 20% of expected campaign leads.',
          'Identified synthetic bot traffic inflating Google Analytics metrics by 50-60%; partnered with Ops to implement WAF rules that blocked bad traffic while preserving genuine user data, restoring analytics integrity.',
        ],
      },
      {
        title: 'Lead Software Development Engineer in Test (Lead SDET)',
        period: 'Aug 2022 - Dec 2024',
        highlights: [
          'Reduced regression feedback loops from days to hours by architecting standardized multi-framework automation suites (Playwright, Cypress, Nightwatch, Selenium).',
          'Built API test coverage with Playwright, RestAssured, Postman, and Newman for critical financial data services.',
        ],
      },
      {
        title: 'Senior SDET',
        period: 'Dec 2021 - Jul 2022',
        highlights: [
          'Reduced QA project cycle time by 20% by designing process improvements (kick-offs, hand-offs, pair programming, code reviews) adopted across a 6-person distributed US/India team.',
          'Mentored a cross-functional team of 6 QA engineers, establishing automation standards that raised team output quality and consistency.',
        ],
      },
    ],
  },
  {
    company: 'CSG',
    location: 'United States',
    roles: [
      {
        title: 'Test Automation Engineer II → Senior Test Automation Engineer',
        period: 'Jul 2018 - Dec 2021',
        highlights: [
          'Progressed from Test Automation Engineer II to Senior Test Automation Engineer while leading UI and API framework design with Cypress, Selenium WebDriver, and RestAssured.',
          'Automated regression coverage for Angular and React applications and designed Cucumber/Gherkin frameworks that made test intent clearer across teams.',
          'Expanded quality coverage across API, mobile, load, performance, and accessibility testing using Postman, RestAssured, Appium, and non-functional test standards.',
        ],
      },
    ],
  },
  {
    company: 'Creospan Inc.',
    location: 'Northbrook, IL',
    roles: [
      {
        title: 'Automation Test Engineer',
        period: 'May 2016 - Apr 2018',
        highlights: [
          'Built Selenium (Java) automation frameworks spanning functional UI, integration, regression, performance, and end-to-end testing.',
          'Integrated automated smoke and sanity suites directly into Jenkins CI pipelines.',
        ],
      },
    ],
  },
  {
    company: 'Tata Consultancy Services (TCS)',
    location: 'Lake Forest, IL & Chennai, India',
    roles: [
      {
        title: 'Test Automation Engineer / IT Analyst',
        period: 'Mar 2009 - May 2016',
        highlights: [
          'Designed template-based test automation frameworks (HP QTP, Quality Center) for enterprise e-commerce and B2B procurement platforms, spanning UI, regression, integration, and performance testing.',
          'Established and managed an onsite-offshore Global Delivery Model, mentoring offshore QA teams and maintaining consistent quality standards across distributed delivery.',
        ],
      },
    ],
  },
];

export const education = {
  degree: 'Electronics And Communication Engineering',
  institution: 'Jawaharlal Nehru Technological University',
  period: '2004 - 2008',
};
