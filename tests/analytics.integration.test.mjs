import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('production homepage includes the Vercel Analytics tracker', () => {
  execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

  const homepage = readFileSync('dist/index.html', 'utf8');
  assert.match(homepage, /<vercel-analytics\b/);
});
