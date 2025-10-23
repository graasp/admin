import { Typography } from '@mui/material';

import { Meta, StoryObj } from '@storybook/react';

import { CenteredContainer } from './CenteredContainer';

const meta = {
  component: CenteredContainer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CenteredContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <Typography>Hello</Typography>,
  },
} satisfies Story;
