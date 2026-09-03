import assert from 'node:assert/strict';
import test from 'node:test';

import { clampText, siteOrigin } from '../src/lib/seo.ts';

test('clampText leaves short strings untouched and breaks long ones on a word boundary', () => {
  assert.equal(clampText('short enough', 155), 'short enough');

  const long = `${'word '.repeat(40)}end`; // 200+ chars, spaces throughout
  const out = clampText(long, 155);
  assert.ok(out.length <= 156, `expected a clamp, got ${out.length} chars`);
  assert.ok(out.endsWith('…'));
  assert.doesNotMatch(out, / …$/); // trailing space trimmed before the ellipsis
});

test('clampText hard-cuts when the first n chars contain no space', () => {
  const unbroken = 'a'.repeat(200);
  const out = clampText(unbroken, 155);
  assert.equal(out, `${'a'.repeat(155)}…`);
});

test('siteOrigin strips trailing slashes and falls back when site is undefined', () => {
  assert.equal(
    siteOrigin(new URL('https://example.com/')),
    'https://example.com',
  );
  assert.equal(siteOrigin(undefined), 'https://fromtesttotrust.com');
});
