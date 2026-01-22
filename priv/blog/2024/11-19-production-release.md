---
title: November 19th, Updates
description: Updates to the Graasp platform
date: 2024-11-19
authors:
  - graasp
---

This update focuses on improving user interfaces for link and folder creation, enhancing quiz accessibility, adding tagging and visibility features in the backend, introducing customization options in chatbot queries, and fixing content-related bugs.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Builder:

- Redesign the link creation modal to fix bugs when editing a valid link's text.
- Redesign the folder creation and editing modals for improved functionality.

## Apps:

- **Quiz**:
  - Translate various question types for better accessibility.
  - Allow repeated words in "Fill the Blanks" questions.

## Backend:

- Add support for tags by creating tag and item-tag entities, and introduce an endpoint to retrieve tags for items.
- Include a temperature parameter in chatbot API queries for customization.
- Rename item tag settings (hidden, public) as item visibility.
- Correct the password reset email to include accurate content.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
