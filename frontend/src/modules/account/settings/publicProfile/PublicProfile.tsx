import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Alert, Skeleton, Typography } from '@mui/material';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SocialLinks from 'social-links';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_CONFIGURE_BUTTON_ID,
  PUBLIC_PROFILE_DISPLAY_CONTAINER_ID,
  PUBLIC_PROFILE_EDIT_BUTTON_ID,
  PUBLIC_PROFILE_NOT_CONFIGURED_CONTAINER_ID,
} from '@/config/selectors';
import {
  createOwnProfileMutation,
  getOwnProfileOptions,
  updateOwnProfileMutation,
} from '@/openapi/client/@tanstack/react-query.gen';

import { DisplayLink } from './DisplayLink';
import { EditPublicProfile, Inputs } from './EditPublicProfile';

export function PublicProfile(): JSX.Element {
  const socialLinks = new SocialLinks();

  const { t } = useTranslation(NS.Account, { keyPrefix: 'PUBLIC_PROFILE' });
  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { data: publicProfile } = useQuery(getOwnProfileOptions());
  const queryClient = useQueryClient();

  const {
    mutate: postProfile,
    isSuccess: isSuccessPostPublicProfile,
    isError: isErrorPostPublicProfile,
    error: errorPostProfile,
  } = useMutation({
    ...createOwnProfileMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getOwnProfileOptions().queryKey,
      });
    },
  });
  const {
    mutate: patchProfile,
    isSuccess: isSuccessPatchPublicProfile,
    isError: isErrorPatchPublicProfile,
    error: errorPatchProfile,
  } = useMutation({
    ...updateOwnProfileMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getOwnProfileOptions().queryKey,
      });
    },
  });

  const { bio, linkedinId, twitterId, facebookId } = publicProfile ?? {};

  const [isEditing, setIsEditing] = useState(false);

  const onClose = (newProfile?: Inputs) => {
    if (newProfile) {
      if (publicProfile) {
        patchProfile({ body: newProfile });
      } else {
        postProfile({ body: newProfile });
      }
    }
    setIsEditing(false);
  };
  const onOpen = () => setIsEditing(true);

  if (isEditing) {
    return <EditPublicProfile onClose={onClose} profile={publicProfile} />;
  }

  if (publicProfile) {
    return (
      <BorderedSection
        id={PUBLIC_PROFILE_DISPLAY_CONTAINER_ID}
        title={t('TITLE')}
        topAction={
          <Button
            variant="contained"
            onClick={onOpen}
            id={PUBLIC_PROFILE_EDIT_BUTTON_ID}
            size="small"
          >
            {translateCommon('EDIT.BUTTON_TEXT')}
          </Button>
        }
      >
        <Typography variant="body1" color="textSecondary">
          {t('BIO_LABEL')}
        </Typography>
        <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
          {bio ?? t('BIO_EMPTY_MSG')}
        </Typography>
        {linkedinId && (
          <DisplayLink
            icon={<LinkedInIcon />}
            contentId="linkedinId"
            href={socialLinks.sanitize('linkedin', linkedinId)}
            content={linkedinId}
          />
        )}
        {twitterId && (
          <DisplayLink
            icon={<TwitterIcon />}
            contentId="twitterId"
            href={socialLinks.sanitize('twitter', twitterId)}
            content={twitterId}
          />
        )}
        {facebookId && (
          <DisplayLink
            icon={<FacebookIcon />}
            contentId="facebookId"
            href={socialLinks.sanitize('facebook', facebookId)}
            content={facebookId}
          />
        )}
        {(isSuccessPatchPublicProfile || isSuccessPostPublicProfile) && (
          <Alert severity="success">{t('PATCH_SUCCESS_MESSAGE')}</Alert>
        )}
        {isErrorPatchPublicProfile && (
          <Alert severity="error">
            {errorPatchProfile?.message
              ? // @ts-expect-error error string comes from the server
                translateMessage(errorPatchProfile?.message)
              : translateMessage('UNEXPECTED_ERROR')}
          </Alert>
        )}
        {isErrorPostPublicProfile && (
          <Alert severity="error">
            {errorPostProfile?.message
              ? // @ts-expect-error error string comes from the server
                translateMessage(errorPostProfile?.message)
              : translateMessage('UNEXPECTED_ERROR')}
          </Alert>
        )}
      </BorderedSection>
    );
  }

  return (
    <BorderedSection
      id={PUBLIC_PROFILE_NOT_CONFIGURED_CONTAINER_ID}
      title={t('TITLE')}
      topAction={
        <Button
          variant="contained"
          onClick={onOpen}
          id={PUBLIC_PROFILE_CONFIGURE_BUTTON_ID}
          size="small"
        >
          {t('CONFIGURE')}
        </Button>
      }
    >
      {publicProfile === null ? (
        <Typography color="textSecondary" fontStyle="italic">
          {t('NOT_CONFIGURED_DESCRIPTION')}
        </Typography>
      ) : (
        <Skeleton width="100%" />
      )}
    </BorderedSection>
  );
}
