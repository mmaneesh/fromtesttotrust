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
  assert.equal(blurbs.length, 7, 'every system needs a blurb');
  for (const blurb of blurbs) {
    assert.doesNotMatch(blurb, /^(Built|To address it|I built|My team built)/);
    assert.ok(
      blurb.length <= 200,
      `blurb too long to fit 3 card lines: ${blurb}`,
    );
  }
});

test('the defect triaging agent summarizes parsed Playwright evidence instead of raw reports', async () => {
  const [systems, illustration, brief] = await Promise.all([
    readSource('src/data/ai-systems.ts'),
    readSource('src/components/SystemIllustration.astro'),
    readSource('src/pages/systems/[id].astro'),
  ]);

  assert.match(systems, /id: 'defect-triaging-agent'/);
  assert.match(systems, /latest 1-50 monocart-html reports/);
  assert.match(
    systems,
    /Teams struggle to see what automation reports are telling them over time/,
  );
  assert.match(systems, /latest execution report and fix whatever failed/);
  assert.match(
    systems,
    /A flaky spec fails on its first attempt and then passes on retry/,
  );
  assert.match(systems, /raw HTML stays out of the model context/);
  assert.match(systems, /fails on its first attempt and then passes on retry/);
  assert.match(systems, /fails after both retries/);
  assert.match(systems, /getting slower/);
  assert.match(systems, /how failures and durations change day by day/);
  assert.match(illustration, /systemId === 'defect-triaging-agent'/);
  assert.match(brief, /'defect-triaging-agent': \{\s*riskAnalysis:/);
});

test('the defect triaging brief renders its report-analysis architecture', async () => {
  const [brief, diagram, illustration] = await Promise.all([
    readSource('src/pages/systems/[id].astro'),
    readSource('src/components/DefectTriageDiagram.astro'),
    readSource('src/components/SystemIllustration.astro'),
  ]);

  assert.match(brief, /<DefectTriageDiagram \/>/);
  assert.match(diagram, /S3 reports/);
  assert.match(diagram, /Parser/);
  assert.match(diagram, /Compact evidence/);
  assert.match(diagram, /class="node report"/);
  assert.match(diagram, /Raw HTML stays here/);
  assert.match(diagram, /class="raw-callout"/);
  assert.match(diagram, /Report manifest/);
  assert.doesNotMatch(diagram, />Request</);
  assert.match(diagram, /Usable-report check/);
  assert.match(diagram, /Retry classification/);
  assert.match(diagram, /Duration regression/);
  assert.match(diagram, /Error clustering/);
  assert.match(diagram, /Prioritized queue/);
  assert.match(diagram, /API Gateway/);
  assert.match(diagram, /Lambda/);
  assert.match(diagram, /routes request/);
  assert.doesNotMatch(diagram, /request orchestration/);
  assert.match(diagram, /DynamoDB/);
  assert.match(diagram, /Amazon Bedrock/);
  assert.match(diagram, /CloudWatch/);
  assert.doesNotMatch(diagram, /runs \+ cached evidence/);
  assert.match(diagram, /run state/);
  assert.match(diagram, /attempt history/);
  assert.match(diagram, /sanitized errors/);
  assert.match(diagram, /x="170" y="22" width="1030"/);
  assert.match(diagram, /font-size: 12px/);
  assert.match(diagram, /\.title \{[\s\S]*text-anchor: middle/);
  assert.match(diagram, /\.sub \{[\s\S]*text-anchor: middle/);
  assert.match(diagram, /dominant-baseline: middle/);
  assert.match(diagram, /x="1090"\s+y="378"/);
  assert.match(diagram, /x="1000" y="56" width="180"/);
  assert.match(illustration, /RETRY EVENT/);
  assert.match(illustration, /ERROR CLUSTER/);
  assert.match(illustration, /SLOWDOWN/);
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
