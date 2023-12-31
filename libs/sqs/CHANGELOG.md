## [1.1.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.1.0...sqs-v1.1.1) (2023-11-26)


### Bug Fixes

* **logger:** deploy ([727ab94](https://github.com/ra-libs/nestjs-packages/commit/727ab947f98db254d3cc39730f94d7fcbe547002))

# [1.1.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.0.0...sqs-v1.1.0) (2023-11-26)


### Bug Fixes

* disable libs github semantic ([840e04d](https://github.com/ra-libs/nestjs-packages/commit/840e04d1ab9adbdbacab5488c89223ec2e845c5b))


### Features

* allow publish logger ([5277f05](https://github.com/ra-libs/nestjs-packages/commit/5277f05305654490962391fa70ab12d21e9b5588))

# 1.0.0 (2023-11-26)


### Bug Fixes

* add logger doc ([0b3f7ab](https://github.com/ra-libs/nestjs-packages/commit/0b3f7ab30978a929c1e044f3277f73fa4f6ae3c6))
* add sourceClass on WinstonLogger constructor ([4331bd2](https://github.com/ra-libs/nestjs-packages/commit/4331bd2ab079e94e3b732a0c40dfed3cbe6718ec))
* change semantic-release lib ([#16](https://github.com/ra-libs/nestjs-packages/issues/16)) ([5d7b573](https://github.com/ra-libs/nestjs-packages/commit/5d7b573da2f71d4143b390fcce7d916637d7d3d2))
* **commons:** generate new uuid if the headers one is invalid v4 format ([#28](https://github.com/ra-libs/nestjs-packages/issues/28)) ([a4d0bec](https://github.com/ra-libs/nestjs-packages/commit/a4d0becf5f5b64165c1516fafaa35a0718936b86))
* **commons:** remove v4 uuid validation ([#38](https://github.com/ra-libs/nestjs-packages/issues/38)) ([9c90484](https://github.com/ra-libs/nestjs-packages/commit/9c90484b66db6b10b3b2f0ac9b03bcfb95589fdd))
* **commons:** use crypto.randomUUID for uuid v4 ([4048f9a](https://github.com/ra-libs/nestjs-packages/commit/4048f9aec257a623fbb7f2ad0b1114768282a337))
* force deploy ([22f51f5](https://github.com/ra-libs/nestjs-packages/commit/22f51f571e69280f6aaaa07ee3b810ca6064b5e8))
* **growthbook:** attributes and setPolyfills for node ([#6](https://github.com/ra-libs/nestjs-packages/issues/6)) ([301098b](https://github.com/ra-libs/nestjs-packages/commit/301098b3287f9bd65fae65dd6686214562472e78))
* **growthbook:** remove skipCache to avoid OOM ([#54](https://github.com/ra-libs/nestjs-packages/issues/54)) ([09dd166](https://github.com/ra-libs/nestjs-packages/commit/09dd166488309e1cd2b9498f31736a8869c18ab6))
* **growthbook:** set context using env vars inside the service ([#18](https://github.com/ra-libs/nestjs-packages/issues/18)) ([f6a134f](https://github.com/ra-libs/nestjs-packages/commit/f6a134fc4a110af916c499592c6b72217a880bd1))
* logger ([b5d09a9](https://github.com/ra-libs/nestjs-packages/commit/b5d09a9ac8834e2c4a5b99a9bb3d624eddcb5ced))
* **logger:** add correlationId to log meta event without props ([9193f7f](https://github.com/ra-libs/nestjs-packages/commit/9193f7f8bd306079d2264b741b915174405dc016))
* **logger:** add sourceClass to winston logger constructor ([e502d1c](https://github.com/ra-libs/nestjs-packages/commit/e502d1c0f6cad80d2021922412ea652d15e7340d))
* **logger:** app name local ([9127db8](https://github.com/ra-libs/nestjs-packages/commit/9127db8500ac83110cfb93dbbd6077edffc42d71))
* **logger:** color fix and remove console log ([6895372](https://github.com/ra-libs/nestjs-packages/commit/6895372324488588baef8db240553e3e173b7859))
* **logger:** log nestLike on non production NODE_ENV ([bd867e1](https://github.com/ra-libs/nestjs-packages/commit/bd867e1c06a0f06ea5da0404e9a4cabadff3135d))
* **logger:** morgan format ([1a1c01f](https://github.com/ra-libs/nestjs-packages/commit/1a1c01fbb59c562f370107d2dca2d0884cd2ad60))
* **logger:** package json version ([70ca255](https://github.com/ra-libs/nestjs-packages/commit/70ca2553fbc5612591db44fa5ed6f1caf61788ce))
* **logger:** print fields in development ([#48](https://github.com/ra-libs/nestjs-packages/issues/48)) ([1f64436](https://github.com/ra-libs/nestjs-packages/commit/1f64436b18d7f88640bc03f1dac11d8b0f91897d))
* **logger:** remove console.log ([72c42b6](https://github.com/ra-libs/nestjs-packages/commit/72c42b65321aaa93591a8396d8d992b7f04774a0))
* **logger:** use inject logger in request middleware to get correlation id ([1743d8a](https://github.com/ra-libs/nestjs-packages/commit/1743d8ad2fb6de105fa9b6fe1c2393897d1eb31f))
* npm publish ([b1846fd](https://github.com/ra-libs/nestjs-packages/commit/b1846fd5b00757725e702240d66507fd540db536))
* npm publish ([c2fd533](https://github.com/ra-libs/nestjs-packages/commit/c2fd533f343c10aec918db2f417ad5ee881a10b1))
* npm publish ([4f9169f](https://github.com/ra-libs/nestjs-packages/commit/4f9169f3d8fbbb8cb5447fb4c79e0d27402149f4))
* npm set private to false ([e60760a](https://github.com/ra-libs/nestjs-packages/commit/e60760a7dd65c1085e997b83c88413e0ce1727c9))
* readme fix ([2022077](https://github.com/ra-libs/nestjs-packages/commit/2022077912b6d7464c95ff8325a096566e5e00b9))
* semantic npm dist dir ([c66121d](https://github.com/ra-libs/nestjs-packages/commit/c66121d57f00310fcf58a0baeb72dde43fb846cb))
* semantic-release ([#43](https://github.com/ra-libs/nestjs-packages/issues/43)) ([f033420](https://github.com/ra-libs/nestjs-packages/commit/f0334207498ae97c1f70dea2cdb51f8c61ef9db2))
* **sqs:** consumer error throw catch ([#70](https://github.com/ra-libs/nestjs-packages/issues/70)) ([90ad27b](https://github.com/ra-libs/nestjs-packages/commit/90ad27b0a5bbd13c81c17703cbed7ac4a032254b))
* **sqs:** Message type ([d38a18c](https://github.com/ra-libs/nestjs-packages/commit/d38a18c63b58c8add580231c59547f30d7a000f5))
* **sqs:** queueName option ([#59](https://github.com/ra-libs/nestjs-packages/issues/59)) ([c9700c4](https://github.com/ra-libs/nestjs-packages/commit/c9700c414350283055d1e3d7bafc356c2fe76111))
* **sqs:** types ([b45e3f0](https://github.com/ra-libs/nestjs-packages/commit/b45e3f02d4ee58547a1808ecc27f95837ade2760))
* **sqs:** types ([#66](https://github.com/ra-libs/nestjs-packages/issues/66)) ([9ae0e02](https://github.com/ra-libs/nestjs-packages/commit/9ae0e02df4eafb327966cac99360a2a8d7d83299))
* update deps ([04538b4](https://github.com/ra-libs/nestjs-packages/commit/04538b45acb8384bbda42d6c42b778ebb080afa2))
* update deps ([c572cf8](https://github.com/ra-libs/nestjs-packages/commit/c572cf8f227fb2b0f702e1c8b6367faa2454c68f))
* update deps ([#15](https://github.com/ra-libs/nestjs-packages/issues/15)) ([e705b4f](https://github.com/ra-libs/nestjs-packages/commit/e705b4f296eb331af1dd14c1833f43d6dec14de0))
* update deps ([#30](https://github.com/ra-libs/nestjs-packages/issues/30)) ([6f7e07d](https://github.com/ra-libs/nestjs-packages/commit/6f7e07da21f7e2958b810da6b8030011d16e5144))
* update deps ([#53](https://github.com/ra-libs/nestjs-packages/issues/53)) ([7a94ea7](https://github.com/ra-libs/nestjs-packages/commit/7a94ea7e68ad32400448f4df0a4c163d879e1cd7))
* update docs ([91e3740](https://github.com/ra-libs/nestjs-packages/commit/91e374094e60ca4194e90ee2ee732d34bb90e73e))
* update nx deps ([611540d](https://github.com/ra-libs/nestjs-packages/commit/611540d1c127af6e8793f41914c323c406dcb8b7))
* use winston logger in commons and sqs ([90dffd2](https://github.com/ra-libs/nestjs-packages/commit/90dffd218c5fe80809a5fb210ea0ce79dc9648c4))


### Features

* add AWS creds for github action tests ([#68](https://github.com/ra-libs/nestjs-packages/issues/68)) ([5751990](https://github.com/ra-libs/nestjs-packages/commit/57519906179a62274ad09c5e518cb595f4b240c8))
* add growthbook library ([#2](https://github.com/ra-libs/nestjs-packages/issues/2)) ([6c66410](https://github.com/ra-libs/nestjs-packages/commit/6c66410e95de6f45b46e6983300622ea913013c7))
* add s3 initial lib ([#57](https://github.com/ra-libs/nestjs-packages/issues/57)) ([74ccde3](https://github.com/ra-libs/nestjs-packages/commit/74ccde39f642c662dc7ea462ae9a0b80a36e36e5))
* add sqs initial module with producer only ([#58](https://github.com/ra-libs/nestjs-packages/issues/58)) ([ebf5ed1](https://github.com/ra-libs/nestjs-packages/commit/ebf5ed1aaa47d5941119947d0a5e4262d180ca62))
* **athena:** add athena package ([#62](https://github.com/ra-libs/nestjs-packages/issues/62)) ([301637d](https://github.com/ra-libs/nestjs-packages/commit/301637ddf3705b06a00899f16b81440496535d0a))
* **commons:** add RequestId decorator ([#22](https://github.com/ra-libs/nestjs-packages/issues/22)) ([1b85848](https://github.com/ra-libs/nestjs-packages/commit/1b85848be14d7f1bc0864195ee25e45ea3275422))
* **logger:** add child method ([#44](https://github.com/ra-libs/nestjs-packages/issues/44)) ([11482c9](https://github.com/ra-libs/nestjs-packages/commit/11482c9660b6400b359f75c5b4aefeddb4ec3de6))
* **logger:** add child method to winston logger ([a3a6331](https://github.com/ra-libs/nestjs-packages/commit/a3a6331771fdf2eabd4353434f61bb9ac4256806))
* **logger:** add correlation id per request and log requests using morgan ([08d05ec](https://github.com/ra-libs/nestjs-packages/commit/08d05ec6ec47165303406c7860f82ef2211ceb85))
* **logger:** add nestjs-like format for local development ([#29](https://github.com/ra-libs/nestjs-packages/issues/29)) ([2f68240](https://github.com/ra-libs/nestjs-packages/commit/2f6824008fd30c962aac3803fe7b09ef36b37527))
* **logger:** add winston logger lib ([#11](https://github.com/ra-libs/nestjs-packages/issues/11)) ([956fba5](https://github.com/ra-libs/nestjs-packages/commit/956fba5ce6b7dae44671a0a8ddc121ef8c330224))
* **metrics:** add initial datadog custom metrics ([#19](https://github.com/ra-libs/nestjs-packages/issues/19)) ([273719b](https://github.com/ra-libs/nestjs-packages/commit/273719b033341a434dd6a7d0e7a94e5a15cd9731))
* move RequestLogger to logger lib and add log level by status code ([eb95b6f](https://github.com/ra-libs/nestjs-packages/commit/eb95b6f2f24bf7e28e8a878f6553446f25016c70))
* **secrets-manager:** add initial lib ([#35](https://github.com/ra-libs/nestjs-packages/issues/35)) ([0b079db](https://github.com/ra-libs/nestjs-packages/commit/0b079db636a14d69fa98f921294abedf9b96d5a3))
* **sns:** create initial sns lib ([#8](https://github.com/ra-libs/nestjs-packages/issues/8)) ([5e1a2ef](https://github.com/ra-libs/nestjs-packages/commit/5e1a2efc6d190b22e64141eaf3856adf99f3846b))
* **sqs:** add consumers ([#65](https://github.com/ra-libs/nestjs-packages/issues/65)) ([ce5a2dd](https://github.com/ra-libs/nestjs-packages/commit/ce5a2dd13d7be5dd3cedee06f856cd90193dba56))
* **sqs:** add RawMessage and Message type ([27d1967](https://github.com/ra-libs/nestjs-packages/commit/27d1967ea41ee486a8ef4d1a9e02791ac5a7a878))
* **ssm:** add initial lib ([#32](https://github.com/ra-libs/nestjs-packages/issues/32)) ([73f745b](https://github.com/ra-libs/nestjs-packages/commit/73f745beb3e189517a503d523910123f288115b8))
* **unleash:** add unleash lib ([5fa52d5](https://github.com/ra-libs/nestjs-packages/commit/5fa52d5dc68c6270b6e6978c419e742cb5d11bc3))


### BREAKING CHANGES

* **logger:** Logger interface changed

## [2.4.4](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.4.3...sqs-v2.4.4) (2023-11-24)

### Bug Fixes

- **logger:** app name local ([9127db8](https://github.com/ra-libs/nestjs-packages/commit/9127db8500ac83110cfb93dbbd6077edffc42d71))

## [2.4.3](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.4.2...sqs-v2.4.3) (2023-11-21)

### Bug Fixes

- **sqs:** Message type ([d38a18c](https://github.com/ra-libs/nestjs-packages/commit/d38a18c63b58c8add580231c59547f30d7a000f5))

## [2.4.2](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.4.1...sqs-v2.4.2) (2023-11-21)

### Bug Fixes

- **sqs:** types ([b45e3f0](https://github.com/ra-libs/nestjs-packages/commit/b45e3f02d4ee58547a1808ecc27f95837ade2760))

## [2.4.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.4.0...sqs-v2.4.1) (2023-11-21)

### Bug Fixes

- **logger:** use inject logger in request middleware to get correlation id ([1743d8a](https://github.com/ra-libs/nestjs-packages/commit/1743d8ad2fb6de105fa9b6fe1c2393897d1eb31f))

# [2.4.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.3.1...sqs-v2.4.0) (2023-11-21)

### Features

- **sqs:** add RawMessage and Message type ([27d1967](https://github.com/ra-libs/nestjs-packages/commit/27d1967ea41ee486a8ef4d1a9e02791ac5a7a878))

## [2.3.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.3.0...sqs-v2.3.1) (2023-11-21)

### Bug Fixes

- update deps ([04538b4](https://github.com/ra-libs/nestjs-packages/commit/04538b45acb8384bbda42d6c42b778ebb080afa2))
- update nx deps ([611540d](https://github.com/ra-libs/nestjs-packages/commit/611540d1c127af6e8793f41914c323c406dcb8b7))

# [2.3.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.2.2...sqs-v2.3.0) (2023-11-21)

### Features

- **logger:** add child method to winston logger ([a3a6331](https://github.com/ra-libs/nestjs-packages/commit/a3a6331771fdf2eabd4353434f61bb9ac4256806))

## [2.2.2](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.2.1...sqs-v2.2.2) (2023-11-20)

### Bug Fixes

- add sourceClass on WinstonLogger constructor ([4331bd2](https://github.com/ra-libs/nestjs-packages/commit/4331bd2ab079e94e3b732a0c40dfed3cbe6718ec))

## [2.2.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.2.0...sqs-v2.2.1) (2023-11-20)

### Bug Fixes

- **logger:** add sourceClass to winston logger constructor ([e502d1c](https://github.com/ra-libs/nestjs-packages/commit/e502d1c0f6cad80d2021922412ea652d15e7340d))

# [2.2.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.1.0...sqs-v2.2.0) (2023-11-20)

### Features

- move RequestLogger to logger lib and add log level by status code ([eb95b6f](https://github.com/ra-libs/nestjs-packages/commit/eb95b6f2f24bf7e28e8a878f6553446f25016c70))

# [2.1.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.0.3...sqs-v2.1.0) (2023-11-18)

### Features

- **unleash:** add unleash lib ([5fa52d5](https://github.com/ra-libs/nestjs-packages/commit/5fa52d5dc68c6270b6e6978c419e742cb5d11bc3))

## [2.0.3](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.0.2...sqs-v2.0.3) (2023-11-16)

### Bug Fixes

- **logger:** morgan format ([1a1c01f](https://github.com/ra-libs/nestjs-packages/commit/1a1c01fbb59c562f370107d2dca2d0884cd2ad60))

## [2.0.2](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.0.1...sqs-v2.0.2) (2023-11-15)

### Bug Fixes

- add logger doc ([0b3f7ab](https://github.com/ra-libs/nestjs-packages/commit/0b3f7ab30978a929c1e044f3277f73fa4f6ae3c6))

## [2.0.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v2.0.0...sqs-v2.0.1) (2023-11-15)

### Bug Fixes

- **logger:** add correlationId to log meta event without props ([9193f7f](https://github.com/ra-libs/nestjs-packages/commit/9193f7f8bd306079d2264b741b915174405dc016))

# [2.0.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.3.1...sqs-v2.0.0) (2023-11-15)

### Bug Fixes

- **logger:** color fix and remove console log ([6895372](https://github.com/ra-libs/nestjs-packages/commit/6895372324488588baef8db240553e3e173b7859))
- **logger:** package json version ([70ca255](https://github.com/ra-libs/nestjs-packages/commit/70ca2553fbc5612591db44fa5ed6f1caf61788ce))
- use winston logger in commons and sqs ([90dffd2](https://github.com/ra-libs/nestjs-packages/commit/90dffd218c5fe80809a5fb210ea0ce79dc9648c4))

### Features

- **logger:** add correlation id per request and log requests using morgan ([08d05ec](https://github.com/ra-libs/nestjs-packages/commit/08d05ec6ec47165303406c7860f82ef2211ceb85))

### BREAKING CHANGES

- **logger:** Logger interface changed

## [1.3.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.3.0...sqs-v1.3.1) (2023-10-30)

### Bug Fixes

- **sqs:** consumer error throw catch ([#70](https://github.com/ra-libs/nestjs-packages/issues/70)) ([90ad27b](https://github.com/ra-libs/nestjs-packages/commit/90ad27b0a5bbd13c81c17703cbed7ac4a032254b))

# [1.3.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.2.1...sqs-v1.3.0) (2023-09-18)

### Features

- add AWS creds for github action tests ([#68](https://github.com/ra-libs/nestjs-packages/issues/68)) ([5751990](https://github.com/ra-libs/nestjs-packages/commit/57519906179a62274ad09c5e518cb595f4b240c8))

## [1.2.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.2.0...sqs-v1.2.1) (2023-09-12)

### Bug Fixes

- **sqs:** types ([#66](https://github.com/ra-libs/nestjs-packages/issues/66)) ([9ae0e02](https://github.com/ra-libs/nestjs-packages/commit/9ae0e02df4eafb327966cac99360a2a8d7d83299))

# [1.2.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.1.0...sqs-v1.2.0) (2023-09-12)

### Features

- **sqs:** add consumers ([#65](https://github.com/ra-libs/nestjs-packages/issues/65)) ([ce5a2dd](https://github.com/ra-libs/nestjs-packages/commit/ce5a2dd13d7be5dd3cedee06f856cd90193dba56))

# [1.1.0](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.0.2...sqs-v1.1.0) (2023-09-04)

### Features

- **athena:** add athena package ([#62](https://github.com/ra-libs/nestjs-packages/issues/62)) ([301637d](https://github.com/ra-libs/nestjs-packages/commit/301637ddf3705b06a00899f16b81440496535d0a))

## [1.0.2](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.0.1...sqs-v1.0.2) (2023-08-25)

### Bug Fixes

- readme fix ([2022077](https://github.com/ra-libs/nestjs-packages/commit/2022077912b6d7464c95ff8325a096566e5e00b9))

## [1.0.1](https://github.com/ra-libs/nestjs-packages/compare/sqs-v1.0.0...sqs-v1.0.1) (2023-08-25)

### Bug Fixes

- **sqs:** queueName option ([#59](https://github.com/ra-libs/nestjs-packages/issues/59)) ([c9700c4](https://github.com/ra-libs/nestjs-packages/commit/c9700c414350283055d1e3d7bafc356c2fe76111))

# 1.0.0 (2023-08-25)

### Bug Fixes

- change semantic-release lib ([#16](https://github.com/ra-libs/nestjs-packages/issues/16)) ([5d7b573](https://github.com/ra-libs/nestjs-packages/commit/5d7b573da2f71d4143b390fcce7d916637d7d3d2))
- **commons:** generate new uuid if the headers one is invalid v4 format ([#28](https://github.com/ra-libs/nestjs-packages/issues/28)) ([a4d0bec](https://github.com/ra-libs/nestjs-packages/commit/a4d0becf5f5b64165c1516fafaa35a0718936b86))
- **commons:** use crypto.randomUUID for uuid v4 ([4048f9a](https://github.com/ra-libs/nestjs-packages/commit/4048f9aec257a623fbb7f2ad0b1114768282a337))
- **growthbook:** attributes and setPolyfills for node ([#6](https://github.com/ra-libs/nestjs-packages/issues/6)) ([301098b](https://github.com/ra-libs/nestjs-packages/commit/301098b3287f9bd65fae65dd6686214562472e78))
- update deps ([c572cf8](https://github.com/ra-libs/nestjs-packages/commit/c572cf8f227fb2b0f702e1c8b6367faa2454c68f))
- update deps ([#15](https://github.com/ra-libs/nestjs-packages/issues/15)) ([e705b4f](https://github.com/ra-libs/nestjs-packages/commit/e705b4f296eb331af1dd14c1833f43d6dec14de0))
- update deps ([#30](https://github.com/ra-libs/nestjs-packages/issues/30)) ([6f7e07d](https://github.com/ra-libs/nestjs-packages/commit/6f7e07da21f7e2958b810da6b8030011d16e5144))
- update deps ([#53](https://github.com/ra-libs/nestjs-packages/issues/53)) ([7a94ea7](https://github.com/ra-libs/nestjs-packages/commit/7a94ea7e68ad32400448f4df0a4c163d879e1cd7))

### Features

- add growthbook library ([#2](https://github.com/ra-libs/nestjs-packages/issues/2)) ([6c66410](https://github.com/ra-libs/nestjs-packages/commit/6c66410e95de6f45b46e6983300622ea913013c7))
- add s3 initial lib ([#57](https://github.com/ra-libs/nestjs-packages/issues/57)) ([74ccde3](https://github.com/ra-libs/nestjs-packages/commit/74ccde39f642c662dc7ea462ae9a0b80a36e36e5))
- add sqs initial module with producer only ([#58](https://github.com/ra-libs/nestjs-packages/issues/58)) ([ebf5ed1](https://github.com/ra-libs/nestjs-packages/commit/ebf5ed1aaa47d5941119947d0a5e4262d180ca62))
- **commons:** add RequestId decorator ([#22](https://github.com/ra-libs/nestjs-packages/issues/22)) ([1b85848](https://github.com/ra-libs/nestjs-packages/commit/1b85848be14d7f1bc0864195ee25e45ea3275422))
- **logger:** add nestjs-like format for local development ([#29](https://github.com/ra-libs/nestjs-packages/issues/29)) ([2f68240](https://github.com/ra-libs/nestjs-packages/commit/2f6824008fd30c962aac3803fe7b09ef36b37527))
- **logger:** add winston logger lib ([#11](https://github.com/ra-libs/nestjs-packages/issues/11)) ([956fba5](https://github.com/ra-libs/nestjs-packages/commit/956fba5ce6b7dae44671a0a8ddc121ef8c330224))
- **metrics:** add initial datadog custom metrics ([#19](https://github.com/ra-libs/nestjs-packages/issues/19)) ([273719b](https://github.com/ra-libs/nestjs-packages/commit/273719b033341a434dd6a7d0e7a94e5a15cd9731))
- **secrets-manager:** add initial lib ([#35](https://github.com/ra-libs/nestjs-packages/issues/35)) ([0b079db](https://github.com/ra-libs/nestjs-packages/commit/0b079db636a14d69fa98f921294abedf9b96d5a3))
- **sns:** create initial sns lib ([#8](https://github.com/ra-libs/nestjs-packages/issues/8)) ([5e1a2ef](https://github.com/ra-libs/nestjs-packages/commit/5e1a2efc6d190b22e64141eaf3856adf99f3846b))
- **ssm:** add initial lib ([#32](https://github.com/ra-libs/nestjs-packages/issues/32)) ([73f745b](https://github.com/ra-libs/nestjs-packages/commit/73f745beb3e189517a503d523910123f288115b8))
