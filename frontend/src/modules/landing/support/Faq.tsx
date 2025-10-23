import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';

import { ChevronDown } from 'lucide-react';

import { NS } from '@/config/constants';

export function Faq() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.FAQ' });

  return (
    <Stack
      mt={8}
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      gap={3}
    >
      <Typography color="primary" variant="h3">
        {t('TITLE')}
      </Typography>

      <Typography>{t('DESCRIPTION_1')}</Typography>
      <Typography>{t('DESCRIPTION_2')}</Typography>

      <Box
        width="100%"
        borderRadius={5}
        overflow="hidden"
        boxShadow={'0 2px 5px lightgrey'}
      >
        <QuestionAccordion
          question={t('HOW_TO_GET_STARTED.QUESTION')}
          answer={t('HOW_TO_GET_STARTED.RESPONSE')}
          event="faq-getting-started"
        />
        <QuestionAccordion
          question={t('BUILDER_PLAYER_DIFFERENCE.QUESTION')}
          answer={t('BUILDER_PLAYER_DIFFERENCE.RESPONSE')}
          event="faq-builder-player"
        />
        <QuestionAccordion
          question={t('IMPORT_FROM_OTHER_PLATFORM.QUESTION')}
          answer={t('IMPORT_FROM_OTHER_PLATFORM.RESPONSE')}
          event="faq-import-platform"
        />
      </Box>
    </Stack>
  );
}

function QuestionAccordion({
  question,
  answer,
  event,
}: Readonly<{ question: ReactNode; answer: ReactNode; event: string }>) {
  return (
    <Accordion
      elevation={0}
      sx={{
        background: 'transparent',
        '&.Mui-expanded': { margin: '3px 0' },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ background: 'white', py: 1, px: 3 }}
        // send umami event on click (open and close)
        data-umami-event={event}
      >
        <Typography fontWeight="bold">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ py: 2, px: 3 }}>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
