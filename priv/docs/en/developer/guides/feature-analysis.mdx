# ⚙️ Feature Analysis

This document will guide you through the important questions you need to ask yourself when you start the analysis phase for the creation of a new feature.

:::info
Before going further in this document it is important that you ensure the feature should be implemented.

Please check the feature relevance with [Should we implement this ?](./should-we-implement-this).

Refer to that document in case you end up with a "Reconsider" or "Maybe not". This is also a good time to involve other team members and to have a discussion about what you expect from this feature, and what value it will provide to the users.
:::

:::danger
You should **not start implementing/coding** before you have validated this document with your peers.
:::

## Goals

This document is intended as a reflection guide, when you are writing concrete specifications of your feature. It may not be complete, but should help you to ask the right questions and to plan beforehand. No coding is required to complete this document. However it should encourage you to think about the semantics of your feature and kickstart a discussion with other team members that should lead to a good design that is approved by all and is in line with the current practices of the team and the project.

If you complete this guide, it should reduce the possibility of surprises, redesigns during the Pull review step and overall create a more enjoyable experience for everyone. The added benefit is also that you will already have a complete documentation of your feature ready to include alongside your code for future reference.

## Design Questions

### API design reflection

### Description

- Describe in a single sentence the feature and its value for the end-user. Don't use technical language, your grandma should be able to understand it.
- Write a [user story](https://www.atlassian.com/agile/project-management/user-stories) that justifies the need for this feature. Example: If the feature is to add a logout button, the user story could be:
  
  ```txt
  As a logged in user,
  I want to disconnect from my account,
  so that someone else can access their account.
  ```

### Definition

The following questions focus on a single endpoint. For your feature you might require a set of endpoints to be used, repeat the steps for each of them.

- Does the route require authentication?
- Does the route require additional rights or conditions specific to the filed/app?
- What should the route be named?
  - Define the HTTP method used (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `HEAD`,...)
  - Define the url path that you want to use. Does it need to include parameters like a resource id?
  - Define if you need query string parameters.
  - Define if you will send a body in the request (only possible with some HTTP methods)
- Will data be returned? (some routes might not need to return data after a successful operation)
  - Define the shape of the returned data.
  - Define any specific constraint (type, format, ...) on that data.
- What happens on failure?
  - What can cause a failure?
  - What error code and error data is used? You should define specific  error codes and error messages for each failure type.

### Ensure integrity and conformance with other routes

- Does it align with the other routes next to it? Ensure consistency of routes and respect naming conventions. Kebab case should be prioritized if you need multiple words in your url segments (i.e: `/member-info` is preferred over `/memberInfo` but maybe you should use `/member/info` ?)

### Frontend design

Now that you have defined the contract that the front end and the backend will respect, it is time to define specifics for the frontend.

- Is this a hook or a mutation? Hooks should be preferred for getting data. Mutations are preferred for actions (posting, patching, deleting) that happen on user input.
- What are the parameters of the hook/mutation? They can map with the parameters accepted by the route, some could be inferred by the context, others can come from the user.

### Backend design

You defined the interface in the previous steps, now is time to define the internals of how this will be implemented and the size of the work needed to get to a working feature.

- Where should this go? Is this a new service? Does it extend an already existing service?
- Will this update a table? How will previous data be affected?
- Do we need to create a new entity? What will the table shape be?

Consider whether you will create shared types to represent the data that is returned by the endpoint.

## Important considerations

- Don't optimize too soon.
- Don't over-engineer it.
