%{
title: "Node Package Managers",
description: "Installing node package managers",
order: 10
}

---

We currently use `yarn` and `pnpm` as package managers in our projects. Please refer to the following sections to install these tools.

## Installing `pnpm` with `volta` {: #pnpm-volta}

Volta allows you to install global packages:

```sh
volta install node
volta install pnpm
```

## Installing Yarn with `volta` {: #with-volta}

Volta allows you to use global packages as if you were using local ones.

```sh
volta install node
volta install yarn
```

## Enabling Yarn with `nvm` {: #with-nvm}

> #### Only if you are not using `volta` {: .info}
>
> Skip this section if you are using `volta` as your package manager.

Yarn is a package manager for node and javascript projects. It is faster than `npm`.
The recommended way of enabling yarn is using `corepack`.

Start by running `corepack enable`
Then `corepack prepare yarn@stable --activate`

You should now have `yarn` enabled with your version of node defined by nvm. To check run `yarn --version` or `which yarn`

> #### Note {: .info}
>
> This operation should be repeated every time you update the version of node you use.
