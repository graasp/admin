import { type JSX, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';

import { styled } from '@mui/material';

import katex from 'katex';

declare const window: Window &
  typeof globalThis & {
    katex: typeof katex;
  };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.katex = katex;

const TEXT_EDITOR_TOOLBAR = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }], // default colors depending on theme
  [{ background: [] }], // default colors depending on theme
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, 'code-block', 'link', 'formula'],
];

const TEXT_EDITOR_MIN_HEIGHT = 200;
const TEXT_EDITOR_MAX_HEIGHT = 400;

const Div = styled('div')(({ theme }) => ({
  width: '100%',
  '.ql-tooltip': {
    zIndex: theme.zIndex.tooltip,
  },
  '& .ql-editor': {
    // adapt height if read only
    minHeight: TEXT_EDITOR_MIN_HEIGHT,
    // necessary styles to avoid window scrolling top on paste
    // set a max height only on edition
    maxHeight: TEXT_EDITOR_MAX_HEIGHT,
    overflow: 'auto',

    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },
  },
  '& .ql-container': {
    // use font size from mui theme
    fontSize: 'unset',
  },
}));

export type TextEditorProps = {
  id?: string;
  onChange?: (text: string) => void;
  placeholderText: string;
  value?: string;
};

const TextEditor = ({
  id,
  onChange,
  placeholderText,
  value,
}: TextEditorProps): JSX.Element | null => {
  const editorRef = useRef<ReactQuill>(null);
  const onTextChange: ReactQuill.ReactQuillProps['onChange'] = (
    text: string,
    _delta,
    source,
  ): void => {
    if (source === 'user') {
      onChange?.(text);
    }
  };

  // this hack is necessary because the "placeholder" prop does not update
  // see: https://github.com/zenoamaro/react-quill/issues/340
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getEditor().root.dataset.placeholder = placeholderText;
    }
  }, [placeholderText]);

  return (
    <Div>
      <ReactQuill
        ref={editorRef}
        id={id}
        placeholder={placeholderText}
        theme="snow"
        value={value}
        onChange={onTextChange}
        modules={{
          toolbar: TEXT_EDITOR_TOOLBAR,
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </Div>
  );
};

export default TextEditor;
