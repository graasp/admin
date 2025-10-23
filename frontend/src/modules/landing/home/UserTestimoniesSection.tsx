import { useTranslation } from 'react-i18next';

import { Masonry } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

import { TestimonyCard } from './TestimonyCard';

const Testimonies = [
  {
    name: 'Tom',
    title: 'Student',
    image: '/illustration/users/peeps1.webp',
    text: 'I really liked working with Graasp, it motivates the students and they want to learn on their own.',
  },
  {
    name: 'Hanna',
    image: '/illustration/users/peeps2.webp',
    text: 'Graasp is awesome, I think you should use it.',
  },
  {
    name: 'Hank from Tank',
    image: '/illustration/users/peeps3.webp',
    text: 'From the very first interaction, I felt genuinely cared for and supported. The level of professionalism and attention to detail is unmatched, and the team went above and beyond to ensure that every need was met.',
  },
  {
    name: 'Captain Cook',
    title: 'Great explorer, unfortunately recently deceased',
    image: '/illustration/users/peeps4.webp',
    text: "I can't speak highly enough about my experience with Graasp. From start to finish, they made the entire process seamless and stress-free. Their expertise and dedication were evident in every step, and they truly went the extra mile to make sure I was satisfied.",
  },
  {
    name: 'Frizbelouski',
    title: 'Professional bowler in the US',
    image: '/illustration/users/peeps5.webp',
    text: 'From the very first interaction, I felt genuinely cared for and supported. The level of professionalism and attention to detail is unmatched, and the team went above and beyond to ensure that every need was met.',
  },
  {
    name: 'Tobby Kenoby',
    title: 'Master Jedi',
    image: '/illustration/users/peeps6.webp',
    text: 'Just great!',
  },
  {
    name: 'Stranger',
    image: '/illustration/users/peeps7.webp',
    text: "Haven't used too much...",
  },
  {
    name: 'Moon Explorer',
    image: '/illustration/users/peeps8.webp',
    text: 'A bit like Google drive. Just the worst parts.',
  },
] as const;

export function UserTestimoniesSection() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'HOME.USER_TESTIMONIES',
  });
  const { t: translateCommon } = useTranslation(NS.Common);
  return (
    <Stack
      gap={6}
      maxWidth="lg"
      alignItems="center"
      width="100%"
      textAlign="center"
    >
      <Typography variant="h2" color="primary">
        {t('TITLE')}
      </Typography>
      <Masonry
        sx={{ width: '100%', alignContent: 'center' }}
        columns={{ sm: 2, md: 3, lg: 5 }}
        spacing={2}
        defaultColumns={6}
        sequential
      >
        {Testimonies.map((testimony) => (
          <TestimonyCard key={testimony.name} {...testimony} />
        ))}
      </Masonry>
      <Stack gap={2} alignItems="center">
        <Typography fontSize={25} maxWidth="sm">
          {t('JOIN_US')}
        </Typography>
        <ButtonLink
          to="/auth/register"
          variant="contained"
          sx={{ width: 'fit-content' }}
        >
          {translateCommon('REGISTER.BUTTON_TEXT')}
        </ButtonLink>
      </Stack>
    </Stack>
  );
}
