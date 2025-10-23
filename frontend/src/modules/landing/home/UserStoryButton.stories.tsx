import { Meta, StoryObj } from '@storybook/react';

import { UserStoryButton } from './UserStoryButton';

const meta = {
  component: UserStoryButton,
} satisfies Meta<typeof UserStoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 'test',
    text: 'Do you want to see this?',
  },
} satisfies Story;
