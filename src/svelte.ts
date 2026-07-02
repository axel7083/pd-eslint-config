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
import { Config as EslintConfig, defineConfig} from "eslint/config";
import type { Config as SvelteKitConfig } from "@sveltejs/kit";
import type * as TSParser from '@typescript-eslint/parser';
import type * as SvelteParser from 'svelte-eslint-parser';
import svelte from 'eslint-plugin-svelte';

export default function(options: {
    svelteConfig: SvelteKitConfig,
    tsParser: typeof TSParser
    svelteParser: typeof SvelteParser
}): Array<EslintConfig> {
    return defineConfig([
        {
            files: ['**/*.svelte', '**/*.svelte.ts'],
            extends: [svelte.configs['flat/recommended']],
            languageOptions: {
                parser: options.svelteParser,
                ecmaVersion: 5,
                sourceType: 'script',
                parserOptions: {
                    parser: options.tsParser,
                    svelteConfig: options.svelteConfig,
                },
            },
        }
    ]);
}
