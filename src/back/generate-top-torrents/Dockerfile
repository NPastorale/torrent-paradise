FROM golang:1.23.0 AS build

WORKDIR /app

COPY ./src/back/generate-top-torrents/go.mod .
RUN go mod download

COPY ./src/back/generate-top-torrents/*.go .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-extldflags "-static"' -o main .

FROM scratch AS application

COPY --from=build /app/main /main

ENTRYPOINT ["/main"]