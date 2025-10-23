import { Meta, StoryObj } from '@storybook/react';

import { UserTestimoniesSection } from './UserTestimoniesSection';

const meta = {
  component: UserTestimoniesSection,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UserTestimoniesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
