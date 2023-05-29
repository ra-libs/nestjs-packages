# Usage

## Locally

To be able to install these packages locally you should create a Personal Access Token (PAT) with `read:packages` permission. Don't forget to configure SSO and give access to will-bank.

> Check the Github [Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) for more information

Make sure to save your PAT and export it as GITHUB_REGISTRY_TOKEN variable.

Create a `.npmrc` file in your project as follow
```
@will-bank:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_REGISTRY_TOKEN}
```

Now you should be able to install any package using `npm install @will-bank/<LIBRARY_NAME>`