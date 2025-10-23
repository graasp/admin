import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, AlertTitle, Stack, Typography } from '@mui/material';

import {
  AccountType,
  Invitation,
  ItemMembership,
  PermissionLevelOptions,
} from '@graasp/sdk';

import { AxiosError } from 'axios';

import { NS } from '@/config/constants';
import { SHARE_CSV_TEMPLATE_SUMMARY_CONTAINER_ID } from '@/config/selectors';

import { BUILDER } from '~builder/langs';
import { getErrorFromPayload } from '~builder/utils/errorMessages';

const ErrorDisplay = ({ errorMessage }: { errorMessage: string }): string => {
  const { t } = useTranslation(NS.Builder);
  const { t: translateMessages } = useTranslation(NS.Messages);
  if (errorMessage === 'MODIFY_EXISTING') {
    return t(BUILDER.SHARE_ITEM_CSV_SUMMARY_MODIFYING_EXISTING);
  }

  return translateMessages('UNEXPECTED_ERROR');
};

const LineDisplay = ({
  email,
  permission,
}: {
  email: string;
  permission: PermissionLevelOptions;
}) => (
  <Stack direction="row" gap={1}>
    <Typography>{email}</Typography>
    <Typography>{permission}</Typography>
  </Stack>
);

type Props = {
  userCsvDataWithTemplate?: {
    groupName: string;
    memberships: ItemMembership[];
    invitations: Invitation[];
  }[];
  error: Error | null | AxiosError;
};
const DisplayInvitationSummary = ({
  userCsvDataWithTemplate,
  error,
}: Props): JSX.Element | null => {
  const { t } = useTranslation(NS.Builder);
  if (error) {
    const additionalMessage = getErrorFromPayload(error);

    return (
      <Alert severity="error">
        <AlertTitle>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            t(additionalMessage.name)
          }
        </AlertTitle>
        <Typography>
          <ErrorDisplay errorMessage={additionalMessage.message} />
        </Typography>
      </Alert>
    );
  }
  if (userCsvDataWithTemplate) {
    // display group creation
    return (
      <Alert severity="info" id={SHARE_CSV_TEMPLATE_SUMMARY_CONTAINER_ID}>
        <AlertTitle>{t(BUILDER.SHARE_ITEM_CSV_SUMMARY_GROUP_TITLE)}</AlertTitle>
        <Stack direction="column" gap={2}>
          {userCsvDataWithTemplate.map(
            ({ groupName, memberships, invitations }) => (
              <Stack>
                <Typography fontWeight="bold">
                  {t(BUILDER.INVITATION_SUMMARY_GROUP_TITLE, { groupName })}
                </Typography>
                <Stack>
                  {memberships.map((m) => (
                    <LineDisplay
                      email={
                        m.account.type === AccountType.Individual
                          ? m.account.email
                          : '-'
                      }
                      permission={m.permission}
                    />
                  ))}
                </Stack>
                <Stack>
                  {invitations.map((m) => (
                    <LineDisplay email={m.email} permission={m.permission} />
                  ))}
                </Stack>
              </Stack>
            ),
          )}
        </Stack>
      </Alert>
    );
  }

  // no error and no data, display nothing
  return null;
};
export default DisplayInvitationSummary;
