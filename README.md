# simplicity-backend-test

Create and test a simple Node.js + TypeScript handler that wraps the API, then package it and publish it to npm via GitHub Actions.

# Api used

open meteo[](https://open-meteo.com)

# Prerequisites

- Node.js v24+
- pnpm v10+

## Nice to have

- Corepack

## install prerequisites

### OSX using Homebrew

```bash
brew install node@latest
brew install corepack@latest
corepack use pnpm@latest
corepack enable
```

# Setup project

```bash
pnpm install
```

# Run tests

```bash
pnpm test
```

# Build project

```bash
pnpm build
```

# Lint project

```bash
pnpm lint
```

# Run project

```bash
pnpm start
```
