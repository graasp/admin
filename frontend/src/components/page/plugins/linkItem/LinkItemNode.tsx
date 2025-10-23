/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { JSX } from 'react';

import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
  $createNodeSelection,
  $setSelection,
  DOMConversionMap,
  DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type ElementFormatType,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type Spread,
} from 'lexical';

import { LinkItemForPage } from './LinkItemForPage';

export type SerializedLinkItemNode = Spread<
  {
    url: string;
    layout: Layout;
    type: 'linkItem';
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

export type Layout = 'embed' | 'button' | 'text';

function $convertLinkItemElement(
  domNode: HTMLDivElement,
): DOMConversionOutput | null {
  const layout: Layout =
    (domNode.getAttribute('data-lexical-link-item-layout') as Layout) ?? 'text';
  if (layout) {
    const node = $createLinkItemNode({
      layout: layout,
      url: domNode.getAttribute('href') ?? '',
    });
    return { node };
  }
  return null;
}

export class LinkItemNode extends DecoratorBlockNode {
  __url: string;
  __layout: Layout;

  static getType(): string {
    return 'linkItem';
  }

  static clone(node: LinkItemNode): LinkItemNode {
    return new LinkItemNode(
      node.__url,
      node.__layout,
      node.__format,
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedLinkItemNode): LinkItemNode {
    const node = $createLinkItemNode({
      url: serializedNode.url,
      layout: serializedNode.layout,
    });
    node.setFormat(serializedNode.format);
    return node;
  }

  constructor(
    url: string,
    layout?: Layout,
    format?: ElementFormatType,
    key?: NodeKey,
  ) {
    super(format, key);
    this.__url = url;
    this.__layout = layout ?? 'button';
  }

  static importDOM(): DOMConversionMap<HTMLDivElement> | null {
    return {
      a: () => {
        return {
          conversion: $convertLinkItemElement,
          priority: 2,
        };
      },
    };
  }

  getLayout(): Layout {
    return this.__layout;
  }

  getUrl(): string {
    return this.__url;
  }

  exportJSON(): SerializedLinkItemNode {
    return {
      ...super.exportJSON(),
      type: 'linkItem',
      version: 1,
      url: this.getUrl(),
      layout: this.getLayout(),
    };
  }
  exportDOM(): DOMExportOutput {
    const element = document.createElement('a');
    element.setAttribute('href', this.__url);
    element.setAttribute('data-lexical-link-item-layout', this.__layout);
    return { element };
  }

  changeLayout(editor: LexicalEditor) {
    return (layout: Layout) => {
      editor.update(() => {
        const writable = this.getWritable();
        writable.__layout = layout;
      });
    };
  }

  changeUrl(editor: LexicalEditor) {
    return (url: string) => {
      editor.update(() => {
        const writable = this.getWritable();
        writable.__url = url;
      });
    };
  }

  select(editor: LexicalEditor) {
    editor.update(() => {
      const nodeSelection = $createNodeSelection();
      nodeSelection.add(this.getKey());
      $setSelection(nodeSelection);
    });
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };

    const isEditable = editor.isEditable();

    return (
      <LinkItemForPage
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        url={this.__url}
        layout={this.__layout}
        onLayoutChange={this.changeLayout(editor)}
        onUrlChange={this.changeUrl(editor)}
        canEdit={isEditable}
        isResizable={isEditable}
        onClick={(e) => {
          e.stopPropagation();
          this.select(editor);
        }}
      />
    );
  }
}

export function $createLinkItemNode(params: {
  url: string;
  layout?: Layout;
}): LinkItemNode {
  return new LinkItemNode(params.url, params.layout);
}

export function $isLinkItemNode(
  node: LinkItemNode | LexicalNode | null | undefined,
): node is LinkItemNode {
  return node instanceof LinkItemNode;
}
