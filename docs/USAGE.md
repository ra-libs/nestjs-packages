# Usage

## Locally

To be able to install these packages locally you should create a Personal Access Token (PAT) with `read:packages` permission. Don't forget to configure SSO and give access to will-bank.

> Check the Github [Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) for more information

Make sure to save your PAT and export it as GPR_TOKEN variable.

Create a `.npmrc` file in your project as follow

```
@will-bank:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GPR_TOKEN}
```

Now you should be able to install any package using `npm install @will-bank/<LIBRARY_NAME>`

## Github Workflow

Add GPR_TOKEN env to your workflow:

```yml
env:
  GPR_TOKEN: ${{ secrets.WILLBANK_PLATFORMS_GPR_TOKEN }}
```

For deploy workflow make sure to update to `0.10.2` and pass the GPR_TOKEN to build args

```yml
jobs:
  workflow:
    uses: will-bank/build-deploy-kubernetes-application-workflow/.github/workflows/build-deploy-kubernetes-application.yml@v0.10.2
    with:
      ENVIRONMENT: ${{ inputs.ENVIRONMENT }}
      DOCKER_BUILD_ARGS: |
        GPR_TOKEN
```

Add the env var to your Dockerfile:

```dockerfile

ARG GPR_TOKEN
ENV GPR_TOKEN=${GPR_TOKEN}
```
