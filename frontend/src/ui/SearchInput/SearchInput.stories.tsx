import type { StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';

import { SearchInput } from './SearchInput.js';

export default {
  title: 'Common/Search',
  component: SearchInput,

  argTypes: {
    onChange: fn(),
  },
};

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'search' }),
      'search',
    );
  },
};

export const MaxWidth: Story = {
  args: {
    width: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'search' }),
      'search',
    );
  },
};

export const Mobile: Story = {
  args: {
    margin: 'none',
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'search' }),
      'search',
    );
  },
};
