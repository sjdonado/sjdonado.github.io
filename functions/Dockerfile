FROM golang:1.19.5-alpine

WORKDIR /go/src/app

COPY ./functions/* .

RUN go mod download
