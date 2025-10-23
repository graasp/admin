import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { Footer } from './Footer';

const meta = {
  component: Footer,
  args: {
    onChangeLang: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Developed in Switzerland by the Graasp Association'),
    ).toBeVisible();
  },
} satisfies Story;
