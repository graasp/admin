%{
title: "Items",
tags: ["builder"],
order: 20
}

---

## What is an item?

An **item** represents a piece of content within Graasp. It can be one of the following types:

- **Folder**: An ordered set of other items, very useful for structuring your contont hierarchically.
- **Text**: A formatted document with support for rich text and HTML editing.
- **Link**: An external web resource, either as clickable links or embedded content (e.g., YouTube videos, learning apps, Wikipedia). Note that some websites cannot be embedded due to restrictions.
- **Application**: An interactive application. Graasp provides a list of curated web apps to add interactivity to your content.
- **Etherpad**: A real-time collaborative text editor. You can choose to allow readers to edit as well.
- **Shortcut**: a link to an item located in another folder for easier navigation.
- **Files**: An uploaded file, for example an image or a pdf. You can upload maximum 1GB per file.
- **H5P**: An interactive HTML application for education.

### Shortcuts {: #shortcuts}

Shortcuts in Graasp are special items that allow users to create links to existing items. Instead of duplicating content, a shortcut references the original item from another location in the hierarchy.

Shortcuts can link to any items, however access to a shortcut depends on permissions for the original item.

#### Shortcut vs Copy

| Feature   | Shortcut                    | Copy                |
| --------- | --------------------------- | ------------------- |
| Storage   | No duplication              | Creates a new item  |
| Updates   | Mirrors changes in original | Independent         |
| Ownership | Points to original owner    | New owner           |
| Use case  | Cross-linking               | Content duplication |

#### Navigation

In Builder and Player, navigating through a shortcut to an item within the same context (internal shortcuts) will stay in the same context. However navigating through a shortcut to an external item (external shortcut) will change the context.

Internal shortcuts to folders are not displayed in the sidebar navigation, but external shortcuts are as well as shortcuts to non-folder items.

#### Limitations

- Shortcuts depend on access to the original item. Moving the original item might affect the shortcut.
- Deleting the original item breaks all related shortcuts.
- Some actions (such as editing content) always apply to the original item, not the shortcut.
- Copying the hierarchy containing a shortcut might break the reference. Let's say shortcut S1 targets an item I1 inside folder F. If the folder F is copied, it will create a new item I2, and a new shortcut S2 but this shortcut will still link to I1.
