import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Config, SocialLinks } from 'social-links';

import { useAuth } from '@/AuthContext';
import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_SAVE_BUTTON_ID,
} from '@/config/selectors';
import { NullableProfile } from '@/openapi/client';
import { useButtonColor } from '@/ui/buttons/hooks';

import { FacebookIcon, LinkedInIcon, TwitterIcon } from '~landing/footer/icons';

const config: Config = {
  usePredefinedProfiles: true,
  trimInput: true,
  allowQueryParams: true,
};
const socialLinks = new SocialLinks(config);

type EditPublicProfileProps = {
  onClose: (value?: Inputs) => void;
  profile?: NullableProfile;
};

export type Inputs = Pick<
  NullableProfile,
  'bio' | 'visibility' | 'twitterId' | 'facebookId' | 'linkedinId'
>;

export function EditPublicProfile({
  onClose,
  profile,
}: Readonly<EditPublicProfileProps>): JSX.Element {
  const { user } = useAuth();
  const { t } = useTranslation(NS.Account, { keyPrefix: 'PUBLIC_PROFILE' });
  const { t: translateCommon } = useTranslation(NS.Common);
  const { fill } = useButtonColor('inherit');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',

    defaultValues: {
      bio: profile?.bio,
      twitterId: profile?.twitterId,
      facebookId: profile?.facebookId,
      linkedinId: profile?.linkedinId,
      visibility: profile?.visibility ?? false,
    },
  });

  const socialNetworks = [
    {
      fieldName: 'facebookId',
      socialProfile: 'facebook',
      Icon: FacebookIcon,
      label: 'FACEBOOK_LINK',
    },
    {
      fieldName: 'twitterId',
      socialProfile: 'twitter',
      Icon: TwitterIcon,
      label: 'TWITTER_LINK',
    },
    {
      fieldName: 'linkedinId',
      socialProfile: 'linkedin',
      Icon: LinkedInIcon,
      label: 'LINKEDIN_LINK',
    },
  ] as const;

  // register visibility checkbox manually
  const visibility = register('visibility');
  const visibilityValue = watch('visibility');

  return (
    <BorderedSection title={t('TITLE')}>
      <Typography variant="body1">{t('DESCRIPTION')}</Typography>
      {profile && user && (
        <a href={`${GRAASP_LIBRARY_HOST}/members/${user.id}`}>
          {t('CHECK_TEXT')}
        </a>
      )}

      <Stack
        component="form"
        onSubmit={handleSubmit(onClose)}
        direction="column"
        gap={2}
      >
        <TextField
          {...register('bio')}
          helperText={errors.bio?.message && t('BIO_ERROR_MSG')}
          error={!!errors.bio?.message}
          label={t('BIO_LABEL')}
          multiline
          rows={4}
          id={PUBLIC_PROFILE_BIO_ID}
        />
        {socialNetworks.map(({ fieldName, Icon, label, socialProfile }) => (
          <TextField
            key={fieldName}
            {...register(fieldName, {
              validate: (val) => {
                if (val) {
                  return (
                    socialLinks.isValid(socialProfile, val) ||
                    t('INVALID_LINK_ERROR')
                  );
                }
              },
              setValueAs: (val) => {
                if (val) {
                  try {
                    return socialLinks.getProfileId(socialProfile, val);
                  } catch {
                    return val;
                  }
                } else {
                  return val;
                }
              },
            })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon size={24} fill={fill} />
                  </InputAdornment>
                ),
              },
            }}
            error={!!errors[fieldName]?.message}
            helperText={errors[fieldName]?.message}
            label={t(label)}
            id={fieldName}
          />
        ))}
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={visibilityValue}
              name={visibility.name}
              onChange={visibility.onChange}
            />
          }
          ref={visibility.ref}
          label={t('VISIBILITY_LABEL')}
        />
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button
            onClick={() => onClose(undefined)}
            variant="outlined"
            size="small"
          >
            {translateCommon('CANCEL.BUTTON_TEXT')}
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disabled={!isValid}
            id={PUBLIC_PROFILE_SAVE_BUTTON_ID}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </Stack>
      </Stack>
    </BorderedSection>
  );
}
