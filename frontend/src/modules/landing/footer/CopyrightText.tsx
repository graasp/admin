import { useState } from 'react';

import { Typography } from '@mui/material';

import { usePreviewMode } from '~landing/preview/PreviewModeContext';

export function CopyrightText() {
  const [clickCounter, setClickCounter] = useState(0);
  const { togglePreview, isEnabled: isPreviewEnabled } = usePreviewMode();

  const handleClick = () => {
    if (clickCounter === 2) {
      togglePreview();
      // reset counter
      setClickCounter(0);
    } else {
      setClickCounter((s) => s + 1);
    }
  };
  return (
    <Typography
      textAlign="center"
      variant="note"
      onClick={handleClick}
      sx={{ userSelect: 'none' }}
    >
      &copy; Graasp 2014 - {new Date().getFullYear()}
      {isPreviewEnabled ? ' (preview)' : ''}
    </Typography>
  );
}
