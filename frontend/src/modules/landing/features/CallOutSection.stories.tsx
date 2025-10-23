import { Box, Button, Stack } from '@mui/material';

import { Meta, StoryObj } from '@storybook/react';

import { CallOutSection } from './CallOutSection';

const meta = {
  component: CallOutSection,
  args: {
    lead: 'New and exciting',
    title: 'Try this new thing out!',
    children: 'hey! lorem ipsum is great !',
    actions: [<Button key="action">Some action</Button>],
    image: <Box height="200" width="200" color="builder" />,
  },
  parameters: {},
} satisfies Meta<typeof CallOutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    lead: 'New and exciting',
    title: 'Try this new thing out!',
    children: 'hey! lorem ipsum is great !',
    actions: [<Button key="action">Some action</Button>],
    image: <Box height="100%" width="100%" bgcolor="builder.main" />,
  },
} satisfies Story;

export const Multiple = {
  args: {},
  render: () => {
    return (
      <Stack gap={8}>
        <CallOutSection {...Default.args} />
        <CallOutSection {...Default.args} />
      </Stack>
    );
  },
} satisfies Story;
