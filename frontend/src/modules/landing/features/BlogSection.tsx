import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { Image } from '@/components/ui/StyledImages';
import { GRAASP_BLOG_URL, NS } from '@/config/constants';

import { CallOutSection } from './CallOutSection';

export function BlogSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'FEATURES.BLOG' });
  return (
    <Stack maxWidth="lg">
      <CallOutSection
        lead={t('LEAD_SENTENCE')}
        title={t('TITLE')}
        actions={
          <Button variant="contained" href={GRAASP_BLOG_URL}>
            {t('BUTTON_TEXT')}
          </Button>
        }
        image={<Image alt="blog cover" src="/illustration/graasp-blog.webp" />}
      >
        <Typography>{t('DESCRIPTION')}</Typography>
      </CallOutSection>
    </Stack>
  );
}
