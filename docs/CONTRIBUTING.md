# Contributing

This repo uses some tools:

- [husky](https://typicode.github.io/husky/#/).
- [lint-staged](https://github.com/okonet/lint-staged) to run linters against staged git files.
- [commitlint](https://github.com/conventional-changelog/commitlint) to follow [conventional-commit](https://www.conventionalcommits.org/en/v1.0.0/).
- [commitizen](https://commitizen.github.io/cz-cli/) to fill any missing required fields.

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
nx g @nx/nest:library growthbook --publishable --importPath @will-bank/<LIBRARY_NAME>
```
