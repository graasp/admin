import { Meta, StoryObj } from '@storybook/react';

import { PricingPlansSection } from './PricingPlansSection';

const meta = {
  component: PricingPlansSection,
} satisfies Meta<typeof PricingPlansSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
