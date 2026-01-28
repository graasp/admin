---
title: May 30th, 2024 - New Features and Improvements
description: Fresh updates for the Graasp platform
date: 2024-05-30
authors:
  - graasp
---

The team has enhanced key areas of the ecosystem to improve the overall user experience. Plus, the mobile application got a new version out! Read more for details!

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Analytics

- Maintain selected filter values across different pages as the user navigates.
- Export actions are restricted to users with write permissions, providing an additional layer of security and data integrity.

## Builder

- Verify permissions for geolocation and hide the "Add Item" option if the user lacks write access to the parent item on the map.
- Track the layout mode within url, enabling users to directly access specific views.

## Player

- Display the current title page in the browser tab, improving navigation and context for users.
- Reduce the size of the island to hide buttons, optimizing the interface for better integration on smaller screens.
- Add loading state to navigation buttons
- Show back buttons after clicking on a shortcut
- Show map button if the item is geolocalized

## Backend

- Implement a password reset endpoint (development ongoing).
- Add an endpoint to retrieve the most-used apps per user, providing insights into user behavior and preferences.
- Integrate support for the GPT-4o model in the chatbot, enhancing its capabilities.
- Update some project dependencies to their latest versions, ensuring improved security and performance.
- Fix geolocation endpoint to return public items only when necessary.
- Fix geolocation value to contain inherited item.

## Mobile

- Enable scrolling when the keyboard is open on the home screen, improving user experience during input.
- Allow UUID input to navigate directly to a specific item.
- Fix a crash issue on iOS when viewing maps.
- Resolve an issue on iOS where QR codes could not be read and adding a close button to the camera view for better usability.
- Add a map button to the Shared Elements screen.
- Request location permissions from the app configuration, ensuring proper functionality and compliance.
- Automatically set the default language to the phone's language when the user is signed out.
- Eliminate the recurring toast notification upon signing out.
- Close the menu immediately after a bookmark is added or removed.
- Enable navigating between items within the library collection.
- Prefill the library search field with "graasper" by default.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
