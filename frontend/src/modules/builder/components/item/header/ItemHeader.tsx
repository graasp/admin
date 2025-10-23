import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Stack } from '@mui/material';

import { useParams } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { ITEM_HEADER_ID } from '@/config/selectors';

import Navigation from '~builder/components/layout/Navigation';

import ItemHeaderActions from './ItemHeaderActions';

type Props = {
  isChatboxOpen: boolean;
  toggleChatbox: () => void;
};

const ItemHeader = ({
  isChatboxOpen,
  toggleChatbox,
}: Readonly<Props>): JSX.Element | null => {
  const { itemId } = useParams({ strict: false });
  const { t: translateBuilder } = useTranslation(NS.Builder);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
      id={ITEM_HEADER_ID}
    >
      <Navigation />
      {itemId ? (
        <Stack flexGrow={1} alignItems="flex-end">
          <ItemHeaderActions
            itemId={itemId}
            isChatboxOpen={isChatboxOpen}
            toggleChatbox={toggleChatbox}
          />
        </Stack>
      ) : (
        <Alert severity="error">{translateBuilder('ERROR_MESSAGE')}</Alert>
      )}
    </Stack>
  );
};

export default ItemHeader;
