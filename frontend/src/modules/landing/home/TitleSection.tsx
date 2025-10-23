import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';

import { ButtonLink } from '../../../components/ui/ButtonLink';
import {
  BeLEARN,
  EdTech,
  Epfl,
  GoLab,
  SDC,
  SupporterLink,
  SwissUniversities,
  Unine,
} from './supporterIcons';

export function TitleSection(): JSX.Element {
  const { t } = useTranslation(NS.Landing);
  return (
    <Stack component="section" direction="column" my={5} maxWidth="lg" gap={5}>
      <Stack
        direction={{ xs: 'column', lg: 'row-reverse' }}
        justifyItems="flex-start"
        alignItems="center"
        width="100%"
        gap={10}
      >
        <Stack
          flex={{ lg: 1 }}
          maxHeight={{ xs: '400px', lg: 'unset' }}
          borderRadius={4}
          overflow="hidden"
        >
          <Image
            alt="cover"
            sx={{ objectPosition: '0 70%' }}
            src="/illustration/landing.webp"
          />
        </Stack>
        <Stack direction="column" gap={10} flex={{ lg: 2 }}>
          <Stack direction="column" gap={4}>
            <Stack direction="column">
              <Typography
                variant="h2"
                color="primary"
                alignSelf={{ xs: 'center', lg: 'flex-start' }}
              >
                {t('HOME.TITLE')}
              </Typography>
              <Typography
                variant="h1"
                color="primary"
                textAlign={{ xs: 'center', lg: 'unset' }}
                alignSelf={{ xs: 'center', lg: 'flex-start' }}
              >
                {t('HOME.SUBTITLE')}
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              component="p"
              textAlign={{ xs: 'center', lg: 'unset' }}
              alignSelf={{ xs: 'center', lg: 'flex-start' }}
            >
              {t('HOME.DESCRIPTION')}
            </Typography>
          </Stack>
          <Stack direction="column" gap={4}>
            <Stack
              id="buttonsContainer"
              direction={{ xs: 'column', sm: 'row' }}
              justifyItems="center"
              alignItems="center"
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
              gap={4}
            >
              <ButtonLink variant="contained" to="/auth/register">
                {t('HOME.REGISTER_CALL_TO_ACTION')}
              </ButtonLink>
              <Button
                component="a"
                variant="contained"
                color="library"
                href={GRAASP_LIBRARY_HOST}
              >
                {t('HOME.LIBRARY_CALL_TO_ACTION')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography color="textSecondary">
          {t('HOME.SUPPORTERS_LABEL')}
        </Typography>
        <Stack
          id="logosContainer"
          direction="row"
          gap={1}
          flexWrap="wrap"
          alignItems="center"
        >
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={Epfl}
            href="https://www.epfl.ch"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={BeLEARN}
            href="https://belearn.swiss/en/"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={EdTech}
            href="https://www.edtech-collider.ch"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={Unine}
            href="https://www.unine.ch/imi/en/"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={GoLab}
            href="https://www.golabz.eu/"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={SwissUniversities}
            href="https://www.swissuniversities.ch/fr/themes/digitalisation/open-education-digital-competencies/projets-soutenus"
          />
          <SupporterLink
            width="150px"
            height="3rem"
            Icon={SDC}
            href="https://www.eda.admin.ch/eda/en/fdfa/fdfa/organisation-fdfa/directorates-divisions/sdc.html"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
