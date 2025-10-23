import { TextField } from '@mui/material';

import { Meta, StoryObj } from '@storybook/react';

import FormProperty from './FormProperty';

const meta = {
  component: FormProperty,
} satisfies Meta<typeof FormProperty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Property',
    children: <TextField />,
  },
} satisfies Story;
