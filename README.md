# Leagueify

[![Version](https://img.shields.io/github/v/release/Leagueify/leagueify)](https://github.com/Leagueify/leagueify/releases/latest)
[![License](https://img.shields.io/github/license/Leagueify/leagueify)](https://github.com/Leagueify/leagueify/blob/main/LICENSE)
[![Workflow](https://github.com/Leagueify/leagueify/actions/workflows/tests.yml/badge.svg)](https://github.com/Leagueify/leagueify/actions/workflows/tests.yml)

Leagueify is an open source sporting league platform designed to efficiently host a variety of sporting leagues.

## Getting Started

Install Playwright for test execution:

```bash
npx playwright install
```

## Developing

To ensure Node and NPM versions are consistent, this project makes use of [nvm](https://github.com/nvm-sh/nvm).

Once you have cloned Leagueify and navigated to the project directory, install the correct node and npm versions with nvm (`nvm install`), activate required node and npm versions (`nvm use`), install dependencies (`npm install`).

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
