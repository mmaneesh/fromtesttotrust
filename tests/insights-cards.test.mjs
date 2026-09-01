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
  assert.match(view, />\s*View brief\s*→\s*</);
  assert.doesNotMatch(view, /event\.format/);
  assert.doesNotMatch(view, /event\.subtitle/);
  assert.doesNotMatch(view, /event\.deckUrl/);
  assert.doesNotMatch(view, /Open Slides/);
});

test('Everyday AI Skills leads the insights list and Guardrails omits red-team datasets', async () => {
  const events = await readSource('src/data/speaking.ts');

  assert.match(
    events,
    /export const speakingEvents: SpeakingEvent\[\] = \[\s*\{\s*id: 'everyday-ai-coding'/,
  );
  assert.doesNotMatch(events, /build red-team datasets/);
});
