# TDP UI

`tdp-ui` is a graphical interface for [`tdp-server`](https://github.com/TOSIT-IO/tdp-server).

## Requirements

The UI requires the following to work:

- [Node.js](https://nodejs.org/en/) 14.6.0 or later.  
  _The UI is based on [Next.js](https://nextjs.org/), which requires Node.js to be installed._
- [Java](https://www.java.com/).  
  _Java is used to [generate the API client SDK](docs/openapi-client.md)._

It also assumes that you are running:

- [`tdp-server`](https://github.com/TOSIT-IO/tdp-server) with the appropriate `cors` configuration (`BACKEND_CORS_ORIGINS=[...,"http://localhost:3000"]`).
- An identity provider, provisioned to work with `tdp-server`. The idp must contain `http://localhost:3000/*` in its `redirectUris` list.  
  Note: `tdp_server` provides ready-to-use [docker environment](https://github.com/TOSIT-IO/tdp-server/tree/master/dev) for development and testing purposes.

## Usage

Use the example `env/.env.dev` file to provide the `tdp-server` and idp informations:

```bash
cp env/.env.dev .env
```

Install and run the client in development mode:

```bash
npm install       # Install dependencies
npm run dev       # Run the app in development mode
```

App should be available at <http://localhost:3000>.

## Dev Environment

You can use the `compose.yml`, it will set up needed dependencies to develop on the UI.

To run the stack, simply type:

```bash
docker compose -f env/compose.yml up -d
```

### Export

By default, Next.js runs along with a Node.js server for [various usecases](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features) (server-side data fetching, api routes...). `tdp-ui` doesn't need those features and can be exported to work without the Node.js server:

```bash
npm install       # Install dependencies
npm run export    # Build and export the project
```

The exported project is located in the `./out` folder. It can then be used allong with any web server (as [NGINX](https://www.nginx.com/)).

A dev environment, using NGINX, is provided through a [`docker-compose`](env/export/docker-compose.yml) to test the exported project:

```bash
docker-compose -f env/export/docker-compose.yml up -d
```

## Contributions

Git hooks are defined using [Husky](https://typicode.github.io/husky/#/) to enforce good coding practices. For each commit, Husky automatically:

- Lint your staged files (see [ESLint](https://eslint.org/))
- Format your staged files (see [Prettier](https://prettier.io/))
- Lint your commit messages according to the [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0/) (see [commitlint](https://github.com/conventional-changelog/commitlint))

Further instructions can be found in the [`docs`](docs/) folder.
