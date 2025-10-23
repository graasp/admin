import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { TypographyLink } from '@/components/ui/TypographyLink';
import { NS } from '@/config/constants';

import {
  EnumeratedParagraph,
  ListItem,
  Paragraphs,
} from '~landing/privacyPolicy/layouts';

export const Route = createFileRoute('/_landing/terms')({
  component: RouteComponent,
});

const EPFL_DISCLAIMER_LINK =
  'https://www.epfl.ch/about/overview/regulations-and-guidelines/disclaimer/';

function RouteComponent() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'TERMS' });
  return (
    <Stack direction="column" gap={8} maxWidth="md" mt={8}>
      <Typography variant="h1" color="primary">
        {t('TITLE')}
      </Typography>
      <Paragraphs>
        <EnumeratedParagraph text={t('INTRODUCTION')}>
          <ListItem>{t('TERM_1')}</ListItem>
          <ListItem>{t('TERM_2')}</ListItem>
          <ListItem>{t('TERM_3')}</ListItem>
          <ListItem>{t('TERM_4')}</ListItem>
          <ListItem>{t('TERM_5')}</ListItem>
        </EnumeratedParagraph>
        <Typography>{t('FINAL_NOTE')}</Typography>
      </Paragraphs>
      <Box>
        <Typography variant="h4" color="primary">
          {t('REFERENCES')}
        </Typography>
        <ul>
          <li>
            <TypographyLink to="/disclaimer">
              {t('GRAASP_LEGAL_DISCLAIMER.TEXT')}
            </TypographyLink>
          </li>
          <li>
            <Typography component="a" href={EPFL_DISCLAIMER_LINK}>
              {t('EPFL_LEGAL_DISCLAIMER.TEXT')}
            </Typography>
          </li>
        </ul>
      </Box>
    </Stack>
  );
}
