import {
  DiscriminatedItem,
  ItemType,
  UnionOfConst,
  getMimetype,
  getParentFromPath,
} from '@graasp/sdk';

type ItemIdToDirectChildren = {
  [nodeId: string]: DiscriminatedItem[];
};

/**
 * build parent -> children map
 * items without parent are not in the map
 */
const createMapTree = (data: DiscriminatedItem[]): ItemIdToDirectChildren =>
  data.reduce<ItemIdToDirectChildren>((treeMap, elem) => {
    const parentId = getParentFromPath(elem.path);
    if (parentId) {
      treeMap[parentId] = (treeMap[parentId] ?? []).concat([elem]);
    }
    return treeMap;
  }, {});

// we can't pass all the item as metadata because nested objects are currently not supported by the library.
// we expose the mimetype on the first level of metadata so it can be accessed and the icons of the files can be rendered
export type ItemMetaData = {
  type: UnionOfConst<typeof ItemType>;
  mimetype?: string;
};

type PartialItemWithChildren = {
  id: string;
  name: string;
  metadata: ItemMetaData;
} & {
  children?: PartialItemWithChildren[];
};

type TreeNode = {
  [nodeId: string]: PartialItemWithChildren;
};

// handle item children tree
export const buildItemsTree = (
  data: DiscriminatedItem[],
  rootItems: DiscriminatedItem[],
) => {
  const tree: TreeNode = {};
  if (data.length === 1) {
    // this for non children one item as tree map build based on children to parent relation
    tree[data[0].id] = {
      id: data[0].id,
      name: data[0].name,
      metadata: { type: data[0].type, mimetype: getMimetype(data[0].extra) },
      children: [],
    };
  }
  const mapTree = createMapTree(data);

  const buildTree = (node: DiscriminatedItem) => {
    if (node.type === ItemType.FOLDER && mapTree[node.id]) {
      const children = mapTree[node.id] ?? [];

      const entry: PartialItemWithChildren = {
        id: node.id,
        name: node.name,
        metadata: { type: node.type },
        children: children.map((child) => buildTree(child)),
      };
      return entry;
    }
    // root items are not in the map
    return {
      id: node.id,
      name: node.name,
      metadata: {
        type: node.type,
        mimetype: getMimetype(node.extra),
      },
    };
  };

  rootItems.forEach((ele) => {
    tree[ele.id] = buildTree(ele);
  });

  return tree;
};
