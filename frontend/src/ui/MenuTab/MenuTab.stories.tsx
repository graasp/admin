import { Stack } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react';
import { Cog, Home, Snowflake } from 'lucide-react';

import { MenuTab } from './MenuTab';

const meta = {
  component: MenuTab,

  argTypes: {
    to: { type: 'string' },
  },
  args: { to: '/path' },
  parameters: {
    router: { routes: ['/settings', '/home'], initialEntries: ['/home'] },
  },
} satisfies Meta<typeof MenuTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: { title: 'Settings', icon: <Cog />, to: '/settings' },
} satisfies Story;

export const Active = {
  args: { title: 'Home', icon: <Home />, to: '/home' },
} satisfies Story;

export const ManyTabs = {
  args: { title: 'Last Menu', icon: <Snowflake /> },
  render: (args) => {
    return (
      <Stack direction="row" gap={1}>
        <MenuTab {...Active.args} />
        <MenuTab {...Default.args} />
        <MenuTab {...args} />
      </Stack>
    );
  },
} satisfies Story;
