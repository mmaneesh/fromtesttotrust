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

test('AI system cards show a plain blurb, not the first-person brief summary', async () => {
  const [view, systems] = await Promise.all([
    readSource('src/components/views/AISystemsView.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(view, /\{system\.blurb\}/);
  assert.doesNotMatch(view, /\{system\.summary\}/);

  const blurbs = [...systems.matchAll(/\n {4}blurb:\n {6}'([^']+)'/g)].map(
    ([, b]) => b,
  );
  assert.equal(blurbs.length, 6, 'every system needs a blurb');
  for (const blurb of blurbs) {
    assert.doesNotMatch(blurb, /^(Built|To address it|I built|My team built)/);
    assert.ok(
      blurb.length <= 200,
      `blurb too long to fit 3 card lines: ${blurb}`,
    );
  }
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

test('the support intake brief funnels every channel into one Teams queue and a routed Asana task', async () => {
  const [systemBrief, diagram, systems] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/SupportIntakeDiagram.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(systemBrief, /<SupportIntakeDiagram \/>/);
  assert.match(systemBrief, /'support-intake-agent': \{\s*riskAnalysis:/);
  assert.match(diagram, /<svg/);
  assert.match(diagram, /marker-end="url\(#si-arrow\)"/);
  assert.match(diagram, /Microsoft Teams/);
  assert.match(diagram, /Power Automate/);
  assert.match(diagram, /Asana/);
  assert.match(systems, /one Microsoft Teams channel/);
  assert.match(systems, /Support Intake Agent action/);
  assert.match(systems, /assigns the task to that team’s project/);
});

test('the brand unification brief scores a URL through rule sets and routes escalation', async () => {
  const [systemBrief, diagram, systems] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/BrandAuditDiagram.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(systemBrief, /<BrandAuditDiagram \/>/);
  assert.match(systemBrief, /'brand-unification-skill': \{\s*riskAnalysis:/);
  assert.match(diagram, /<svg/);
  assert.match(diagram, /marker-end="url\(#ba-arrow\)"/);
  assert.match(diagram, /Brand remediation/);
  assert.match(diagram, /Escalation/);
  assert.match(diagram, /progressive disclosure/);
  assert.match(
    systems,
    /brand remediation, tone and voice, content rewrite, and escalation/,
  );
  assert.match(systems, /the skill never publishes/);
});

test('the shared skills brief routes both author types to one GitHub repository', async () => {
  const [systemBrief, diagram, systems] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/SkillsRepoDiagram.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(systemBrief, /<SkillsRepoDiagram \/>/);
  assert.match(systemBrief, /'shared-skills-platform': \{\s*riskAnalysis:/);
  assert.match(diagram, /<svg/);
  assert.match(diagram, /marker-end="url\(#sr-arrow\)"/);
  assert.match(diagram, /Claude Desktop/);
  assert.match(diagram, /\/skill-creator/);
  assert.match(diagram, /stamps username/);
  assert.match(systems, /generic ones any team can use and team-specific ones/);
  assert.match(systems, /with the author’s username attached/);
});

test('the office hours brief converts recordings and answers across sessions', async () => {
  const [systemBrief, diagram, systems] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/OfficeHoursDiagram.astro'),
    readSource('src/data/ai-systems.ts'),
  ]);

  assert.match(systemBrief, /<OfficeHoursDiagram \/>/);
  assert.match(systemBrief, /'office-hours-agent': \{\s*riskAnalysis:/);
  assert.match(diagram, /<svg/);
  assert.match(diagram, /marker-end="url\(#oh-arrow\)"/);
  assert.match(diagram, /Webhook/);
  assert.match(diagram, /Semantic index/);
  assert.match(diagram, /Claude Desktop/);
  assert.match(systems, /raw \.vtt transcript/);
  assert.match(systems, /indexed by meaning/);
});

test('brief pages use a continuous article layout instead of card surfaces', async () => {
  const [systemBrief, speakingBrief] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/pages/insights/[id].astro'),
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
    /The workflow I built carries one Jira ticket through scenario design/,
  );
  assert.match(
    systems,
    /On my team, test planning, case design, and automation were three separate activities/,
  );
  assert.match(
    systems,
    /Across our company, teams were building their own agents/,
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
