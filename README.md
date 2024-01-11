# Leagueify

Welcome to the Leagueify development repository. Leagueify is an open source sporting league platform designed to efficiently host a variety of sporting leagues.

- [Running Leagueify](#running-leagueify)
- [Local Development](#local-development)
- [Build Docker Image](#build-docker-image)

## Running Leagueify

To run Leagueify, you will need to have Docker installed on your machine. Once installed, you can run Leagueify by executing the following command:
```bash
# Standalone Image
docker run --rm -p 8000:8000 leagueify

# Docker Compose -- Using the included examples
docker compose up -d
```

## Local Development

This will be updated soon. Currently, there is a ticket for this within the Leagueify [server][leagueify-server-link] repository.

## Build Docker Image

To build the Leagueify Docker image manually, run:

```bash
docker build -t leagueify .
```

This will build the image and all associated microservices with the tag `leagueify:latest`.

[leagueify-server-link]: https://github.com/Leagueify/server
