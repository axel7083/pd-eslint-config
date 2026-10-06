/**********************************************************************
 * Copyright (C) 2026 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import { basename, resolve } from 'node:path';

import type { Linter, Rule } from 'eslint';
import { ESLint } from 'eslint';
import { describe, expect, test } from 'vitest';

import config from '../src/index.ts';

const FIXTURES = resolve(import.meta.dirname, 'fixtures');

async function lint(fixture: string, extra: Linter.Config[] = []): Promise<ESLint.LintResult[]> {
  const eslint = new ESLint({
    cwd: resolve(FIXTURES, fixture),
    overrideConfigFile: true,
    overrideConfig: [...config, ...extra],
  });
  return eslint.lintFiles(['src']);
}

function ruleIds(results: ESLint.LintResult[], file: string): Array<string | null> {
  return results.find(result => basename(result.filePath) === file)?.messages.map(message => message.ruleId) ?? [];
}

describe('typescript', () => {
  test('type-aware rules work without listing tsconfig files', async () => {
    const results = await lint('typescript');

    expect(ruleIds(results, 'invalid.ts')).toEqual([
      'unicorn/prefer-node-protocol',
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-floating-promises',
      'eqeqeq',
    ]);
  });

  test('redundant undefined in optional property is reported', async () => {
    const results = await lint('typescript');

    expect(ruleIds(results, 'optional.ts')).toEqual(['sonarjs/no-redundant-optional']);
  });

  test('valid file has no error', async () => {
    const results = await lint('typescript');

    expect(ruleIds(results, 'valid.ts')).toEqual([]);
  });
});

describe('svelte', () => {
  test('svelte rules apply to .svelte files', async () => {
    const results = await lint('svelte');

    expect(ruleIds(results, 'Runes.svelte')).toEqual(['svelte/no-at-html-tags']);
  });

  test('svelte.config.js is resolved without any option', async () => {
    let svelteConfig: unknown;
    const probe: Rule.RuleModule = {
      create(context) {
        svelteConfig = context.sourceCode.parserServices?.svelteParseContext?.svelteConfig;
        return {};
      },
    };

    await lint('svelte', [{ files: ['**/*.svelte'], plugins: { probe: { rules: { probe } } }, rules: { 'probe/probe': 'error' } }]);

    expect(svelteConfig).toEqual({ compilerOptions: { runes: true } });
  });
});
