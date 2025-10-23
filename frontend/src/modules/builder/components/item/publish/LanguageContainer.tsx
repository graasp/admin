import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Chip, Stack, Typography } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { DEFAULT_LANG, NS } from '@/config/constants';
import { LANGS } from '@/config/langs';
import { LIBRARY_SETTINGS_LANGUAGES_ID } from '@/config/selectors';

import useModalStatus from '~builder/components/hooks/useModalStatus';
import { BUILDER } from '~builder/langs';

import LanguageSelect from '../settings/LanguageSelect';
import PublicationAttributeContainer from './PublicationAttributeContainer';
import PublicationModal from './PublicationModal';

type Props = {
  item: PackedItem;
};

export function LanguageContainer({ item }: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Builder);
  const { isOpen, openModal, closeModal } = useModalStatus();

  const title = t(BUILDER.ITEM_LANGUAGE_CONTAINER_TITLE);

  const computeKey = (id: string) => `license-${id}`;

  const modalActions = [
    <Button key={computeKey(BUILDER.CANCEL_BUTTON)} onClick={closeModal}>
      {t(BUILDER.CLOSE_BUTTON)}
    </Button>,
  ];

  let currentLang = LANGS[DEFAULT_LANG];
  if (item.lang in LANGS) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentLang = LANGS[item.lang];
  }

  return (
    <>
      <PublicationModal
        modalContent={
          <Stack gap={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">
              {t(BUILDER.ITEM_LANGUAGE_DESCRIPTION)}
            </Typography>
            <Typography variant="caption">
              {t(BUILDER.ITEM_LANGUAGE_DESCRIPTION_LIMITATION)}
            </Typography>
            <LanguageSelect item={item} />
          </Stack>
        }
        isOpen={isOpen}
        handleOnClose={closeModal}
        dialogActions={modalActions}
      />
      <PublicationAttributeContainer
        dataTestId={LIBRARY_SETTINGS_LANGUAGES_ID}
        title={title}
        content={<Chip label={currentLang} onClick={openModal} />}
      />
    </>
  );
}
