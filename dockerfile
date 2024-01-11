# syntax=docker/dockerfile:1

# build client
from node:18.12.1-alpine3.17 as client-builder
add https://github.com/leagueify/client.git /client
workdir /client
run npm install && npm run build

# build leagueify api server
from golang:1.21.5-alpine3.19 as server-builder
add https://github.com/leagueify/server.git /server
workdir /server
copy --from=client-builder /client/dist ./client
run go install github.com/swaggo/swag/cmd/swag@latest
run swag init -g server.go --outputTypes json
run cgo_enabled=0 goos=linux go build -o /leagueify-api .
# build production image
from gcr.io/distroless/base-debian11 as release
copy --from=server-builder /leagueify-api /leagueify-api
expose 8000
entrypoint ["/leagueify-api"]
