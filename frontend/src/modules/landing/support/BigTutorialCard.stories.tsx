import { Meta, StoryObj } from '@storybook/react';

import { BigTutorialCard } from './BigTutorialCard';

const meta = {
  component: BigTutorialCard,
  args: {
    title: 'Tutorial 1',
    description: 'A fake description for this fake tutorial',
    link: '#',
  },
} satisfies Meta<typeof BigTutorialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
