create-lib:
	npx nx g @nx/nest:library ${NAME} --publishable --importPath @will-bank/${NAME}
	$(MAKE) setup-lib NAME=${NAME}

setup-lib:
	npx nx g @theunderscorer/nx-semantic-release:setup-project ${NAME}
	cd libs/${NAME} && \
	npm pkg set private=false --json && \
	npm pkg set 'repository.type'='git' && \
	npm pkg set 'repository.url'='https://github.com/will-bank/nestjs-packages.git' && \
	npm pkg set 'repository.directory'='libs/${NAME}' && \
	npm pkg set 'publishConfig.registry'='https://npm.pkg.github.com/'

lint:
	npx nx format:write
	npx nx affected -t lint --fix

test:
	npx nx affected -t test

# Check https://nx.dev/core-features/automate-updating-dependencies
check-deps:
	npx nx migrate latest

update-deps:
	npm install
	npx nx migrate --run-migrations

clean-migrations:
	rm ./migrations.json

yalc-publish:
	nx run-many -t build --skip-nx-cache
	cd dist/libs/logger && yalc publish
