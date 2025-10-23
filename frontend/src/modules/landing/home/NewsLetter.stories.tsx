import { Meta, StoryObj } from '@storybook/react';

import { NewsLetter } from './NewsLetter';

const meta = {
  component: NewsLetter,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
} satisfies Meta<typeof NewsLetter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop = {
  args: {},
} satisfies Story;

export const Mobile = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
} satisfies Story;
