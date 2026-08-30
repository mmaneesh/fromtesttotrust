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

test('AI system illustrations do not render a background grid', async () => {
  const illustration = await readSource(
    'src/components/SystemIllustration.astro',
  );

  assert.doesNotMatch(illustration, /gridPath/);
  assert.doesNotMatch(illustration, /class="grid"/);
  assert.doesNotMatch(illustration, /--image-grid/);
});

test('the LiteLLM brief uses the confirmed gateway stack and default-provider fallback', async () => {
  const [systemBrief, diagrams, systems] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/GatewayDiagrams.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(systemBrief, /<GatewayDiagrams \/>/);
  assert.match(diagrams, /OpenCode/);
  assert.match(diagrams, /OpenRouter/);
  assert.match(diagrams, /SQS/);
  assert.match(diagrams, /AWS Bedrock/);
  assert.match(diagrams, /DynamoDB/);
  assert.match(diagrams, /planned: run memory/);
  assert.match(diagrams, /Okta/);
  assert.match(diagrams, /<svg/);
  assert.match(diagrams, /marker-end="url\(#gw-arrow\)"/);
  assert.match(systems, /falls back to the default provider/);
  assert.match(systems, /Okta-provisioned identity/);
  assert.doesNotMatch(diagrams, /Claude|GPT-4o|Mistral/);
  assert.match(systems, /A2A/);
});

test('brief pages use a continuous article layout instead of card surfaces', async () => {
  const [systemBrief, speakingBrief] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/pages/speaking/[id].astro'),
  ]);

  for (const brief of [systemBrief, speakingBrief]) {
    assert.doesNotMatch(brief, /rounded-2xl/);
    assert.doesNotMatch(brief, /bg-\[#0B0F19\]/);
    assert.match(brief, /text-body/);
  }
  assert.match(speakingBrief, /border-line/);

  assert.match(
    systemBrief,
    /AgentPipelineBrief workflow=\{system\.workflow\} diagramsOnly/,
  );
  assert.doesNotMatch(systemBrief, /\{system\.category\}/);
  assert.doesNotMatch(systemBrief, /max-w-3xl/);
  assert.doesNotMatch(speakingBrief, /max-w-3xl/);
  assert.match(systemBrief, /sm:text-\[42px\]/);

  const systems = await readSource('src/data/ai-systems.ts');
  assert.match(
    systems,
    /To address it, I built a workflow that turns a Jira ticket into reviewed scenarios/,
  );
  assert.match(
    systems,
    /Test planning, test-case design, and automation were separate/,
  );
  assert.match(
    systems,
    /Teams across the company were building agents on different stacks/,
  );
  assert.doesNotMatch(
    systemBrief,
    /system\.architecture\.map\(\(arch\) => <li>/,
  );
  assert.doesNotMatch(systemBrief, /system\.impact\.map\(\(item\) => <li>/);
  assert.doesNotMatch(systemBrief, /Principal SDET Engineer/);
  assert.doesNotMatch(systemBrief, /footer class="mt-14 pt-8 border-t/);
  assert.doesNotMatch(systemBrief, /All systems/);
  assert.doesNotMatch(
    await readSource('src/components/AgentPipelineBrief.astro'),
    /<section class="my-12 max-w-3xl/,
  );
});
