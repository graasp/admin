---
title: Permissions in Apps
slug: apps-permissions
---

# Permissions model for apps

Each app data has a `visibility` field. It can take two values: `member` or `item` (default: `member`).
  - `member`: the app data can be managed by the creator and members with admin permission. Members with write permission can view them but cannot modify them.
  - `item`: the app data can be managed by the creator and members with admin permission. All other members can view them but cannot modify them.

Combined with the permission of the member on the item, it defines all the access rights. Currently, there is no difference between `read` and `write` permission when using the app API.

User with `admin` permission can get/patch/delete any app data. User with `read` or `write` permission can get app data that they created or that are adressed to them (with `member` being set to their member id). App data that have their visibility set to `member` can only be seen (get) by their creator, member, and all members with `admin` permission. App data with visibility set to `item` can be seen by all users, but only creator, member, and members with `admin` permission can patch/delete them.

## Example {#example}

Consider an app with four users:

1. A with `admin` permission
2. B with `read` permission
3. C with `read` permission
4. O with `read` permission

See examples of allowed operations in the table below.

| App Data                                                                 | A                | B                | C                | O   |
| ------------------------------------------------------------------------ | ---------------- | ---------------- | ---------------- | --- |
| **App data 1** - _creator: **B**, member: **B**, visibility: **member**_ | get/patch/delete | get/patch/delete | -                | -   |
| **App data 1** - _creator: **B**, member: **B**, visibility: **item**_   | get/patch/delete | get/patch/delete | get              | get |
| **App data 1** - _creator: **B**, member: **C**, visibility: **member**_ | get/patch/delete | get/patch/delete | get/patch/delete | -   |
| **App data 1** - _creator: **B**, member: **C**, visibility: **item**_   | get/patch/delete | get/patch/delete | get/patch/delete | get |
| **App data 1** - _creator: **A**, member: **B**, visibility: **member**_ | get/patch/delete | get/patch/delete | -                | -   |
| **App data 1** - _creator: **A**, member: **B**, visibility: **item**_   | get/patch/delete | get/patch/delete | get              | get |
| **App data 1** - _creator: **A**, member: **A**, visibility: **member**_ | get/patch/delete | -                | -                | -   |
| **App data 1** - _creator: **A**, member: **A**, visibility: **item**_   | get/patch/delete | get              | get              | get |
