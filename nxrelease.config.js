module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/will-bank/nestjs-packages',
  gitAssets: [
    'package-lock.json',
    '${PROJECT_DIR}/CHANGELOG.md',
    '${PROJECT_DIR}/package.json',
  ],
  npm: true,
  buildTarget: 'build',
  outputPath: '${WORKSPACE_DIR}/dist/libs/${PROJECT_NAME}',
};
