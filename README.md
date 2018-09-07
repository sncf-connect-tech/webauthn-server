# webauthn-server

## Description

WebauthN node js server, with Nest, Typescipt, Passport, Mongo. Compatible with Yubico fido-2 Key

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Mongo database

Localhost dev with docker :

```bash
docker run -p 27017:27017 --name webauthn-database -d mongo
```
