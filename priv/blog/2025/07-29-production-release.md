---
title: July 29th, Updates
description: Updates to the Graasp platform
date: 2025-07-29
authors:
  - graasp
---

The Graasp team continues to improve the platform in different directions, focusing on consolidating the foundations, from the interfaces to server optimizations. You can find a more detailed list of the changes below.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Update to the available AI models

The Graasp platform has a few integration with conversational agents (through OpenAI). In this update we have upgraded the models we support to make them faster and more efficient.
We now default to [`GPT 4o-mini`](https://platform.openai.com/docs/models/gpt-4o-mini) (previously this was [`GPT 3.5 turbo`](https://platform.openai.com/docs/models/gpt-3.5-turbo)).
Other available options are:

- [`GPT 4.1 nano`](https://platform.openai.com/docs/models/gpt-4.1-nano): allows for a larger context window (up to 1M) and benefits of a later knowledge cut-off (model was trained with data up to June 01 2024)

## Update to the chatbot app

The chatbot app available inside Graasp has been updated to support a simple and user-friendly interface for defining example interactions.

## Library

- When searching across different criteria (`discipline`, `level`, `resource-type`), the selected language will be taken into account. This will narrow down the choices and present more relevant suggestions to the user.
- Fix an issue where the `/all-collections` page of the library would not forward the search parameters to the new `/search` page. This affected mostly search engine results that would not display the expected result due to missing URL Search parameters.
- Improve spacial awareness in the library by displaying the currently active page in the header. The styling of the links in the header was also updated.
- Fix an issue in the collection page. The "copy link" feature copied an invalid link to the clipboard. It will now copy the correct link to view the collection in the player interface.
- Improve the display of collection title. Titles will now be displayed in full without truncation or ellipsis.
- Update the library favicon to make it consistent with the brand image. The favicon is back to its blue-purple glory !
- Fix a compatibility issue on older devices. We reverted to use a wider available function, so all our users can experience the library.
- Fix a small layout issue in the library collection cards where a collection with a particularly long title could grow to an unwanted width.

## Other changes

As always we are committed to making the platform faster and more reliable for all our users.
With this update we improved on the following:

- Update French and German language translations
- Allow embedded applications to choose from more sizing options, so they can display their content as best as possible
- Update login button background color to ensure consistent visibility in the app header
- Improve item indexing mechanism: using a dedicated worker and more efficient data-fetching
- Fix a bug where email addresses could be saved with a mixed case. This affected the email update mechanism, where users could be locked out of the platform if they provided an email with mixed case. We now ensure saved emails are in lowercase when requesting an email change to prevent case sensitivity issues.
- Improve the password login workflow. The backend codebase is simpler and the client handles the redirection mechanism.
- Remove deprecated mobile sign in processes from the client.
- Manually set `secure: true` for smtp to comply with NodeJS warning (`smtps` is deprecated).
- Fix deleting items (permission check is fixed). Deleting items from the recycle bin is possible again.
- Optimize getting recycled items. Displaying the trash should be faster.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
