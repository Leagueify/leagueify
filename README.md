## Getting Started

To ensure Node and NPM versions are consistent, this project makes use of [nvm](https://github.com/nvm-sh/nvm).

Once you have cloned Leagueify and navigated to the project directory, install the correct node and npm versions with nvm (`nvm install`), activate required node and npm versions (`nvm use`), install dependencies (`npm install`).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Docker Image

This project is configured to build a Docker image. To build the image, run:

```bash
docker build -t leagueify .
```

To run the image, run:

```bash
docker run --rm -p 3000:3000 leagueify
```
