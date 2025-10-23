import { ActionTriggers, Context, UnionOfConst } from '@graasp/sdk';

// Height of container in ActionsByDayChart
export const CONTAINER_HEIGHT = 450;

export const DEFAULT_ACTION_CELL_COLOR = '#ADADEA';

export const getColorForActionTriggerType = (type: string): string => {
  switch (type) {
    case ActionTriggers.Create:
      return '#20A39E';
    case ActionTriggers.CollectionView:
      return '#3066BE';
    case ActionTriggers.Copy:
      return '#96CCE6';
    case ActionTriggers.Delete:
      return '#61D095';
    case ActionTriggers.ItemDownload:
      return '#FFBA49';
    case ActionTriggers.ItemEmbed:
      return '#EF5B5B';
    case ActionTriggers.ItemLike:
      return '#FFA8A8';
    case ActionTriggers.ItemSearch:
      return '#A4036F';
    case ActionTriggers.ItemUnlike:
      return '#B54A3F';
    case ActionTriggers.ItemView:
      return '#cc3333';
    case ActionTriggers.LinkOpen:
      return '#800080';
    case ActionTriggers.Move:
      return '#07bc0c';
    case ActionTriggers.Update:
      return '#CCD9E5';
    case ActionTriggers.ChatClear:
      return '#C4E5F7';
    case ActionTriggers.ChatCreate:
      return '#800040';
    case ActionTriggers.ChatDelete:
      return '#004080';
    case ActionTriggers.ChatUpdate:
      return '#E5CCE5';
    default:
      return DEFAULT_ACTION_CELL_COLOR;
  }
};

export const AVERAGE_COLOR = '#F99417';
export const GENERAL_COLOR = '#8884d8';

export const DEFAULT_REQUEST_SAMPLE_SIZE = 5000;

export const ActionViewContext = {
  Builder: Context.Builder,
  Player: Context.Player,
  Library: Context.Library,
} as const;
export type ActionViewContextUnion = UnionOfConst<typeof ActionViewContext>;

export const NAVIGATOR_BACKGROUND_COLOR = '#f6f6f6';

export const MAX_BARS_SMALL_SCREEN = 5;
export const MAX_BARS_LARGE_SCREEN = 8;
