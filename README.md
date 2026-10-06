# eslint-config

Shared ESLint config enforcing @podman-desktop's code style.

## Usage

```sh
pnpm add -D @podman-desktop/eslint-config eslint typescript
```

```js
// eslint.config.mjs
import podmanDesktop from '@podman-desktop/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  podmanDesktop,
  // repository specific configuration
  globalIgnores(['packages/backend/media/**']),
  {
    files: ['packages/frontend/**'],
    rules: {},
  },
]);
```

No option is required: TypeScript files are linted with type information using
[`projectService`](https://typescript-eslint.io/packages/parser/#projectservice), each file uses its closest
`tsconfig.json`, there is no list of projects to maintain. Ambient declarations in `types/*.d.ts`, usually not part of a
`tsconfig.json`, are linted with a default project.

All plugins are dependencies of this package, a repository only needs `eslint`, `typescript` and
`@podman-desktop/eslint-config`.

## What is included

- `@eslint/js` and `typescript-eslint` recommended configs
- the `@typescript-eslint` rules shared by the Podman Desktop repositories, see [`src/index.ts`](./src/index.ts)
- ignores for `dist`, `coverage` and `*.config.{js,mjs,cjs}` files

## Development

```sh
pnpm install
pnpm build
pnpm lint:check
pnpm typecheck
```

This repository is linted with its own configuration (see [`eslint.config.ts`](./eslint.config.ts)).
