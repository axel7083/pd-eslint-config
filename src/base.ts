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
import { defineConfig, Config } from "eslint/config";
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default function (options: {
  projects: Array<string>
}): Array<Config> {
  return defineConfig([
    {
      files: ['**/*.{js,ts}'],
      extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
      languageOptions: {
        parserOptions: {
          project: options.projects,
        },
      },
    },
    {
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
    },
  ]);
}
