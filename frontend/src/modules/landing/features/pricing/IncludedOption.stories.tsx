import { Meta, StoryObj } from '@storybook/react';

import { IncludedOption } from './IncludedOption';

const meta = {
  component: IncludedOption,
} satisfies Meta<typeof IncludedOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Storage = {
  args: {
    text: '5 GB of storage for videos, photos, and documents',
  },
} satisfies Story;

export const Support = {
  args: {
    text: 'Next day support',
  },
} satisfies Story;
