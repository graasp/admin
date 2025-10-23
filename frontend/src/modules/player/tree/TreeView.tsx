import type { JSX } from 'react';
import AccessibleTreeView, {
  INode,
  INodeRendererProps,
  flattenTree,
} from 'react-accessible-treeview';

import { Box, SxProps, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  ItemType,
  UnionOfConst,
  getIdsFromPath,
} from '@graasp/sdk';

import { ErrorBoundary } from '@sentry/react';

import { TreeNode } from './Node';
import { TreeErrorBoundary } from './TreeErrorBoundary';
import { ItemMetaData, buildItemsTree } from './utils';

export const GRAASP_MENU_ITEMS = [ItemType.FOLDER, ItemType.SHORTCUT];

type TreeViewProps = {
  id: string;
  header?: string;
  rootItems: DiscriminatedItem[];
  items?: DiscriminatedItem[];
  onTreeItemSelect?: (value: string) => void;
  onlyShowContainerItems?: boolean;
  firstLevelStyle?: object;
  sx?: SxProps;
  itemId: string;
  /**
   * Item whose type is not in the list is filtered out. If the array is empty, no item is filtered.
   */
  allowedTypes?: DiscriminatedItem['type'][];
};

export function TreeView({
  id,
  header,
  items,
  rootItems,
  onTreeItemSelect,
  allowedTypes = [],
  firstLevelStyle,
  sx = {},
  itemId,
}: Readonly<TreeViewProps>): JSX.Element {
  const itemsToShow = items?.filter((item) =>
    allowedTypes.length ? allowedTypes.includes(item.type) : true,
  );
  const focusedItem = itemsToShow?.find((i) => i.id === itemId);

  // types based on TreeView types
  const onSelect = (value: string) => {
    onTreeItemSelect?.(value);
  };

  const nodeRenderer = ({
    element,
    getNodeProps,
    isBranch,
    isSelected,
    isExpanded,
    level,
  }: INodeRendererProps) => (
    <TreeNode
      element={element as INode<ItemMetaData>}
      getNodeProps={getNodeProps}
      isBranch={isBranch}
      isSelected={isSelected}
      isExpanded={isExpanded}
      level={level}
      firstLevelStyle={firstLevelStyle}
      onSelect={onSelect}
    />
  );

  const itemTree = buildItemsTree(itemsToShow ?? [], rootItems);
  const tree = Object.values(itemTree);

  const defaultExpandedIds = rootItems[0]?.id ? [rootItems[0].id] : [];

  const selectedIds = itemId ? [itemId] : [];
  const expandedIds = focusedItem
    ? getIdsFromPath(focusedItem.path)
    : defaultExpandedIds;

  // need to filter the expandedIds to only include items that are present in the tree
  // we should not include parents that are above the current player root
  const availableItemIds = itemsToShow?.map(({ id: elemId }) => elemId);
  // filter the items to expand to only keep the ones that are present in the tree.
  // if there are no items in the tree we short circuit the filtering
  const accessibleExpandedItems = availableItemIds?.length
    ? expandedIds.filter((e) => availableItemIds?.includes(e))
    : [];

  return (
    <ErrorBoundary fallback={<TreeErrorBoundary />}>
      <Box
        id={id}
        sx={{
          ml: -1,
          '.tree, .tree-node, .tree-node-group': {
            listStyle: 'none',
            paddingInlineStart: 'unset',
            paddingLeft: '17px',
          },
          ...sx,
        }}
      >
        {header && (
          <Typography sx={{ ml: 2, fontWeight: 'bold' }} variant="body1">
            {header}
          </Typography>
        )}
        <AccessibleTreeView
          defaultExpandedIds={defaultExpandedIds}
          data={flattenTree<{ type: UnionOfConst<typeof ItemType> }>({
            // here there should be a root item for all children which basically is gonna be an empty name
            name: '',
            children: tree,
          })}
          nodeRenderer={nodeRenderer}
          selectedIds={selectedIds}
          expandedIds={accessibleExpandedItems}
        />
      </Box>
    </ErrorBoundary>
  );
}
