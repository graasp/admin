---
title: October 18th, Updates
description: Updates to the Graasp platform
date: 2024-10-18
authors:
  - graasp
---

For a month, the team focused on optimization, improvement and bug fixes for the whole ecosystem. We also introduced the "Forgot Password" feature, you can find a tutorial in the docs as well. Read further for more details of the changes!

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Account

- **Complete translations**: Update the translations to provide the most accurate and localized content.
- **Set up Umami trackers**: Add Umami tracking to gather anonymous usage data for analytics.
- **Optimize avatar upload**: Remove the Uppy library to streamline the avatar upload process, improving speed and reducing dependencies.
- Update dependencies: Ensure third-party libraries are up-to-date for security and performance.
- Enhance DevOps and build processes

## Auth

- **Disallow special characters in usernames**: Restrict special characters in usernames to prevent validation issues and ensure compatibility.
- **Forgot Password**: Introduced a **Forgot Password** feature, allowing users to easily reset their password. Refer to the detailed steps in this [documentation](/user/account/forgot-password).
- **Update dependencies**: Keep authentication-related libraries up-to-date for enhanced security.

## Builder

- **Reduce item selection drag area**: Minimize the drag area when selecting items, re-enabling the ability to hover over and select text.
- **Display hidden settings in share tab**: Reveal hidden configuration options in the share tab and disable read memberships when necessary.
- **Fix content and navigation issues in edit modals**: Correct bugs affecting modal navigation and the content editing process.
- **Paginate recycled items**: Implement pagination for recycled items to improve performance and navigation.
- **Set up Umami trackers**: Add Umami tracking to gather anonymous usage data for analytics.
- **Complete translations**: Update the translations to provide the most accurate and localized content.
- Reduce file size for cropped thumbnails: Implement image compression techniques to reduce thumbnail file sizes without compromising quality.
- Upgrade react-query dependency to v5: Update to the latest react-query version to boost performance and make use of new functionality.
- Optimize thumbnail loading: Improve the performance of thumbnail fetching by optimizing requests for faster loading times.
- Optimize document form processes: Enhance form submission and document handling for improved efficiency.

## Player

- **Optimize thumbnail loading**: Enhance the performance of thumbnail fetching when loading items in the player.
- Upgrade react-query dependency to v5: Update to the latest react-query version to boost performance and make use of new functionality.

## Library

- **Display loading state during page fetches**: Show a loading indicator while collections are being fetched to improve user experience.
- Upgrade react-query dependency to v5: Update to the latest react-query version to boost performance and make use of new functionality.

## Backend

- **Optimize thumbnail loading and caching**: Improve backend performance by optimizing the way thumbnails are fetched and cached.
- **Fix pseudonymized login for child accounts**: Resolve an issue with login functionality for pseudonymized child accounts.
- **Improve OpenAPI specification**: Refine the OpenAPI specification for better API documentation and developer experience.
- **Disallow special characters in usernames**: Enforce stricter validation rules to prevent special characters in usernames.
- **Invalidate password reset links after use**: Automatically expire password reset links once they have been used to enhance security.
- Remove PATCH /items (multiple items) endpoint

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
