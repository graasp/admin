---
title: September 12th, Updates
description: Updates to the Graasp platform
date: 2025-09-12
authors:
  - graasp
---

With the start of the semester, we are working on some improvements to support your learning and teaching journey. This week we have made some improvements and fixed issues that were signaled by our users. You can find a detailed list of the changes below.

<!-- Everything below this will not be shown in the post overview -->
<!-- truncate -->

## Bug fixes

In this release we have fixed a few bugs.

### Adding specific tags when there are some other matches

Previously when adding tags to an item, for example when publishing it or in the settings view, it was not possible to add a new tag if there were some partial matches on already existing tags. We have fixed this issue and you should now be able to add any tag you desire. Start typing in the filed and pick it from the list!

In case you notice any issues, let us know by email: [admin@graasp.org](mailto:admin@graasp.org)

### Guests users should not see the language setting

Guest users (logged in via pseudo) should use the language of the item, thus showing them the language switch did not make sens.
We improved the application header for guests, so that it is tailored to their use-case.

### Content moderation update

We made some improvements to the content moderation engine we use to check published material. It should now provide us with more insights to help users when their content raises alarms. Let us know if you face any issues when publishing content. We would be glad to assist you.

### Architecture change

This one is a bit more technical, so no worries if it does not make a lot of sens.
We have moved our workloads to the ARM processor architecture. This should make our energy consumption lower and enable future proofing our service. Contact us if you would like to know more.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
