import { type JSX, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Divider, Stack, Typography } from '@mui/material';

import { useSearch } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { ITEM_MAIN_CLASS } from '@/config/selectors';
import { DrawerHeader } from '@/ui/DrawerHeader/DrawerHeader';

import { useOutletContext } from '~builder/contexts/OutletContext';

import Chatbox from '../common/Chatbox';
import ItemPanel from './ItemPanel';
import ItemHeader from './header/ItemHeader';

type Props = {
  children: JSX.Element | JSX.Element[];
  id?: string;
};

const ItemMain = ({ id, children }: Props): JSX.Element => {
  const { item } = useOutletContext();
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { chatOpen: chatIsOpen } = useSearch({
    from: '/builder/items/$itemId',
  });

  const [isChatboxOpen, setIsChatboxOpen] = useState(chatIsOpen ?? false);
  const toggleChatbox = () => setIsChatboxOpen((s) => !s);

  return (
    <>
      <Helmet>
        <title>{item.name}</title>
      </Helmet>
      <Stack direction="row" id={id} className={ITEM_MAIN_CLASS} height="100%">
        <Stack p={2} width="100%">
          <ItemHeader
            isChatboxOpen={isChatboxOpen}
            toggleChatbox={toggleChatbox}
          />

          {children}
        </Stack>
        {isChatboxOpen && (
          <ItemPanel open={isChatboxOpen}>
            <DrawerHeader
              handleDrawerClose={() => {
                setIsChatboxOpen(false);
              }}
            >
              <Typography variant="h6">
                {translateBuilder('ITEM_CHATBOX_TITLE', {
                  name: item.name,
                })}
              </Typography>
            </DrawerHeader>
            <Divider />
            <Chatbox item={item} />
          </ItemPanel>
        )}
      </Stack>
    </>
  );
};

export default ItemMain;
