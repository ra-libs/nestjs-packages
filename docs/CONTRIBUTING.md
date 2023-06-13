# Contributing

This repo uses some tools:

- [husky](https://typicode.github.io/husky/#/).
- [lint-staged](https://github.com/okonet/lint-staged) to run linters against staged git files.
- [commitlint](https://github.com/conventional-changelog/commitlint) to follow [conventional-commit](https://www.conventionalcommits.org/en/v1.0.0/).
- [commitizen](https://commitizen.github.io/cz-cli/) to fill any missing required fields.
- [semantic-release-plus](https://semantic-release-plus.gitbook.io/semantic-release-plus/) automated version management and package publishing

## How to

1. [Clone it](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Install dependencies (`npm install`)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit`) without any other arg, commitizen will ask for other fields
5. Test your changes (`npx nx affected -t test `)
6. Push to the branch (`git push origin my-new-feature`)
7. [Create new Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## Create new Library

```bash
nx g @nx/nest:library <LIBRARY_NAME> --publishable --importPath @will-bank/<LIBRARY_NAME>
```

After publishable library created, you must update `package.json`

1. replace `version: 0.0.1` to `version: 0.0.0-semantic-release`
2. add repository config

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/will-bank/nestjs-packages.git",
    "directory": "libs/<LIBRARY_NAME>"
  },
```

3. add `publishConfig`

```json
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
```

4. add [release.config.js](/libs/growthbook/release.config.js) file. make sure to set your library name correctly
5. add a `release` target to your library `project.json`

```bash
nx generate @nrwl/workspace:run-commands release --command='npx semantic-release-plus --extends ./libs/<LIBRARY_NAME>/release.config.js' --project=<LIBRARY_NAME>
```