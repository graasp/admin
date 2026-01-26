---
title: March 17th, Updates
description: Updates to the Graasp platform
date: 2025-03-17
authors:
  - graasp
---

The team is currently working on a consequent refactor of the backend, in the meantime, enjoy some bug fixes that were reported. Read further for more details.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Fixed an issue with PDF files auto-downloading as soon as element is opened

Thanks to the feedback of a user, an annoying bug was detected. The bug affected PDF items created by copy. The copied PDF files would automatically download when opened (in the builder and player view) instead of displaying as usual causing inconveniences and readability issues.

We deployed a fix that will ensure future copies are not affected. So, if you copy a PDF file starting today, you should not be affected by the bug. Please let us know if it still happens to you.

> #### How do I stop my PDF files from automatically downloading when I open them? {: .info}
>
> If you have PDF files that exhibit the faulty behavior, you should download them, then delete the faulty copy. You should create them again by uploading the downloaded PDF or creating it from a fresh copy of the known good file. Once done, the PDF file should not download automatically anymore.

## Fixed an issue affecting sub-elements not displaying in the Trash

When deleting an element with a parent (sub-element), under particular conditions, it would not appear in the Trash. As this issue affected users that were afraid of having lost content, it was quickly fixed by the team.
Users should now be able to see and restore sub-elements from the Trash to retrieve wrongfully removed content.
Important to note that the displayed total count of deleted items could be incorrect (the displayed number can be higher than expected). A fix to correct this error will follow soon.

## Others

### Library (details)

- Fix card thumbnail sizing in Safari
- Fix card padding on mobile screens

### Backend (details)

- Add backend implementation for deleting and uploading many files at once
- Fix erroneous copy of files (path, remove automatic content disposition to attachment and cache-control)
- Recycle bin shows deleted children (whose membership are inherited). Total count can be over-shooting.
- Fix link URL in membership request notification email

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
