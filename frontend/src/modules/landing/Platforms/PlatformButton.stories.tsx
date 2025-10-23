import { Meta, StoryObj } from '@storybook/react';

import { Platform } from '@/ui/PlatformSwitch/hooks';

import { PlatformButton } from './PlatformButton';

const meta = {
  component: PlatformButton,
  args: {
    direction: 'left',
    buttonText: 'See more',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit delectus consequuntur a excepturi natus ducimus dignissimos amet quaerat',
  },
  argTypes: {
    platform: {
      control: 'radio',
      options: Object.values(Platform),
    },
    direction: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof PlatformButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Builder = {
  args: {
    platform: Platform.Builder,
  },
} satisfies Story;

export const Player = {
  args: {
    platform: Platform.Player,
  },
} satisfies Story;

export const Library = {
  args: {
    platform: Platform.Library,
  },
} satisfies Story;

export const Analytics = {
  args: {
    platform: Platform.Analytics,
  },
} satisfies Story;
