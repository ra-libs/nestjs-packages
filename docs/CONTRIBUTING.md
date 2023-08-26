# Contributing

This repo uses some tools:

- [husky](https://typicode.github.io/husky/#/).
- [lint-staged](https://github.com/okonet/lint-staged) to run linters against staged git files.
- [commitlint](https://github.com/conventional-changelog/commitlint) to follow [conventional-commit](https://www.conventionalcommits.org/en/v1.0.0/).
- [commitizen](https://commitizen.github.io/cz-cli/) to fill any missing required fields.
- [nx-semantic-release](https://github.com/TheUnderScorer/nx-semantic-release) nx plugin for automated releases, powered by semantic-release

## How to

1. [Clone it](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Install dependencies (`pnpm install`)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit`) without any other arg, commitizen will ask for other fields
5. Test your changes (`npx nx affected -t test `)
6. Push to the branch (`git push origin my-new-feature`)
7. [Create new Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## Create new Library

### Using Makefile

```bash
make create-lib NAME=<LIBRARY_NAME>
```

That's it :rocket:

### Manually

```bash
nx g @nx/nest:library <LIBRARY_NAME> --publishable --importPath @will-bank/<LIBRARY_NAME>
```

After publishable library created, you must update `package.json`

1. add repository config

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/will-bank/nestjs-packages.git",
    "directory": "libs/<LIBRARY_NAME>"
  },
```

2. add `publishConfig`

```json
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
```

3. set `private` to `false`

```json
  "private": false
```

4. add a `semantic-release` target to your library `project.json`

```bash
  npx nx g @theunderscorer/nx-semantic-release:setup-project <LIBRARY_NAME>
```
