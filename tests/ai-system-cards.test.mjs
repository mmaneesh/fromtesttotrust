import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('..', import.meta.url);

const readSource = (path) => readFile(new URL(path, root), 'utf8');

test('AI system cards use an illustration for every published system', async () => {
  const [view, illustration, systems] = await Promise.all([
    readSource('src/components/views/AISystemsView.astro'),
    readSource('src/components/SystemIllustration.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(view, /<SystemIllustration systemId=\{system\.id\} \/>/);

  const ids = [...systems.matchAll(/\bid: '([^']+)'/g)].map(([, id]) => id);
  assert.ok(ids.length > 0, 'expected published AI system ids');

  for (const id of ids) {
    assert.match(illustration, new RegExp(`'${id}'`));
  }
});

test('AI system cards omit the category eyebrow and subtitle', async () => {
  const view = await readSource('src/components/views/AISystemsView.astro');

  assert.doesNotMatch(view, /\{system\.category\}/);
  assert.doesNotMatch(view, /\{system\.subtitle\}/);
});
