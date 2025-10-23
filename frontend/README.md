# Graasp Account

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-21-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub Release](https://img.shields.io/github/release/graasp/graasp-library)](https://github.com/graasp-account/releases)
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-library/dev/typescript)
[![gitlocalized](https://gitlocalize.com/repo/9998/whole_project/badge.svg)](https://gitlocalize.com/repo/9998?utm_source=badge)

## Translation status

[![gitlocalized-fr](https://gitlocalize.com/repo/9998/fr/badge.svg)](https://gitlocalize.com/repo/9998/fr?utm_source=badge)
[![gitlocalized-de](https://gitlocalize.com/repo/9998/de/badge.svg)](https://gitlocalize.com/repo/9998/de?utm_source=badge)
[![gitlocalized-es](https://gitlocalize.com/repo/9998/es/badge.svg)](https://gitlocalize.com/repo/9998/es?utm_source=badge)
[![gitlocalized-it](https://gitlocalize.com/repo/9998/it/badge.svg)](https://gitlocalize.com/repo/9998/it?utm_source=badge)
[![gitlocalized-ar](https://gitlocalize.com/repo/9998/ar/badge.svg)](https://gitlocalize.com/repo/9998/ar?utm_source=badge)

## Getting Started

You will need `pnpm`. Refer to the [Getting started documentation for developers](https://graasp.github.io/docs/developer/getting-started#pnpm-volta) to install it using [`volta`](https://volta.sh/)

1. Install the dependencies `pnpm i`
1. Start the development server with `pnpm dev`

## Environment variables

For reference, here are all the environment variables that you can use to override the behavior of the app.
In development none of them should be required. But some checks might require them.

```sh
# .env.development
VITE_VERSION=local
VITE_PORT=3114
VITE_GRAASP_API_HOST=http://localhost:3000
VITE_SHOW_NOTIFICATIONS=true

VITE_UMAMI_WEBSITE_ID=<the id of your umami project>
VITE_UMAMI_HOST=http://localhost:8000

VITE_SENTRY_ENV= # some value
VITE_SENTRY_DSN= # some value

VITE_RECAPTCHA= # some value

VITE_GRAASP_H5P_INTEGRATION_URL= # the origin for the h5p integration

VITE_GRAASP_REDIRECTION_HOST=http://localhost:3114/redirect
```

## Running the project in preview mode

If you do not need to actively develop the project you can run it in preview mode.
This mode runs the app from the static build and uses a lot less RAM compared to running in development mode.

1. You need to have a `.env.production` file with the following content:

    ```dotenv
    VITE_GRAASP_H5P_INTEGRATION_URL=http://localhost:3000/items/h5p-assets/
    VITE_GRAASP_REDIRECTION_HOST=http://localhost:3114/redirect
    ```

1. Build the project `pnpm build`
1. Preview the project `pnpm preview`
1. Open the app running on: [http://localhost:3114](http://localhost:3114)

## Running with Docker

In this section we give instructions on how to host the static files of this project with docker.

Using the following command, you should be able to build an image that contains the statically built assets for this project and [a static web server](https://static-web-server.net/) to host them.

```sh
docker build -t client-local \
 --build-arg VITE_GRAASP_H5P_INTEGRATION_URL=http://localhost:3000/items/h5p-integration \
 --build-arg VITE_RECAPTCHA=<recaptcha_site_key> \
 --build-arg VITE_GRAASP_REDIRECTION_HOST=http://localhost:3000/short-links \
 .
```

Change `client-local` to the image and tag name you prefer. For example `client:latest` to name the image `client` and tag it as `latest`.
Also update the `<recaptcha_site_key>` value with your own.

To use this image, run it with:

```sh
docker run --rm -p 3114:80 client-local
```

Now the client should be served at `http://localhost:3114` change `3114` in the command above to the port you prefer.

## Test setup

```sh
# .env.test
VITE_VERSION=local
VITE_PORT=3333
VITE_GRAASP_API_HOST=http://localhost:3636
VITE_SHOW_NOTIFICATIONS=true
VITE_GRAASP_ANALYZER_HOST=http://localhost:3005
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://www.linkedin.com/in/kim-lan-phan-hoang-a457bb130"><img src="https://avatars.githubusercontent.com/u/11229627?v=4?s=100" width="100px;" alt="Kim Lan Phan Hoang"/><br /><sub><b>Kim Lan Phan Hoang</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=pyphilia" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://www.linkedin.com/in/chau-alexandre/"><img src="https://avatars.githubusercontent.com/u/14943421?v=4?s=100" width="100px;" alt="Alexandre Chau"/><br /><sub><b>Alexandre Chau</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=dialexo" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/spaenleh"><img src="https://avatars.githubusercontent.com/u/39373170?v=4?s=100" width="100px;" alt="Basile Spaenlehauer"/><br /><sub><b>Basile Spaenlehauer</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=spaenleh" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/ReidyT"><img src="https://avatars.githubusercontent.com/u/147397675?v=4?s=100" width="100px;" alt="Thibault Reidy"/><br /><sub><b>Thibault Reidy</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=ReidyT" title="Tests">⚠️</a> <a href="https://github.com/graasp/client/commits?author=ReidyT" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/MartinaVin"><img src="https://avatars.githubusercontent.com/u/47863122?v=4?s=100" width="100px;" alt="Martina Vincoli"/><br /><sub><b>Martina Vincoli</b></sub></a><br /><a href="#design-MartinaVin" title="Design">🎨</a> <a href="#translation-MartinaVin" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/swouf"><img src="https://avatars.githubusercontent.com/u/5767619?v=4?s=100" width="100px;" alt="Jérémy La Scala"/><br /><sub><b>Jérémy La Scala</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=swouf" title="Code">💻</a> <a href="https://github.com/graasp/client/issues?q=author%3Aswouf" title="Bug reports">🐛</a> <a href="https://github.com/graasp/client/commits?author=swouf" title="Tests">⚠️</a> <a href="#research-swouf" title="Research">🔬</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="http://morganridel.fr"><img src="https://avatars.githubusercontent.com/u/14032127?v=4?s=100" width="100px;" alt="Morgan Ridel"/><br /><sub><b>Morgan Ridel</b></sub></a><br /><a href="#infra-morganridel" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/graasp/client/commits?author=morganridel" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=morganridel" title="Tests">⚠️</a> <a href="https://github.com/graasp/client/commits?author=morganridel" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://juancarlosfarah.com"><img src="https://avatars.githubusercontent.com/u/1707188?v=4?s=100" width="100px;" alt="Juan Carlos Farah"/><br /><sub><b>Juan Carlos Farah</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=juancarlosfarah" title="Code">💻</a> <a href="https://github.com/graasp/client/pulls?q=is%3Apr+reviewed-by%3Ajuancarlosfarah" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/graasp/client/commits?author=juancarlosfarah" title="Tests">⚠️</a> <a href="#research-juancarlosfarah" title="Research">🔬</a> <a href="#ideas-juancarlosfarah" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/graasp/client/issues?q=author%3Ajuancarlosfarah" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/claudiaalarconlpz"><img src="https://avatars.githubusercontent.com/u/130067747?v=4?s=100" width="100px;" alt="claudiaalarconlpz"/><br /><sub><b>claudiaalarconlpz</b></sub></a><br /><a href="#translation-claudiaalarconlpz" title="Translation">🌍</a> <a href="#research-claudiaalarconlpz" title="Research">🔬</a></td>
      <td align="center" valign="top" width="16.66%"><a href="http://blog.ztleespace.com/"><img src="https://avatars.githubusercontent.com/u/31677780?v=4?s=100" width="100px;" alt="Ziting Li"/><br /><sub><b>Ziting Li</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=ztlee042" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=ztlee042" title="Tests">⚠️</a> <a href="#design-ztlee042" title="Design">🎨</a> <a href="#userTesting-ztlee042" title="User Testing">📓</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/MalinSvenberg"><img src="https://avatars.githubusercontent.com/u/56155987?v=4?s=100" width="100px;" alt="MalinSvenberg"/><br /><sub><b>MalinSvenberg</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=MalinSvenberg" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=MalinSvenberg" title="Tests">⚠️</a> <a href="#a11y-MalinSvenberg" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/rayacers"><img src="https://avatars.githubusercontent.com/u/13879502?v=4?s=100" width="100px;" alt="Po-Jui Chang"/><br /><sub><b>Po-Jui Chang</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=rayacers" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=rayacers" title="Tests">⚠️</a> <a href="#design-rayacers" title="Design">🎨</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/mariembencheikh"><img src="https://avatars.githubusercontent.com/u/58473159?v=4?s=100" width="100px;" alt="mariembencheikh"/><br /><sub><b>mariembencheikh</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=mariembencheikh" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=mariembencheikh" title="Tests">⚠️</a> <a href="#design-mariembencheikh" title="Design">🎨</a> <a href="#translation-mariembencheikh" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/LinaYahya"><img src="https://avatars.githubusercontent.com/u/49619087?v=4?s=100" width="100px;" alt="Lina Ebeid"/><br /><sub><b>Lina Ebeid</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=LinaYahya" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=LinaYahya" title="Tests">⚠️</a> <a href="#design-LinaYahya" title="Design">🎨</a> <a href="#a11y-LinaYahya" title="Accessibility">️️️️♿️</a> <a href="#translation-LinaYahya" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/victorggonzalez"><img src="https://avatars.githubusercontent.com/u/36533965?v=4?s=100" width="100px;" alt="Víctor González"/><br /><sub><b>Víctor González</b></sub></a><br /><a href="#infra-victorggonzalez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/graasp/client/commits?author=victorggonzalez" title="Tests">⚠️</a> <a href="#tool-victorggonzalez" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/alvrba"><img src="https://avatars.githubusercontent.com/u/67112345?v=4?s=100" width="100px;" alt="Alvaro Bautista"/><br /><sub><b>Alvaro Bautista</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=alvrba" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=alvrba" title="Tests">⚠️</a> <a href="#design-alvrba" title="Design">🎨</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/louisewang1"><img src="https://avatars.githubusercontent.com/u/25419619?v=4?s=100" width="100px;" alt="Louise Wang"/><br /><sub><b>Louise Wang</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=louisewang1" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/abdallah75"><img src="https://avatars.githubusercontent.com/u/51781491?v=4?s=100" width="100px;" alt="abdallah75"/><br /><sub><b>abdallah75</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=abdallah75" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/Julien-Torrent"><img src="https://avatars.githubusercontent.com/u/44172411?v=4?s=100" width="100px;" alt="Julien Torrent"/><br /><sub><b>Julien Torrent</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=Julien-Torrent" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=Julien-Torrent" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://xiaotiansu.github.io/"><img src="https://avatars.githubusercontent.com/u/44131581?v=4?s=100" width="100px;" alt="Su"/><br /><sub><b>Su</b></sub></a><br /><a href="https://github.com/graasp/client/commits?author=xiaotiansu" title="Code">💻</a> <a href="https://github.com/graasp/client/commits?author=xiaotiansu" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/HusamJubran"><img src="https://avatars.githubusercontent.com/u/92751330?v=4?s=100" width="100px;" alt="HusamJubran"/><br /><sub><b>HusamJubran</b></sub></a><br /><a href="#translation-HusamJubran" title="Translation">🌍</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
