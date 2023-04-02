# Leagueify

Welcome to the Leagueify development repository. Leagueify is an open source sporting league platform designed to efficiently host a variety of sporting leagues.

- [Running Leagueify](#running-leagueify)
- [Local Development](#local-development)
- [Creating a New Migration](#creating-a-new-migration)
- [Build Docker Image](#build-docker-image)

## Running Leagueify

To run Leagueify [Docker](https://www.docker.com/) is required to be installed and running on the host machine. Using the example [Docker Compose](docker-compose.yml) file within this repository, the following command will start the Leagueify application:

```bash
docker compose up -d
```

## Local Development

To ensure Node and NPM versions are consistent, this project makes use of [nvm](https://github.com/nvm-sh/nvm).

Once the Leagueify repository is cloned, prepare the local environment by following these steps:

```bash
# Rename template environment file
cp template.env .env

# Install Required Node and NPM Versions
nvm install

# Activate Required Node and NPM Versions
nvm use

# Install Leagueify Dependencies
npm install
```

To run the application in development mode, run:

```bash
# Bring up the Leagueify Stack
docker compose up -d

# Seed the Local Database
npx prisma db seed
```

**WARNING:** Do not use production database credentials within the `.env` file. The `.env` file created in the previous step is used for local development only. The `.env` file should not be committed to the repository.

Open your browser to [http://localhost](http://localhost) to view the application. While the application is running, any changes made to the source code will be automatically reloaded.

## Creating a New Migration

Leagueify uses [Prisma](https://www.prisma.io/) to manage the database schema and migrations. To create a new migration, ensure the Leagueify stack is running and run the following command in a new terminal:

```bash
npx prisma migrate dev --name <migration-name>
```

This will create a new migration file in the `prisma/migrations` directory. The migration file will contain the changes to the database schema. Once the migration file is created, it can be committed to the repository. The migration-name should be descriptive of the changes being made to the database schema. The `--name` flag is optional. If not provided, Prisma will generate a random name for the migration.

**TODO:** Document the process of squashing migrations, and the affect it will have for production deployments.

## Build Docker Image

To build the Leagueify Docker image manually, run:

```bash
docker build -t leagueify .
```

This will build the image and all associated microservices with the tag `leagueify:latest`.

## Executing Tests

To run the test suite for Leagueify, run:

```bash
# Install Playwright Dependencies
npx playwright install

# Run Full Test Suite
npm run test

# Run End-to-End Test Suite
npm run test:e2e

# Run Unit Test Suite
npm run test:unit
```
