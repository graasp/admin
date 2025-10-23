import { Meta, StoryObj } from '@storybook/react';

import { Image } from './StyledImages';

const meta = {
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    src: '/illustration/teacher-red.webp',
    width: 300,
    height: 300,
  },
} satisfies Story;
