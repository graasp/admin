import { Meta, StoryObj } from '@storybook/react';

import { MemberStatsCard } from './MemberStatsCard';

const meta = {
  component: MemberStatsCard,
} satisfies Meta<typeof MemberStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'My great stat',
    stat: 120,
  },
} satisfies Story;
