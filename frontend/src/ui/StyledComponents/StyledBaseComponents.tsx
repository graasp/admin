import {
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  type JSX,
} from 'react';

import { SxProps, styled } from '@mui/material';

type ImageProps = {
  sx?: SxProps;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const StyledImage = (props: ImageProps): JSX.Element => {
  const StyledTag = styled('img')({});
  return <StyledTag {...props} />;
};

type DivProps = {
  sx?: SxProps;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StyledDiv = (props: DivProps): JSX.Element => {
  const StyledTag = styled('div')({});
  return <StyledTag {...props} />;
};

export { StyledImage, StyledDiv };
