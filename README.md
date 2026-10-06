# eslint-config

Shared ESLint config enforcing @podman-desktop's code style.

The config is empty for now: it is added to every repository first, then rules are added one by one.

## Usage

```sh
pnpm add -D @podman-desktop/eslint-config
```

```js
// eslint.config.mjs
import podmanDesktop from '@podman-desktop/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  podmanDesktop,
  // repository specific configuration
]);
```

## Development

```sh
pnpm install
pnpm build
pnpm lint:check
pnpm typecheck
```

This repository is linted with its own configuration (see [`eslint.config.ts`](./eslint.config.ts)).
