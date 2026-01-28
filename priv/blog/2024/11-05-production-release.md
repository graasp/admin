---
title: November 5th, Updates
description: Updates to the Graasp platform
date: 2024-11-05
authors:
  - graasp
---

The updates focus on improving user experience, performance, and infrastructure. Key changes include Material UI 6 upgrades across several components, enhanced login and reset flows, optimized backend endpoints, and improvements to search and item management. Read further for details.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

We're working on an improvement for categories in our OER library. To head to direction, we first started to migrate the **language** categories. Starting from now, the item's language will be used by the searching engine in the library to find matching collections. Please set your items' language with your content's language if it exists. Currently Graasp supports _english_, _french_, _german_, _italian_, _spanish_ and _arabic_.

## Auth:

- **Allow to press enter to login with an email**: Enable the "Enter" key to submit login forms for a smoother login experience.
- **Show message when resetting a password is successful**: Display a confirmation message after a successful password reset.
- **Upgrade to Material UI 6**: Update the UI framework to Material UI version 6.
- **Update French and German Translations**: Ensure accurate translations for French and German users.

## Builder:

- **Replace Language Categories with Item Language**: Remove language categories, and use item language to use in Library's search engine.
- **Refactor Creation and Edition Dialogs**: Redesign dialogs for item creation and editing to improve user experience.
- **Clear Item Selection on Navigation**: Automatically deselect items when navigating away from the current view.
- **Upgrade to Material UI 6**: Update the UI framework to Material UI version 6.

## Library:

- **Use Supported Languages Instead of Language Category in Search**: Allow users to filter search by supported languages instead of categories.
- **Upgrade to Material UI 6**: Update the UI framework to Material UI version 6.

## Player:

- **Upgrade to Material UI 6**: Update the UI framework to Material UI version 6.

## Backend:

- **Add Simpler Health Endpoint for Quicker Health Response**: Introduce a streamlined health check endpoint for faster status verification.
- **Index Item Language in Meilisearch**: Add item language as an indexed field in Meilisearch for improved search functionality.
- **Remove GET Tags Endpoints**: Eliminate unnecessary `GET /tags` endpoints to simplify the API.
- **Split Upload CSV Between Individual and Group Creation**: Separate CSV upload handling for individual and group item creation.
- **Improve Schemas**:
  - **Optional Param for Actions**: Allow certain action parameters to be optional in schemas.
  - **Allow Local File When Updating Item Schema**: Permit the use of local files when updating item schema.
  - **Do Not Check Password Format on Password Login**: Skip password format validation during login for improved flexibility.
- **Escape Title in Emails for Special Characters**: Ensure special characters in email titles are correctly escaped.
- **Infrastructure**:
  - **Put Nudenet Back in Container, Set Up Single DB Instance**: Revert Nudenet to a containerized environment and configure a single database instance.
  - **Move Redis in a Container**: Transition Redis to a containerized setup for consistency and ease of management.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
