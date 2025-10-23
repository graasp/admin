import { Meta, StoryObj } from '@storybook/react';

import { OurMissionSection } from './OurMissionSection';

const meta = {
  component: OurMissionSection,
} satisfies Meta<typeof OurMissionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
