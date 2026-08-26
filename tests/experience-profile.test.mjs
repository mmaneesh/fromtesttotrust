import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const readSource = (path) => readFile(new URL(path, root), 'utf8');

test('experience shows education only and keeps dates at the role level', async () => {
  const [view, career] = await Promise.all([
    readSource('src/components/views/CareerImpactView.astro'),
    readSource('src/data/career.ts'),
  ]);

  assert.match(view, />\s*Education\s*</);
  assert.doesNotMatch(view, /[Cc]ertifications/);
  assert.doesNotMatch(view, /company\.totalTenure/);
  assert.doesNotMatch(career, /totalTenure:/);
  assert.doesNotMatch(career, /certifications:/);
  assert.match(career, /degree: 'Electronics And Communication Engineering'/);
});

test('uses Morningstar, Inc. across the site', async () => {
  const files = await Promise.all(
    [
      'src/data/site-config.ts',
      'src/data/career.ts',
      'src/components/Footer.astro',
      'src/layouts/BaseLayout.astro',
      'src/pages/index.astro',
      'src/pages/systems/[id].astro',
    ].map(readSource),
  );

  for (const source of files) {
    assert.doesNotMatch(source, /Morningstar(?!, Inc\.)/);
  }
});

test('uses experience as the Experience tab URL identifier', async () => {
  const [dock, view] = await Promise.all([
    readSource('src/components/ViewSwitcherDock.astro'),
    readSource('src/components/views/CareerImpactView.astro'),
  ]);

  assert.match(dock, /\{ id: 'experience', label: 'Experience' \}/);
  assert.doesNotMatch(dock, /id: 'career'/);
  assert.match(view, /id="view-experience"/);
  assert.match(view, /aria-labelledby="tab-experience"/);
});
