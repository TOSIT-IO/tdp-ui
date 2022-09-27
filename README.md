# TDP UI

`tdp-ui` is a graphical interface for [`tdp-server`](https://github.com/TOSIT-IO/tdp-server).

## Requirements

The UI is based on [Next.js](https://nextjs.org/). It requires the following:

- [Node.js](https://nodejs.org/en/) 12.22.0 or later

## Usage

```bash
npm install       # Install dependencies
npm run dev       # Run the app in development mode
```

App should be available at [http://localhost:3000](http://localhost:3000).

## Contributions

Git hooks are defined using [Husky](https://typicode.github.io/husky/#/) to enforce good coding practice. The `prepare` script initializes Husky:

```bash
npm run prepare   # Initialize Husky git hooks
```

For each commit, Husky automatically:

- Lint your staged files (see [ESLint](https://eslint.org/))
- Format your staged files (see [Prettier](https://prettier.io/))
- Lint your commit messages according to the [Conventional Commit specification](https://www.conventionalcommits.org/en/v1.0.0/) (see [commitlint](https://github.com/conventional-changelog/commitlint  ))
