import { useTranslation } from 'react-i18next';

import { Grid, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

import { BigTutorialCard } from './BigTutorialCard';
import { SmallTutorialCard } from './SmallTutorialCard';

export function Tutorials() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.TUTORIALS' });

  const GENERAL_TUTORIALS = [
    {
      title: 'User resources',
      description: 'User documentation',
      link: 'https://graasp.github.io/docs/user/intro',
    },
    {
      title: t('GENERAL_TUTORIALS.QUICK_GET_STARTED.TITLE'),
      description: t('GENERAL_TUTORIALS.QUICK_GET_STARTED.DESCRIPTION'),
      link: t('GENERAL_TUTORIALS.QUICK_GET_STARTED.LINK'),
    },
  ];
  const BUILDER_TUTORIALS = [
    {
      title: 'Update content',
      description: 'How to update the content of my item',
      link: 'https://player.graasp.org/9d80d81f-ec9d-4bfb-836a-1c6b125aef2f/ccc4e606-9d5f-429e-8834-3c9745e5ef5c',
      // link: 'https://player.graasp.org/bd918837-5f57-49d2-8867-1d3438377842/a4137195-cb7b-42fa-81f7-70531453077e',
    },
    {
      title: 'Add an application',
      description:
        'Step by step tutorial to add an application to my collection',
      link: 'https://player.graasp.org/bd918837-5f57-49d2-8867-1d3438377842/ed016bc4-4539-4471-8fa2-caf94568d779',
    },
  ];

  // TODO: enable back when there are player tutorials
  // const PLAYER_TUTORIALS = [];

  const LIBRARY_TUTORIALS = [
    {
      title: 'Publish to Graasp Library',
      description:
        'Step by step tutorial to help you publish your content on the library',
      link: 'https://graasp.github.io/docs/user/library/publication/',
    },
    {
      title: 'What are tags?',
      description: 'Documentation about tags',
      link: 'https://graasp.github.io/docs/user/library/tags/',
    },
    {
      title: "Hitchhiker's guide to OERs",
      description: 'Graasp and OERs',
      link: 'https://player.graasp.org/e7cf4d11-f830-47a7-b281-b81f59726c49/e7cf4d11-f830-47a7-b281-b81f59726c49',
    },
  ];
  const ACCOUNT_TUTORIALS = [
    {
      title: 'Change the language of the platform',
      description: 'How to change the language of the platform',
      link: 'https://player.graasp.org/9d80d81f-ec9d-4bfb-836a-1c6b125aef2f/9d651545-c217-4c20-9a2f-366b1cd8dc15',
      // link: 'https://player.graasp.org/bd918837-5f57-49d2-8867-1d3438377842/8b1b89e1-af61-46a9-b019-496feaa364fa',
    },
    {
      title: 'Change my email address',
      description: 'How to change my email address',
      link: 'https://graasp.github.io/docs/user/account/email',
    },
    {
      title: 'Reset my password',
      description: 'How to request for a new password',
      link: 'https://graasp.github.io/docs/user/account/forgot-password',
    },
    {
      title: 'Validate my account',
      description:
        'When you see the "Your account needs to be validated" message',
      link: 'https://graasp.github.io/docs/user/account/validation',
    },
  ];

  const PLATFORM_TUTORIALS = [
    {
      title: t('BUILDER.TITLE'),
      tutorials: BUILDER_TUTORIALS,
    },
    // {
    //   title: t('PLAYER.TITLE'),
    //   tutorials: PLAYER_TUTORIALS,
    // },
    {
      title: t('LIBRARY.TITLE'),
      tutorials: LIBRARY_TUTORIALS,
    },
    {
      title: t('ACCOUNT.TITLE'),
      tutorials: ACCOUNT_TUTORIALS,
    },
  ];

  return (
    <Stack
      mt={8}
      gap={5}
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
    >
      <Stack gap={3} width="100%">
        <Typography color="primary" variant="h2">
          {t('TITLE')}
        </Typography>
        <Typography>{t('DESCRIPTION')}</Typography>

        <Stack direction={{ sm: 'row' }} gap={2} width="100%">
          {GENERAL_TUTORIALS.map(({ title, description, link }) => (
            <BigTutorialCard
              key={title}
              title={title}
              description={description}
              link={link}
            />
          ))}
        </Stack>
      </Stack>

      {PLATFORM_TUTORIALS.map(({ title, tutorials }) => (
        <Stack key={title} gap={2} width="100%">
          <Typography
            color="primary"
            variant="h4"
            component="h3"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Grid container spacing={2}>
            {tutorials.map(({ title: tutoTitle, description, link }) => (
              <Grid key={title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SmallTutorialCard
                  title={tutoTitle}
                  description={description}
                  link={link}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
