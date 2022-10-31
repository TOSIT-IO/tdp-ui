# TDP UI

`tdp-ui` is a graphical interface for [`tdp-server`](https://github.com/TOSIT-IO/tdp-server).

## Requirements

The UI requires the following to work:

- [Node.js](https://nodejs.org/en/) 12.22.0 or later.  
  _The UI is based on [Next.js](https://nextjs.org/), which requires Node.js to be installed._
- [Java](https://www.java.com/).  
  _Java is used to [generate the API client SDK](docs/openapi-client.md)._

It also asumes that you are running a [`tdp-server`](https://github.com/TOSIT-IO/tdp-server) with the appropriate `cors` configuration (`BACKEND_CORS_ORIGINS=[...,"http://localhost:3000"]`).

## Usage

```bash
npm install       # Install dependencies
npm run dev       # Run the app in development mode
```

App should be available at [http://localhost:3000](http://localhost:3000).

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
