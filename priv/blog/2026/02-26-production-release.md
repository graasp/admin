---
title: February 26th, Updates
description: Updates to the Graasp platform
date: 2026-02-26
authors:
  - graasp
---

We are continuing to deliver broad improvements and fixes based on feedback from our users. In this release, we have fully integrated the Support and Blog pages directly into the Graasp environment, making them easier to access and navigate. You can read below for the complete list of changes included in this release.

<!-- Everything below this will not be shown in the post overview -->

<!-- truncate -->

## Blog and Support pages

In addition to a revamp of the homepage, the Blog and Support pages are now fully integrated within Graasp. Previously hosted on separate websites, these resources are now part of the main platform, providing a more consistent and streamlined user experience. Users can stay up to date with the latest news and updates and easily access help and documentation without leaving the application.

If you are interested in specific support documentation or would like us to cover a particular topic, please let us know.

![blog and support pages on homepage](/images/blog/2026-02-26-blog-support-homepage.png)

## Interface Improvements

- Users can now subscribe to and unsubscribe from marketing email notifications directly from their preferences.
- Document items can be exported in HTML format (instead of `.graasp` files), providing greater flexibility for sharing and integration with other platforms.
- Based on a user's request, the chatbot app now features conversations, allowing users to start over interactions with the bot without loosing data. In addition, the analytics dashboard's height has been increased to improve readability and overall usability.
- Based on a user's request, internal shortcuts are hidden from the sidebar navigation. You can find more information on [the items' documentation](/docs/builder-item-creation#shortcuts).

## Server Improvements

- The codebase has been improved by synchronizing types across the application, increasing development accuracy and overall reliability.
- The thumbnail upload process has been enhanced by teeing the input stream to ensure more robust file handling and memory usage.
- The saving process for H5P files has been improved, particularly when uploading files with custom filenames, fixing later problems on copy. Thanks for reporting the bug!

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
