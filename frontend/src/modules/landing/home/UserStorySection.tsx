import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';

import { UserCapsuleExample } from './UserCapsuleExample';
import { UserStory } from './UserStory';
import { UserStoryButton } from './UserStoryButton';
import {
  RESEARCHER_USER_STORY,
  TEACHER_USER_STORY,
  getCapsulesByLang,
} from './constants';

export function UserStorySection(): JSX.Element {
  const { t, i18n } = useTranslation(NS.Landing);
  return (
    <Stack component="section" gap={20} maxWidth="md">
      <Stack direction="row" gap={{ xs: 2, md: 4 }} justifyContent="center">
        <UserStoryButton id={TEACHER_USER_STORY} text="Are you a teacher?" />
        <UserStoryButton
          id={RESEARCHER_USER_STORY}
          text="Are you a researcher?"
        />
      </Stack>

      <Stack gap={10}>
        <UserStory
          id={TEACHER_USER_STORY}
          href="/auth/register"
          sectionTitle={t('HOME.USER_STORY.TEACHER.SECTION_TITLE')}
          caption={t('HOME.USER_STORY.TEACHER.LEADING_SENTENCE')}
          buttonText={t('HOME.USER_STORY.TEACHER.BUTTON_TEXT')}
          title={t('HOME.USER_STORY.TEACHER.TITLE')}
          image={<Image src="/illustration/teacher-red.webp" />}
        >
          <Typography>
            <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_1')}</span>
            <br />
            <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_2')}</span>
            <br />
            <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_3')}</span>
          </Typography>
        </UserStory>
        <Stack gap={3}>
          <Typography color="primary" variant="h3">
            {t('HOME.USER_STORY.DISCOVER.TITLE')}
          </Typography>
          <Grid container spacing={2} direction="row">
            {getCapsulesByLang(i18n.language).map(
              ({ title, imageSrc, url }) => {
                return (
                  <Grid size={{ xs: 4, sm: 4, md: 2 }}>
                    <UserCapsuleExample
                      title={title}
                      imageSrc={imageSrc}
                      url={url}
                    />
                  </Grid>
                );
              },
            )}
          </Grid>

          <ButtonLink
            component="a"
            variant="contained"
            color="library"
            to={GRAASP_LIBRARY_HOST}
          >
            {t('HOME.USER_STORY.DISCOVER.BUTTON_TEXT')}
          </ButtonLink>
        </Stack>
      </Stack>
      <UserStory
        id={RESEARCHER_USER_STORY}
        href="/auth/register"
        caption={t('HOME.USER_STORY.RESEARCHER.LEADING_SENTENCE')}
        sectionTitle={t('HOME.USER_STORY.RESEARCHER.SECTION_TITLE')}
        buttonText={t('HOME.USER_STORY.RESEARCHER.BUTTON_TEXT')}
        title={t('HOME.USER_STORY.RESEARCHER.TITLE')}
        image={
          <Image
            src="/illustration/group-work.webp"
            alt="students experimenting in a lab session"
          />
        }
      >
        <Typography>
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_1')}</span>
          <br />
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_2')}</span>
          <br />
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_3')}</span>
        </Typography>
      </UserStory>
    </Stack>
  );
}
