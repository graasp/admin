import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Stack, Typography, useTheme } from '@mui/material';

import { ArrowRightIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { REDIRECTION_CONTENT_CONTAINER_ID } from '@/config/selectors';
import GraaspLogo from '@/ui/GraaspLogo/GraaspLogo';

import { AUTH } from '~auth/langs';

type Props = {
  children: ReactNode;
};

export function Redirection({ children }: Readonly<Props>) {
  const theme = useTheme();
  const { data: member } = hooks.useCurrentMember();
  const { t } = useTranslation(NS.Auth);

  if (member) {
    return (
      <Container
        id={REDIRECTION_CONTENT_CONTAINER_ID}
        sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
          <Stack direction="column" alignItems="center" gap={2}>
            <Typography variant="h2">
              {t(AUTH.REDIRECTION_TITLE, { name: member.name })}
            </Typography>
            <Typography
              maxWidth="50ch"
              variant="caption"
              fontStyle="italic"
              align="center"
            >
              {t(AUTH.REDIRECTION_DESCRIPTION)}
            </Typography>
            <ButtonLink
              variant="contained"
              to="/home"
              endIcon={<ArrowRightIcon />}
            >
              {t(AUTH.REDIRECTION_BUTTON)}
            </ButtonLink>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return children;
}
