import { readFile } from 'fs';

async function load(): Promise<string> {
  return 'value';
}

export function run(value: any): boolean {
  load();
  readFile('file', () => {});
  return value == 1;
}
