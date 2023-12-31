## [1.0.1](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.0.0...athena-v1.0.1) (2023-11-26)


### Bug Fixes

* disable libs github semantic ([840e04d](https://github.com/ra-libs/nestjs-packages/commit/840e04d1ab9adbdbacab5488c89223ec2e845c5b))

# 1.0.0 (2023-11-26)


### Bug Fixes

* add extract result generic type ([c9161d0](https://github.com/ra-libs/nestjs-packages/commit/c9161d09de9306d2cfaf0ca1867e36204b6c6307))
* **athena:** generic types ([5c7e9ce](https://github.com/ra-libs/nestjs-packages/commit/5c7e9ce4555523cc56b7bb07277ff9fa919be111))
* **athena:** remove extracted results type ([746f35a](https://github.com/ra-libs/nestjs-packages/commit/746f35a758f5f3a1bfaa615353a823aa9bce7056))
* change semantic-release lib ([#16](https://github.com/ra-libs/nestjs-packages/issues/16)) ([5d7b573](https://github.com/ra-libs/nestjs-packages/commit/5d7b573da2f71d4143b390fcce7d916637d7d3d2))
* **commons:** generate new uuid if the headers one is invalid v4 format ([#28](https://github.com/ra-libs/nestjs-packages/issues/28)) ([a4d0bec](https://github.com/ra-libs/nestjs-packages/commit/a4d0becf5f5b64165c1516fafaa35a0718936b86))
* **commons:** use crypto.randomUUID for uuid v4 ([4048f9a](https://github.com/ra-libs/nestjs-packages/commit/4048f9aec257a623fbb7f2ad0b1114768282a337))
* **growthbook:** attributes and setPolyfills for node ([#6](https://github.com/ra-libs/nestjs-packages/issues/6)) ([301098b](https://github.com/ra-libs/nestjs-packages/commit/301098b3287f9bd65fae65dd6686214562472e78))
* logger ([b5d09a9](https://github.com/ra-libs/nestjs-packages/commit/b5d09a9ac8834e2c4a5b99a9bb3d624eddcb5ced))
* **sqs:** consumer error throw catch ([#70](https://github.com/ra-libs/nestjs-packages/issues/70)) ([90ad27b](https://github.com/ra-libs/nestjs-packages/commit/90ad27b0a5bbd13c81c17703cbed7ac4a032254b))
* update deps ([04538b4](https://github.com/ra-libs/nestjs-packages/commit/04538b45acb8384bbda42d6c42b778ebb080afa2))
* update deps ([c572cf8](https://github.com/ra-libs/nestjs-packages/commit/c572cf8f227fb2b0f702e1c8b6367faa2454c68f))
* update deps ([#15](https://github.com/ra-libs/nestjs-packages/issues/15)) ([e705b4f](https://github.com/ra-libs/nestjs-packages/commit/e705b4f296eb331af1dd14c1833f43d6dec14de0))
* update deps ([#30](https://github.com/ra-libs/nestjs-packages/issues/30)) ([6f7e07d](https://github.com/ra-libs/nestjs-packages/commit/6f7e07da21f7e2958b810da6b8030011d16e5144))
* update deps ([#53](https://github.com/ra-libs/nestjs-packages/issues/53)) ([7a94ea7](https://github.com/ra-libs/nestjs-packages/commit/7a94ea7e68ad32400448f4df0a4c163d879e1cd7))
* update nx deps ([611540d](https://github.com/ra-libs/nestjs-packages/commit/611540d1c127af6e8793f41914c323c406dcb8b7))


### Features

* add growthbook library ([#2](https://github.com/ra-libs/nestjs-packages/issues/2)) ([6c66410](https://github.com/ra-libs/nestjs-packages/commit/6c66410e95de6f45b46e6983300622ea913013c7))
* add s3 initial lib ([#57](https://github.com/ra-libs/nestjs-packages/issues/57)) ([74ccde3](https://github.com/ra-libs/nestjs-packages/commit/74ccde39f642c662dc7ea462ae9a0b80a36e36e5))
* add sqs initial module with producer only ([#58](https://github.com/ra-libs/nestjs-packages/issues/58)) ([ebf5ed1](https://github.com/ra-libs/nestjs-packages/commit/ebf5ed1aaa47d5941119947d0a5e4262d180ca62))
* **athena:** add athena package ([#62](https://github.com/ra-libs/nestjs-packages/issues/62)) ([301637d](https://github.com/ra-libs/nestjs-packages/commit/301637ddf3705b06a00899f16b81440496535d0a))
* **athena:** add extract result method ([122c58c](https://github.com/ra-libs/nestjs-packages/commit/122c58ce0842228bd8948e86fd5dd2e02d239b43))
* **athena:** add runQuery ([a796efa](https://github.com/ra-libs/nestjs-packages/commit/a796efadc0bbcbd92bcac5f2e599ff52b228e674))
* **commons:** add RequestId decorator ([#22](https://github.com/ra-libs/nestjs-packages/issues/22)) ([1b85848](https://github.com/ra-libs/nestjs-packages/commit/1b85848be14d7f1bc0864195ee25e45ea3275422))
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

# [2.3.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v2.2.1...athena-v2.3.0) (2023-11-21)

### Features

- **sqs:** add RawMessage and Message type ([27d1967](https://github.com/ra-libs/nestjs-packages/commit/27d1967ea41ee486a8ef4d1a9e02791ac5a7a878))

## [2.2.1](https://github.com/ra-libs/nestjs-packages/compare/athena-v2.2.0...athena-v2.2.1) (2023-11-21)

### Bug Fixes

- update deps ([04538b4](https://github.com/ra-libs/nestjs-packages/commit/04538b45acb8384bbda42d6c42b778ebb080afa2))
- update nx deps ([611540d](https://github.com/ra-libs/nestjs-packages/commit/611540d1c127af6e8793f41914c323c406dcb8b7))

# [2.2.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v2.1.0...athena-v2.2.0) (2023-11-20)

### Features

- move RequestLogger to logger lib and add log level by status code ([eb95b6f](https://github.com/ra-libs/nestjs-packages/commit/eb95b6f2f24bf7e28e8a878f6553446f25016c70))

# [2.1.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v2.0.0...athena-v2.1.0) (2023-11-18)

### Features

- **unleash:** add unleash lib ([5fa52d5](https://github.com/ra-libs/nestjs-packages/commit/5fa52d5dc68c6270b6e6978c419e742cb5d11bc3))

# [2.0.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.3.1...athena-v2.0.0) (2023-11-15)

### Features

- **logger:** add correlation id per request and log requests using morgan ([08d05ec](https://github.com/ra-libs/nestjs-packages/commit/08d05ec6ec47165303406c7860f82ef2211ceb85))

### BREAKING CHANGES

- **logger:** Logger interface changed

## [1.3.1](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.3.0...athena-v1.3.1) (2023-10-30)

### Bug Fixes

- **sqs:** consumer error throw catch ([#70](https://github.com/ra-libs/nestjs-packages/issues/70)) ([90ad27b](https://github.com/ra-libs/nestjs-packages/commit/90ad27b0a5bbd13c81c17703cbed7ac4a032254b))

# [1.3.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.2.3...athena-v1.3.0) (2023-09-12)

### Features

- **sqs:** add consumers ([#65](https://github.com/ra-libs/nestjs-packages/issues/65)) ([ce5a2dd](https://github.com/ra-libs/nestjs-packages/commit/ce5a2dd13d7be5dd3cedee06f856cd90193dba56))

## [1.2.3](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.2.2...athena-v1.2.3) (2023-09-05)

### Bug Fixes

- **athena:** remove extracted results type ([746f35a](https://github.com/ra-libs/nestjs-packages/commit/746f35a758f5f3a1bfaa615353a823aa9bce7056))

## [1.2.2](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.2.1...athena-v1.2.2) (2023-09-05)

### Bug Fixes

- **athena:** generic types ([5c7e9ce](https://github.com/ra-libs/nestjs-packages/commit/5c7e9ce4555523cc56b7bb07277ff9fa919be111))

## [1.2.1](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.2.0...athena-v1.2.1) (2023-09-05)

### Bug Fixes

- add extract result generic type ([c9161d0](https://github.com/ra-libs/nestjs-packages/commit/c9161d09de9306d2cfaf0ca1867e36204b6c6307))

# [1.2.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.1.0...athena-v1.2.0) (2023-09-05)

### Features

- **athena:** add extract result method ([122c58c](https://github.com/ra-libs/nestjs-packages/commit/122c58ce0842228bd8948e86fd5dd2e02d239b43))

# [1.1.0](https://github.com/ra-libs/nestjs-packages/compare/athena-v1.0.0...athena-v1.1.0) (2023-09-05)

### Features

- **athena:** add runQuery ([a796efa](https://github.com/ra-libs/nestjs-packages/commit/a796efadc0bbcbd92bcac5f2e599ff52b228e674))

# 1.0.0 (2023-09-04)

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
- **athena:** add athena package ([#62](https://github.com/ra-libs/nestjs-packages/issues/62)) ([301637d](https://github.com/ra-libs/nestjs-packages/commit/301637ddf3705b06a00899f16b81440496535d0a))
- **commons:** add RequestId decorator ([#22](https://github.com/ra-libs/nestjs-packages/issues/22)) ([1b85848](https://github.com/ra-libs/nestjs-packages/commit/1b85848be14d7f1bc0864195ee25e45ea3275422))
- **logger:** add nestjs-like format for local development ([#29](https://github.com/ra-libs/nestjs-packages/issues/29)) ([2f68240](https://github.com/ra-libs/nestjs-packages/commit/2f6824008fd30c962aac3803fe7b09ef36b37527))
- **logger:** add winston logger lib ([#11](https://github.com/ra-libs/nestjs-packages/issues/11)) ([956fba5](https://github.com/ra-libs/nestjs-packages/commit/956fba5ce6b7dae44671a0a8ddc121ef8c330224))
- **metrics:** add initial datadog custom metrics ([#19](https://github.com/ra-libs/nestjs-packages/issues/19)) ([273719b](https://github.com/ra-libs/nestjs-packages/commit/273719b033341a434dd6a7d0e7a94e5a15cd9731))
- **secrets-manager:** add initial lib ([#35](https://github.com/ra-libs/nestjs-packages/issues/35)) ([0b079db](https://github.com/ra-libs/nestjs-packages/commit/0b079db636a14d69fa98f921294abedf9b96d5a3))
- **sns:** create initial sns lib ([#8](https://github.com/ra-libs/nestjs-packages/issues/8)) ([5e1a2ef](https://github.com/ra-libs/nestjs-packages/commit/5e1a2efc6d190b22e64141eaf3856adf99f3846b))
- **ssm:** add initial lib ([#32](https://github.com/ra-libs/nestjs-packages/issues/32)) ([73f745b](https://github.com/ra-libs/nestjs-packages/commit/73f745beb3e189517a503d523910123f288115b8))
