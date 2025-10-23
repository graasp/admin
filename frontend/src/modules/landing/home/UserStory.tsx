import { type JSX, type ReactNode } from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';

const IMAGE_CONTAINER = 'image-container';
const TEXT_CONTAINER = 'text-container';

const InvertingStack = styled(Stack)(({ theme }) => ({
  // common styles
  alignItems: 'center',
  // base style for "normal direction"
  flexDirection: 'column',
  maxWidth: '60ch',
  '& img': {
    maxWidth: '20rem',
  },
  textAlign: 'center',
  [`& .${TEXT_CONTAINER}`]: {
    alignItems: 'center',
  },

  // larger screens
  [theme.breakpoints.up('md')]: {
    '& img': {
      maxWidth: 'unset',
    },
    [`& .${IMAGE_CONTAINER}`]: {
      alignItems: 'center',
    },

    maxWidth: 'unset',
    // space elements
    justifyContent: 'space-between',

    // default should be row on large screen
    flexDirection: 'row',
    // text should flow in this direction
    textAlign: 'right',

    // style the first children
    [`& .${TEXT_CONTAINER}`]: {
      alignItems: 'flex-end',
    },

    // override for "inverted" child
    '&:nth-of-type(even)': {
      // reverse the direction
      flexDirection: 'row-reverse',
      // invert text alignment
      textAlign: 'left',
      // style the first children
      [`& .${TEXT_CONTAINER}`]: {
        alignItems: 'flex-start',
      },
    },
  },
}));

type UserStoryProps = {
  id: string;
  caption: string;
  title: string;
  href: string;
  sectionTitle: string;
  buttonText: string;
  children: ReactNode;
  image: ReactNode;
  imageAttribution?: ReactNode;
};
export function UserStory({
  id,
  caption,
  title,
  sectionTitle,
  href,
  buttonText,
  children,
  image,
  imageAttribution,
}: Readonly<UserStoryProps>): JSX.Element {
  return (
    <Stack>
      <Typography color="primary" variant="h1" component="h2">
        {sectionTitle}
      </Typography>
      <InvertingStack gap={5} mt={3} position="relative">
        <Box id={id} sx={{ position: 'absolute', top: '-200px' }} />
        <Stack className={IMAGE_CONTAINER} flex={1} gap={1} alignItems="center">
          <Stack borderRadius={6} overflow="hidden">
            {image}
          </Stack>
          {imageAttribution && (
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ '& a': { color: 'inherit' } }}
            >
              {imageAttribution}
            </Typography>
          )}
        </Stack>
        <Stack className={TEXT_CONTAINER} gap={2} flex={2}>
          <Box maxWidth="50ch">
            <Typography variant="note">{caption}</Typography>
            <Typography variant="h2" color="primary">
              {title}
            </Typography>
          </Box>

          {children}

          <ButtonLink
            to={href}
            sx={{
              // make button take only needed space
              width: 'fit-content',
            }}
            color="primary"
            variant="contained"
          >
            {buttonText}
          </ButtonLink>
        </Stack>
      </InvertingStack>
    </Stack>
  );
}
