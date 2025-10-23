import { styled } from '@mui/material';

const baseIllustrationImageStyle = {
  // needed so image does not bleed out
  width: '100%',
  objectFit: 'cover',

  minHeight: '0px',
  minWidth: '0px',
} as const;

export const ZoomingImage = styled('img')(() => ({
  ...baseIllustrationImageStyle,

  // add a small zoom effect
  transition: 'all cubic-bezier(.75,.1,.24,.94) 250ms',
  transform: 'scale(1)',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const Image = styled('img')(() => ({
  ...baseIllustrationImageStyle,
}));
