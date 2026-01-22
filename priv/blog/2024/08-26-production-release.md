---
title: August 26th, Updates
description: Updates to the Graasp platform
date: 2024-08-26
authors:
  - graasp
---

We are working hard behind the scenes to optimize the platform and provide a better user experience. In this post we detail what we have done in the last two weeks and the changes that you will be able to enjoy right now on the platform. Read further for details!

<!-- truncate -->

## Account

- Add a data export button allowing users to export all the data that is linked to them.
- Add an interface that shows users a list of their files, allowing them to take decisions and provide visibility on which files take up storage in their account.

## Builder

- Improve translations
- Improve the sharing workflow performance by porting the logic to the backend

## Player

- Send an action when user collapses and un-collapses an element, so these traces can be viewed in the analytics

## Auth

- Improve translations

## Analytics

- Add a date-picker to select the date-range for displaying action in the item analytics page

## Backend

- Improve the behavior of the suffix applied to elements that are copied or duplicated. By taking into account the elements at the destination of the copy we are able to apply a suffix that is context aware.
- The validation process before publishing elements now takes into account the custom thumbnails of elements to ensure a safer browsing experience in the library.
- Generate thumbnails for PDF documents for an improved visual appearance in the builder
- Implement a membership request mechanism, more information on this later !
- Document our API with a Swagger page. This allows us to have a better visibility on what we are exposing and improving the syntax of the interface that we are providing to developers.

<!-- Generic message -->

We warmly welcome and encourage feedback from our users to continuously improve our platform. You can contact us by email [admin@graasp.org](mailto:admin@graasp.org) or by submitting an issue in this [Github repository](https://github.com/graasp/graasp-feedback).
