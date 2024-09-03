FROM golang:1.23.0 AS build

WORKDIR /app

COPY ./src/back/import-magnetico-db/go.sum .
COPY ./src/back/import-magnetico-db/go.mod .
RUN go mod download

COPY ./src/back/import-magnetico-db/*.go .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-extldflags "-static"' -o main .

FROM scratch AS application

COPY ./src/back/import-magnetico-db/data.csv data.csv

COPY --from=build /app/main /main

ENTRYPOINT ["/main"]