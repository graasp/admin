import { useRef } from 'react';

import { PageItemType } from '@graasp/sdk';

import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ParagraphNode, TextNode } from 'lexical';

import { LinkItemNode } from './plugins/linkItem/LinkItemNode';
import { LinkItemPlugin } from './plugins/linkItem/LinkItemPlugin';
import './styles.css';
import { theme } from './theme';
import { useYjs } from './useYjs';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

type Props = {
  item: PageItemType;
};

export function PageReader({ item }: Readonly<Props>) {
  const { providerFactory } = useYjs({ edit: false });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [ParagraphNode, TextNode, LinkItemNode],
    editable: false,
  };

  return (
    <div ref={containerRef}>
      <LexicalComposer initialConfig={initialConfig}>
        <div style={{ width: '100%', height: '100vh' }}>
          <div className="editor-inner">
            <CollaborationPlugin
              id={item.id}
              providerFactory={providerFactory}
              // Unless you have a way to avoid race condition between 2+ users trying to do bootstrap simultaneously
              // you should never try to bootstrap on client. It's better to perform bootstrap within Yjs server.
              shouldBootstrap={false}
              cursorsContainerRef={containerRef}
            />
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={<ContentEditable />}
            />
            <LinkItemPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
