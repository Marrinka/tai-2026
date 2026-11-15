import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { putSnapshot } from '../app/offline-export.ts';
import { planSchema } from '../app/plan-schema.ts';

const planFile = new URL('../app/trip-plan.json', import.meta.url);
const templateFile = new URL('../public/offline-template.html', import.meta.url);
const outputDir = new URL('../outputs/', import.meta.url);

async function exportPlan() {
  const plan = planSchema.parse(JSON.parse(await readFile(planFile, 'utf8')));
  const template = await readFile(templateFile, 'utf8');
  const snapshot = {
    version: 1,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    plan,
    view: { section: 'overview', region: 'Бангкок', month: 0, day: '2026-12-25' },
  };
  await mkdir(outputDir, { recursive: true });
  const output = new URL('trip.html', outputDir);
  await writeFile(output, putSnapshot(template, snapshot));
  console.log('Откройте файл в браузере:', fileURLToPath(output));
}

async function importPlan(file) {
  const html = await readFile(file, 'utf8');
  const state = /<script id="thai-offline-state" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
  const snapshot = state && JSON.parse(state[1]);
  if (snapshot?.version !== 1 || !snapshot.plan) {
    throw new Error('Выберите HTML-файл, сохранённый кнопкой «Скачать HTML» в планировщике.');
  }
  const plan = planSchema.parse(snapshot.plan);
  const temporary = new URL('trip-plan.' + randomUUID() + '.tmp', planFile);
  try {
    await writeFile(temporary, JSON.stringify(plan, null, 2) + '\n', { flag: 'wx' });
    await rename(temporary, planFile);
  } finally {
    await rm(temporary, { force: true });
  }
  console.log('План записан в app/trip-plan.json. Посмотрите изменения: git diff -- app/trip-plan.json');
}

try {
  const [command, file, ...extra] = process.argv.slice(2);
  if (command === 'export' && !file) await exportPlan();
  else if (command === 'import' && file && !extra.length) await importPlan(file);
  else throw new Error('Укажите путь: npm run plan:import -- "путь/к/скачанному.html"');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
