import { Meta, StoryObj } from '@storybook/react';

import BuildIcon from '@/ui/icons/BuildIcon';

import { PlatformColorSurface } from './PlatformColorSurface';

const meta = {
  component: PlatformColorSurface,
} satisfies Meta<typeof PlatformColorSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    color: 'builder',
    button: {
      text: 'Explore',
      href: '#',
    },
    Icon: BuildIcon,
    text: 'hello this is some text',
  },
} satisfies Story;
