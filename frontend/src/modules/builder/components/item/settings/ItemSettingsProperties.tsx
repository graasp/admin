import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { ItemType, PackedItem } from '@graasp/sdk';

import { BarChart3, MessageSquareOff, MessageSquareText } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  SETTINGS_CHATBOX_TOGGLE_ID,
  SETTINGS_PINNED_TOGGLE_ID,
  SETTINGS_RESIZE_TOGGLE_ID,
  SETTINGS_SAVE_ACTIONS_TOGGLE_ID,
} from '@/config/selectors';
import PinButton from '@/ui/buttons/PinButton/PinButton';
import { ActionButton } from '@/ui/types';

import CollapseButton from '~builder/components/common/CollapseButton';

import HideSettingCheckbox from '../sharing/HideSettingCheckbox';
import ItemSettingCheckBoxProperty from './ItemSettingCheckBoxProperty';
import LinkSettings from './LinkSettings';
import FileAlignmentSetting from './file/FileAlignmentSetting';
import FileMaxWidthSetting from './file/FileMaxWidthSetting';
import { SettingVariant } from './settingTypes';

const DEFAULT_RESIZE_SETTING = false;
const DEFAULT_SAVE_ACTIONS_SETTING = true;

type Props = {
  item: PackedItem;
};

type ItemSetting = PackedItem['settings'];

const ItemSettingsProperties = ({ item }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutate: editItem } = mutations.useEditItem();

  const { settings } = item;

  const handleSettingChanged = <K extends keyof ItemSetting>(
    settingKey: K,
    newValue: unknown,
  ) => {
    editItem({
      id: item.id,
      name: item.name,
      settings: {
        [settingKey]: newValue,
      },
    });
  };

  const handleOnToggle = <K extends keyof ItemSetting>(
    event: { target: { checked: boolean } },
    settingKey: K,
  ): void => {
    handleSettingChanged(settingKey, event.target.checked);
  };

  const renderSettingsPerType = () => {
    switch (item.type) {
      case ItemType.LINK:
        return <LinkSettings item={item} />;
      case ItemType.FILE:
        return (
          <>
            <FileMaxWidthSetting item={item} variant={SettingVariant.List} />
            <FileAlignmentSetting item={item} variant={SettingVariant.List} />
          </>
        );

      case ItemType.APP:
        return (
          <ItemSettingCheckBoxProperty
            id={SETTINGS_RESIZE_TOGGLE_ID}
            title={translateBuilder('ITEM_SETTINGS_RESIZABLE_ENABLED_TEXT')}
            checked={Boolean(settings?.isResizable || DEFAULT_RESIZE_SETTING)}
            onClick={(checked: boolean): void => {
              handleOnToggle({ target: { checked } }, 'isResizable');
            }}
            valueText={
              settings?.isResizable
                ? translateBuilder('ITEM_SETTINGS_RESIZABLE_ENABLED_TEXT')
                : translateBuilder('ITEM_SETTINGS_RESIZABLE_DISABLED_TEXT')
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stack direction="column" gap={2}>
      <ItemSettingCheckBoxProperty
        title={translateBuilder('ITEM_SETTINGS_IS_COLLAPSED_TITLE')}
        icon={<CollapseButton type={ActionButton.ICON} item={item} />}
        checked={Boolean(settings.isCollapsible)}
        disabled={item.type === ItemType.FOLDER}
        onClick={(checked: boolean): void => {
          handleOnToggle({ target: { checked } }, 'isCollapsible');
        }}
        valueText={(() => {
          if (item.type === ItemType.FOLDER) {
            return translateBuilder('SETTINGS_COLLAPSE_FOLDER_INFORMATION');
          }
          return settings.isCollapsible
            ? translateBuilder('ITEM_SETTINGS_IS_COLLAPSED_ENABLED_TEXT')
            : translateBuilder('ITEM_SETTINGS_IS_COLLAPSED_DISABLED_TEXT');
        })()}
      />

      <ItemSettingCheckBoxProperty
        id={SETTINGS_PINNED_TOGGLE_ID}
        icon={
          <PinButton
            isPinned={Boolean(settings.isPinned)}
            type={ActionButton.ICON}
          />
        }
        title={translateBuilder('ITEM_SETTINGS_IS_PINNED_TITLE')}
        checked={Boolean(settings.isPinned)}
        onClick={(checked: boolean): void => {
          handleOnToggle({ target: { checked } }, 'isPinned');
        }}
        valueText={
          settings.isPinned
            ? translateBuilder('ITEM_SETTINGS_IS_PINNED_ENABLED_TEXT')
            : translateBuilder('ITEM_SETTINGS_IS_PINNED_DISABLED_TEXT')
        }
      />

      <HideSettingCheckbox item={item} />

      <ItemSettingCheckBoxProperty
        id={SETTINGS_CHATBOX_TOGGLE_ID}
        title={translateBuilder('ITEM_SETTINGS_SHOW_CHAT_TITLE')}
        icon={
          settings.showChatbox ? <MessageSquareText /> : <MessageSquareOff />
        }
        checked={Boolean(settings.showChatbox)}
        onClick={(checked: boolean): void => {
          handleOnToggle({ target: { checked } }, 'showChatbox');
        }}
        valueText={
          settings.showChatbox
            ? translateBuilder('ITEM_SETTINGS_SHOW_CHAT_ENABLED_TEXT')
            : translateBuilder('ITEM_SETTINGS_SHOW_CHAT_DISABLED_TEXT')
        }
      />
      <ItemSettingCheckBoxProperty
        id={SETTINGS_SAVE_ACTIONS_TOGGLE_ID}
        title={translateBuilder('SETTINGS_SAVE_ACTIONS')}
        icon={<BarChart3 />}
        checked={Boolean(
          settings?.enableSaveActions ?? DEFAULT_SAVE_ACTIONS_SETTING,
        )}
        onClick={(checked: boolean): void => {
          handleOnToggle({ target: { checked } }, 'enableSaveActions');
        }}
        valueText="Coming soon"
        disabled
      />

      {renderSettingsPerType()}
    </Stack>
  );
};

export default ItemSettingsProperties;
