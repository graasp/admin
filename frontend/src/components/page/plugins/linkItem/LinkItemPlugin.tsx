/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { JSX, useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import {
  COMMAND_PRIORITY_EDITOR,
  LexicalCommand,
  createCommand,
} from 'lexical';

import { $createLinkItemNode, type Layout, LinkItemNode } from './LinkItemNode';

export const INSERT_LINK_ITEM_COMMAND: LexicalCommand<{
  url: string;
  layout?: Layout;
}> = createCommand();

export function LinkItemPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([LinkItemNode])) {
      throw new Error('LinkItemPlugin: LinkItemNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_LINK_ITEM_COMMAND,
      (payload) => {
        const linkNode = $createLinkItemNode(payload);
        $insertNodeToNearestRoot(linkNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
