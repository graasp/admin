import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { PackedItem, getIdsFromPath } from '@graasp/sdk';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { SETTINGS_HIDE_ITEM_ID } from '@/config/selectors';

import { BUILDER } from '~builder/langs';

import ItemSettingCheckBoxProperty from '../settings/ItemSettingCheckBoxProperty';

const HideSettingCheckbox = ({ item }: { item: PackedItem }): JSX.Element => {
  const { mutate: postItemVisibility } = mutations.usePostItemVisibility();
  const { mutate: deleteItemVisibility } = mutations.useDeleteItemVisibility();
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const isDisabled =
    item.hidden && getIdsFromPath(item.hidden.itemPath).at(-1) !== item.id;

  const onClick = (checked: boolean): void => {
    if (!checked) {
      postItemVisibility({ itemId: item.id, type: 'hidden' });
    } else {
      deleteItemVisibility({
        itemId: item.id,
        type: 'hidden',
      });
    }
  };

  return (
    <ItemSettingCheckBoxProperty
      id={SETTINGS_HIDE_ITEM_ID}
      disabled={isDisabled}
      title={translateBuilder(BUILDER.HIDE_ITEM_SETTING_TITLE)}
      icon={item.hidden ? <EyeOffIcon /> : <EyeIcon />}
      checked={Boolean(!item.hidden)}
      onClick={onClick}
      valueText={(() => {
        if (isDisabled) {
          return translateBuilder(BUILDER.HIDE_ITEM_HIDDEN_PARENT_INFORMATION);
        }
        return item.hidden
          ? translateBuilder(BUILDER.HIDE_ITEM_SETTING_DESCRIPTION_ENABLED)
          : translateBuilder(BUILDER.HIDE_ITEM_SETTING_DESCRIPTION_DISABLED);
      })()}
    />
  );
};

export default HideSettingCheckbox;
