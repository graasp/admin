import { Meta, StoryObj } from '@storybook/react';

import { SettingItem } from '~account/settings/SettingItem';
import { Default as SettingItemDefault } from '~account/settings/SettingItem.stories';

import { BorderedSection } from './BorderedSection';

const meta = {
  component: BorderedSection,
} satisfies Meta<typeof BorderedSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Bordered section',
    children: (
      <>
        <SettingItem {...SettingItemDefault.args} />
        <SettingItem {...SettingItemDefault.args} />
        <SettingItem {...SettingItemDefault.args} />
      </>
    ),
  },
} satisfies Story;
