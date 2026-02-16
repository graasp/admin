%{
title: "Shuffling element in the player",
topics: ["player"]
}

---

# Shuffling

Shuffling is a hidden feature only available when adding a query parameter to the URL of the Graasp Player interface.
In this document, we describe how shuffling works.

## Query Parameter

The query parameter that needs to be added is `shuffle=true`.

## Behavior

Shuffling only shuffles the direct children of a root item, **excluding** the last child.
The last child is not shuffled to allow for experiments / learning experiences to have the same **first** and **last** items.
This means that the root item will always be displayed first and the last child will always be displayed last.
A member will always see an item shuffled in the same order.

## Randomization

Shuffling is achieved using the Fisher-Yates algorithm.
Randomization is based on seed that is calculated by adding the UUID of the member and the UUID of the root item.
