# TDP UI

`tdp-ui` is a graphical interface for [`tdp-server`](https://github.com/TOSIT-IO/tdp-server).

## Pre-requisites

We assume that are available:

- An instance of [`tdp-server`](https://github.com/TOSIT-IO/tdp-server), with the appropriate `cors` configuration (`BACKEND_CORS_ORIGINS=[...,"http://tdp-ui-domain.local"]`).
- An identity provider, provisioned and configured to work with `tdp-server`. `tdp-ui` domain has to be registered as a redirect URI.  
  Note: `tdp_server` provides a [Docker environment](https://github.com/TOSIT-IO/tdp-server/tree/master/dev) containing an IDP for development purposes.

The following are required to **build and develop** `tdp-ui`. They aren't needed when exporting the project. `tdp-ui` can be used with any web server (such as [NGINX](https://www.nginx.com/)):

- [Node.js](https://nodejs.org/en/) 14.13.0 or later.  
  _The UI is based on [Next.js](https://nextjs.org/), which requires Node.js._

## Development and testing

- Use the sample `config.example.json` file to provide `tdp-ui` the required environment variables:

  ```bash
  cp config.example.json config.json
  ```

  A `skipAuth` option is available to skip the authentication process. It is useful for development purposes.

- Generate the [RTK Query OpenAPI](https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi) client:

  ```bash
  npm run generate
  ```

  The RTK Query OpenAPI client is generated in the `./src/features/api/tdpApi.ts` file using `./scripts/openapi-config.ts` and a schema in the `./schemas/` folder.

- Install dependencies and start the app in development mode:

  ```bash
  npm install
  npm run dev
  ```

  By default, the client is available at <http://localhost:3000>.

### Development with Docker

A Docker environment is provided with the required dependencies for development. It contains both `tdp-server` and Keycloak as the identity provider:

```bash
docker compose -f env/dev/compose.yml up -d
```

An user is provisioned in Keycloak to access the app. The credentials are:

- username: `user@tdp.com`
- password: `secret`

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
docker compose -f env/export/compose.yml up -d
```

## Contributions

Git hooks are defined using [Husky](https://typicode.github.io/husky/#/) to enforce good coding practices. For each commit, Husky automatically:

- Lint your staged files (see [ESLint](https://eslint.org/))
- Format your staged files (see [Prettier](https://prettier.io/))
- Lint your commit messages according to the [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0/) (see [commitlint](https://github.com/conventional-changelog/commitlint))

Further instructions are available in the [`docs`](docs/) folder.
