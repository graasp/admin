import { Meta, StoryObj } from '@storybook/react';

import { PuzzleSection } from './Puzzle';

const meta = {
  component: PuzzleSection,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PuzzleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
