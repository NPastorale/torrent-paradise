FROM golang:1.23.0 AS build

WORKDIR /app

COPY ./src/back/seedleech/go.sum .
COPY ./src/back/seedleech/go.mod .
RUN go mod download

COPY ./src/back/seedleech/*.go .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-extldflags "-static"' -o main .

FROM scratch AS application

COPY ./src/back/seedleech/config.toml config.toml

COPY --from=build /app/main /main

ENTRYPOINT ["/main"]