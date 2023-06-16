create-lib:
	npx nx g @nx/nest:library ${NAME} --publishable --importPath @will-bank/${NAME}
	$(MAKE) setup-lib NAME=${NAME}

setup-lib:
	sed "s/LIB_NAME/${NAME}/g" assets/release.config.js > libs/${NAME}/release.config.js
	cd libs/${NAME} && \
	npm pkg set 'version'='0.0.0-semantic-release' && \
	npm pkg set 'repository.type'='git' && \
	npm pkg set 'repository.url'='https://github.com/will-bank/nestjs-packages.git' && \
	npm pkg set 'repository.directory'='libs/${NAME}' && \
	npm pkg set 'publishConfig.registry'='https://npm.pkg.github.com/'
	npx nx generate @nrwl/workspace:run-commands release --command='npx semantic-release-plus --extends ./libs/${NAME}/release.config.js' --project=${NAME}

lint:
	npx nx format:write
	npx nx affected -t lint

test:
	npx nx affected -t test
