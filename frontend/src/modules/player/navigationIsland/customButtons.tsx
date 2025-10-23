import { forwardRef } from 'react';

import { Theme, styled } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

const baseStyle = (theme: Theme) => ({
  // remove default button borders
  border: 'unset',
  // set padding for icon
  padding: '8px',
  // transition smoothly between colors
  transition: 'all ease 100ms',
  // round the corners
  borderRadius: theme.spacing(1),
  // set a fixed height 8 + 8 for padding + 24 for the icon height
  height: '40px',
  width: '40px',
  '&:hover': {
    cursor: 'pointer',
  },
  // since not using `button` but `a` tags, they are not "disabled" in the css sense, so we use the disabled attribute
  '&[disabled] svg': {
    color: 'gray',
  },
  // since not using `button` but `a` tags, they are not "disabled" in the css sense, so we use the disabled attribute
  '&[disabled]': {
    backgroundColor: '#e9e9e9',
    cursor: 'not-allowed',
  },
});

export const LoadingButton = styled('button')(({ theme }) => ({
  ...baseStyle(theme),
  animation: `skeletonAnimation 2s ease-in-out 0.5s infinite`,
  '@keyframes skeletonAnimation': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.4 },
    '100%': { opacity: 1 },
  },
}));

export const ToolButton = styled('button')(({ theme }) => ({
  ...baseStyle(theme),
  backgroundColor: '#CEE5FF',
  '& svg': {
    color: '#00639A',
  },
  // since not using `button` but `a` tags, they are not "disabled" in the css sense, so we use the disabled attribute
  '&:hover:not([disabled])': {
    backgroundColor: '#A2CEFF',
  },
}));

const StyledNavigationButton = styled('a')(({ theme }) => ({
  ...baseStyle(theme),
  backgroundColor: '#E4DFFF',
  '& svg': {
    color: theme.palette.primary.main,
  },
  // since not using `button` but `a` tags, they are not "disabled" in the css sense, so we use the disabled attribute
  '&:hover:not([disabled])': {
    backgroundColor: '#BFB4FF',
  },
}));

const StyledNavigationComponent = forwardRef<
  HTMLAnchorElement,
  { id?: string }
>((props, ref) => {
  return <StyledNavigationButton ref={ref} {...props} />;
});

const CreatedLinkComponent = createLink(StyledNavigationComponent);

export const NavigationButton: LinkComponent<
  typeof StyledNavigationComponent
> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
