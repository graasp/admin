import { Meta, StoryObj } from '@storybook/react';

import { TestimonyCard } from './TestimonyCard';

const meta = {
  component: TestimonyCard,
} satisfies Meta<typeof TestimonyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'Tom',
    title: 'the best friend',
    text: 'I really like Graasp',
    image: '/illustration/teacher.webp',
  },
} satisfies Story;
