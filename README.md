# TDP UI

`tdp-ui` is a graphical interface for [`tdp-server`](https://github.com/TOSIT-IO/tdp-server).

## Pre-requisites

We assume that are available:

- An instance of [`tdp-server`](https://github.com/TOSIT-IO/tdp-server), with the appropriate `cors` configuration (`BACKEND_CORS_ORIGINS=[...,"http://tdp-ui-domain.local"]`).
- An identity provider, provisioned and configured to work with `tdp-server`. `tdp-ui` domain has to be registered as a redirect URI.  
  Note: `tdp_server` provides a [Docker environment](https://github.com/TOSIT-IO/tdp-server/tree/master/dev) containing an IDP for development purposes.

The following are required to **build and develop** `tdp-ui`. They aren't needed when exporting the project. `tdp-ui` can be used with any web server (such as [NGINX](https://www.nginx.com/)):

- [Node.js](https://nodejs.org/en/) 14.6.0 or later.  
  _The UI is based on [Next.js](https://nextjs.org/), which requires Node.js._
- [Java](https://www.java.com/).  
  _Java is used by the [OpenAPI generator](https://openapi-generator.tech/docs/generators/typescript-fetch) to [generate the API client SDK](docs/openapi-client.md)._

## Development and testing

Use the sample `env/.env.dev` file to provide `tdp-ui` the required environment variables:

```bash
cp .env.dev .env
```

The npm `install` script installs all dependencies and generates the API client SDK. The SDK is generated in the `./src/api` folder. The npm `dev` script starts a Next.js development server:

```bash
npm install       # Install dependencies and generates the API client SDK
npm run dev       # Run the app in development mode
```

By default, the client is available at <http://localhost:3000>.

### Development with Docker

A Docker environment is provided with the required dependencies for development. It contains both `tdp-server` and Keycloak as the identity provider. The environment is defined in the [`compose`](env/dev/docker-compose.yml) file:

```bash
docker compose -f env/compose.yml up -d
```

## Build and export

By default, Next.js uses a Node.js server to serve the app. `tdp-ui` doesn't need a Node.js server and is exported to work without it:

```bash
npm install       # Install dependencies
npm run export    # Build and export the project
```

The project is exported in the `./out` folder to be used with any web server (such as [NGINX](https://www.nginx.com/)).

### Test export with Docker

A Docker environment is provided with NGINX to test the exported project:

```bash
docker compose -f env/export/docker-compose.yml up -d
```

## Contributions

Git hooks are defined using [Husky](https://typicode.github.io/husky/#/) to enforce good coding practices. For each commit, Husky automatically:

- Lint your staged files (see [ESLint](https://eslint.org/))
- Format your staged files (see [Prettier](https://prettier.io/))
- Lint your commit messages according to the [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0/) (see [commitlint](https://github.com/conventional-changelog/commitlint))

Further instructions are available in the [`docs`](docs/) folder.
