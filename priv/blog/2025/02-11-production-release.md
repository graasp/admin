---
title: February 11th, Updates
description: Updates to the Graasp platform
date: 2025-02-11
authors:
  - graasp
---

For this week's update, the Graasp team worked at enhancing user experience, including fixes for translations, prevent loading flickers, faster content retrieval for the Library homepage, and backend improvements. Read further for details.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Interfaces

- **Flicker caused by suspense when loading translations**: Fix a flicker issue when translations load asynchronously to improve user experience.
- **Logo display on Safari**: Resolve logo display issues in Safari browsers for consistent rendering across platforms.
- **Fill FAQ content**: Replace mock data in the FAQ section with real content for a polished experience.
- **Update the user profile link in user drop down**: Modify the user profile link in the user switcher to ensure correct redirection.
- **Optimise Library home page content**: Retrieve content faster for the Library homepage
- Use endpoints with generated API
- Fix country selection in the map view

## Backend

- **Add app and shortcuts endpoints**: Create new API endpoints for app and shortcut-specific functionalities.
- **Add likes and creator functionality in Meilisearch**: Integrate "likes" into Meilisearch indexing to allow users search for liked items and filter by creator. Specific endpoints have been created of recent and liked collections.
- **Allow readers to edit Etherpad**: Enable readers to edit Etherpad documents, expanding collaboration capabilities.
- **Optimise retrieval of thumbnails**: Update the system to return `null` for items lacking a thumbnail, rather than an error.
- **Replace non-breaking spaces in link metadata titles**: Replace non-breaking spaces with regular spaces for better title compatibility.
- Improve and fix schemas for item validation
- Clean up and remove obsolete host variables to reduce complexity and improve maintainability.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
