import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const readSource = (path) => readFile(new URL(path, root), 'utf8');

test('insight cards contain only community, title, description, and brief link', async () => {
  const view = await readSource('src/components/views/SpeakingView.astro');

  assert.match(view, /divide-y divide-line border-y border-line/);
  assert.match(view, /sm:grid-cols-\[minmax\(9rem,0\.32fr\)_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(view, /sm:grid-cols-2/);
  assert.match(view, /event\.organization/);
  assert.match(view, /event\.title/);
  assert.match(view, /event\.abstract/);
  assert.match(
    view,
    /event\.kind === 'article' \? 'Read article →' : 'View brief →'/,
  );
  assert.doesNotMatch(view, /event\.format/);
  assert.doesNotMatch(view, /event\.subtitle/);
  assert.doesNotMatch(view, /event\.deckUrl/);
  assert.doesNotMatch(view, /Open Slides/);
});

test('Playwright reliability leads the insights list and future Guardrails stays off the listing', async () => {
  const events = await readSource('src/data/insights.ts');
  const view = await readSource('src/components/views/SpeakingView.astro');

  assert.match(
    events,
    /export const insightEntries: InsightEntry\[\] = \[\s*\{\s*id: 'playwright-reliability'/,
  );
  assert.doesNotMatch(events, /build red-team datasets/);
  assert.match(events, /id: 'guardrails-and-evals'[\s\S]*?published: false/);
  assert.match(
    view,
    /insightEntries\.filter\(\(entry\) => entry\.published !== false\)/,
  );
});

test('insight dates vary across the last three months without changing Ministry of Testing dates', async () => {
  const events = await readSource('src/data/insights.ts');

  assert.match(
    events,
    /id: 'playwright-reliability'[\s\S]*?date: 'August 27, 2026'/,
  );
  assert.match(
    events,
    /id: 'output-format-types'[\s\S]*?date: 'August 11, 2026'/,
  );
  assert.match(
    events,
    /id: 'api-testing-earlier-problems'[\s\S]*?date: 'July 8, 2026'/,
  );
  assert.match(events, /id: 'everyday-ai-coding'[\s\S]*?date: 'July 30, 2026'/);
  assert.match(
    events,
    /id: 'guardrails-and-evals'[\s\S]*?date: 'September 23, 2026'/,
  );
});

test('Playwright reliability insight is published with marketing-system examples', async () => {
  const events = await readSource('src/data/insights.ts');
  const detailPage = await readSource('src/pages/insights/[id].astro');
  const view = await readSource('src/components/views/SpeakingView.astro');
  const insightsPage = await readSource('src/pages/insights/index.astro');

  assert.match(events, /id: 'playwright-reliability'/);
  assert.match(events, /The Habits That Make Our Tests More Reliable/);
  assert.doesNotMatch(events, /title: 'The Playwright Habits/);
  assert.match(events, /Map the journey before writing the test/);
  assert.doesNotMatch(events, /CMS\/CMA campaign metadata\n        ↓/);
  assert.match(events, /flow: \[/);
  assert.match(events, /codeLanguage: 'ts'/);
  assert.match(events, /Eloqua/);
  assert.match(events, /Run the right tests at the right CI\/CD stage/);
  assert.match(detailPage, /event\.sections/);
  assert.match(detailPage, /codeToHtml/);
  assert.match(detailPage, /one-dark-pro/);
  assert.match(detailPage, /github-light/);
  assert.match(detailPage, /--shiki-dark-bg/);
  assert.match(detailPage, /replace\(\/background-color/);
  assert.match(detailPage, /section\.flow/);
  assert.match(detailPage, /set:html=\{section\.highlightedCode\}/);
  assert.match(detailPage, /justify-items-center/);
  assert.match(
    detailPage,
    /class="example-surface overflow-x-auto border border-line/,
  );
  assert.match(detailPage, /event\.deckUrl &&/);
  assert.match(
    view,
    /event\.kind === 'article' \? 'Read article →' : 'View brief →'/,
  );
  assert.match(
    insightsPage,
    /Notes from the work: how we test, build AI systems, and make release\s+decisions with evidence we can trust\./,
  );
});

test('API testing insight uses a marketing-data flow and complete API examples', async () => {
  const events = await readSource('src/data/insights.ts');

  assert.match(events, /id: 'api-testing-earlier-problems'/);
  assert.match(
    events,
    /What API Testing Taught Us About Finding Problems Earlier/,
  );
  assert.match(events, /Gated-content form submissions/);
  assert.match(events, /campaignSource/);
  assert.match(events, /APIRequestContext/);
  assert.match(events, /await expect\.poll/);
  assert.match(events, /Reject bad data at the boundary/);
});

test('scrollable insight examples keep their background across the full code width', async () => {
  const detailPage = await readSource('src/pages/insights/[id].astro');

  assert.match(
    detailPage,
    /\.example-surface :global\(\.shiki\) \{\s*min-width: max-content;/,
  );
  assert.match(detailPage, /background: inherit;/);
});

test('output format insight explains each format with a sample', async () => {
  const events = await readSource('src/data/insights.ts');

  assert.match(events, /id: 'output-format-types'/);
  assert.match(events, /JSON vs\. TOON vs\. JSONL vs\. Markdown vs\. YAML/);
  assert.match(events, /heading: 'JSON'/);
  assert.match(events, /heading: 'TOON'/);
  assert.match(events, /heading: 'JSONL'/);
  assert.match(events, /heading: 'Markdown'/);
  assert.match(events, /heading: 'YAML'/);
  assert.match(events, /codeLanguage: 'json'/);
  assert.match(events, /codeLanguage: 'markdown'/);
  assert.match(events, /codeLanguage: 'yaml'/);
  assert.match(events, /checkout-regression-2026-09-03/);
  assert.match(events, /testCases\[3\]\{id,area,priority,status,owner\}/);
  assert.match(events, /"event":"test_result"/);
  assert.match(events, /Release candidate: checkout/);
  assert.match(events, /environment: staging/);
});
