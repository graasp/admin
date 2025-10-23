import { Meta, StoryObj } from '@storybook/react';

import { SettingItem } from './SettingItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Profile/SettingItem',
  component: SettingItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Username',
    content: 'Some Name',
    contentId: 'username-id',
  },
} satisfies Story;
