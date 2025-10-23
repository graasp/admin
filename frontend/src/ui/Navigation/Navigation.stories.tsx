import {
  FileItemFactory,
  FileItemType,
  FolderItemFactory,
  ItemType,
  MemberFactory,
  MimeTypes,
} from '@graasp/sdk';

import type { Meta, StoryObj } from '@storybook/react';
import { CogIcon } from 'lucide-react';
import { expect, within } from 'storybook/test';

import ExtraItemsMenu from './ExtraItemsMenu.js';
import { ItemMenuProps, Navigation } from './Navigation.js';

const buildParent = (name: string) => ({
  id: name,
  name,
});

const buildItem = (name: string): FileItemType =>
  FileItemFactory({
    id: name,
    name,
    extra: {
      [ItemType.FILE]: {
        path: 'https://picsum.photos/100',
        mimetype: MimeTypes.Image.PNG,
        name: 'original file name',
        size: 2600,
        content: '',
      },
    },
  });

const meta = {
  title: 'Common/Navigation',
  component: Navigation,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },

  render: (args) => {
    return <Navigation {...args} />;
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;
type UseChildrenHookType = ReturnType<ItemMenuProps['useChildren']>;

const item = buildItem('my item');
const parents = [buildParent('parent 1'), buildParent('parent 2')];
const children = [buildItem('child 1'), buildItem('child 2')];
const useChildren: ItemMenuProps['useChildren'] = () => {
  return { data: children } as UseChildrenHookType;
};
const itemPath = '/itemPath';
const navigateNextIconDataTestId = 'NavigateNextIcon';
const folder = FolderItemFactory({
  id: 'folder-id',
  name: 'folder',
  type: ItemType.FOLDER,
  description: 'my image description',
  path: 'item-path',
  settings: {},
  creator: MemberFactory(),
});

export const FolderWithParents = {
  args: {
    itemPath,
    useChildren,
    item: folder,
    parents,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(folder.name)).toBeInTheDocument();

    // check parents
    for (const p of parents) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 3 = 2 parents + current item is a folder
    expect(canvas.getAllByTestId(navigateNextIconDataTestId)).toHaveLength(3);
  },
} satisfies Story;

export const FileWithParents = {
  args: {
    itemPath,
    useChildren,
    item,

    parents,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(item.name)).toBeInTheDocument();

    // check parents
    for (const p of parents) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 2 parents
    expect(canvas.getAllByTestId(navigateNextIconDataTestId)).toHaveLength(2);
  },
} satisfies Story;

const extraItems = (
  <ExtraItemsMenu
    name="Settings"
    // path="/settings"
    icon={<CogIcon />}
    menuItems={[
      { name: 'Information', path: '/info' },
      { name: 'Settings', path: '/settings' },
      { name: 'Publish', path: '/publish' },
    ]}
  />
);

export const FolderWithParentsWithExtraItems = {
  args: {
    itemPath,
    useChildren,
    item: folder,
    maxItems: 10,
    parents,
    children: extraItems,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(folder.name)).toBeInTheDocument();

    // check parents
    for (const p of parents) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 3 = 2 parents + current item is a folder + 1 extra item
    expect(canvas.getAllByTestId(navigateNextIconDataTestId)).toHaveLength(3);
  },
} satisfies Story;
