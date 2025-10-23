# Display the list of uploaded files in the Storage interface

This document lays down the specifications for a complement to the "Storage" page.

This complement displays a list of the files owned by the user, sorted by size.
This complement allows identification of the specific files that fill up the user storage quota.

## Goals

We define an API allowing to retrieve the list of the largest files owned by the user. This API should be used by the frontend to inform the user of which files take up storage space, helping them decide how to free-up some storage.

## Description

This feature allows users to easily see all their uploaded files, along with their names, where they are located, and their sizes, making it simpler to find which files are the biggest and take action to free some storage space.

Here is a user story:

```txt
  As a user with little available space left,
  I want to see which files take up the most space,
  so I can free some storage.
```

## Definition

### Endpoint Specification

- The route requires authentication to ensure that only logged-in users can access their uploaded files.

  > **Remark**: Currently storage is computed on items where the user is the creator. This can lead to issues where you lost admin rights on the file but your are still the creator. This issue should be handled later and is mentioned only here for reference.

- No additional rights or conditions are needed beyond standard authentication.

- Route `GET /members/current/storage/files?page=2&pageSize=20`

- Query string parameters: query string parameters are needed for pagination

  - page: The page number to fetch
    - type: integer
    - required: true
    - min: 0
  - pageSize: The number of items per page
    - type: integer
    - required: false
    - default: 10
    - min: 1
    - max: 50

- No request body is needed

- Shape of the returned data:

  ```json
  {
    "data": [
      {
        "id": "UUID", // Item's id as a uuid v4
        "name": "string", // Name of the file
        "size": "number", // Size of the file in bytes (positive integer)
        "updatedAt": "string", // Date and time when the item was updated
        "path": "LTree", // Location of the file
        "parent": {
          // Parent folder details (undefined if item is root)
          "id": "UUID", // Parent id as a uuid v4
          "name": "string" // Name of the parent item
        }
      }
    ],
    "pagination": {
      "totalItems": 100, // Total number of items
      "page": 2, // Current page number
      "pageSize": 20 // Number of items per page
    }
  }
  ```

- Example of the returned data:

  - 200: OK

    ```json
    {
      "data": [
        {
          "id": "b0bd68a8-6071-418c-9599-18ecb76b7b22",
          "name": "Document1.pdf",
          "size": 102400,
          "updatedAt": "2024-07-01T12:00:00Z",
          "path": "3ac6dfb2_92f0_4013_b933_1a32d5687870.b0bd68a8_6071_418c_9599_18ecb76b7b22",
          "parent": {
            "id": "3ac6dfb2-92f0-4013-b933-1a32d5687870",
            "name": "Documents"
          }
        },
        {
          "id": "4de1b419-38cd-46e5-81f2-916150819175",
          "name": "Image1.png",
          "size": 204800,
          "updatedAt": "2024-07-02T14:30:00Z",
          "path": "28c849e2_604b_430c_aa0a_7d2630291b07.4de1b419_38cd_46e5_81f2_916150819175",
          "parent": {
            "id": "28c849e2-604b-430c-aa0a-7d2630291b07",
            "name": "Images"
          }
        },
        {
          "id": "b485360b-f94c-4cb1-8e49-db0b6db4e15b",
          "name": "Presentation.pdf",
          "size": 512000,
          "updatedAt": "2024-07-03T09:15:00Z",
          "path": "b485360b_f94c_4cb1_8e49_db0b6db4e15b"
          // the item has no parent
        }
      ],
      "pagination": {
        "totalItems": 100,
        "page": 2,
        "pageSize": 20
      }
    }
    ```

- What are the possible failures?

  - 401 Unauthorized:

    Authentication Failure, User is not authenticated or token is invalid.

    ```json
    {
      "status": "error",
      "error_code": "401",
      "message": "User not authenticated."
    }
    ```

  - 400 Bad request:

    Invalid query parameters, the query parameters are missing or invalid.

    ```json
    {
      "status": "error",
      "error_code": "400",
      "message": "Invalid query parameters"
    }
    ```

  - 500 Internal Server Error:

    Server Error, internal server error occurs while processing the request.

    ```json
    {
      "status": "error",
      "error_code": "500",
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

## Frontend design

- This is implemented as a hook because we are fetching data from the backend to display in the frontend UI.
- Parameters for the hook will include:

  - page: The page number to fetch.
  - pageSize: The number of items per page.

  These parameters will map to the query string parameters used in the backend endpoint (`/members/current/storage/files?page=2&pageSize=20`).

## Backend design

> TO BE ADDED: link to the specification written in the backend
