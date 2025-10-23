import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@mui/material';

import { Context } from '@graasp/sdk';

import { Link, useParams } from '@tanstack/react-router';
import { MapPinIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { ITEM_MAP_BUTTON_ID } from '@/config/selectors';
import { ClientManager } from '@/lib/ClientManager';
import {
  useItemGeolocation,
  useItemsInMap,
} from '@/query/hooks/itemGeolocation';

import { ToolButton } from './customButtons';

const cm = ClientManager.getInstance();

const useGeolocationButton = (): { geolocationButton: JSX.Element | null } => {
  const { t } = useTranslation(NS.Player);
  // get inherited geoloc
  const { itemId, rootId } = useParams({ from: '/player/$rootId/$itemId' });
  const { data: item } = hooks.useItem(itemId);
  const { data: allGeoloc } = useItemsInMap({
    parentItemId: rootId,
  });
  const { data: geoloc } = useItemGeolocation(item?.id);

  if (!allGeoloc?.length) {
    return { geolocationButton: null };
  }

  const url = geoloc
    ? cm.getItemLink(Context.Builder, geoloc.item.id, {
        mode: 'map',
      })
    : null;

  const isDisabled = !geoloc;

  const tooltip = isDisabled
    ? t('MAP_BUTTON_DISABLED_TEXT')
    : t('MAP_BUTTON_TEXT', { name: geoloc.item.name });

  const component = (
    <span id={ITEM_MAP_BUTTON_ID}>
      <ToolButton key="mapButton" disabled={isDisabled} aria-label={tooltip}>
        <MapPinIcon />
      </ToolButton>
    </span>
  );
  const button = !url ? component : <Link to={url}>{component}</Link>;

  return {
    geolocationButton: <Tooltip title={tooltip}>{button}</Tooltip>,
  };
};

export default useGeolocationButton;
