import { Meta, StoryObj } from '@storybook/react';

import { TitleSection } from './TitleSection';

const meta = {
  component: TitleSection,
} satisfies Meta<typeof TitleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
