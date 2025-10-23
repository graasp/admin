import { Meta, StoryObj } from '@storybook/react';

import { ButtonLink } from './ButtonLink';

const meta = {
  component: ButtonLink,
  args: {
    children: 'Click Me',
    variant: 'contained',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const Primary = {
  args: {
    variant: 'contained',
  },
} satisfies Story;
