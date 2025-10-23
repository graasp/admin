import { Meta, StoryObj } from '@storybook/react';

import { CopyrightText } from './CopyrightText';

const meta = {
  component: CopyrightText,
} satisfies Meta<typeof CopyrightText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
