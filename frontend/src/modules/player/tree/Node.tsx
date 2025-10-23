import type { JSX } from 'react';
import type { IBranchProps, INode, LeafProps } from 'react-accessible-treeview';

import { Box, IconButton, Typography, colors } from '@mui/material';

import { UUID } from '@graasp/sdk';

import { buildTreeItemClass } from '@/config/selectors';
import ItemIcon from '@/ui/icons/ItemIcon';

import { ItemMetaData } from './utils';

// Props here is passed from TreeView react-accessible-treeview component
export type NodeProps = {
  element: INode<ItemMetaData>;
  isBranch: boolean;
  isExpanded: boolean;
  level: number;
  isSelected: boolean;
  getNodeProps: () => IBranchProps | LeafProps;
  onSelect: (id: UUID) => void;
  firstLevelStyle?: object;
};

export function TreeNode({
  element,
  isBranch,
  isExpanded,
  getNodeProps,
  onSelect,
  level,
  isSelected,
  firstLevelStyle = {},
}: Readonly<NodeProps>): JSX.Element {
  return (
    <Box
      {...getNodeProps()}
      className={`${buildTreeItemClass(element.id as string)}`}
      display="flex"
      alignItems="center"
      sx={{
        width: '100%',
        pl: 1,
        background: isSelected ? colors.deepPurple[50] : 'none',
      }}
    >
      {/* icon type for root level items */}
      {level === 1 && element.metadata?.type && (
        <ItemIcon
          size="17px"
          alt="icon"
          type={element.metadata.type}
          mimetype={element.metadata.mimetype}
        />
      )}
      {level !== 1 && isBranch && (
        <IconButton
          sx={{
            p: 0,
            '&:hover': {
              opacity: 0.6,
            },
          }}
        >
          {/* lucid icons */}
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5050d2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5050d2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
          )}
        </IconButton>
      )}
      <Typography
        component="button"
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          gap: '4px',
          justifyItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        onClick={(e) => {
          // to prevent folding expanded elements by clicking the name
          if (isExpanded) {
            e.preventDefault();
          }
          onSelect(element.id as UUID);
        }}
      >
        <span
          style={{
            ...(level === 1 ? firstLevelStyle : {}),
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {element.name}
        </span>
      </Typography>
    </Box>
  );
}
