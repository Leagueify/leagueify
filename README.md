# Leagueify

Welcome to the Leagueify development repository. Leagueify is an open source sporting league platform designed to efficiently host a variety of sporting leagues.

- [Running Leagueify](#running-leagueify)
- [Local Development](#local-development)
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
# Incorrect Command - Will Not Work - See Below
docker compose up -d
```

Open your browser to [http://localhost](http://localhost) to view the application. While the application is running, any changes made to the source code will be automatically reloaded.

**NOTE:** Currently, this does not automatically reload upon changes and will require a restart of the docker container. See [this issue](https://github.com/Leagueify/leagueify/issues/171) for more information.

## Build Docker Image

To build the Leagueify Docker image manually, run:

```bash
docker build -t leagueify .
```

This will build the image and all associated microservices with the tag `leagueify:latest`.
