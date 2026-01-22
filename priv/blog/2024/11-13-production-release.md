---
title: November 13th, Updates
description: Updates to the Graasp platform
date: 2024-11-13
authors:
  - graasp
---

The updates improve user experience by moving the homepage to /account, adding a lock icon for passwords, and enabling sharing with the "Enter" key. Performance and security are enhanced by routing analytics to a private server, disabling dev tools in production, optimizing API endpoints, and updating dependencies.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Account:

- **Move Homepage to `/account`**: This change initiates the process of simplifying our client application by relocating the homepage to the `/account` route.
- **Send Analytics to our own server**: Configure Umami analytics to route data to our own server, enhancing data privacy and control.
- **Remove DevTools in Production**: Disable development tools in production to improve security and performance.
- **Update Translations**: Refresh and improve translation files to support new and updated content.
- **Update Dependencies**: Ensure all dependencies are up-to-date to maintain security and compatibility.

## Auth:

- **Replace Password Icon with a Lock Icon**: Update the password field icon to a lock for improved clarity and consistency.

## Builder:

- **Optimize Item Fetching from Trash**: Enhance the performance of fetching items from the trash folder.
- **Enable Sharing with Enter Key**: Allow users to share items by pressing the "Enter" key, improving accessibility and user experience.
- **Refactor Edition and Creation Modals** _(In Progress)_: Redesign and optimize the modal windows for item creation and editing for a clearer code.

## Player:

- **Refactor to Prevent Safari Crashes**: Modify the codebase to resolve crashes in Safari, ensuring a more stable experience for all users.
- **Update Dependencies**: Keep dependencies up-to-date to address potential issues and maintain compatibility.

## Backend:

- **Optimize `GET /recycled` Endpoint**: Improve the efficiency of the `GET /recycled` API endpoint to reduce response times.
- **Update Translations**: Synchronize translations with the frontend for consistency across the application.
- **Enhance Endpoint Schemas**: Refine endpoint schemas for clearer documentation and better validation.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
