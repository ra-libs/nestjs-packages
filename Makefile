create-lib:
	pnpm dlx nx g @nx/nest:library ${NAME} --publishable --importPath @will-bank/${NAME}
	$(MAKE) setup-lib NAME=${NAME}

setup-lib:
	pnpm dlx nx g @theunderscorer/nx-semantic-release:setup-project ${NAME}
	cd libs/${NAME} && \
	pnpm pkg set private=false --json && \
	pnpm pkg set 'repository.type'='git' && \
	pnpm pkg set 'repository.url'='https://github.com/will-bank/nestjs-packages.git' && \
	pnpm pkg set 'repository.directory'='libs/${NAME}' && \
	pnpm pkg set 'publishConfig.registry'='https://npm.pkg.github.com/'

lint:
	pnpm dlx nx format:write
	pnpm dlx nx affected -t lint --fix

test:
	pnpm dlx nx affected -t test

# Check https://nx.dev/core-features/automate-updating-dependencies
check-deps:
	pnpm dlx nx migrate latest

update-deps:
	pnpm install
	pnpm dlx nx migrate --run-migrations

clean-migrations:
	rm ./migrations.json

yalc-publish:
	pnpm dlx nx run-many -t build --skip-nx-cache
	cd dist/libs/logger && yalc publish
