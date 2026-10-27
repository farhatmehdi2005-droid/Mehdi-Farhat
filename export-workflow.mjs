import { mkdir, writeFile } from 'node:fs/promises';
import workflow from './radar_vinted.workflow.ts';

const json = workflow.toJSON();
json.active = false;
await mkdir(new URL('./dist/', import.meta.url), { recursive: true });
await writeFile(new URL('./dist/workflow.json', import.meta.url), JSON.stringify(json, null, 2) + '\n');
console.log(`Exporté : dist/workflow.json (${json.nodes.length} nœuds, dont 5 sticky notes).`);
