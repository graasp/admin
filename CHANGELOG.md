# Changelog

## [0.5.0](https://github.com/graasp/admin/compare/v0.4.1...v0.5.0) (2026-01-13)


### Features

* add improved mailing ([#102](https://github.com/graasp/admin/issues/102)) ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* setup `Gettext` for internationalisation in emails  ([#113](https://github.com/graasp/admin/issues/113)) ([b0450cd](https://github.com/graasp/admin/commit/b0450cdcc281dfa939917a30e1be2b7c69a282d2))
* single origin ([#106](https://github.com/graasp/admin/issues/106)) ([80213b8](https://github.com/graasp/admin/commit/80213b8d1467a416222bed4339e015b7d77a8924))


### Bug Fixes

* add an uptime command ([#115](https://github.com/graasp/admin/issues/115)) ([4695a3f](https://github.com/graasp/admin/commit/4695a3f5997e6f9f17e417a54e0b535412cf0957))
* credo ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* do not send db event to sentry tracing ([#114](https://github.com/graasp/admin/issues/114)) ([1386a14](https://github.com/graasp/admin/commit/1386a14ef102e23f61d3268fb2f86b4550aa7317))
* improve mailing with localized langs ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* make improvements ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* make imrpovements ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* make progress and have a working worker ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* update views to use forms ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))
* work in progress ([5b6e0cc](https://github.com/graasp/admin/commit/5b6e0ccedc503382f3adeba6d92fad4206bc0457))


### Chores

* update migrations and merge together to simplify ([#111](https://github.com/graasp/admin/issues/111)) ([8513ad8](https://github.com/graasp/admin/commit/8513ad8998a269e16b229ecbac3c2c066e637678))

## [0.4.1](https://github.com/graasp/admin/compare/v0.4.0...v0.4.1) (2026-01-05)


### Bug Fixes

* **ci:** add id-token permission for release please to aws OIDC ([e95bf0f](https://github.com/graasp/admin/commit/e95bf0fcf730938b15285b3472fca4d23bd8e480))

## [0.4.0](https://github.com/graasp/admin/compare/v0.3.0...v0.4.0) (2026-01-05)


### Features

* add admin name and lang ([#105](https://github.com/graasp/admin/issues/105)) ([3f6d491](https://github.com/graasp/admin/commit/3f6d491fde7d1dbcc8e65679ca6bfe6671ed45f8))


### Bug Fixes

* add task to restart containers ([9825700](https://github.com/graasp/admin/commit/98257000214ba7beb69f96e4c00372bfc9fa5742))
* improve readme ([#103](https://github.com/graasp/admin/issues/103)) ([a8f7b7f](https://github.com/graasp/admin/commit/a8f7b7fe1b79d1630f4ff7637cc3b0bdc54ad7ce))
* revert favicon to admin color ([1dc6ba1](https://github.com/graasp/admin/commit/1dc6ba1167cb28a6781557c6daeac0e9dc9f43bf))
* use redirect to navigate to the controller view ([#98](https://github.com/graasp/admin/issues/98)) ([e26bdc3](https://github.com/graasp/admin/commit/e26bdc383246a000195399b7e50ca5ef62d8b169))


### Chores

* **deps:** update dependency credo to v1.7.15 ([#107](https://github.com/graasp/admin/issues/107)) ([c0651d0](https://github.com/graasp/admin/commit/c0651d0ad7540fce3e626a22be914f3d82d355e9))
* **deps:** update dependency dialyxir to v1.4.7 ([#108](https://github.com/graasp/admin/issues/108)) ([eafa7b3](https://github.com/graasp/admin/commit/eafa7b3c2e1835f46f5038cd35dc59d4f4d34ebc))
* push a public image to ECR repository on release ([#109](https://github.com/graasp/admin/issues/109)) ([bc2629f](https://github.com/graasp/admin/commit/bc2629f904088aeb213cf5bfda773f7bfc5a060c))

## [0.3.0](https://github.com/graasp/admin/compare/v0.2.1...v0.3.0) (2025-12-09)


### Features

* POC using vega-lite ([#88](https://github.com/graasp/admin/issues/88)) ([4550e0a](https://github.com/graasp/admin/commit/4550e0adaff88851bf24f40a2eca91049d13f76d))


### Bug Fixes

* add "View details" button for publisher list ([#92](https://github.com/graasp/admin/issues/92)) ([600735a](https://github.com/graasp/admin/commit/600735a54179f312bc4a8d2b7fd7e506fdd229ef))
* allow to move app between compatible publishers ([#85](https://github.com/graasp/admin/issues/85)) ([dc82d5f](https://github.com/graasp/admin/commit/dc82d5f181890b4e3adb6c24f1a9a6a0e6dc8669))
* duplicate app name constraint ([#91](https://github.com/graasp/admin/issues/91)) ([7df9aae](https://github.com/graasp/admin/commit/7df9aae02fcf4b1daa3e963b23042bfed0429b5c))
* email region issue ([#81](https://github.com/graasp/admin/issues/81)) ([3bfe66a](https://github.com/graasp/admin/commit/3bfe66a68ded89433c2ac2d92c657cef63d0b277))
* publication thumbnail fallback ([#94](https://github.com/graasp/admin/issues/94)) ([08e5bbd](https://github.com/graasp/admin/commit/08e5bbd808c77b3e7e2b9866b847e55961b100a0))
* restrict the deployment concurrency to each env ([#84](https://github.com/graasp/admin/issues/84)) ([9ac3839](https://github.com/graasp/admin/commit/9ac38397f57efb70adc8943c7575d9f9ec1ed3d0))
* update admin users page and header ([#89](https://github.com/graasp/admin/issues/89)) ([2118089](https://github.com/graasp/admin/commit/2118089535215d3f99fef398c2628d03f383ae1d))
* update menu names ([#95](https://github.com/graasp/admin/issues/95)) ([2d33ae7](https://github.com/graasp/admin/commit/2d33ae7d105f9ebae703610f4aa58ce9c8bdd8ba))

## [0.2.1](https://github.com/graasp/admin/compare/v0.2.0...v0.2.1) (2025-12-03)


### Bug Fixes

* add s3 thumbnails for published_items ([#74](https://github.com/graasp/admin/issues/74)) ([5c4c634](https://github.com/graasp/admin/commit/5c4c634e45a80e24de94bbffdc61912f7f1020e5))
* display small thumbnails to their correct size ([ae65f75](https://github.com/graasp/admin/commit/ae65f752b71977be57228b50293567e8fc0e0d1b))
* improve emails with HTML ([#59](https://github.com/graasp/admin/issues/59)) ([b5f3eee](https://github.com/graasp/admin/commit/b5f3eeef64c1ffd144e244019761c705c991c9e5))
* published item search should use item_id ([#70](https://github.com/graasp/admin/issues/70)) ([fabf57d](https://github.com/graasp/admin/commit/fabf57dddf2cbeb6e3fc50f9b32a966691121788))
* send emails using ex_aws credentials ([#80](https://github.com/graasp/admin/issues/80)) ([7be1b9c](https://github.com/graasp/admin/commit/7be1b9cffcf669ba044cedb9b2a2323e5875a86f))
* set aws s3 region from env in runtime config ([#77](https://github.com/graasp/admin/issues/77)) ([40a8965](https://github.com/graasp/admin/commit/40a8965e09b2a1bbfc70f961ef6c10d6aa1ff245))
* upgrade elixir version to v1.19.4 ([#73](https://github.com/graasp/admin/issues/73)) ([a6f23e1](https://github.com/graasp/admin/commit/a6f23e19d002fabebe4a33c65b36f8581ae87366))
* use correct date comparisons ([#71](https://github.com/graasp/admin/issues/71)) ([82c3d34](https://github.com/graasp/admin/commit/82c3d34048f2882e0f9690e7c64caac42c1cda31))

## [0.2.0](https://github.com/graasp/admin/compare/v0.1.0...v0.2.0) (2025-11-27)


### Features

* add apps and publishers ([#11](https://github.com/graasp/admin/issues/11)) ([855ca0b](https://github.com/graasp/admin/commit/855ca0b69c9afa3fa7e4381a56144f9000e896d6))
* add auth via generators ([acf8a55](https://github.com/graasp/admin/commit/acf8a55da9895acfde4ff27b8524edec7cfcd654))
* add CI setup ([#20](https://github.com/graasp/admin/issues/20)) ([216d276](https://github.com/graasp/admin/commit/216d27624d33b7ae438a29b3991ddc4c33b47427))
* add jobs and mailing feature ([#48](https://github.com/graasp/admin/issues/48)) ([15c489c](https://github.com/graasp/admin/commit/15c489cb3a17ae1ae7488c08ca5a50e0fda2a1ac))
* landing page ([#42](https://github.com/graasp/admin/issues/42)) ([adf9ac4](https://github.com/graasp/admin/commit/adf9ac4ab8ffb8a8ef05c8adc5df18163e536e5d))
* planned maintenance ([#36](https://github.com/graasp/admin/issues/36)) ([9b5adb8](https://github.com/graasp/admin/commit/9b5adb834990df34f00ed2afa474dc70a6cfd09f))
* setup react app ([#38](https://github.com/graasp/admin/issues/38)) ([26cd1d5](https://github.com/graasp/admin/commit/26cd1d544fdaa1c6f2d541cc284404e79e572a8d))
* shared db ([#15](https://github.com/graasp/admin/issues/15)) ([8a3bf6b](https://github.com/graasp/admin/commit/8a3bf6bd1044657961ab7d47fe0014880d5f49fa))


### Bug Fixes

* add a limit to the recent publications list ([#25](https://github.com/graasp/admin/issues/25)) ([fb7383a](https://github.com/graasp/admin/commit/fb7383abc711876bb436f4d40e330eec0d774ae8))
* add AWS remote script ([#22](https://github.com/graasp/admin/issues/22)) ([02ad47d](https://github.com/graasp/admin/commit/02ad47da0c86a9b628638546f028a6ed9108be51))
* add deletion info in edit app page ([#32](https://github.com/graasp/admin/issues/32)) ([68a548b](https://github.com/graasp/admin/commit/68a548b345022145452e6681140f6eb850397069))
* add env in ci ([#21](https://github.com/graasp/admin/issues/21)) ([48b322a](https://github.com/graasp/admin/commit/48b322a915f03629f8e8758dc7ad113ba2c42a66))
* add mise scripts to remote and log into the task ([#31](https://github.com/graasp/admin/issues/31)) ([e5ad7ab](https://github.com/graasp/admin/commit/e5ad7ab930017e4cbe01fd01da0d0912e699dceb))
* add platform url helpers ([#62](https://github.com/graasp/admin/issues/62)) ([9013deb](https://github.com/graasp/admin/commit/9013deb1740a25d62c1ea1d2bcdd1e0b9e40b64e))
* add pnpm inside docker build image ([#41](https://github.com/graasp/admin/issues/41)) ([98c26ed](https://github.com/graasp/admin/commit/98c26ed5abf951d91f9ac1f845418b517318fd04))
* add release function to check migration status ([#49](https://github.com/graasp/admin/issues/49)) ([7e9b6df](https://github.com/graasp/admin/commit/7e9b6dfb2278e9c7cd6cfb8325d6679357b5a00b))
* add release please ([#45](https://github.com/graasp/admin/issues/45)) ([c693193](https://github.com/graasp/admin/commit/c6931936630c94528cfcf0fdb1f84fdb20624d78))
* add s3 controllers and configuration ([#35](https://github.com/graasp/admin/issues/35)) ([ad72ce5](https://github.com/graasp/admin/commit/ad72ce5c323c716a8f978087ce58820b39f0ff54))
* add sentry setup ([#10](https://github.com/graasp/admin/issues/10)) ([bf2979b](https://github.com/graasp/admin/commit/bf2979b8b7894a427520c245b60812d759f9993a))
* add ses region env var ([#24](https://github.com/graasp/admin/issues/24)) ([2324268](https://github.com/graasp/admin/commit/2324268f3e48168aa74bfc58ec6d5cb58b94279d))
* allow to rotate an app key ([#18](https://github.com/graasp/admin/issues/18)) ([26f7dce](https://github.com/graasp/admin/commit/26f7dcee227f0d0c1f34cddfedcda1bb801b4f5c))
* app publisher ordering ([#60](https://github.com/graasp/admin/issues/60)) ([82ccb9b](https://github.com/graasp/admin/commit/82ccb9b43a3e4f190b8834076bfa07e254a7ed66))
* apps ordering ([#61](https://github.com/graasp/admin/issues/61)) ([eca1892](https://github.com/graasp/admin/commit/eca1892fe944640b7e5ffeec622bb0dc0d5338c8))
* continue working on the publication form and search ([5f47d95](https://github.com/graasp/admin/commit/5f47d954bc9004137bcdd3711bfe7bb8f0bc24ca))
* dialog to confirm user deletion and user stats on dashboard ([5e701c8](https://github.com/graasp/admin/commit/5e701c8ade0bbc16ac9f0341213d470d86f9471b))
* docker can build frontend assets ([#44](https://github.com/graasp/admin/issues/44)) ([bd6e0b8](https://github.com/graasp/admin/commit/bd6e0b80dfc32707174750d2a43889a40342476b))
* improve publication display ([#63](https://github.com/graasp/admin/issues/63)) ([a69cdf2](https://github.com/graasp/admin/commit/a69cdf229e752b42ba3dac3faf89291d01e334a5))
* improve un-publish page ([#68](https://github.com/graasp/admin/issues/68)) ([e68f5e8](https://github.com/graasp/admin/commit/e68f5e84b3fc9332a5500a1eeb8eb885987f7233))
* improve validation of apps and display of errors ([#66](https://github.com/graasp/admin/issues/66)) ([d3def42](https://github.com/graasp/admin/commit/d3def42a60d29096f67d8844e37f891b021cae46))
* installation docs ([c939729](https://github.com/graasp/admin/commit/c9397299dbd310810ce3809920e9d80dd8530f64))
* make changes requested after demo ([599805e](https://github.com/graasp/admin/commit/599805eab3502d6d18c04641c6d259316db52fb6))
* make requested changes for apps and publisher ([ff90b44](https://github.com/graasp/admin/commit/ff90b445d90192e21d489de9347460400c6bcef0))
* path change in app ([#43](https://github.com/graasp/admin/issues/43)) ([2105967](https://github.com/graasp/admin/commit/2105967680cb4d63f27ae4558e047dd5a43a499a))
* remove kamal configs and hide docs related to it ([#16](https://github.com/graasp/admin/issues/16)) ([45329e0](https://github.com/graasp/admin/commit/45329e0e5c80b6093cfd1cd02b1cf091595021ad))
* rename users table to admins ([#19](https://github.com/graasp/admin/issues/19)) ([4d5dc3f](https://github.com/graasp/admin/commit/4d5dc3f066e8de6b2f3e46865c577632355a910b))
* restart service after deploy and disable concurrency ([#23](https://github.com/graasp/admin/issues/23)) ([19bfc8a](https://github.com/graasp/admin/commit/19bfc8adc0ccb126e078adbf9bf94edb8ac43669))
* setup credo to perform static code analysis with dialyzer ([#28](https://github.com/graasp/admin/issues/28)) ([21fa759](https://github.com/graasp/admin/commit/21fa7591f2187f63abb0f2689183784294dfccb6))
* setup docs ([11d55c9](https://github.com/graasp/admin/commit/11d55c9779a66450ad2ac41fa89a70d523914481))
* tests ([8b6e202](https://github.com/graasp/admin/commit/8b6e202b3fbb159f77a37a4e86036a51f5310ce3))
* update for shared database ([940ef57](https://github.com/graasp/admin/commit/940ef57f95d8f02f54a594b4f39f5caa4c0cdc66))
* update header for smaller screens sizes ([#26](https://github.com/graasp/admin/issues/26)) ([5af535d](https://github.com/graasp/admin/commit/5af535d1590c8f2cb3cb70a555a69c0e792dcb4a))
* update log validation ([#52](https://github.com/graasp/admin/issues/52)) ([9a478de](https://github.com/graasp/admin/commit/9a478de19106646b6685937053e01d40a714c661))
* update navigation bars and content ([9c54e7f](https://github.com/graasp/admin/commit/9c54e7fa7595c344745ad8ee88438aabf51afd65))
* update readme ([0500789](https://github.com/graasp/admin/commit/05007899bc9c6f6b81807b90e1e8b03d031dd5d9))
* update sentry configuration ([#39](https://github.com/graasp/admin/issues/39)) ([9c815ec](https://github.com/graasp/admin/commit/9c815ec6ef8802b062913b5436a0c76de1c56ce4))
* update tailwind in lockfile ([#40](https://github.com/graasp/admin/issues/40)) ([0ce1872](https://github.com/graasp/admin/commit/0ce1872dd455146952d2d8e7f4b5d6c2539b6ed3))
* update tests for new features ([cc37539](https://github.com/graasp/admin/commit/cc37539e7b8e753ce1272721c13429c370071845))
* upgrade deps ([#37](https://github.com/graasp/admin/issues/37)) ([008aeca](https://github.com/graasp/admin/commit/008aecaae425c91cf0fc7e960dfbf325f5cb096e))
* use better input type for maintenance form ([#67](https://github.com/graasp/admin/issues/67)) ([1e95066](https://github.com/graasp/admin/commit/1e95066c7355ba6f1c506ccfe355e6afae8b9e36))
* use created_at instead of inserted_at ([bdb0547](https://github.com/graasp/admin/commit/bdb0547df1477726ac371d09d352090d302af95c))
* use uuid as primary key ([5bae3d1](https://github.com/graasp/admin/commit/5bae3d125d54d61f5b8df446822b3ee34ae5f37b))


### Chores

* initial commit ([32de7a6](https://github.com/graasp/admin/commit/32de7a6ecfb4818bc2341f097ced23e162013507))
* remove react frontend ([3a0cbf1](https://github.com/graasp/admin/commit/3a0cbf1e55967eae02dadf56e0e0f7e7c1268519))
* update dependencies ([0f85bb3](https://github.com/graasp/admin/commit/0f85bb3c9aec24fefd2ba2faac747c946b95ad35))
