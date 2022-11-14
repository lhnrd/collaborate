# @collaborate/server

Folder that houses everything server related from the collaborate application.

Everything is implemented using [TypeScript](https://www.typescriptlang.org/)
it's the main language of the server.

The server itself is implemented using [Fastify](https://www.fastify.io/) and
its [plugins architecture](https://www.fastify.io/docs/latest/Guides/Plugins-Guide/)
to leverage high performance and composability.

For model creation and mapping the package relies on [Objection.js](https://vincit.github.io/objection.js/)
due to its simplistic way to wrap and enchance class based models that refer
to database tables. Uses [Knex](https://knexjs.org/) to handle migrations and
seeding the database.

All API endpoints should declare its input and output data strucuture using
[typebox](https://github.com/sinclairzx81/typebox) which is a [JSON schema](https://json-schema.org/specification.html)
type builder (supported by Fastify). This endpoints signatures then gets picked
up by an [Open API generator](https://github.com/fastify/fastify-swagger)
which exposes a nice documentation about the API.

This package exposes as its main entrypoint the API type declaration. The declaration
is generated from the exposed Open API documentation using yet another utility
[openapi-typescript](https://www.npmjs.com/package/openapi-typescript). Client
applications should install this package as dependency and import the declaration
files to get a nice type-safe API.

The goal of the API is to adhere to both [Open API](https://spec.openapis.org/oas/latest.html)
and [some parts](https://apisyouwonthate.com/blog/making-the-most-of-json-api)
of the [JSON:API](https://jsonapi.org/format/).

Current folder structure is comprised of:

```
|- /@types      - type augmentation/declaration for TS
|- /api         - API implementation - entry point is a Fastify plugin
|- /services    - each service is a Fastify plugin and it should add functionality to the API/server
|- /config       - set of JSON files containing env specific configuration
|- /test        - everything test related
```

## Guidelines

### Endpoint

To create a new API endpoint related to a functionality that needs
implementation you usually need three different parts:

1. Model, which usually relates to a database table and it's used to access
   data stored in the RDMS server. The model sometimes implements some business
   logic as well.
   For the model you also need a `typebox` schema for the model's `jsonSchema`
   and `outputSchema` property. `jsonSchema` is used to validate data when a model
   record is going to be inserted into the database; and `outputSchema` is the
   representation of the data that the model should bring from the database.
2. Controller, a file full of business logic functions that the endpoints later
   call to make changes to the system.
3. Routes, single file that exports a Fastify-plugin function and is responsible
   for declaring tha existing endpoints of a route. From the route file you can
   call controller functions and change the system accordingly. Usually each
   route must declare its input and output data object (`jsonSchema`/`outputSchema`).
   The endpoint must comply with the `JSON:API` spec.

## Development

For development execute the following steps:

1. Install `docker` in your local environment;
2. Install dependencies with `pnpm install`;
3. Execute `pnpm dev` to start your local server.

`pnpm dev` does the following:

- Starts the PostgreSQL database server with `docker compose`;
- Runs all migrations; and
- Starts your server with `nodemon`;
- After the `dev` script finishes, `postdev` executes to cleanup.

There are utilities set in place like linter rules and the prettier
formatter to keep the flow of development steady.

Execute `pnpm dev:seed` to prepopulate the database with mock data.

## Testing

For testing your code execute the following steps:

1. Install `docker` in your local environment;
2. Install dependencies with `pnpm install`;
3. Execute `pnpm test` to start your local server.

`pnpm test` does the following:

- Starts the Postgres database server with `docker compose`;
- Runs all migrations; and
- Executes all your tests with `vitest`;
- After the `test` script finishes, `posttest` executes to cleanup.

Execute `pnpm test:seed` to prepopulate the database with mock data.

## Deployment

TBD
