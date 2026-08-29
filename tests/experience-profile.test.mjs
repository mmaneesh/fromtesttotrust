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

test('home navigation keeps the brand mark compact and Connect readable through theme changes', async () => {
  const dock = await readSource('src/components/ViewSwitcherDock.astro');

  assert.match(dock, /import BrandMark from '\.\/BrandMark\.astro';/);
  assert.match(
    dock,
    /<a class="brand" href="#about" aria-label="From Test to Trust">\s*<span class="brand-mark"><BrandMark \/><\/span>\s*<\/a>/,
  );
  assert.doesNotMatch(dock, /<span>From Test to Trust<\/span>/);
  assert.match(dock, /min-height: 64px;/);
  assert.match(dock, /width: 88px;/);
  assert.match(dock, /\.brand-mark :global\(svg\) \{\s*display: block;\s*width: 100%;\s*height: auto;/);
  assert.match(dock, /color: #fff;/);
  assert.match(dock, /border-radius: 4px;/);
  assert.match(dock, /background-color 180ms ease-out,/);
  assert.match(dock, /border-color 180ms ease-out,/);
  assert.match(dock, /color 180ms ease-out;/);
  assert.match(dock, /\.nav-tab-btn\.active,\s*\.nav-tab-btn:hover \{\s*color: rgb\(var\(--accent\)\);/);
  assert.match(dock, /\.nav-tab-btn\.active::before \{[\s\S]*top: 6px;[\s\S]*height: 2px;[\s\S]*background: rgb\(var\(--accent\)\);/);
  assert.doesNotMatch(dock, /\.nav-tab-btn\.active::after/);
});

test('site chrome uses a 1024px shell with full-bleed navigation and footer rules', async () => {
  const [home, dock, header, footer] = await Promise.all([
    readSource('src/pages/index.astro'),
    readSource('src/components/ViewSwitcherDock.astro'),
    readSource('src/components/Header.astro'),
    readSource('src/components/Footer.astro'),
  ]);

  assert.match(
    home,
    /<ViewSwitcherDock \/>\s*<main[\s\S]*max-w-\[1024px\]/,
  );
  assert.match(dock, /\.view-switcher \{\s*background: rgb\(var\(--canvas\)\);\s*border-bottom: 1px solid rgb\(var\(--line\)\);/);
  assert.match(header, /max-w-\[1024px\]/);
  assert.match(footer, /class="w-full border-t border-line bg-canvas py-6 mt-auto"/);
  assert.match(footer, /max-w-\[1024px\]/);
});
