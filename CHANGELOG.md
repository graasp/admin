# Changelog

## [2.32.0](https://github.com/graasp/client/compare/v2.31.2...v2.32.0) (2025-10-16)


### Features

* add user survey on home ([#1113](https://github.com/graasp/client/issues/1113)) ([12855ea](https://github.com/graasp/client/commit/12855ea1862758144aa73bd198bf823c9def634b))
* improve landing menu responsiveness ([#1120](https://github.com/graasp/client/issues/1120)) ([1a2f8e5](https://github.com/graasp/client/commit/1a2f8e5fe9e3ed765533aafb74ee21158fb14cbe))
* improve language switch design ([#1119](https://github.com/graasp/client/issues/1119)) ([17b9012](https://github.com/graasp/client/commit/17b90123f3ebb4cf882abd549534fdaaa852ce20))
* show capsule examples on landing page ([#1061](https://github.com/graasp/client/issues/1061)) ([a4ada89](https://github.com/graasp/client/commit/a4ada8929c3410dcad81f7d7c9159b8167f10343))


### Bug Fixes

* catch local storage errors ([#1115](https://github.com/graasp/client/issues/1115)) ([e7f463c](https://github.com/graasp/client/commit/e7f463c883e6c9c794f37bbe971f5ec9aef374fc))
* **deps:** update dependency @fontsource-variable/nunito to v5.2.7 ([#1123](https://github.com/graasp/client/issues/1123)) ([0e74691](https://github.com/graasp/client/commit/0e7469106bf53697923eb3a05cd093566b1788d1))
* **deps:** update dependency axios to v1.12.2 ([#1124](https://github.com/graasp/client/issues/1124)) ([75294d7](https://github.com/graasp/client/commit/75294d77a21910783a3730c77cac36cb84c7b3c6))
* fix link related bugs in pages ([#1112](https://github.com/graasp/client/issues/1112)) ([8ec5b8d](https://github.com/graasp/client/commit/8ec5b8d82be02a20541bac5cdf86b79f670ab8d2))
* redirect guest to player view for their item ([#1131](https://github.com/graasp/client/issues/1131)) ([2264095](https://github.com/graasp/client/commit/226409528123f30758f337cd95d8a778c6deda7b))
* remove cypress iframe package ([#1125](https://github.com/graasp/client/issues/1125)) ([d25c2e2](https://github.com/graasp/client/commit/d25c2e25b8cc7c56196dc3329ec6f2f6e2e8d4fb))
* update deploy workflows ([#1130](https://github.com/graasp/client/issues/1130)) ([1b13fa8](https://github.com/graasp/client/commit/1b13fa898c0b73d2d9372489d0bdf420795ce6c2))
* use mise en place for node and pnpm installation ([#1128](https://github.com/graasp/client/issues/1128)) ([052a7f2](https://github.com/graasp/client/commit/052a7f20e7ffb87e354875c67f38f42987b98cd2))
* use structured clone instead of JSON copy ([#1129](https://github.com/graasp/client/issues/1129)) ([2cf82c1](https://github.com/graasp/client/commit/2cf82c1c6e61ff393578d769e6d6e7d18d68ee95))
* use v8 for coverage ([#1132](https://github.com/graasp/client/issues/1132)) ([311e95f](https://github.com/graasp/client/commit/311e95f8c1c59ee71ab03e375bb811fe9b6c3e12))

## [2.31.2](https://github.com/graasp/client/compare/v2.31.1...v2.31.2) (2025-09-12)


### Bug Fixes

* allow to add custom tag even when there are hits ([#1104](https://github.com/graasp/client/issues/1104)) ([3ca91d5](https://github.com/graasp/client/commit/3ca91d59e1245e6af087ebedc3d7531457e06f8b))
* cypress error due to change in @tanstack/router ([#1111](https://github.com/graasp/client/issues/1111)) ([f34a4db](https://github.com/graasp/client/commit/f34a4dbc597d5321ca994d3f62b62d3688600610))
* guests can not change their language ([#1107](https://github.com/graasp/client/issues/1107)) ([d1d8ccf](https://github.com/graasp/client/commit/d1d8ccf09fab6e4a90c20de8fd0e4f115a1424a2))
* remove search things ([2d96fb5](https://github.com/graasp/client/commit/2d96fb5306fe62c71e845e7a4d4dc452dff7bddf))
* udpate vite dependency ([dc7ad99](https://github.com/graasp/client/commit/dc7ad9990388eb9271caa698cbebf7b9cf5cbcb6))
* unit tests failures related to useDebounce ([#1110](https://github.com/graasp/client/issues/1110)) ([2d96fb5](https://github.com/graasp/client/commit/2d96fb5306fe62c71e845e7a4d4dc452dff7bddf))

## [2.31.1](https://github.com/graasp/client/compare/v2.31.0...v2.31.1) (2025-09-09)


### Bug Fixes

* disable useChildren tests ([#1105](https://github.com/graasp/client/issues/1105)) ([6c05f3c](https://github.com/graasp/client/commit/6c05f3cc392cf4d4a9a43f2ec457529bcd0e5f82))

## [2.31.0](https://github.com/graasp/client/compare/v2.30.0...v2.31.0) (2025-09-08)


### Features

* add alert warnings for page feature and translations ([#1099](https://github.com/graasp/client/issues/1099)) ([950ba23](https://github.com/graasp/client/commit/950ba231836580338f8b3794d70023721014c075))
* show pages in player ([#1102](https://github.com/graasp/client/issues/1102)) ([4d683b9](https://github.com/graasp/client/commit/4d683b933a79489f2ff1bdb8bf4ab937031b9062))


### Bug Fixes

* guests can not change their language ([#1071](https://github.com/graasp/client/issues/1071)) ([b28fad1](https://github.com/graasp/client/commit/b28fad13afa3d0a214009c1cd2d7263df57d5996))
* remove `waitForMutation` and use `await expect(...).rejects.toThrow()` on throwing mutations ([#1086](https://github.com/graasp/client/issues/1086)) ([c77e7df](https://github.com/graasp/client/commit/c77e7df7c336306ccd520405f2b445b59e65a467))
* set default state as null for ws ([#1103](https://github.com/graasp/client/issues/1103)) ([8ee960f](https://github.com/graasp/client/commit/8ee960f4a96a63e836dd0f6dcb50cad9477b6a3c))

## [2.30.0](https://github.com/graasp/client/compare/v2.29.0...v2.30.0) (2025-09-05)


### Features

* add link in pages with menu on click ([#1091](https://github.com/graasp/client/issues/1091)) ([7214983](https://github.com/graasp/client/commit/72149833132bda4d76242cbf5c60edba6af038c2))
* allow creating pages only inside folders ([#1093](https://github.com/graasp/client/issues/1093)) ([87e6404](https://github.com/graasp/client/commit/87e6404f63718b0833ab1962e6420b6b8fecae55))


### Bug Fixes

* **deps:** update mui (non-major) to v7.3.2 ([#1088](https://github.com/graasp/client/issues/1088)) ([3913a2a](https://github.com/graasp/client/commit/3913a2a90964734a9ede78a2f83a8d1fcd33285d))
* use thumbnail column for app list ([#1092](https://github.com/graasp/client/issues/1092)) ([90f3a48](https://github.com/graasp/client/commit/90f3a482a542c7e032fc605271b942dd2853c68d))

## [2.29.0](https://github.com/graasp/client/compare/v2.28.0...v2.29.0) (2025-08-28)


### Features

* add copy in item page menu ([#1085](https://github.com/graasp/client/issues/1085)) ([3d73fb6](https://github.com/graasp/client/commit/3d73fb6fe4b7a4794262257ad4e3321dec935f8b))
* add font family ([#1080](https://github.com/graasp/client/issues/1080)) ([b0531f2](https://github.com/graasp/client/commit/b0531f27eccf1550a834e00a925f3093de73a486))
* add page font size tool ([#1079](https://github.com/graasp/client/issues/1079)) ([937f75a](https://github.com/graasp/client/commit/937f75a570af211de0d176e6eb29edb7b1c51e49))
* add read view for pages ([#1074](https://github.com/graasp/client/issues/1074)) ([62b4b32](https://github.com/graasp/client/commit/62b4b3265393980a3492c664f6d0cc1aab320ee1))
* create page for rich page editor, hidden button in create folder ([#1046](https://github.com/graasp/client/issues/1046)) ([f18783c](https://github.com/graasp/client/commit/f18783cd7b4051c0f19e579174467a324505d29a))
* improve toolbar ui ([#1076](https://github.com/graasp/client/issues/1076)) ([2439ed7](https://github.com/graasp/client/commit/2439ed71946024b0c87a96c369c24b8b36dc0d6d))
* setup collaboration with yjs for pages ([#1054](https://github.com/graasp/client/issues/1054)) ([7bac9eb](https://github.com/graasp/client/commit/7bac9eb9b0b65dbed6bc90593868bbe949eabf63))


### Bug Fixes

* add catch for message parsing errors from apps ([#1047](https://github.com/graasp/client/issues/1047)) ([50332b5](https://github.com/graasp/client/commit/50332b596114b1c3f5f0d8743817da0728d2d234))
* improve builder folder header section ([#1057](https://github.com/graasp/client/issues/1057)) ([58986f6](https://github.com/graasp/client/commit/58986f63663390325a9422501c26857e258ff034))
* notify users when the description is too long ([#1051](https://github.com/graasp/client/issues/1051)) ([06b52ac](https://github.com/graasp/client/commit/06b52ac23c95aea293c73d2c6bf7f1a342362e8f))
* **page:** timeout connection attempts if disconnections are repeated ([#1081](https://github.com/graasp/client/issues/1081)) ([93da9a0](https://github.com/graasp/client/commit/93da9a01859bc185af75bd522a6004c352126c56))
* use english mames for builder, player, analytics ([#1064](https://github.com/graasp/client/issues/1064)) ([f6b1008](https://github.com/graasp/client/commit/f6b1008a0cededdf37d8737ff9c89c4eccc5051a))
* use env vars for ws host ([#1072](https://github.com/graasp/client/issues/1072)) ([9e8d1a7](https://github.com/graasp/client/commit/9e8d1a79e53082845a8bba8a34b74b36a706b6e3))

## [2.28.0](https://github.com/graasp/client/compare/v2.27.1...v2.28.0) (2025-07-22)


### Features

* use generation for sign up, sign in and password login ([#1042](https://github.com/graasp/client/issues/1042)) ([6832771](https://github.com/graasp/client/commit/68327718d44c731802368b98bcdef2d27685e194))

## [2.27.1](https://github.com/graasp/client/compare/v2.27.0...v2.27.1) (2025-07-04)


### Bug Fixes

* add missing storybook/addon-docs for MDX content ([#1038](https://github.com/graasp/client/issues/1038)) ([184c944](https://github.com/graasp/client/commit/184c9444c536792f479d2b4cbec186f4b1b8e69d))
* **ci:** merge deploy workflows into single one ([#1034](https://github.com/graasp/client/issues/1034)) ([3ba08f9](https://github.com/graasp/client/commit/3ba08f9622a25efa27a51508fd9a56b907e75023))
* **deps:** update dependency @sentry/react to v9.34.0 ([#1036](https://github.com/graasp/client/issues/1036)) ([b9350af](https://github.com/graasp/client/commit/b9350af4e7acdf6467434fda3757fa77a15a6abe))
* **deps:** update mui (non-major) to v7.2.0 ([#1037](https://github.com/graasp/client/issues/1037)) ([a29d350](https://github.com/graasp/client/commit/a29d35031414da8c189d9fc79608dcdc1b5324a4))
* move sentry org to vars ([c2145d7](https://github.com/graasp/client/commit/c2145d717158c77a268f93c1586571872d7b4eb0))
* pnpm version in storybook deploy workflow ([#1040](https://github.com/graasp/client/issues/1040)) ([f7535bf](https://github.com/graasp/client/commit/f7535bf4f1f66f38000f4cec3c577da095cd35db))

## [2.27.0](https://github.com/graasp/client/compare/v2.26.2...v2.27.0) (2025-06-26)


### Features

* update french translations ([#1019](https://github.com/graasp/client/issues/1019)) ([8f2a930](https://github.com/graasp/client/commit/8f2a930b6302e3aff0b9701a30b18e448a70d019))


### Bug Fixes

* **deps:** update dependency @sentry/react to v9.31.0 ([#1006](https://github.com/graasp/client/issues/1006)) ([bb0d26a](https://github.com/graasp/client/commit/bb0d26acea95e9b86d21d296374d8dd1cacee5d6))
* **german:** update translations ([#1033](https://github.com/graasp/client/issues/1033)) ([1cbc8bf](https://github.com/graasp/client/commit/1cbc8bf7f0308c8ee24c3668a0d2915cbc3e1fb4))
* handle max height message from apps ([#1010](https://github.com/graasp/client/issues/1010)) ([5007703](https://github.com/graasp/client/commit/50077034cc5d9fb2a82c25b379e2763299b76075))
* make login button color white on app header ([#1014](https://github.com/graasp/client/issues/1014)) ([55c75e1](https://github.com/graasp/client/commit/55c75e18c1249cb341a2fd2a50d56bd89b9e55bf))
* migrate hey-api to remove `@hey-api/client-fetch` package ([#1029](https://github.com/graasp/client/issues/1029)) ([4a3d3be](https://github.com/graasp/client/commit/4a3d3befb968b9bc45838a79c0dd61d7d2326f88))
* **mui:** migrate to v7 ([#1028](https://github.com/graasp/client/issues/1028)) ([70dacec](https://github.com/graasp/client/commit/70dacec3eee38eb453efbf4d847f73a10192929d))
* upgrade happy-dom to fix issues with query tests ([#1030](https://github.com/graasp/client/issues/1030)) ([5c0382b](https://github.com/graasp/client/commit/5c0382b7a631ddc5c51b17cc50628a582728ba23))

## [2.26.2](https://github.com/graasp/client/compare/v2.26.1...v2.26.2) (2025-06-16)


### Bug Fixes

* do not use stream.data to download, manual generation fix ([#1012](https://github.com/graasp/client/issues/1012)) ([4afabf8](https://github.com/graasp/client/commit/4afabf88625ea67d9f1660b01770a1d9c6133cda))

## [2.26.1](https://github.com/graasp/client/compare/v2.26.0...v2.26.1) (2025-06-12)


### Bug Fixes

* recaptcha ([9461371](https://github.com/graasp/client/commit/9461371278b70cf425a6321d168766b70d3e40e5))

## [2.26.0](https://github.com/graasp/client/compare/v2.25.2...v2.26.0) (2025-06-04)


### Features

* complete contact page ([#997](https://github.com/graasp/client/issues/997)) ([a7e3db6](https://github.com/graasp/client/commit/a7e3db66eaeee75daf4acc16435f132eb1b56483))
* show download zip for folders, download file for non-folders ([#1002](https://github.com/graasp/client/issues/1002)) ([e974ef8](https://github.com/graasp/client/commit/e974ef87fb0da8f4e768862f932e3ed7b87f9da7))


### Bug Fixes

* add docker deploy ([#1000](https://github.com/graasp/client/issues/1000)) ([b8a9ff2](https://github.com/graasp/client/commit/b8a9ff21091e7e56f7473f735ac5485a78033329))
* add the contact information to the maintenance banner ([#996](https://github.com/graasp/client/issues/996)) ([e895367](https://github.com/graasp/client/commit/e8953677653489c254bb87739ab6d4e60c5a4caf))
* change membership related hooks and mutations ([#999](https://github.com/graasp/client/issues/999)) ([0c9a12b](https://github.com/graasp/client/commit/0c9a12b8d2ce91ca55ad3fbffb2860aaa1042c54))
* **deps:** update dependency @hey-api/client-fetch to v0.7.3 ([#948](https://github.com/graasp/client/issues/948)) ([3393444](https://github.com/graasp/client/commit/3393444066c8bc5ab716a54ee04e6d1497274321))
* **deps:** update dependency @tanstack/react-query to v5.66.11 ([#967](https://github.com/graasp/client/issues/967)) ([4f85fd6](https://github.com/graasp/client/commit/4f85fd646668bb277b4ae623d49b676d3943c6a7))
* **deps:** update dependency axios to v1.8.4 ([#988](https://github.com/graasp/client/issues/988)) ([8637920](https://github.com/graasp/client/commit/8637920d3256bdf1b244c7a6c872812e6dfe3f43))
* remove unused material ui import ([faf1198](https://github.com/graasp/client/commit/faf1198c6c392daa34452525288117a9d01ff44a))
* show error notifications on file upload ([#995](https://github.com/graasp/client/issues/995)) ([18cac92](https://github.com/graasp/client/commit/18cac92ae3da8d851b1c70f343c825eb4ba0e88e))
* update for new sdk version ([#993](https://github.com/graasp/client/issues/993)) ([0b2b894](https://github.com/graasp/client/commit/0b2b8949bb3aadbbde243a0ed6316230c0bcbd24))

## [2.25.2](https://github.com/graasp/client/compare/v2.25.1...v2.25.2) (2025-05-05)


### Bug Fixes

* **deps:** update dependency @sentry/react to v9.15.0 ([#951](https://github.com/graasp/client/issues/951)) ([a9de33b](https://github.com/graasp/client/commit/a9de33bab048861219d69d14fab4986b2632bb93))

## [2.25.1](https://github.com/graasp/client/compare/v2.25.0...v2.25.1) (2025-05-02)


### Bug Fixes

* **deps:** remove validator dep ([#983](https://github.com/graasp/client/issues/983)) ([ab142de](https://github.com/graasp/client/commit/ab142defe95cec295672e2f5b6c23db3f6f2938e))
* **deps:** update dependency i18next to v24.2.3 ([#989](https://github.com/graasp/client/issues/989)) ([30cc541](https://github.com/graasp/client/commit/30cc54172f63bef2452ccda23ab3ec37fa8eb5e1))
* fix copy name title ([#991](https://github.com/graasp/client/issues/991)) ([4294317](https://github.com/graasp/client/commit/4294317bec878950f67979b502e21c998d91a56a))

## [2.25.0](https://github.com/graasp/client/compare/v2.24.0...v2.25.0) (2025-04-30)


### Features

* display maintenance announcement ([#984](https://github.com/graasp/client/issues/984)) ([f046d16](https://github.com/graasp/client/commit/f046d169a2e14fae606c0a23be841446fccb00ea))

## [2.24.0](https://github.com/graasp/client/compare/v2.23.2...v2.24.0) (2025-04-29)


### Features

* add download action in item menu ([#979](https://github.com/graasp/client/issues/979)) ([21634b9](https://github.com/graasp/client/commit/21634b94e7881eca12d7bb3a1057190d69ff925c))
* allow to delete bookmarks on home ([#953](https://github.com/graasp/client/issues/953)) ([acf0db4](https://github.com/graasp/client/commit/acf0db4f7dc8b1ce08e28224521828be6fff6b39))
* update recycle ws invalidation ([#978](https://github.com/graasp/client/issues/978)) ([4c1b8db](https://github.com/graasp/client/commit/4c1b8db5d12afdbf03d2cad47fb12fe080208b45))


### Bug Fixes

* fix and add missing translations for member action legends ([#976](https://github.com/graasp/client/issues/976)) ([c9e1bd1](https://github.com/graasp/client/commit/c9e1bd123ad76e64ba223f72f448280286dd85b4))
* update documentation on how to run the app ([#981](https://github.com/graasp/client/issues/981)) ([cf13374](https://github.com/graasp/client/commit/cf133740ced7406ec5dedece52d6ee8212d1ce39))

## [2.23.2](https://github.com/graasp/client/compare/v2.23.1...v2.23.2) (2025-04-24)


### Bug Fixes

* display correctly missing weekdays ([#974](https://github.com/graasp/client/issues/974)) ([9b0c82f](https://github.com/graasp/client/commit/9b0c82f0f824bb1104e3343ca6412080b10df772))

## [2.23.1](https://github.com/graasp/client/compare/v2.23.0...v2.23.1) (2025-04-23)


### Bug Fixes

* fix delete item login schema update, notification modal ([#970](https://github.com/graasp/client/issues/970)) ([280f005](https://github.com/graasp/client/commit/280f0056125ef29e27b99bfb66d318ab2eb95182))

## [2.23.0](https://github.com/graasp/client/compare/v2.22.0...v2.23.0) (2025-04-17)


### Features

* apply adaptations for changes to drizzle ([#968](https://github.com/graasp/client/issues/968)) ([bd77e77](https://github.com/graasp/client/commit/bd77e77d4e3cdbe5e1fe2cfe48092d20ca45af91))


### Bug Fixes

* **deps:** update dependency axios to v1.8.2 [security] ([#961](https://github.com/graasp/client/issues/961)) ([7cbe41e](https://github.com/graasp/client/commit/7cbe41ec440929a995b79e7d4ab8639b584ef43e))
* show inline notifications for public profile ([#952](https://github.com/graasp/client/issues/952)) ([867e558](https://github.com/graasp/client/commit/867e5586cb4c13af68c47c76aef8fbcee0fd0102))
* use language query string when present ([#962](https://github.com/graasp/client/issues/962)) ([4db0dc9](https://github.com/graasp/client/commit/4db0dc995efb0c1e81b42ec5dda11e0f26f4fbce))

## [2.22.0](https://github.com/graasp/client/compare/v2.21.0...v2.22.0) (2025-03-04)


### Features

* add setting to allow reader to edit etherpad ([#946](https://github.com/graasp/client/issues/946)) ([b9a745c](https://github.com/graasp/client/commit/b9a745cfeeb3003029759c525d0d474507a46a7d))
* allow to edit link url ([#932](https://github.com/graasp/client/issues/932)) ([06c6866](https://github.com/graasp/client/commit/06c68667375449ec8da89f3e71f4bc8b450ec866))


### Bug Fixes

* redirect builder to home ([#958](https://github.com/graasp/client/issues/958)) ([4265a7d](https://github.com/graasp/client/commit/4265a7dbd3174343664e91d246f3ee9e6e5582b2))
* use update password generation to fix translation ([#940](https://github.com/graasp/client/issues/940)) ([e4b0e71](https://github.com/graasp/client/commit/e4b0e719fed077fce2d8aa8b6500db6ab133e579))

## [2.21.0](https://github.com/graasp/client/compare/v2.20.0...v2.21.0) (2025-02-28)


### Features

* add tutorial links in dropzone ([#945](https://github.com/graasp/client/issues/945)) ([07480ac](https://github.com/graasp/client/commit/07480ac9c1118e642b036305dae79aa7b88b6599))
* remove add new item on home page ([#943](https://github.com/graasp/client/issues/943)) ([50b2449](https://github.com/graasp/client/commit/50b24498e6fd72ce4524184c4907f28aa34852e2))
* use export member data generation, remove notification ([#941](https://github.com/graasp/client/issues/941)) ([1fbdc3c](https://github.com/graasp/client/commit/1fbdc3cf94879ee67eac9724eb27155c35a07770))
* use library for published tab ([#944](https://github.com/graasp/client/issues/944)) ([fdf5cf6](https://github.com/graasp/client/commit/fdf5cf61a8469f7b50b670c4571854121c77731a))

## [2.20.0](https://github.com/graasp/client/compare/v2.19.6...v2.20.0) (2025-02-19)


### Features

* add accessible items on home page ([#853](https://github.com/graasp/client/issues/853)) ([fcb0fd4](https://github.com/graasp/client/commit/fcb0fd47362feb6b780aa7db4d8b56e3ced265e5))
* add bookmarks in home ([#871](https://github.com/graasp/client/issues/871)) ([da3e3ce](https://github.com/graasp/client/commit/da3e3ce3e21e62052d8dbc04ade2a728bb6977b0))
* add generated client api ([a70eafb](https://github.com/graasp/client/commit/a70eafb930213542d481d6c5073a59b96a8ba7ed))
* add menu tabs, remove drawer from home ([#855](https://github.com/graasp/client/issues/855)) ([c371c19](https://github.com/graasp/client/commit/c371c190fa818fa4059b43d4d7d9083610184f63))
* add new supporters and refactor to add links to project websites ([#913](https://github.com/graasp/client/issues/913)) ([6294db9](https://github.com/graasp/client/commit/6294db9805d12132dd25e8ea31d3092b3cd128c9))
* add settings in member drop down ([#844](https://github.com/graasp/client/issues/844)) ([633a892](https://github.com/graasp/client/commit/633a89204cc6a4318bb7c256f33a1b1f28edae7b))
* add storage in account ([#909](https://github.com/graasp/client/issues/909)) ([9ad9711](https://github.com/graasp/client/commit/9ad971117959be67a0964132c5cad9d29f4b6f7a))
* improve popup user menu ([#906](https://github.com/graasp/client/issues/906)) ([ae2ae6e](https://github.com/graasp/client/commit/ae2ae6ee1cae05af38e82ef90363ad9b96907740))
* move home button to top, remove unused showNavigation prop ([#937](https://github.com/graasp/client/issues/937)) ([5d9de60](https://github.com/graasp/client/commit/5d9de6029774d1d2845cac7a7da5354feda2ca8c))
* move member welcome card in settings ([#875](https://github.com/graasp/client/issues/875)) ([389bb88](https://github.com/graasp/client/commit/389bb88ff21e4a0bfcec85d90df3d938537d87c5))
* move tutorials in user drop down, add return home button ([3aa58b9](https://github.com/graasp/client/commit/3aa58b95c5e7e5869c69ea6026aa205a8caf6f60))
* show item tree navigation in builder ([c34f80e](https://github.com/graasp/client/commit/c34f80eb02bf061f5bf1d971a9df29ea450d57b6))
* update sdk, use max width lg ([#915](https://github.com/graasp/client/issues/915)) ([b77f2f0](https://github.com/graasp/client/commit/b77f2f09cf1f676f6c70a921719daa7942d3c756))


### Bug Fixes

* add home page and translation for page titles in common ([#839](https://github.com/graasp/client/issues/839)) ([f708512](https://github.com/graasp/client/commit/f70851228c24a4cec3127cca665f0276e307eaba))
* add limit on bookmarks shown ([#916](https://github.com/graasp/client/issues/916)) ([1cfa568](https://github.com/graasp/client/commit/1cfa5680986350a7529dc2d4822ea27d16c75e7f))
* add query-client into client ([4bc9379](https://github.com/graasp/client/commit/4bc9379df7372a56eb42ffa08a30aa3f6c0ead1c))
* add scroll restoration in player ([a265db8](https://github.com/graasp/client/commit/a265db883e1567ac3a34da330af13fabf1fbe17c))
* add umami data on bookmark card ([#924](https://github.com/graasp/client/issues/924)) ([5d7a914](https://github.com/graasp/client/commit/5d7a914c9cdb8102528ddbbfeb85fcdea1e578dc))
* app resizing issue ([#939](https://github.com/graasp/client/issues/939)) ([bb757da](https://github.com/graasp/client/commit/bb757da0a9350e45ace3043ea6a4adfd10120ed2))
* change profile to home in user menu popup ([#918](https://github.com/graasp/client/issues/918)) ([fd248b7](https://github.com/graasp/client/commit/fd248b74308cd66e2599e60ec8405816d15f4217))
* **deps:** update dependency leaflet-geosearch to v4.2.0 ([#860](https://github.com/graasp/client/issues/860)) ([d452a4a](https://github.com/graasp/client/commit/d452a4a94323405d2d652e09a7f3907e96644102))
* **deps:** update dependency lucide-react to v0.475.0 ([#859](https://github.com/graasp/client/issues/859)) ([c671777](https://github.com/graasp/client/commit/c6717779e83f4a25e5c2204704152b64a588b017))
* **deps:** update deps ([3e99bb3](https://github.com/graasp/client/commit/3e99bb3d06fc4e3c17ad7d0e8492020e84ebaf0c))
* **deps:** update tanstack-router monorepo to v1.102.1 ([#861](https://github.com/graasp/client/issues/861)) ([d355fb3](https://github.com/graasp/client/commit/d355fb3fa57c04083bc75c2b85a1e32510dba8a0))
* **deps:** update tanstack-router monorepo to v1.99.8 ([#771](https://github.com/graasp/client/issues/771)) ([5608309](https://github.com/graasp/client/commit/56083091259846a467dbc13d6f266add66cf7d9a))
* do not allow membership request for hidden items ([d78b483](https://github.com/graasp/client/commit/d78b483af0697aaece3b76b114fc6acadd2ca68b))
* fix tutoiement in french translations, inclusive texts ([#869](https://github.com/graasp/client/issues/869)) ([7a63609](https://github.com/graasp/client/commit/7a6360917b5353ee926c54607693a324c186b9f3))
* **french:** change some translations ([#926](https://github.com/graasp/client/issues/926)) ([126e597](https://github.com/graasp/client/commit/126e5971d02f835bec0a9a32bea2b189d11dc451))
* **french:** update translations ([#917](https://github.com/graasp/client/issues/917)) ([6edbfa1](https://github.com/graasp/client/commit/6edbfa1e3c3f6b52b4ef3c4979d2c27bd696aaeb))
* link description ([#769](https://github.com/graasp/client/issues/769)) ([73b0863](https://github.com/graasp/client/commit/73b0863230bd48651ee58555dd51bac8e458ee9c))
* make nested pages for home ([#920](https://github.com/graasp/client/issues/920)) ([ca022bb](https://github.com/graasp/client/commit/ca022bb84d4e6999e92901e8309e80a5549f2c0a))
* mention link styling ([#907](https://github.com/graasp/client/issues/907)) ([b8577a4](https://github.com/graasp/client/commit/b8577a49231e88bef620637e842a88997fa64ef9))
* new item modal archive display ([#911](https://github.com/graasp/client/issues/911)) ([0375a04](https://github.com/graasp/client/commit/0375a04fcd9d85edd5e48b1242970b41c59e5c04))
* notifications and login errors ([#927](https://github.com/graasp/client/issues/927)) ([60c34b8](https://github.com/graasp/client/commit/60c34b85c06327f213f09704c37af255537aa6ec))
* overflow issue in new item modal ([7654a2b](https://github.com/graasp/client/commit/7654a2b00e2ce1fa932ce014b93ca886c1899ae3))
* query-client tests ([dfc639b](https://github.com/graasp/client/commit/dfc639b99cc4866da0a821d6926e8aa93d4f5c5a))
* refactor menuTabs to use tsr link ([#919](https://github.com/graasp/client/issues/919)) ([0573eea](https://github.com/graasp/client/commit/0573eea5e9bbccedcde050d874ac4d320f921ed9))
* remove unused deps and optimize package usage ([#866](https://github.com/graasp/client/issues/866)) ([0b06b43](https://github.com/graasp/client/commit/0b06b43e2365c50f0a438bbebf889250a2e9671d))
* remove view modes in home ([ca022bb](https://github.com/graasp/client/commit/ca022bb84d4e6999e92901e8309e80a5549f2c0a))
* simplify query-client ([#857](https://github.com/graasp/client/issues/857)) ([f898211](https://github.com/graasp/client/commit/f8982113fd16d2ee62b00ca9cfe059098a30b8d3))
* simplify ws config in query client, define a ws client for prod ([#938](https://github.com/graasp/client/issues/938)) ([d506223](https://github.com/graasp/client/commit/d5062234d4177c35083d4d257cbad929e7730d60))
* sonar-cloud issues in MessageBody ([#903](https://github.com/graasp/client/issues/903)) ([41b46a0](https://github.com/graasp/client/commit/41b46a0a4eec8f1632d60cc5b31b42c381b7420f))
* update dependencies ([#876](https://github.com/graasp/client/issues/876)) ([fb21ee4](https://github.com/graasp/client/commit/fb21ee48d81682c65c2ca1bca2c8016c2422490d))
* update validation for text on description change ([9516e9d](https://github.com/graasp/client/commit/9516e9da00ce4d3249a14385c90c7ab74be7e2d8))
* use umami in onclick event for bookmark cards ([21f0d0c](https://github.com/graasp/client/commit/21f0d0c6bda3393fd2870f5813f60f0d55a1b756))

## [2.19.6](https://github.com/graasp/client/compare/v2.19.5...v2.19.6) (2025-02-05)


### Bug Fixes

* add sentry release upload step in deploy workflows ([e4c05b4](https://github.com/graasp/client/commit/e4c05b4eab982b41198d6995f5818be56f0bcd9d))
* add sentry session for Release Health reporting ([#818](https://github.com/graasp/client/issues/818)) ([7e43759](https://github.com/graasp/client/commit/7e43759417dcb60ee932cd2979fd1a208be92494))
* country selection ([#803](https://github.com/graasp/client/issues/803)) ([bdf0cb1](https://github.com/graasp/client/commit/bdf0cb177d0d6f2f346ee081e2683e8c7e2c545c))
* **deps:** update dependency @graasp/sdk to v5.8.0 ([#827](https://github.com/graasp/client/issues/827)) ([bce8c57](https://github.com/graasp/client/commit/bce8c578efbd57a628402f143481103bd961b034))
* **deps:** update dependency @sentry/react to v8.54.0 ([#816](https://github.com/graasp/client/issues/816)) ([79413f9](https://github.com/graasp/client/commit/79413f90589d9f70ef18e5766fb0e02da9859660))
* **deps:** update mui (non-major) ([#466](https://github.com/graasp/client/issues/466)) ([3666c22](https://github.com/graasp/client/commit/3666c220f3c9f7789e16b694456ec68d1b78dce0))
* **deps:** update tanstack-router monorepo to v1.99.0 ([#820](https://github.com/graasp/client/issues/820)) ([c9cc509](https://github.com/graasp/client/commit/c9cc50984457352904216e90a05630635ccb97ed))
* flicker caused by suspense when loading translations ([#823](https://github.com/graasp/client/issues/823)) ([f12ea12](https://github.com/graasp/client/commit/f12ea12fdfe49c6223b2f64716833da5ceb1a99a))
* logo on safari ([#825](https://github.com/graasp/client/issues/825)) ([9a0a4cd](https://github.com/graasp/client/commit/9a0a4cdd0e3c867f8a15c5a3e8bf8be921d4ec26))
* remove duplicated crop modal code ([#822](https://github.com/graasp/client/issues/822)) ([935e9f0](https://github.com/graasp/client/commit/935e9f00888e28e46397bb4c676d14490f0994b7))
* remove mock content from faq ([#808](https://github.com/graasp/client/issues/808)) ([447e485](https://github.com/graasp/client/commit/447e4851dfb5eeaaae3f76694ed0146955ffce5c))
* update the user profile link in userswitch ([#829](https://github.com/graasp/client/issues/829)) ([474e6c1](https://github.com/graasp/client/commit/474e6c1b02e53692a304653b56f5a5028acefed1))
* use sha and version instead ([c49a2a1](https://github.com/graasp/client/commit/c49a2a1b066c9b839f691244a8f75c20d5356622))

## [2.19.5](https://github.com/graasp/client/compare/v2.19.4...v2.19.5) (2025-01-31)


### Bug Fixes

* add missing env var for go links ([#810](https://github.com/graasp/client/issues/810)) ([3b3b55e](https://github.com/graasp/client/commit/3b3b55ecb950b66ecd4aad5441247e95c3ff976e))

## [2.19.4](https://github.com/graasp/client/compare/v2.19.3...v2.19.4) (2025-01-30)


### Bug Fixes

* favicon ([027e9a5](https://github.com/graasp/client/commit/027e9a54226cb34cff6420c0b5aeb4690ab19d21))
* get started button directs to Builder view ([f39ab9a](https://github.com/graasp/client/commit/f39ab9ad4501a862caf0eaff29af3a27ee478963))
* html title ([3869548](https://github.com/graasp/client/commit/3869548c8a3f35edd946e519a0375b749267c6cc))

## [2.19.3](https://github.com/graasp/client/compare/v2.19.2...v2.19.3) (2025-01-30)


### Bug Fixes

* navigation buttons issues ([#798](https://github.com/graasp/client/issues/798)) ([9ac9d92](https://github.com/graasp/client/commit/9ac9d92e0604b31798e526fd78ea48ebba4bdba5))
* width of container grid for apps in analytics ([#802](https://github.com/graasp/client/issues/802)) ([e072484](https://github.com/graasp/client/commit/e072484200231a2912ce5a8cbd064a3849a8d3d6))

## [2.19.2](https://github.com/graasp/client/compare/v2.19.1...v2.19.2) (2025-01-29)


### Bug Fixes

* add spanish builder ([7fc36a2](https://github.com/graasp/client/commit/7fc36a2b4e58e99f04af6e6b497ab79396c8e450))
* analytics navigator arrow is miss-aligned ([#741](https://github.com/graasp/client/issues/741)) ([2d77e45](https://github.com/graasp/client/commit/2d77e452fca748c979f42b1067b34146db78ab36))
* **arabic:** update translations ([#779](https://github.com/graasp/client/issues/779)) ([b3ae3ef](https://github.com/graasp/client/commit/b3ae3ef5bdb18ba3e23508029189e354c7543ba7))
* chatbox container ([#729](https://github.com/graasp/client/issues/729)) ([a75f4c3](https://github.com/graasp/client/commit/a75f4c3fd9e9ba589e475cae29a1d41c011f722f))
* chatbox with translations and other improvements ([784936f](https://github.com/graasp/client/commit/784936f3aa0e6578d09aa099633e8a0f23ecce5f))
* default to builder when user is already authenticated ([#763](https://github.com/graasp/client/issues/763)) ([af5ae6b](https://github.com/graasp/client/commit/af5ae6bfaaa3fe83d9ea0f654d4ea1566ff3c81b))
* deployment workflows ([e5d338f](https://github.com/graasp/client/commit/e5d338fbc145feaecc5daeb974794047ad98a95e))
* **deps:** update dependency @sentry/react to v8.52.0 ([#608](https://github.com/graasp/client/issues/608)) ([43b8b84](https://github.com/graasp/client/commit/43b8b84e5d514ac501e7a3baca883f2b961c265d))
* **deps:** update dependency @tanstack/react-query to v5.65.1 ([#757](https://github.com/graasp/client/issues/757)) ([0abeffb](https://github.com/graasp/client/commit/0abeffb62758359a64af6ee9cad16a0fab80803f))
* **deps:** update dependency i18next to v24.2.2 ([#745](https://github.com/graasp/client/issues/745)) ([8f83540](https://github.com/graasp/client/commit/8f83540370066ad9e606d174c3c45cd77156c756))
* **deps:** update dependency lucide-react to v0.474.0 ([#738](https://github.com/graasp/client/issues/738)) ([40113a3](https://github.com/graasp/client/commit/40113a3451ddfe68b7bacd1fb4ead7eb143aa9fc))
* **deps:** update dependency papaparse to v5.5.2 ([#762](https://github.com/graasp/client/issues/762)) ([6c120c3](https://github.com/graasp/client/commit/6c120c3c84357e7f0bc87979a77d01f881b68610))
* **deps:** update dependency react-accessible-treeview to v2.11.0 ([#758](https://github.com/graasp/client/issues/758)) ([a9bcdd4](https://github.com/graasp/client/commit/a9bcdd4bd27e381e72c184271ca38b5eee0fe15b))
* **deps:** update dependency recharts to v2.15.1 ([#759](https://github.com/graasp/client/issues/759)) ([b3fefe5](https://github.com/graasp/client/commit/b3fefe57a7fdcb04e8aae346c7b3f4fbc983a4b6))
* **deps:** update tanstack-router monorepo to v1.97.25 ([#585](https://github.com/graasp/client/issues/585)) ([123b4e4](https://github.com/graasp/client/commit/123b4e4f990c433d486f92e3a271ada02bd3272f))
* **deps:** update tanstack-router monorepo to v1.98.0 ([#496](https://github.com/graasp/client/issues/496)) ([f4a1b7c](https://github.com/graasp/client/commit/f4a1b7cb876a62fdf73d25c7dedc9e5b7c2a7654))
* disable navigation to player and analytics home from account ([#743](https://github.com/graasp/client/issues/743)) ([447e816](https://github.com/graasp/client/commit/447e816d31126b81155b26e7669134da0d34869d))
* **french:** update translations ([#737](https://github.com/graasp/client/issues/737)) ([3497fe3](https://github.com/graasp/client/commit/3497fe3332a94940bd66e58b1ba0097aa61ca7a4))
* **german:** update translations ([#765](https://github.com/graasp/client/issues/765)) ([1945e36](https://github.com/graasp/client/commit/1945e36c885969cee726834fda292129af52a4a3))
* h5p integration and require h5p env var in prod build ([#744](https://github.com/graasp/client/issues/744)) ([7319a34](https://github.com/graasp/client/commit/7319a346a98e58979e36f0816ccf072986493912))
* **italian:** update translations ([#778](https://github.com/graasp/client/issues/778)) ([592c586](https://github.com/graasp/client/commit/592c58649f3bdb7b00a71a125bd6a6f6e4976731))
* map responsive crash because context is not present ([#776](https://github.com/graasp/client/issues/776)) ([66c4754](https://github.com/graasp/client/commit/66c4754fbfce07124f6378764984e2ec26d899cf))
* map view ([#739](https://github.com/graasp/client/issues/739)) ([f289fd2](https://github.com/graasp/client/commit/f289fd206bc98e271bd17604a323bdf80f35ace6))
* modal titles ([4c2da02](https://github.com/graasp/client/commit/4c2da0278f0e5cf4ebff590077b343a66bb61dc0))
* modal titles ([#764](https://github.com/graasp/client/issues/764)) ([c8d1bc9](https://github.com/graasp/client/commit/c8d1bc9a248196df87812c140e666094cb35a307))
* public profile visibility not updating ([#740](https://github.com/graasp/client/issues/740)) ([11b9276](https://github.com/graasp/client/commit/11b92762a01cd819b655115d6fd36df8a3b5b876))
* re-order links on landing page ([8bcb000](https://github.com/graasp/client/commit/8bcb000cda22618df31a12a8ee0e01031180b23a))
* react 19 migration ([#747](https://github.com/graasp/client/issues/747)) ([f37ed27](https://github.com/graasp/client/commit/f37ed278deacae9e866beaa9c19ed683cb94c28f))
* shortcut and storybook build ([#751](https://github.com/graasp/client/issues/751)) ([79bc571](https://github.com/graasp/client/commit/79bc571c787a1240861b4cfb6297fe327a0eeaaf))
* **spanish:** update translations ([#777](https://github.com/graasp/client/issues/777)) ([9e74139](https://github.com/graasp/client/commit/9e741391532a4d92643d9f88b6ab5e8ac77c8ad1))
* tsc compilation time ([#756](https://github.com/graasp/client/issues/756)) ([69c6c18](https://github.com/graasp/client/commit/69c6c181726625b7232ae9f1bdad0dc6557eea8e))
* umami event on navigation cause full-page reload ([#742](https://github.com/graasp/client/issues/742)) ([0bc66f9](https://github.com/graasp/client/commit/0bc66f9f5cfe5519b7a4a95832a706f1de29a9e0))

## [2.19.1](https://github.com/graasp/client/compare/v2.19.0...v2.19.1) (2025-01-23)


### Bug Fixes

* add h5p integration url to env vars and deploy script ([dae246c](https://github.com/graasp/client/commit/dae246cf71130e24001bd5ddf94928910039b4a4))
* harmonize button to be imported from a single file ([#604](https://github.com/graasp/client/issues/604)) ([c50c409](https://github.com/graasp/client/commit/c50c4090b7f424403648ef59c7b0d2c2bd1ce356))
* player home ([#606](https://github.com/graasp/client/issues/606)) ([c866e5a](https://github.com/graasp/client/commit/c866e5a199fac54a7e693446931255d88fc5fa45))
* **tests:** cypress tests for builder ([#615](https://github.com/graasp/client/issues/615)) ([c632038](https://github.com/graasp/client/commit/c6320385db89f886dd15ea30a5cf860e1f235624))
* unit tests ([#725](https://github.com/graasp/client/issues/725)) ([aa6c670](https://github.com/graasp/client/commit/aa6c670b6f186ebc582f721e21d1d21c98620bfb))

## [2.19.0](https://github.com/graasp/client/compare/v2.18.0...v2.19.0) (2025-01-14)


### Features

* add navigator back in analytics ([#591](https://github.com/graasp/client/issues/591)) ([12f59b1](https://github.com/graasp/client/commit/12f59b185a223431bf1cc638bc383986f6c55bc8))
* analytics works ([3ef7fe8](https://github.com/graasp/client/commit/3ef7fe87f04bf340e5f92077398a926fb021b685))
* implement about us page ([#567](https://github.com/graasp/client/issues/567)) ([8555c61](https://github.com/graasp/client/commit/8555c61593baa03ade86a6fef7e0d3f8d6e740ad))
* implement tutorials page ([#569](https://github.com/graasp/client/issues/569)) ([7a0d4c7](https://github.com/graasp/client/commit/7a0d4c782404100d18c410d55f193440e039b29f))


### Bug Fixes

* add redirection page for login from legacy services ([#572](https://github.com/graasp/client/issues/572)) ([4f9754b](https://github.com/graasp/client/commit/4f9754b2ebd7ac9019a12c0379d19676e703b60b))
* add translations and rename umami script ([5ed782e](https://github.com/graasp/client/commit/5ed782eb0129f40272171bfa63ea4e58ae5f1959))
* analytics test ([#556](https://github.com/graasp/client/issues/556)) ([529d027](https://github.com/graasp/client/commit/529d02713517ceddf61c6cfc65883469987cd782))
* code smell ([#602](https://github.com/graasp/client/issues/602)) ([689f89e](https://github.com/graasp/client/commit/689f89e7040e51d75fa5d62d539b9b3f2399a40c))
* code smells ([#603](https://github.com/graasp/client/issues/603)) ([7298252](https://github.com/graasp/client/commit/7298252945bcccc1c061a89473120be8ca56caaf))
* **deps:** update dependency @graasp/query-client to v5.7.1 ([#592](https://github.com/graasp/client/issues/592)) ([502a780](https://github.com/graasp/client/commit/502a780aa303c2200375d0fbd48ceb76a3a50ddb))
* **deps:** update dependency @sentry/react to v8.48.0 ([#548](https://github.com/graasp/client/issues/548)) ([3a7c773](https://github.com/graasp/client/commit/3a7c77357f5751e2f7d34a4d222585e1c9770784))
* **deps:** update dependency @tanstack/react-query to v5.64.1 ([#601](https://github.com/graasp/client/issues/601)) ([23cdd3c](https://github.com/graasp/client/commit/23cdd3c750d26f8089b7e9bac3e6d68b8e666eea))
* **deps:** update dependency i18next to v24.1.2 ([#555](https://github.com/graasp/client/issues/555)) ([d7a445d](https://github.com/graasp/client/commit/d7a445d40108aea41e0285464f43c40fd1a77368))
* **deps:** update dependency lucide-react to v0.471.1 ([#589](https://github.com/graasp/client/issues/589)) ([959e286](https://github.com/graasp/client/commit/959e286bea51eac0a2b8ca4e7592f05fb063983e))
* **deps:** update dependency react-intersection-observer to v9.15.0 ([#550](https://github.com/graasp/client/issues/550)) ([efeef7a](https://github.com/graasp/client/commit/efeef7a36687a8d8d826a3722f9f096bb02e517b))
* **deps:** update dependency react-toastify to v11 ([#554](https://github.com/graasp/client/issues/554)) ([e8d5630](https://github.com/graasp/client/commit/e8d5630f075b5db93684f2645654d36831647939))
* **deps:** update dependency stylis to v4.3.5 ([#595](https://github.com/graasp/client/issues/595)) ([56404fb](https://github.com/graasp/client/commit/56404fbf4a9c4f7cd16fafeae6e14e75c24e8a85))
* **deps:** update graasp packages ([#588](https://github.com/graasp/client/issues/588)) ([c8d704e](https://github.com/graasp/client/commit/c8d704e1b1f3edaf0fc55eaf7619660c3221a97a))
* **french:** update translations ([#597](https://github.com/graasp/client/issues/597)) ([d2cfd48](https://github.com/graasp/client/commit/d2cfd483722f0c752b1f737bf2363843891d2cc3))
* **french:** update translations ([#605](https://github.com/graasp/client/issues/605)) ([87bf4e8](https://github.com/graasp/client/commit/87bf4e8fe427d9b8e3aad0abd25fbaee4841f4fa))
* issues with date-fns and cypress ([4862b65](https://github.com/graasp/client/commit/4862b65c6cb783c01740bbbf11bb5262f3fdfdc9))
* link props with tanstack router update ([#577](https://github.com/graasp/client/issues/577)) ([994eaab](https://github.com/graasp/client/commit/994eaab0ec6b0636433734dc177ce0771fcd35e3))
* make changes for the landing page ([#575](https://github.com/graasp/client/issues/575)) ([4f6aa3c](https://github.com/graasp/client/commit/4f6aa3c9209934c45b4cec8ab4636f71fc4cf0af))
* mui imports to first level ([#590](https://github.com/graasp/client/issues/590)) ([896be8b](https://github.com/graasp/client/commit/896be8b7d5725f252ec61653c517d9956fca45fa))
* platform switch in analytics ([#596](https://github.com/graasp/client/issues/596)) ([c4e2d61](https://github.com/graasp/client/commit/c4e2d6153aac9f47d3bd0ecc84d535194b8b40ac))
* social links to use react hook form ([#593](https://github.com/graasp/client/issues/593)) ([2ff1d4b](https://github.com/graasp/client/commit/2ff1d4baa223b3aab0eed355ff75302efc10549a))
* update analytics notice text ([#571](https://github.com/graasp/client/issues/571)) ([14ed3fe](https://github.com/graasp/client/commit/14ed3fe3fdda258613547692f846fedf6e2e161c))
* update landing page images with our own ([#570](https://github.com/graasp/client/issues/570)) ([d405814](https://github.com/graasp/client/commit/d4058147a44409003cbf675940aeaad53e244e85))

## [2.18.0](https://github.com/graasp/client/compare/v2.16.0...v2.18.0) (2024-12-13)


### Features

* add landing page ([#434](https://github.com/graasp/client/issues/434)) ([94bafb2](https://github.com/graasp/client/commit/94bafb2468f359073f57ae76023c056e98f07b71))
* add language detector ([#493](https://github.com/graasp/client/issues/493)) ([c623f4b](https://github.com/graasp/client/commit/c623f4b35bba7ce914fdbd0f9d60f0b2b07f4a14))
* add preview mode ([#533](https://github.com/graasp/client/issues/533)) ([7c401c1](https://github.com/graasp/client/commit/7c401c172e726938399542bb95f043407877e65a))
* add react-hook-form on register ([#474](https://github.com/graasp/client/issues/474)) ([9c54420](https://github.com/graasp/client/commit/9c54420ac74afddee7d42c8ca30f05f226e499ac))
* add terms, disclaimer and privacy policy pages ([#456](https://github.com/graasp/client/issues/456)) ([19f81cc](https://github.com/graasp/client/commit/19f81cc60a7c78c2e8b1c0521958e24634b3982b))
* feature page ([#525](https://github.com/graasp/client/issues/525)) ([280b626](https://github.com/graasp/client/commit/280b626206e046d38f00edbecef05c7190a188ce))
* **ui:** add Storybook ([#528](https://github.com/graasp/client/issues/528)) ([7b50cce](https://github.com/graasp/client/commit/7b50cce6a646242ca814161eba442570928ba89d))


### Bug Fixes

* add alias for modules import ([#430](https://github.com/graasp/client/issues/430)) ([3614581](https://github.com/graasp/client/commit/3614581c168a3b92f18cee7bcfbd65997341f352))
* add https to fixture url ([#530](https://github.com/graasp/client/issues/530)) ([d4c54df](https://github.com/graasp/client/commit/d4c54dfe5697245979b645db54c5324499a5a31e))
* add new formHeader for login and register ([#470](https://github.com/graasp/client/issues/470)) ([6411b88](https://github.com/graasp/client/commit/6411b88f787879add893b9838223a1afa8a6daf0))
* add permissions in ci ([e0b3380](https://github.com/graasp/client/commit/e0b338048cb959858a677e897cde19f8dbd9bfc4))
* add pre-connect directive via umami plugin ([#431](https://github.com/graasp/client/issues/431)) ([19f7a9c](https://github.com/graasp/client/commit/19f7a9ccae88bda8aebfe53db3f6d87f0c0b7cd3))
* add recaptcha env var ([d287925](https://github.com/graasp/client/commit/d287925f1ac6f292ec2b7b289759bda393793671))
* allow to specify the version to use ([7e523be](https://github.com/graasp/client/commit/7e523befc8a2f35c1f120d031aa8fc28c739dfda))
* build script ([9cf2d07](https://github.com/graasp/client/commit/9cf2d07013ffd67d56802b4c9b06f9ce3faffe4c))
* ci issues ([#542](https://github.com/graasp/client/issues/542)) ([bc66413](https://github.com/graasp/client/commit/bc6641381819d32a2455cd05549d7e6f55f47ba8))
* code smells ([b6e37f9](https://github.com/graasp/client/commit/b6e37f9dea913b4e55d33d3737e3d5b7b0e2a7a0))
* code smells ([#497](https://github.com/graasp/client/issues/497)) ([2408533](https://github.com/graasp/client/commit/2408533891bf6a9a8f4bb90d4ed57eec810f1869))
* **deps:** update dependency @mui/lab to v6.0.0-beta.16 ([#900](https://github.com/graasp/client/issues/900)) ([c7b18b5](https://github.com/graasp/client/commit/c7b18b51c080c7e13ca070d5716f5ea27ca50500))
* **deps:** update dependency @sentry/react to v8.40.0 ([#461](https://github.com/graasp/client/issues/461)) ([9ddbe6d](https://github.com/graasp/client/commit/9ddbe6da56af634eb702f6b98ac01d4be6cf5d35))
* **deps:** update dependency i18next to v24 ([#478](https://github.com/graasp/client/issues/478)) ([66d22ed](https://github.com/graasp/client/commit/66d22eda927c8a6c247df4187dba6d89d46766f6))
* **deps:** update dependency lucide-react to v0.460.0 ([#427](https://github.com/graasp/client/issues/427)) ([a088364](https://github.com/graasp/client/commit/a088364683b0b33ec54b986fd14ae6ff633ce037))
* **deps:** update dependency lucide-react to v0.460.0 ([#455](https://github.com/graasp/client/issues/455)) ([56506db](https://github.com/graasp/client/commit/56506db129e09843531236bc415de3b172136b0e))
* **deps:** update graasp packages ([#348](https://github.com/graasp/client/issues/348)) ([4a7657b](https://github.com/graasp/client/commit/4a7657b439a19549dcc14aa666bc93feac352eec))
* **deps:** update tanstack-router monorepo to v1.81.14 ([#449](https://github.com/graasp/client/issues/449)) ([b6a1dc2](https://github.com/graasp/client/commit/b6a1dc2f016e0c591a15a9173b52c75effce0bc0))
* **deps:** update tanstack-router monorepo to v1.81.9 ([#443](https://github.com/graasp/client/issues/443)) ([412d7d1](https://github.com/graasp/client/commit/412d7d126cbaf8ae7c8a6e6663b372b49cfa7089))
* **deps:** update tanstack-router monorepo to v1.82.1 ([#423](https://github.com/graasp/client/issues/423)) ([e55dde5](https://github.com/graasp/client/commit/e55dde589b14aed6496d6b79cf8e5b219f213519))
* **deps:** update tanstack-router monorepo to v1.82.8 ([#476](https://github.com/graasp/client/issues/476)) ([63b6b08](https://github.com/graasp/client/commit/63b6b08cfc6a60c4f5e5c80b0ad6dddc5117328a))
* **deps:** update tanstack-router monorepo to v1.87.9 ([#485](https://github.com/graasp/client/issues/485)) ([8a2382a](https://github.com/graasp/client/commit/8a2382a12953ab0e3e2312c10c0a62db5492db25))
* **french:** update translations ([#446](https://github.com/graasp/client/issues/446)) ([1b7a79a](https://github.com/graasp/client/commit/1b7a79a0dd35b04a173e192fed1067ecfa1a62a2))
* **french:** update translations ([#447](https://github.com/graasp/client/issues/447)) ([41b1037](https://github.com/graasp/client/commit/41b10379ead07bc2e7da2e5e8aedbdb90152c06e))
* **french:** update translations ([#457](https://github.com/graasp/client/issues/457)) ([d7160ed](https://github.com/graasp/client/commit/d7160ede27a58b76e9f046840e1bcbe61a03285e))
* **french:** update translations ([#479](https://github.com/graasp/client/issues/479)) ([76af9c2](https://github.com/graasp/client/commit/76af9c26f450d1e3207478f2d18abdfb416703c6))
* **french:** update translations ([#539](https://github.com/graasp/client/issues/539)) ([dcb75a9](https://github.com/graasp/client/commit/dcb75a9008047a6e2a0a758e73667362004d5b42))
* **german:** update translations ([#491](https://github.com/graasp/client/issues/491)) ([16843df](https://github.com/graasp/client/commit/16843df90705377b66c5ebed09965113cfc2faca))
* issues highlighted ([#498](https://github.com/graasp/client/issues/498)) ([db60716](https://github.com/graasp/client/commit/db60716d407e5d56e4c892ec129268db66e2f8a3))
* **italian:** update translations ([#490](https://github.com/graasp/client/issues/490)) ([542f51b](https://github.com/graasp/client/commit/542f51be70ba8e57df2480311ff8b2d34c23d79d))
* landing page with small adjustments ([#438](https://github.com/graasp/client/issues/438)) ([e0991ef](https://github.com/graasp/client/commit/e0991efae647deb8fc7ca9c67a024f2bb93882c3))
* make auth work in client ([bb840b3](https://github.com/graasp/client/commit/bb840b30bbf0a609922421d9b759a0411a4e8e7a))
* make integration work and fix tests ([6569ca1](https://github.com/graasp/client/commit/6569ca1801b90106cf5c693fb4bee110ae6ae2a7))
* make proxy work as expected ([#436](https://github.com/graasp/client/issues/436)) ([41883e8](https://github.com/graasp/client/commit/41883e8bc4125f6fd98e132442bf904a55b2e0d4))
* more code smells ([#522](https://github.com/graasp/client/issues/522)) ([eae2d87](https://github.com/graasp/client/commit/eae2d87456910d8329cd2f20a212042c042619cf))
* move recaptcha to auth layout so we do not track on all pages ([#460](https://github.com/graasp/client/issues/460)) ([0888ecb](https://github.com/graasp/client/commit/0888ecbd13841be88fe3b510c31ca00f2b0b6f20))
* preview updates ([#540](https://github.com/graasp/client/issues/540)) ([a5ba38a](https://github.com/graasp/client/commit/a5ba38ae4cad53ea68d69ac2ca24241fd823ba73))
* prod deployment ([2e46c28](https://github.com/graasp/client/commit/2e46c28564df1d139c53aa6d353a9554dedeba0c))
* readonly code smell ([6825a73](https://github.com/graasp/client/commit/6825a739f6e85387990f169b6827f5526d4c4d75))
* recaptcha script was not loaded in the html ([#448](https://github.com/graasp/client/issues/448)) ([6245fbe](https://github.com/graasp/client/commit/6245fbeee828a7e48c943a8299b45d063efdc930))
* remove code smells ([af9b08b](https://github.com/graasp/client/commit/af9b08b197098303fd1a78b9ce0788300cec6b80))
* remove display name ([#897](https://github.com/graasp/client/issues/897)) ([632a319](https://github.com/graasp/client/commit/632a319c0787a5116066dba8c87ec1fd35b6d8c9))
* reset-query-issue ([#520](https://github.com/graasp/client/issues/520)) ([6855f41](https://github.com/graasp/client/commit/6855f41c0d263aef64f8953577e83f037034f955))
* small fixes and scroll improvements ([712666b](https://github.com/graasp/client/commit/712666b106dd9c1c865a1621e392c5b41cdf4826))
* tests ([c6932ae](https://github.com/graasp/client/commit/c6932aec5d68fd1ac7b5fb2eb101f8b632354010))
* udpate ui dependency to fix link issue ([5553d2d](https://github.com/graasp/client/commit/5553d2dee30c319d0aedb886f96406fb0afbbc64))
* update adornemnt and use slotprops ([#468](https://github.com/graasp/client/issues/468)) ([b552437](https://github.com/graasp/client/commit/b552437327295a7222aca3c1478b0fa833fd4f20))
* update dependencies ([63cf2bb](https://github.com/graasp/client/commit/63cf2bb3792ebac6a320ab1856162ef7ee335182))
* update dependencies ([#535](https://github.com/graasp/client/issues/535)) ([8b4b6a5](https://github.com/graasp/client/commit/8b4b6a506d936cb544fe377c4c3e1f1b52a8d9fc))
* update deployments to use propper install steps ([#429](https://github.com/graasp/client/issues/429)) ([8ec092b](https://github.com/graasp/client/commit/8ec092b6cd6a8143a02f23c3ce69ca4d4c1ec56a))
* update deps ([58487b4](https://github.com/graasp/client/commit/58487b48dbe36a06a6a8a5c3bed4959858c88924))
* update gitloclize links ([3f87392](https://github.com/graasp/client/commit/3f8739249c405c9f7f5a0af38e245196cc1537c2))
* update i18n config ([#433](https://github.com/graasp/client/issues/433)) ([b0c10a9](https://github.com/graasp/client/commit/b0c10a962808728abc7af930b645aedd43e67a30))
* update texts and add missing sections ([#531](https://github.com/graasp/client/issues/531)) ([392cdc7](https://github.com/graasp/client/commit/392cdc70b203df6c4f9b17c8f36530444ab9bfc5))
* update translation to use nbsp in french ([672a4b6](https://github.com/graasp/client/commit/672a4b6e8d0386e57d207f69a81332e11548f03e))
* use translation for required validation ([#469](https://github.com/graasp/client/issues/469)) ([d8d89c6](https://github.com/graasp/client/commit/d8d89c69fbcd711e1acdaa7d8f3b03253efd1ee2))

## [2.17.0](https://github.com/graasp/client/compare/v2.16.0...v2.17.0) (2024-11-25)


### Features

* add landing page ([#434](https://github.com/graasp/client/issues/434)) ([94bafb2](https://github.com/graasp/client/commit/94bafb2468f359073f57ae76023c056e98f07b71))
* add react-hook-form on register ([#474](https://github.com/graasp/client/issues/474)) ([9c54420](https://github.com/graasp/client/commit/9c54420ac74afddee7d42c8ca30f05f226e499ac))
* add terms, disclaimer and privacy policy pages ([#456](https://github.com/graasp/client/issues/456)) ([19f81cc](https://github.com/graasp/client/commit/19f81cc60a7c78c2e8b1c0521958e24634b3982b))


### Bug Fixes

* add alias for modules import ([#430](https://github.com/graasp/client/issues/430)) ([3614581](https://github.com/graasp/client/commit/3614581c168a3b92f18cee7bcfbd65997341f352))
* add new formHeader for login and register ([#470](https://github.com/graasp/client/issues/470)) ([6411b88](https://github.com/graasp/client/commit/6411b88f787879add893b9838223a1afa8a6daf0))
* add pre-connect directive via umami plugin ([#431](https://github.com/graasp/client/issues/431)) ([19f7a9c](https://github.com/graasp/client/commit/19f7a9ccae88bda8aebfe53db3f6d87f0c0b7cd3))
* add recaptcha env var ([d287925](https://github.com/graasp/client/commit/d287925f1ac6f292ec2b7b289759bda393793671))
* **deps:** update dependency @sentry/react to v8.40.0 ([#461](https://github.com/graasp/client/issues/461)) ([ef9cb78](https://github.com/graasp/client/commit/ef9cb785451232fda5640d6c3147e79beae75de5))
* **deps:** update dependency i18next to v24 ([#478](https://github.com/graasp/client/issues/478)) ([a0264db](https://github.com/graasp/client/commit/a0264db4602d6b8a71ddf5abe35e7ddc914ed2ff))
* **deps:** update dependency lucide-react to v0.460.0 ([#427](https://github.com/graasp/client/issues/427)) ([a088364](https://github.com/graasp/client/commit/a088364683b0b33ec54b986fd14ae6ff633ce037))
* **deps:** update dependency lucide-react to v0.460.0 ([#455](https://github.com/graasp/client/issues/455)) ([56506db](https://github.com/graasp/client/commit/56506db129e09843531236bc415de3b172136b0e))
* **deps:** update graasp packages ([#348](https://github.com/graasp/client/issues/348)) ([4a7657b](https://github.com/graasp/client/commit/4a7657b439a19549dcc14aa666bc93feac352eec))
* **deps:** update tanstack-router monorepo to v1.81.14 ([#449](https://github.com/graasp/client/issues/449)) ([b6a1dc2](https://github.com/graasp/client/commit/b6a1dc2f016e0c591a15a9173b52c75effce0bc0))
* **deps:** update tanstack-router monorepo to v1.81.9 ([#443](https://github.com/graasp/client/issues/443)) ([412d7d1](https://github.com/graasp/client/commit/412d7d126cbaf8ae7c8a6e6663b372b49cfa7089))
* **deps:** update tanstack-router monorepo to v1.82.1 ([#423](https://github.com/graasp/client/issues/423)) ([e55dde5](https://github.com/graasp/client/commit/e55dde589b14aed6496d6b79cf8e5b219f213519))
* **deps:** update tanstack-router monorepo to v1.82.8 ([#476](https://github.com/graasp/client/issues/476)) ([08639bc](https://github.com/graasp/client/commit/08639bc7ff6cd779235d65fb850185fd4a494ace))
* **french:** update translations ([#446](https://github.com/graasp/client/issues/446)) ([1b7a79a](https://github.com/graasp/client/commit/1b7a79a0dd35b04a173e192fed1067ecfa1a62a2))
* **french:** update translations ([#447](https://github.com/graasp/client/issues/447)) ([41b1037](https://github.com/graasp/client/commit/41b10379ead07bc2e7da2e5e8aedbdb90152c06e))
* **french:** update translations ([#457](https://github.com/graasp/client/issues/457)) ([d7160ed](https://github.com/graasp/client/commit/d7160ede27a58b76e9f046840e1bcbe61a03285e))
* **french:** update translations ([#479](https://github.com/graasp/client/issues/479)) ([e685fd0](https://github.com/graasp/client/commit/e685fd0078f56a8597a456abf76d5b9e5ca09a41))
* landing page with small adjustments ([#438](https://github.com/graasp/client/issues/438)) ([e0991ef](https://github.com/graasp/client/commit/e0991efae647deb8fc7ca9c67a024f2bb93882c3))
* make auth work in client ([bb840b3](https://github.com/graasp/client/commit/bb840b30bbf0a609922421d9b759a0411a4e8e7a))
* make proxy work as expected ([#436](https://github.com/graasp/client/issues/436)) ([41883e8](https://github.com/graasp/client/commit/41883e8bc4125f6fd98e132442bf904a55b2e0d4))
* move recaptcha to auth layout so we do not track on all pages ([#460](https://github.com/graasp/client/issues/460)) ([0888ecb](https://github.com/graasp/client/commit/0888ecbd13841be88fe3b510c31ca00f2b0b6f20))
* recaptcha script was not loaded in the html ([#448](https://github.com/graasp/client/issues/448)) ([6245fbe](https://github.com/graasp/client/commit/6245fbeee828a7e48c943a8299b45d063efdc930))
* update adornemnt and use slotprops ([#468](https://github.com/graasp/client/issues/468)) ([b552437](https://github.com/graasp/client/commit/b552437327295a7222aca3c1478b0fa833fd4f20))
* update deployments to use propper install steps ([#429](https://github.com/graasp/client/issues/429)) ([8ec092b](https://github.com/graasp/client/commit/8ec092b6cd6a8143a02f23c3ce69ca4d4c1ec56a))
* update i18n config ([#433](https://github.com/graasp/client/issues/433)) ([b0c10a9](https://github.com/graasp/client/commit/b0c10a962808728abc7af930b645aedd43e67a30))
* use translation for required validation ([#469](https://github.com/graasp/client/issues/469)) ([d8d89c6](https://github.com/graasp/client/commit/d8d89c69fbcd711e1acdaa7d8f3b03253efd1ee2))

## [2.16.0](https://github.com/graasp/graasp-account/compare/v2.15.2...v2.16.0) (2024-11-04)


### Features

* add tanstack router ([#375](https://github.com/graasp/graasp-account/issues/375)) ([0fa02ff](https://github.com/graasp/graasp-account/commit/0fa02ff2ea97744a2dd8399df830e35c5f7fde8a))


### Bug Fixes

* add umami variables ([71d96a8](https://github.com/graasp/graasp-account/commit/71d96a81807f988506deb9f37f284bfdbae2cd7f))
* **arabic:** update translations ([#418](https://github.com/graasp/graasp-account/issues/418)) ([ddc3a56](https://github.com/graasp/graasp-account/commit/ddc3a567d7bd6126830a0f3f6430c4a69e614110))
* **deps:** update tanstack-router monorepo to v1.78.3 ([#407](https://github.com/graasp/graasp-account/issues/407)) ([fd5f68f](https://github.com/graasp/graasp-account/commit/fd5f68f30dd52ca94d863510ba50230d9918c8c8))
* **french:** update translations ([#413](https://github.com/graasp/graasp-account/issues/413)) ([9e33b83](https://github.com/graasp/graasp-account/commit/9e33b833767cc8de503fd2d238c10ad253873486))
* **german:** update translations ([#414](https://github.com/graasp/graasp-account/issues/414)) ([ee17aab](https://github.com/graasp/graasp-account/commit/ee17aabd0781024339e579f61f59ab3be0bb24e4))
* **italian:** update translations ([#416](https://github.com/graasp/graasp-account/issues/416)) ([1c281c6](https://github.com/graasp/graasp-account/commit/1c281c6940a975308ea2eed5bfee2255cef724c1))
* remove devtools in prod ([#417](https://github.com/graasp/graasp-account/issues/417)) ([81d8bf4](https://github.com/graasp/graasp-account/commit/81d8bf43703306233d30d6aed389e7a3883e6b02))
* **spanish:** update translations ([#415](https://github.com/graasp/graasp-account/issues/415)) ([ae3add1](https://github.com/graasp/graasp-account/commit/ae3add1987023d720c1cddb520dd3eae7fa0fec8))
* translation strings ([#404](https://github.com/graasp/graasp-account/issues/404)) ([e3a5fcb](https://github.com/graasp/graasp-account/commit/e3a5fcbc3a22d897d4879e48cd43ab1a031cc821))
* update deps ([#409](https://github.com/graasp/graasp-account/issues/409)) ([0a322f2](https://github.com/graasp/graasp-account/commit/0a322f29cdfeb34c437d8ca65ce530c9e069cd2c))
* updated lang is not shown in preferences when switching lang ([#408](https://github.com/graasp/graasp-account/issues/408)) ([972cc3c](https://github.com/graasp/graasp-account/commit/972cc3cdbfceec209c0e8868eb804951af55abb8))
* use the script from cloud and send to our own ([#411](https://github.com/graasp/graasp-account/issues/411)) ([54c1c15](https://github.com/graasp/graasp-account/commit/54c1c15097496cf32fae36d2a7a08bd2ff140f55))

## [2.15.2](https://github.com/graasp/graasp-account/compare/v2.15.1...v2.15.2) (2024-10-23)


### Bug Fixes

* **deps:** update dependency @mui/lab to v5.0.0-alpha.173 ([#308](https://github.com/graasp/graasp-account/issues/308)) ([05f077a](https://github.com/graasp/graasp-account/commit/05f077a205772c005572d99c1d7d6ba94d61808c))
* do not allow special characters in username ([#356](https://github.com/graasp/graasp-account/issues/356)) ([42e4c1f](https://github.com/graasp/graasp-account/commit/42e4c1fc712c72bcb8f87648a6ff40d358415f34))
* password inputs required validation ([#387](https://github.com/graasp/graasp-account/issues/387)) ([df4665b](https://github.com/graasp/graasp-account/commit/df4665b5a18219bd4943a7c566866f67b88ae3a1))

## [2.15.1](https://github.com/graasp/graasp-account/compare/v2.15.0...v2.15.1) (2024-10-18)


### Bug Fixes

* update dependencies ([#390](https://github.com/graasp/graasp-account/issues/390)) ([2a11316](https://github.com/graasp/graasp-account/commit/2a11316f8318e091a4b4642b6bb39bab0659af05))
* use package.json defined node version in ci ([#388](https://github.com/graasp/graasp-account/issues/388)) ([687f042](https://github.com/graasp/graasp-account/commit/687f042173ab199fc11fa72df394e9ef27c7cadd))

## [2.15.0](https://github.com/graasp/graasp-account/compare/v2.14.1...v2.15.0) (2024-10-18)


### Features

* use password status, react hook form ([#364](https://github.com/graasp/graasp-account/issues/364)) ([fa27dfa](https://github.com/graasp/graasp-account/commit/fa27dfa2e2b2bcaab31738921036cfeef5679b81))


### Bug Fixes

* add umami events on password actions ([#386](https://github.com/graasp/graasp-account/issues/386)) ([efc1716](https://github.com/graasp/graasp-account/commit/efc171625c3070de1de01eedd72c1db204381c2d))
* add umami vite plugin ([#382](https://github.com/graasp/graasp-account/issues/382)) ([da90040](https://github.com/graasp/graasp-account/commit/da900403d6f8e11aa92202eab7e09c70f26cef3d))
* deprecate edit member ([#362](https://github.com/graasp/graasp-account/issues/362)) ([246e230](https://github.com/graasp/graasp-account/commit/246e230b4e80be138fb99a217d4d8c9c0dda752d))
* **deps:** update dependency lucide-react to ^0.451.0 ([#357](https://github.com/graasp/graasp-account/issues/357)) ([ca8f7f7](https://github.com/graasp/graasp-account/commit/ca8f7f7f1067895f8128973898642550cd7601ac))
* remove uppy and use custom hook ([#366](https://github.com/graasp/graasp-account/issues/366)) ([c545860](https://github.com/graasp/graasp-account/commit/c5458609e98983a8a99b751f112526b2c5b7f47b))
* update eslint config ([#377](https://github.com/graasp/graasp-account/issues/377)) ([e1364be](https://github.com/graasp/graasp-account/commit/e1364be46984fbbc703c0af116e9971b4009bc7d))
* update ts config ([#376](https://github.com/graasp/graasp-account/issues/376)) ([46a30b4](https://github.com/graasp/graasp-account/commit/46a30b492349f65de9df3c0bd07042355f7ef613))
* use a single CI workflow ([#384](https://github.com/graasp/graasp-account/issues/384)) ([825ab6d](https://github.com/graasp/graasp-account/commit/825ab6d4ff0697ea30cd114cb6a8fadf88c8cbaa))

## [2.14.1](https://github.com/graasp/graasp-account/compare/v2.14.0...v2.14.1) (2024-10-03)


### Bug Fixes

* add tests for delete member feature ([#354](https://github.com/graasp/graasp-account/issues/354)) ([a2691f0](https://github.com/graasp/graasp-account/commit/a2691f03122295aa00b467a3e6c842d53c10c2f8))
* translate enums ([5b1355e](https://github.com/graasp/graasp-account/commit/5b1355e8400e35b4896ff8bc6f22218ea4971bd5))
* udpate deps ([#358](https://github.com/graasp/graasp-account/issues/358)) ([7e96169](https://github.com/graasp/graasp-account/commit/7e96169c4ec81cdf8a90d71d948568a3a4d5be50))
* update dependencies and fix issues ([#355](https://github.com/graasp/graasp-account/issues/355)) ([d85c0b2](https://github.com/graasp/graasp-account/commit/d85c0b283c2a6f70497131c084654c383b038292))
* update deps ([bfd34a2](https://github.com/graasp/graasp-account/commit/bfd34a2bd4f11a30e216a816b8bf33082e45be24))

## [2.14.0](https://github.com/graasp/graasp-account/compare/v2.13.0...v2.14.0) (2024-08-29)


### Features

* add 404 page ([#333](https://github.com/graasp/graasp-account/issues/333)) ([a5854d5](https://github.com/graasp/graasp-account/commit/a5854d50560d9d4516b9a105c1368a8cb1e5305f))
* arabic view - rtl ([#332](https://github.com/graasp/graasp-account/issues/332)) ([2380ff3](https://github.com/graasp/graasp-account/commit/2380ff324bacb1c82f807746ea83386addecdb5a))


### Bug Fixes

* **arabic:** update translations ([#340](https://github.com/graasp/graasp-account/issues/340)) ([495c878](https://github.com/graasp/graasp-account/commit/495c8789f5d72f02479c245ee04b97e2df87d84c))
* fix bug selecting 100 items in storage table ([#330](https://github.com/graasp/graasp-account/issues/330)) ([02d0d99](https://github.com/graasp/graasp-account/commit/02d0d99437654778e6a97d8f3f0532f431f44bb5))
* **german:** update translations ([#339](https://github.com/graasp/graasp-account/issues/339)) ([8eab9fb](https://github.com/graasp/graasp-account/commit/8eab9fb5b747e3d63f4c8c783a8814a9062845c4))
* **italian:** update translations ([#337](https://github.com/graasp/graasp-account/issues/337)) ([f3cdc03](https://github.com/graasp/graasp-account/commit/f3cdc0341bbc7b55ff952d0baf058916bd139d53))
* **spanish:** update translations ([#338](https://github.com/graasp/graasp-account/issues/338)) ([48e7c27](https://github.com/graasp/graasp-account/commit/48e7c27b4b6b617149a57cab9bdc5743095635f2))
* update dependencies ([#334](https://github.com/graasp/graasp-account/issues/334)) ([f81f355](https://github.com/graasp/graasp-account/commit/f81f3559fb1e908aaf7e7af0187084d895d76d5e))

## [2.13.0](https://github.com/graasp/graasp-account/compare/v2.12.0...v2.13.0) (2024-08-19)


### Features

* add data export button in settings page ([#320](https://github.com/graasp/graasp-account/issues/320)) ([a24ff74](https://github.com/graasp/graasp-account/commit/a24ff74e0a07868f8a90b8dcc6c3831d934254b4))
* add uploaded files in storage interface ([#314](https://github.com/graasp/graasp-account/issues/314)) ([6e58b71](https://github.com/graasp/graasp-account/commit/6e58b71312459c845e56cb65bd5d1fa4f43183e3))


### Bug Fixes

* **deps:** update dependency axios to v1.7.4 [security] ([#326](https://github.com/graasp/graasp-account/issues/326)) ([ed4d69f](https://github.com/graasp/graasp-account/commit/ed4d69f5007e93a8f899a9aedf9f1783767db356))
* **deps:** update react-router monorepo to v6.26.1 ([#317](https://github.com/graasp/graasp-account/issues/317)) ([1ffc993](https://github.com/graasp/graasp-account/commit/1ffc993d684613ba2dfbb12ed6f471ae17adf490))

## [2.12.0](https://github.com/graasp/graasp-account/compare/v2.11.0...v2.12.0) (2024-07-24)


### Features

* add email from query string in the validate email page ([#299](https://github.com/graasp/graasp-account/issues/299)) ([abddfdb](https://github.com/graasp/graasp-account/commit/abddfdb8571c2376215b1ff117851457448f76d0))
* create a specification for the get all uploaded files ([#291](https://github.com/graasp/graasp-account/issues/291)) ([69e872b](https://github.com/graasp/graasp-account/commit/69e872bdb064dd03ffdeb8a4674b821e1c182573))


### Bug Fixes

* add storage intercept and test ([#292](https://github.com/graasp/graasp-account/issues/292)) ([05689b1](https://github.com/graasp/graasp-account/commit/05689b13d6536a6aefd75419b4c9ef617f39fce8))
* **arabic:** update translations ([#303](https://github.com/graasp/graasp-account/issues/303)) ([5098950](https://github.com/graasp/graasp-account/commit/5098950dc39c4bebb44daf7d19768116da7ba2fe))
* **deps:** update dependency @mui/lab to v5.0.0-alpha.172 ([#224](https://github.com/graasp/graasp-account/issues/224)) ([221de0e](https://github.com/graasp/graasp-account/commit/221de0ee8d8a65ed81c14859bcc4fbecf3c8acbf))
* **deps:** update dependency lucide-react to ^0.411.0 ([#267](https://github.com/graasp/graasp-account/issues/267)) ([836ac0c](https://github.com/graasp/graasp-account/commit/836ac0c93ee00618042529227877f6a962915fdb))
* **deps:** update graasp packages ([#280](https://github.com/graasp/graasp-account/issues/280)) ([c6d6c4a](https://github.com/graasp/graasp-account/commit/c6d6c4a0203c1c7957620939c05e6d05fed43937))
* **deps:** update mui (non-major) to v5.16.4 ([#287](https://github.com/graasp/graasp-account/issues/287)) ([e900dcb](https://github.com/graasp/graasp-account/commit/e900dcb3add9cd0553c6d5655d6497c3bbe4454f))
* **deps:** update react-router monorepo to v6.24.1 ([#282](https://github.com/graasp/graasp-account/issues/282)) ([d638b88](https://github.com/graasp/graasp-account/commit/d638b880bc8e58579417981dd44f776577e7a40e))
* **deps:** update uppy packages ([#266](https://github.com/graasp/graasp-account/issues/266)) ([8d8720d](https://github.com/graasp/graasp-account/commit/8d8720ddac916a764e7526487dda7e659ad2bff9))
* **deps:** update uppy packages ([#268](https://github.com/graasp/graasp-account/issues/268)) ([b9bb7b2](https://github.com/graasp/graasp-account/commit/b9bb7b235d44d46d161dbb283a6b402d9ec94a8b))
* **french:** update translations ([#301](https://github.com/graasp/graasp-account/issues/301)) ([1316a17](https://github.com/graasp/graasp-account/commit/1316a17ce4ac1ff1d1a0ecb44cdcdf1beb63ad75))
* **italian:** update translations ([#300](https://github.com/graasp/graasp-account/issues/300)) ([85b94a2](https://github.com/graasp/graasp-account/commit/85b94a254dd09b5ae5e2dcde8fd2a7b6eaefdabf))
* rename pagination attributes ([#307](https://github.com/graasp/graasp-account/issues/307)) ([46fe718](https://github.com/graasp/graasp-account/commit/46fe7184b7b7eaaed0ffa5194641758db98ecec0))
* **spanish:** update translations ([#302](https://github.com/graasp/graasp-account/issues/302)) ([546a314](https://github.com/graasp/graasp-account/commit/546a314b481be7ef29354cd44c156c7bc35da649))
* update dependencies ([#304](https://github.com/graasp/graasp-account/issues/304)) ([289d536](https://github.com/graasp/graasp-account/commit/289d536ca3910409f477902e590d3fd5226c10ab))

## [2.11.0](https://github.com/graasp/graasp-account/compare/v2.10.1...v2.11.0) (2024-07-11)


### Features

* add email validation page ([#275](https://github.com/graasp/graasp-account/issues/275)) ([ca84fd0](https://github.com/graasp/graasp-account/commit/ca84fd07673cd3a1204b44758e6fa6780d067016))
* add feedback on email change ([61c956b](https://github.com/graasp/graasp-account/commit/61c956b51b9467b794a03b1257168daab60fd604))
* add preferences to settings page ([#261](https://github.com/graasp/graasp-account/issues/261)) ([254387d](https://github.com/graasp/graasp-account/commit/254387d94fcf0ee2ba4991e689ed2b9228bf8dfd))
* editing of sections in profile page ([#288](https://github.com/graasp/graasp-account/issues/288)) ([61c956b](https://github.com/graasp/graasp-account/commit/61c956b51b9467b794a03b1257168daab60fd604))


### Bug Fixes

* **tests:** re-organize tests ([61c956b](https://github.com/graasp/graasp-account/commit/61c956b51b9467b794a03b1257168daab60fd604))

## [2.10.1](https://github.com/graasp/graasp-account/compare/v2.10.0...v2.10.1) (2024-07-01)


### Bug Fixes

* **arabic:** update translations ([#279](https://github.com/graasp/graasp-account/issues/279)) ([70678b8](https://github.com/graasp/graasp-account/commit/70678b86fb32508479270dfda87d19b07f931c5e))
* **deps:** update graasp packages ([#269](https://github.com/graasp/graasp-account/issues/269)) ([86f0fcb](https://github.com/graasp/graasp-account/commit/86f0fcb2f85d426136802b37e03ce5af10294e9a))
* **german:** update translations ([#276](https://github.com/graasp/graasp-account/issues/276)) ([a1db639](https://github.com/graasp/graasp-account/commit/a1db639bdcfe0cc18751b10ce87434934310927e))
* **italian:** update translations ([#278](https://github.com/graasp/graasp-account/issues/278)) ([9e3cfa4](https://github.com/graasp/graasp-account/commit/9e3cfa4d051f169d57cae1299da5687f2f65c9ad))
* **spanish:** update translations ([#277](https://github.com/graasp/graasp-account/issues/277)) ([6bbd787](https://github.com/graasp/graasp-account/commit/6bbd787c78b2c669f4dec6e3872c427ad7740360))

## [2.10.0](https://github.com/graasp/graasp-account/compare/v2.9.0...v2.10.0) (2024-06-28)


### Features

* move public profile to profile ([#255](https://github.com/graasp/graasp-account/issues/255)) ([d124091](https://github.com/graasp/graasp-account/commit/d124091a4dba154189d55b46abe0ac44594f4a67))

## [2.9.0](https://github.com/graasp/graasp-account/compare/v2.8.2...v2.9.0) (2024-06-26)


### Features

* rename Destructive settings to Settings ([#259](https://github.com/graasp/graasp-account/issues/259)) ([b9f5714](https://github.com/graasp/graasp-account/commit/b9f57149c6a165eab1bee4cd4fa0fe8165c42c3f))


### Bug Fixes

* issue on delete-account-button ([#263](https://github.com/graasp/graasp-account/issues/263)) ([fd1e1f5](https://github.com/graasp/graasp-account/commit/fd1e1f5d8ea5dcd82d6a51c2d9216ec0b2fe3c39))
* update dependencies and remove unused deps ([185cc54](https://github.com/graasp/graasp-account/commit/185cc54d3e002888ff3158c2fb5bb47ecc84137a))
* update release-please ([5cfc3bb](https://github.com/graasp/graasp-account/commit/5cfc3bb0aa454959ddc27bae38637492e4eb784c))

## [2.8.2](https://github.com/graasp/graasp-account/compare/v2.8.1...v2.8.2) (2024-06-11)


### Bug Fixes

* avatar upload size error ([#250](https://github.com/graasp/graasp-account/issues/250)) ([6c113ae](https://github.com/graasp/graasp-account/commit/6c113ae15e24b0b6e846057d45f34aaa84468980))

## [2.8.1](https://github.com/graasp/graasp-account/compare/v2.8.0...v2.8.1) (2024-06-10)


### Bug Fixes

* fix avatar size constant ([#247](https://github.com/graasp/graasp-account/issues/247)) ([46bd04f](https://github.com/graasp/graasp-account/commit/46bd04f3eefa84a794ce927b8389a9a9f3e2f857))

## [2.8.0](https://github.com/graasp/graasp-account/compare/v2.7.0...v2.8.0) (2024-06-07)


### Features

* create read only profile page ([#244](https://github.com/graasp/graasp-account/issues/244)) ([8448fcc](https://github.com/graasp/graasp-account/commit/8448fcce5bf16986aed287af5dc09bc8c3d8e07b))

## [2.7.0](https://github.com/graasp/graasp-account/compare/v2.6.2...v2.7.0) (2024-05-28)


### Features

* create home page ([#228](https://github.com/graasp/graasp-account/issues/228)) ([2009635](https://github.com/graasp/graasp-account/commit/2009635a5e3b595abba67c6a42dcc7a71a702b6d))
* delete avatar page ([#243](https://github.com/graasp/graasp-account/issues/243)) ([7bfc374](https://github.com/graasp/graasp-account/commit/7bfc374b785c9b3d7aa064f3801e873ea94c82db))


### Bug Fixes

* **deps:** update dependency @graasp/query-client to v3.8.0 ([#223](https://github.com/graasp/graasp-account/issues/223)) ([f2c2cf8](https://github.com/graasp/graasp-account/commit/f2c2cf8fed752df74a6bab7067686f6d386193c1))
* **deps:** update dependency filesize to v10.1.2 ([#230](https://github.com/graasp/graasp-account/issues/230)) ([5064ab4](https://github.com/graasp/graasp-account/commit/5064ab47d5b6bb232d5f7786ed86f200b6d620f6))
* **deps:** update dependency i18next to v23.11.4 ([#227](https://github.com/graasp/graasp-account/issues/227)) ([862537a](https://github.com/graasp/graasp-account/commit/862537a5c12046da1e80d568eb5fa09c27030cf8))
* **deps:** update react-router monorepo to v6.23.1 ([#229](https://github.com/graasp/graasp-account/issues/229)) ([e9982dc](https://github.com/graasp/graasp-account/commit/e9982dc53070e6cf2a9659d3d605990da53addff))
* update yarn ([#231](https://github.com/graasp/graasp-account/issues/231)) ([e66bb35](https://github.com/graasp/graasp-account/commit/e66bb35a884a34058adfe966e2be1103f712b404))

## [2.6.2](https://github.com/graasp/graasp-account/compare/v2.6.1...v2.6.2) (2024-05-04)


### Bug Fixes

* **deps:** update dependency @graasp/sdk to v4.9.0 ([#213](https://github.com/graasp/graasp-account/issues/213)) ([0ea8af1](https://github.com/graasp/graasp-account/commit/0ea8af197b69af3b00300e34a5f90b7302b25daa))
* **deps:** update dependency i18next to v23.11.3 ([#216](https://github.com/graasp/graasp-account/issues/216)) ([65cef2b](https://github.com/graasp/graasp-account/commit/65cef2b683025e98a358b9ae269cd1bd3eccb7c1))
* **deps:** update mui (non-major) ([#190](https://github.com/graasp/graasp-account/issues/190)) ([ddbf21d](https://github.com/graasp/graasp-account/commit/ddbf21d9d0c68d7a5df40fb3db7d1c6724aa08df))
* **test:** ensure language can be changed with the select ([#217](https://github.com/graasp/graasp-account/issues/217)) ([1a30302](https://github.com/graasp/graasp-account/commit/1a30302004eeee36419e3948c6affc5c11963d5d))
* update deps ([ddb5e33](https://github.com/graasp/graasp-account/commit/ddb5e330359fac932b8c2511fb5457297fc24ff7))

## [2.6.1](https://github.com/graasp/graasp-account/compare/v2.6.0...v2.6.1) (2024-04-24)


### Bug Fixes

* **deps:** update dependency @graasp/query-client to v3.4.2 ([#200](https://github.com/graasp/graasp-account/issues/200)) ([a0280d5](https://github.com/graasp/graasp-account/commit/a0280d5bab8d6158a955baf2eb688c8ed319645a))
* **deps:** update dependency i18next to v23.11.2 ([#197](https://github.com/graasp/graasp-account/issues/197)) ([5f5ff65](https://github.com/graasp/graasp-account/commit/5f5ff65c6dfa88c110b973feb8b5d4964c3270be))
* update dependencies ([#208](https://github.com/graasp/graasp-account/issues/208)) ([e54f3f0](https://github.com/graasp/graasp-account/commit/e54f3f07cb733385e9d3dfedb90c5a76ed919150))
* use format size from sdk ([#205](https://github.com/graasp/graasp-account/issues/205)) ([4880982](https://github.com/graasp/graasp-account/commit/48809823a95e1f3b701f1afe7e4ba3a50f8c2abe))

## [2.6.0](https://github.com/graasp/graasp-account/compare/v2.5.0...v2.6.0) (2024-04-19)

### Features

- delete delete account from main profile page ([#201](https://github.com/graasp/graasp-account/issues/201)) ([df1dbab](https://github.com/graasp/graasp-account/commit/df1dbab706bc2518a2f2ace9197fef38edbcfe71))

## [2.5.0](https://github.com/graasp/graasp-account/compare/v2.4.0...v2.5.0) (2024-04-17)

### Features

- allow to change username ([#180](https://github.com/graasp/graasp-account/issues/180)) ([16012f4](https://github.com/graasp/graasp-account/commit/16012f41694b1c6efab7342dc8c58be7a59437e5))
- update MemberScreen to udpate enableSaveActions in member ([#186](https://github.com/graasp/graasp-account/issues/186)) ([4fda13b](https://github.com/graasp/graasp-account/commit/4fda13b2b1b8467d18c7d40c23c9a049631ae596))

### Bug Fixes

- apply new limits ([#195](https://github.com/graasp/graasp-account/issues/195)) ([2ccc2e6](https://github.com/graasp/graasp-account/commit/2ccc2e627066fbbcec1ea4783619b185d5c919a3))
- Cypress test related to username validation ([16012f4](https://github.com/graasp/graasp-account/commit/16012f41694b1c6efab7342dc8c58be7a59437e5))
- **deps:** update dependency @emotion/styled to v11.11.5 ([#181](https://github.com/graasp/graasp-account/issues/181)) ([f949c6c](https://github.com/graasp/graasp-account/commit/f949c6cf185fa3312144c04407193f25298f9d8d))
- **deps:** update dependency @graasp/translations to v1.26.0 ([#196](https://github.com/graasp/graasp-account/issues/196)) ([c17c242](https://github.com/graasp/graasp-account/commit/c17c242a28f670c309a042d4ef7717333456c290))
- **deps:** update dependency @graasp/ui to v4.15.0 ([#183](https://github.com/graasp/graasp-account/issues/183)) ([64011c2](https://github.com/graasp/graasp-account/commit/64011c2371b4080d18f876317cee3671a2e0ce74))
- **deps:** update uppy packages ([#178](https://github.com/graasp/graasp-account/issues/178)) ([9d3a850](https://github.com/graasp/graasp-account/commit/9d3a850fe2a4625fb4281278ac3d0afc75e53a18))
- test allow to change username ([16012f4](https://github.com/graasp/graasp-account/commit/16012f41694b1c6efab7342dc8c58be7a59437e5))

## [2.4.0](https://github.com/graasp/graasp-account/compare/v2.3.5...v2.4.0) (2024-04-15)

### Features

- update main component, favicon and font ([#187](https://github.com/graasp/graasp-account/issues/187)) ([0ff23c2](https://github.com/graasp/graasp-account/commit/0ff23c2128ea18fef20c5bc43443263387804d7a))

### Bug Fixes

- small ui issues on the progress bar ([7c3db90](https://github.com/graasp/graasp-account/commit/7c3db902c42c734b242b5c93a93523fbcc8333d8))

## [2.3.5](https://github.com/graasp/graasp-account/compare/v2.3.4...v2.3.5) (2024-04-03)

### Bug Fixes

- allow stacked notifications ([#182](https://github.com/graasp/graasp-account/issues/182)) ([2b8d9d3](https://github.com/graasp/graasp-account/commit/2b8d9d3de414f56792c20a1eee57a95e09dae29b))
- set width of public profile form ([#169](https://github.com/graasp/graasp-account/issues/169)) ([6ac3756](https://github.com/graasp/graasp-account/commit/6ac37566262530265bdc15475b52211cf46e02d0))

## [2.3.4](https://github.com/graasp/graasp-account/compare/v2.3.3...v2.3.4) (2024-03-25)

### Bug Fixes

- accept query params for validation social links ([#165](https://github.com/graasp/graasp-account/issues/165)) ([296e085](https://github.com/graasp/graasp-account/commit/296e0855e9253fbff729aec774a74e97556a728f))
- **arabic:** crop modal translations ([#145](https://github.com/graasp/graasp-account/issues/145)) ([54629a5](https://github.com/graasp/graasp-account/commit/54629a5f652f49f33adb4ea7d6fc31e466a950d6))
- **deps:** update dependency @graasp/query-client to v2.9.1 ([#140](https://github.com/graasp/graasp-account/issues/140)) ([9232dcf](https://github.com/graasp/graasp-account/commit/9232dcfc40088a00ce47fc2c0e6525ef3223ed68))
- **deps:** update dependency @graasp/query-client to v3 ([#152](https://github.com/graasp/graasp-account/issues/152)) ([3738415](https://github.com/graasp/graasp-account/commit/3738415c55be75af961f6a4121ba0555766e1e82))
- **deps:** update dependency @graasp/sdk to v4.2.0 ([#150](https://github.com/graasp/graasp-account/issues/150)) ([8f3d0b8](https://github.com/graasp/graasp-account/commit/8f3d0b806758639522cb96a1717e4fa272cf798a))
- **deps:** update dependency @graasp/sdk to v4.2.1 ([#160](https://github.com/graasp/graasp-account/issues/160)) ([3056813](https://github.com/graasp/graasp-account/commit/3056813fc51c594cf57a4b8ec962a57bf4a7a474))
- **deps:** update dependency @graasp/translations to v1.25.3 ([#148](https://github.com/graasp/graasp-account/issues/148)) ([29cf23a](https://github.com/graasp/graasp-account/commit/29cf23aa7947c9770941e4f4797dc1160b7786f8))
- **deps:** update dependency @graasp/ui to v4.11.0 ([#151](https://github.com/graasp/graasp-account/issues/151)) ([9469b38](https://github.com/graasp/graasp-account/commit/9469b38a8f9f7e7c562df9393739e4508c32173b))
- **deps:** update dependency axios to v1.6.8 ([#157](https://github.com/graasp/graasp-account/issues/157)) ([5e4ca37](https://github.com/graasp/graasp-account/commit/5e4ca379f45489fe6d12ef32001f6344be4f90f1))
- **deps:** update dependency filesize to v10.1.1 ([#168](https://github.com/graasp/graasp-account/issues/168)) ([51ae5f8](https://github.com/graasp/graasp-account/commit/51ae5f81fe4096cbb9a4bd7f73defd9f07a504c0))
- **deps:** update dependency react-toastify to v10.0.5 ([#154](https://github.com/graasp/graasp-account/issues/154)) ([718878c](https://github.com/graasp/graasp-account/commit/718878c20950aeab384bbe00ec056013e97bdc28))
- **deps:** update mui (non-major) ([#143](https://github.com/graasp/graasp-account/issues/143)) ([b6dc51e](https://github.com/graasp/graasp-account/commit/b6dc51ef1bb8793025e0a9f3ebbce112a5374e32))
- **deps:** update mui (non-major) ([#164](https://github.com/graasp/graasp-account/issues/164)) ([1aa1719](https://github.com/graasp/graasp-account/commit/1aa1719b8c2da2c18d484e8acf1a1402e4f39c21))
- **deps:** update uppy packages ([#82](https://github.com/graasp/graasp-account/issues/82)) ([f94e94c](https://github.com/graasp/graasp-account/commit/f94e94cdc670cef0eeab7b201803ad63d7e4a43c))
- fix platform mobile colors ([#171](https://github.com/graasp/graasp-account/issues/171)) ([3042d61](https://github.com/graasp/graasp-account/commit/3042d61f73a7d38257e8a64a47a495af23955bfb))
- **french:** crop modal translations ([#144](https://github.com/graasp/graasp-account/issues/144)) ([f7c98b6](https://github.com/graasp/graasp-account/commit/f7c98b62b854f3f2d6b7984fe0c35a06ff61501b))
- **spanish:** update crop modal translations ([#155](https://github.com/graasp/graasp-account/issues/155)) ([1605f09](https://github.com/graasp/graasp-account/commit/1605f0929b96cc50f9edb5fc498c5471241f1a3a))
- **spanish:** update translations ([#146](https://github.com/graasp/graasp-account/issues/146)) ([a120573](https://github.com/graasp/graasp-account/commit/a120573867a84878f73bbfcfd2c912041ece4623))

## [2.3.3](https://github.com/graasp/graasp-account/compare/v2.3.2...v2.3.3) (2024-03-08)

### Bug Fixes

- crop modal ([#134](https://github.com/graasp/graasp-account/issues/134)) ([924c3b7](https://github.com/graasp/graasp-account/commit/924c3b7e6d10c2613d13bc43092b72e7383d3f2b))
- **deps:** update dependency @emotion/react to v11.11.4 ([#119](https://github.com/graasp/graasp-account/issues/119)) ([15d7629](https://github.com/graasp/graasp-account/commit/15d7629d4fff632a5b46afe8bf68228bd417b8d2))
- **deps:** update dependency @graasp/query-client to v2.8.0 ([#130](https://github.com/graasp/graasp-account/issues/130)) ([c8448a3](https://github.com/graasp/graasp-account/commit/c8448a36c0ca4a9f05e4a2c9329339e0ea270a30))
- **deps:** update dependency @graasp/sdk to v4.1.0 ([#123](https://github.com/graasp/graasp-account/issues/123)) ([4459516](https://github.com/graasp/graasp-account/commit/4459516ec465d03a5807072795c0d46636628827))
- **deps:** update dependency @graasp/ui to v4.9.0 ([#124](https://github.com/graasp/graasp-account/issues/124)) ([466b851](https://github.com/graasp/graasp-account/commit/466b851c62d417e7041019fad8a0e7b56129a954))
- **deps:** update dependency @mui/lab to v5.0.0-alpha.166 ([#110](https://github.com/graasp/graasp-account/issues/110)) ([54cf1a1](https://github.com/graasp/graasp-account/commit/54cf1a1de2d0f1550bac0e84d1e267f0e10c2ac8))
- **deps:** update dependency i18next to v23.10.1 ([#135](https://github.com/graasp/graasp-account/issues/135)) ([7cbca52](https://github.com/graasp/graasp-account/commit/7cbca529bb9185f04fbd1d818af5b2da1d16a7c2))
- **deps:** update dependency react-i18next to v14.1.0 ([#133](https://github.com/graasp/graasp-account/issues/133)) ([b548cdd](https://github.com/graasp/graasp-account/commit/b548cdd83360250e2d342750341e45f57df355ff))
- **deps:** update mui (non-major) ([#129](https://github.com/graasp/graasp-account/issues/129)) ([64dd558](https://github.com/graasp/graasp-account/commit/64dd55868efff56eadc337b01ead290ae9be8d36))
- **deps:** update react-router monorepo to v6.22.3 ([#122](https://github.com/graasp/graasp-account/issues/122)) ([2c6244a](https://github.com/graasp/graasp-account/commit/2c6244a1e700990d0786acca631e9a48e2ee0d4b))

## [2.3.2](https://github.com/graasp/graasp-account/compare/v2.3.1...v2.3.2) (2024-02-27)

### Bug Fixes

- update esm deps ([#117](https://github.com/graasp/graasp-account/issues/117)) ([bed6f61](https://github.com/graasp/graasp-account/commit/bed6f61214052e931b00dd67b77ccd2106669a9d))

## [2.3.1](https://github.com/graasp/graasp-account/compare/v2.3.0...v2.3.1) (2024-02-26)

### Bug Fixes

- update deps to use esm ([#108](https://github.com/graasp/graasp-account/issues/108)) ([5cc8466](https://github.com/graasp/graasp-account/commit/5cc84662d045152259cbf18cb8c4dfa908c23f8a))
- update translation and make translation more gender neutral ([#107](https://github.com/graasp/graasp-account/issues/107)) ([434c52e](https://github.com/graasp/graasp-account/commit/434c52e8ae5c16d1c80ee689a2d42918c4040c5b))

## [2.3.0](https://github.com/graasp/graasp-account/compare/v2.2.0...v2.3.0) (2024-02-20)

### Features

- translate fr.json via GitLocalize ([#93](https://github.com/graasp/graasp-account/issues/93)) ([d4a406b](https://github.com/graasp/graasp-account/commit/d4a406bfd77733ba741ad06212d23f6f48aa0e0b))

### Bug Fixes

- add timestamp in html ([#89](https://github.com/graasp/graasp-account/issues/89)) ([f07bb91](https://github.com/graasp/graasp-account/commit/f07bb91ebabb73b3c7c0f9d6d33fff152158477e))
- **arabic:** update translations ([#100](https://github.com/graasp/graasp-account/issues/100)) ([823a58d](https://github.com/graasp/graasp-account/commit/823a58d30121cb24e6b0a4c1676222182fa9ff0f))
- **deps:** update dependency @graasp/query-client to v2.3.2 ([#80](https://github.com/graasp/graasp-account/issues/80)) ([a47ac46](https://github.com/graasp/graasp-account/commit/a47ac4654babb15fbe83aa9dd716710b473f16da))
- **deps:** update dependency @graasp/query-client to v2.6.2 ([#99](https://github.com/graasp/graasp-account/issues/99)) ([518878e](https://github.com/graasp/graasp-account/commit/518878ebe00e4de9c894fc4b653659d2eb3620b9))
- **deps:** update dependency @graasp/translations to v1.23.0 ([#71](https://github.com/graasp/graasp-account/issues/71)) ([15f8a3d](https://github.com/graasp/graasp-account/commit/15f8a3d6a14e105d36e1d896d6e9f4d88744ec8d))
- **deps:** update dependency @graasp/ui to v4.7.0 ([#72](https://github.com/graasp/graasp-account/issues/72)) ([91f8c53](https://github.com/graasp/graasp-account/commit/91f8c536634c41e61279e30bb6bbc1d9d17cbf76))
- **deps:** update dependency axios to v1.6.7 ([#91](https://github.com/graasp/graasp-account/issues/91)) ([d2aa00f](https://github.com/graasp/graasp-account/commit/d2aa00f13e6775f821cc440a7ce5e03dd811bb8f))
- **deps:** update mui (non-major) ([#56](https://github.com/graasp/graasp-account/issues/56)) ([539bf23](https://github.com/graasp/graasp-account/commit/539bf23899d8756bff37624cc0145696801eca38))
- **german:** update translations ([#94](https://github.com/graasp/graasp-account/issues/94)) ([432a6d1](https://github.com/graasp/graasp-account/commit/432a6d14543c17d470404b9553cf341e6bd46a48))
- **italian:** update translations ([#95](https://github.com/graasp/graasp-account/issues/95)) ([b0ae431](https://github.com/graasp/graasp-account/commit/b0ae431e383fc30543cd81144047cfa1d29435c5))
- remove unused components ([e2c0137](https://github.com/graasp/graasp-account/commit/e2c013776cf27cdcd2461edb87735843525d4051))
- remove unused files ([68a9164](https://github.com/graasp/graasp-account/commit/68a9164bf739f1ea118b49b0341053dc9ca1ac01))
- upgrade pnpm to v4.1.0 ([99c88f6](https://github.com/graasp/graasp-account/commit/99c88f6d7382f69f6abacee222b3c06759163f36))

## [2.2.0](https://github.com/graasp/graasp-account/compare/v2.1.1...v2.2.0) (2024-02-01)

### Features

- create delete account page ([#74](https://github.com/graasp/graasp-account/issues/74)) ([d77c88a](https://github.com/graasp/graasp-account/commit/d77c88a03dd5750a8e6b7502c3e8be7c1bf6e12d))

### Bug Fixes

- use type module in package json ([493a243](https://github.com/graasp/graasp-account/commit/493a2432979be8160e5b9d7026a29e1968d13bc0))

## [2.1.1](https://github.com/graasp/graasp-account/compare/v2.1.0...v2.1.1) (2024-01-24)

### Bug Fixes

- **deps:** update dependency @graasp/sdk to v3.5.0 ([#81](https://github.com/graasp/graasp-account/issues/81)) ([c0cf734](https://github.com/graasp/graasp-account/commit/c0cf734c24a45f12c164a5bc0e715c70b94a70f1))
- update dependencies and fix spanish issues ([#77](https://github.com/graasp/graasp-account/issues/77)) ([831982f](https://github.com/graasp/graasp-account/commit/831982f762ebfe70c4683200b34736b380d0481c))

## [2.1.0](https://github.com/graasp/graasp-account/compare/v2.0.2...v2.1.0) (2024-01-10)

### Features

- build library profile page (UI) ([#41](https://github.com/graasp/graasp-account/issues/41)) ([c51d8f4](https://github.com/graasp/graasp-account/commit/c51d8f47cd0caf8a66e40d88432f219c2a985b26))

### Bug Fixes

- add translations for notifier profile update and creation ([#65](https://github.com/graasp/graasp-account/issues/65)) ([3db33c0](https://github.com/graasp/graasp-account/commit/3db33c03409415067edad3bab3751c55a264bd31))
- **ar:** update ([#62](https://github.com/graasp/graasp-account/issues/62)) ([2fa7a04](https://github.com/graasp/graasp-account/commit/2fa7a0415ad7bbd7c0bd3f9a7044405ad76362eb))
- **deps:** update dependency @emotion/react to v11.11.3 ([#60](https://github.com/graasp/graasp-account/issues/60)) ([d00ffb0](https://github.com/graasp/graasp-account/commit/d00ffb01d65dbf40ab88686c85d8eab51156bce0))
- **deps:** update dependency @graasp/query-client to v2.2.1 ([#61](https://github.com/graasp/graasp-account/issues/61)) ([080d486](https://github.com/graasp/graasp-account/commit/080d486a49c529ef9e143e2e50abfd1782c28284))
- **deps:** update dependency @graasp/ui to v4.0.1 ([#51](https://github.com/graasp/graasp-account/issues/51)) ([566d382](https://github.com/graasp/graasp-account/commit/566d382e37dd3c653fc90b9a0072b79426c5c67a))
- **de:** update ([#59](https://github.com/graasp/graasp-account/issues/59)) ([597fe95](https://github.com/graasp/graasp-account/commit/597fe95cc2c2674e0599cfdc26d8aca0b3e7618d))
- **es:** add language ([#67](https://github.com/graasp/graasp-account/issues/67)) ([72683af](https://github.com/graasp/graasp-account/commit/72683af88ddcd3cf51ac4a8cedd30e6ca3f9c7aa))
- **fr:** update ([#58](https://github.com/graasp/graasp-account/issues/58)) ([d3ff94c](https://github.com/graasp/graasp-account/commit/d3ff94ce3c9f6df8c7d279b2cee8b9ee66b16447))
- **it:** update ([#63](https://github.com/graasp/graasp-account/issues/63)) ([5833b00](https://github.com/graasp/graasp-account/commit/5833b00ce9c9a0728d0ae3b36cba988988dc5ada))
- udpate release-please condition ([e1be130](https://github.com/graasp/graasp-account/commit/e1be13088779fc79a96deb87ef59472d0ce92ef9))
- **ui:** remove IconButtons for start adornment in social links ([3db33c0](https://github.com/graasp/graasp-account/commit/3db33c03409415067edad3bab3751c55a264bd31))

## [2.0.2](https://github.com/graasp/graasp-account/compare/v2.0.1...v2.0.2) (2023-11-24)

### Bug Fixes

- update workflow vars in prod ([f1aa0bc](https://github.com/graasp/graasp-account/commit/f1aa0bc608b3d791f4b26d8384237592c8c0941e))

## [2.0.1](https://github.com/graasp/graasp-account/compare/v2.0.0...v2.0.1) (2023-11-16)

### Bug Fixes

- **trans:** storage translations ([#48](https://github.com/graasp/graasp-account/issues/48)) ([a6d6ba8](https://github.com/graasp/graasp-account/commit/a6d6ba87604a18bda05a01385616b0646c4d1e56))
- update message and redirect to auth ([#46](https://github.com/graasp/graasp-account/issues/46)) ([2c8d3ef](https://github.com/graasp/graasp-account/commit/2c8d3ef50087e6b91133f841071818c72118a3a4))
- use pnpm 4, notify on password change ([#40](https://github.com/graasp/graasp-account/issues/40)) ([7fdde36](https://github.com/graasp/graasp-account/commit/7fdde36af4ec6aa44989a4062b1663628c62c037))

## [2.0.0](https://github.com/graasp/graasp-account/compare/v1.0.0...v2.0.0) (2023-11-03)

### ⚠ BREAKING CHANGES

- remove immutable ([#38](https://github.com/graasp/graasp-account/issues/38))

### Features

- remove immutable ([#38](https://github.com/graasp/graasp-account/issues/38)) ([1064593](https://github.com/graasp/graasp-account/commit/1064593e677619ee626f0261e3c64897fd461af8))

### Bug Fixes

- **deps:** update mui (non-major) ([#19](https://github.com/graasp/graasp-account/issues/19)) ([9f1a0b8](https://github.com/graasp/graasp-account/commit/9f1a0b89271258d9266b85ab6fdf1ea6915650ce))
- update deps and env var ([#32](https://github.com/graasp/graasp-account/issues/32)) ([d5940f9](https://github.com/graasp/graasp-account/commit/d5940f9a96a5145127633a89aaaf241821a76239))

### Documentation

- update readme with gitlocalize ([aca33b7](https://github.com/graasp/graasp-account/commit/aca33b7affd4302b043b9df2031747d7cbef940c))

## 1.0.0 (2023-09-27)

### Features

- add info about what storage includes ([077f997](https://github.com/graasp/graasp-account/commit/077f997bbf63f05dd65912159e7a6803a33d56fb))
- add translation ([1eed95f](https://github.com/graasp/graasp-account/commit/1eed95fbee0331bef0bff257b1a00e6b956b37bb))
- update member profile view ([fff2de1](https://github.com/graasp/graasp-account/commit/fff2de144ca27897b081a1d59237e4892c410024))
