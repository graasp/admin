%{
title: "Introduction to Graasp Apps",
description: "",
order: 1,
tags: ["apps"]
}

---

The Graasp Platform supports interactive elements that are called `apps`. They are essentially single page web applications that can interact with the Graasp API (Application Programming Interface) allowing them to retrieve, and persist data as well as adapt what is show to users depending on the context.

Not all `apps` need to take advantage of these capabilities. We will differentiate 2 types of apps:

**Simulations**: Simple applications that do not need to save any state and always display the same view.

**Interactive Apps**: More complex applications that keep a state for the user and display different views depending on user permissions. There usually is a view for the teachers (administrators) and a view for the students (readers).

In the following documentation we will mostly focus on the **interactive apps** as they exploit the capabilities of the Graasp API. If you are interested in developing a **simulation** some parts of this documentation may still be relevant for you especially the deployment and integration parts.
