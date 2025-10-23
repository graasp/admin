import { Meta, StoryObj } from '@storybook/react';

import { PlatformCube } from './PlatformCube';

const meta = {
  component: PlatformCube,
} satisfies Meta<typeof PlatformCube>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const Mobile = {
  args: {},
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
} satisfies Story;
