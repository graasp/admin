import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function DebugPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      // The latest EditorState can be found as `editorState`.
      // To read the contents of the EditorState, use the following API:

      console.debug(editorState);

      editorState.read(() => {
        // Just like editor.update(), .read() expects a closure where you can use
        // the $ prefixed helper functions.
      });
    });
  });

  return null;
}
