import type { JSX } from 'react';

import { Container, Typography, styled, useTheme } from '@mui/material';

import { TypographyLink } from '@/components/ui/TypographyLink.js';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

type Props = {
  link: string;
  id?: string;
  redirectionLinkText?: string;
  redirectionText?: string;
};

const StyledContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const RedirectionContent = ({
  link,
  redirectionText,
  redirectionLinkText,
  id,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <StyledContainer id={id}>
      <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
      <div>
        <StyledTypography variant="h4" align="center">
          {redirectionText ?? 'You are being redirected…'}
        </StyledTypography>
        <TypographyLink align="center" to={link}>
          {redirectionLinkText ??
            'Click here if you are not automatically redirected'}
        </TypographyLink>
      </div>
    </StyledContainer>
  );
};

export default RedirectionContent;
