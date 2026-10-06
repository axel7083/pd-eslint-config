import { readFile } from 'node:fs/promises';

export async function load(path: string): Promise<string> {
  return readFile(path, 'utf-8');
}
