import { Meta, StoryObj } from '@storybook/react';

import { WorkInProgress } from './WorkInProgress';

const meta = {
  component: WorkInProgress,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WorkInProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
