module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/will-bank/nestjs-packages',
  gitAssets: [
    'package-lock.json',
    '${PROJECT_DIR}/CHANGELOG.md',
    '${PROJECT_DIR}/package.json',
  ],
  npm: false,
  buildTarget: 'build',
  outputPath: '${WORKSPACE_DIR}/dist/libs/${PROJECT_NAME}',
  commitMessage:
    'chore(release): ${PROJECT_NAME} ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
};
