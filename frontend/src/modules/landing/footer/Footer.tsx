import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { GRAASP_BLOG_URL, NS } from '@/config/constants';
import { OnChangeLangProp } from '@/types';
import { PRIMARY_COLOR } from '@/ui/theme';

import { CopyrightText } from './CopyrightText';
import { FooterSection } from './FooterSection';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  TwitterIcon,
} from './icons';
import { ExternalLink, InternalLink, SocialLink } from './links';

const partnerLinks = [
  {
    title: 'EPFL',
    href: 'https://epfl.ch',
  },
  {
    title: 'Swiss EdTech Collider',
    href: 'https://edtech-collider.ch',
  },
  {
    title: 'Go-Lab',
    href: 'https://www.golabz.eu',
  },
  {
    title: 'Swiss Digital Skills Academy',
    href: 'https://d-skills.ch/',
  },
  {
    title: 'iHub4Schools',
    href: 'https://www.ihub4schools.eu/',
  },
  {
    title: 'BeLEARN',
    href: 'https://belearn.swiss/en/',
  },
  {
    title: 'GO-GA',
    href: 'https://go-ga.org/',
  },
];

export const socialLinks = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/graasp',
    Icon: FacebookIcon,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/graasp',
    Icon: TwitterIcon,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/graasper',
    Icon: InstagramIcon,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/graasp',
    Icon: LinkedInIcon,
  },
  {
    title: 'Github',
    href: 'https://github.com/graasp',
    Icon: GithubIcon,
  },
  {
    title: 'Mastodon',
    href: 'https://tooting.ch/@graasp',
    Icon: MastodonIcon,
  },
];

const internalLinkActiveProp = () => ({
  sx: {
    backgroundColor: '#00000040',
  },
});

type FooterProps = {
  onChangeLang: OnChangeLangProp;
};

export function Footer({ onChangeLang }: Readonly<FooterProps>): JSX.Element {
  const { t, i18n } = useTranslation(NS.Landing, { keyPrefix: 'FOOTER' });

  return (
    <Stack
      component="footer"
      direction="column"
      width="100%"
      bgcolor={PRIMARY_COLOR}
      color="white"
      gap={1}
      p={3}
    >
      <Stack maxWidth="lg" m="auto" width="100%">
        <Typography textAlign="center" fontWeight="bold">
          {t('TAG_LINE')}
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          m={4}
          gap={5}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={5}
            flex={1}
            justifyContent="space-around"
          >
            <FooterSection name={t('CONTENT.TITLE')}>
              <InternalLink to="/" activeProps={internalLinkActiveProp}>
                {t('CONTENT.HOME')}
              </InternalLink>
              <InternalLink to="/features" activeProps={internalLinkActiveProp}>
                {t('CONTENT.FEATURES')}
              </InternalLink>
              <InternalLink to="/about-us" activeProps={internalLinkActiveProp}>
                {t('CONTENT.ABOUT_US')}
              </InternalLink>
              <InternalLink to="/support" activeProps={internalLinkActiveProp}>
                {t('CONTENT.SUPPORT')}
              </InternalLink>
              <InternalLink
                to="/contact-us"
                activeProps={internalLinkActiveProp}
              >
                {t('CONTENT.CONTACT_US')}
              </InternalLink>
              <ExternalLink href={GRAASP_BLOG_URL}>
                {t('CONTENT.BLOG')}
              </ExternalLink>
            </FooterSection>

            <FooterSection name={t('PARTNERS.TITLE')}>
              {partnerLinks.map(({ href, title }) => (
                <ExternalLink key={title} href={href}>
                  {title}
                </ExternalLink>
              ))}
            </FooterSection>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={5}
            flex={1}
            justifyContent="space-around"
          >
            <FooterSection name={t('SOCIAL.TITLE')}>
              {socialLinks.map(({ href, Icon, title }) => (
                <SocialLink key={title} href={href} icon={<Icon size={24} />}>
                  {title}
                </SocialLink>
              ))}
            </FooterSection>

            <FooterSection name={t('OTHER.TITLE')}>
              <InternalLink to="/terms" activeProps={internalLinkActiveProp}>
                {t('OTHER.TERMS')}
              </InternalLink>
              <InternalLink to="/policy" activeProps={internalLinkActiveProp}>
                {t('OTHER.POLICY')}
              </InternalLink>
              <InternalLink
                to="/disclaimer"
                activeProps={internalLinkActiveProp}
              >
                {t('OTHER.DISCLAIMER')}
              </InternalLink>
              <Box>
                <LanguageSwitch
                  dense={false}
                  lang={i18n.language}
                  onChange={onChangeLang}
                  color="white"
                />
              </Box>
            </FooterSection>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <CopyrightText />
        </Stack>
      </Stack>
    </Stack>
  );
}
