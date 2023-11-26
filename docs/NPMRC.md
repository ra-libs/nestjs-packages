# Setup .npmrc file

Create a Personal Access Token (PAT) with `read:packages` permission. Don't forget to configure SSO and give access to ra-libs.

> Check the Github [Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) for more information

Make sure to save your PAT and export it as GPR_TOKEN variable.

Create a `.npmrc` file in your project as follow

```
@ra-libs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GPR_TOKEN}
```
