import { type JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import {
  CC_DELETE_BUTTON_HEADER,
  CC_EDIT_BUTTON_HEADER,
  CC_SAVE_BUTTON,
  LIBRARY_SETTINGS_CC_SETTINGS_ID,
} from '@/config/selectors';

import { useDataSyncContext } from '~builder/components/context/DataSyncContext';
import { CC_LICENSE_ABOUT_URL } from '~builder/constants';

import useItemLicense from '../../hooks/useItemLicense';
import useModalStatus from '../../hooks/useModalStatus';
import PublicationAttributeContainer from './PublicationAttributeContainer';
import PublicationModal from './PublicationModal';

const SYNC_STATUS_KEY = 'PublishLicense';

type Props = {
  item: DiscriminatedItem;
};

export const LicenseContainer = ({ item }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation(NS.Builder);
  const { computeStatusFor } = useDataSyncContext();
  const { isOpen, openModal, closeModal } = useModalStatus();
  const { creativeCommons } = useItemLicense({
    item,
    iconSize: 30,
  });
  // This hook is use in the modal to temporary edit the license without affecting the current item's license.
  // If the user validate the modifications, the current item's license will be updated after the POST.
  const tmpItemLicense = useItemLicense({
    item,
    enableNotifications: false,
  });

  useEffect(
    () =>
      computeStatusFor(SYNC_STATUS_KEY, {
        isLoading: tmpItemLicense.isLoading,
        isError: tmpItemLicense.isError,
        isSuccess: tmpItemLicense.isSuccess,
      }),
    [
      computeStatusFor,
      tmpItemLicense.isError,
      tmpItemLicense.isLoading,
      tmpItemLicense.isSuccess,
    ],
  );

  const { settings } = item;
  const licenseContent = settings?.ccLicenseAdaption ? (
    <Box data-cy={LIBRARY_SETTINGS_CC_SETTINGS_ID}>{creativeCommons}</Box>
  ) : undefined;

  const containerTitle = t('ITEM_LICENSE_CONTAINER_TITLE');
  const description = t('ITEM_LICENSE_CONTAINER_MISSING_WARNING');
  const emptyMessage = t('ITEM_LICENSE_CONTAINER_EMPTY_BUTTON');

  const onSubmit = () => {
    tmpItemLicense.handleSubmit();
    closeModal();
  };

  const computeKey = (id: string) => `license-${id}`;

  const modalActions = [
    <Button key={computeKey('CANCEL_BUTTON')} onClick={closeModal}>
      {t('CANCEL_BUTTON')}
    </Button>,
    <Button
      data-cy={CC_SAVE_BUTTON}
      key={computeKey('CONFIRM_BUTTON')}
      onClick={onSubmit}
      variant="contained"
    >
      {t('CONFIRM_BUTTON')}
    </Button>,
  ];

  const buildLicenseModal = (): JSX.Element => (
    <Stack spacing={2}>
      {licenseContent && (
        <Alert severity="warning">
          {t('ITEM_SETTINGS_CC_LICENSE_MODAL_CONTENT')}
        </Alert>
      )}
      <Stack mx={3} spacing={2}>
        {tmpItemLicense.licenseForm}
        <Box display="flex" justifyContent="center">
          {tmpItemLicense.creativeCommons}
        </Box>
      </Stack>
    </Stack>
  );

  const titleHelp = (
    <Tooltip title={t('ITEM_SETTINGS_CC_LICENSE_MORE_INFORMATIONS')} arrow>
      <IconButton aria-label="info" href={CC_LICENSE_ABOUT_URL} target="_blank">
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <PublicationModal
        modalContent={buildLicenseModal()}
        isOpen={isOpen}
        handleOnClose={closeModal}
        dialogActions={modalActions}
      />
      <PublicationAttributeContainer
        dataTestId={LIBRARY_SETTINGS_CC_SETTINGS_ID}
        title={containerTitle}
        titleIcon={titleHelp}
        titleActionBtn={
          <Stack direction="row">
            <Tooltip title={description}>
              <IconButton data-cy={CC_EDIT_BUTTON_HEADER} onClick={openModal}>
                <EditIcon htmlColor={theme.palette.primary.main} />
              </IconButton>
            </Tooltip>
            <IconButton
              data-cy={CC_DELETE_BUTTON_HEADER}
              onClick={tmpItemLicense.removeLicense}
            >
              <DeleteIcon htmlColor={theme.palette.error.main} />
            </IconButton>
          </Stack>
        }
        attributeDescription={description}
        emptyDataMessage={emptyMessage}
        content={licenseContent}
        onEmptyClick={openModal}
      />
    </>
  );
};

export default LicenseContainer;
