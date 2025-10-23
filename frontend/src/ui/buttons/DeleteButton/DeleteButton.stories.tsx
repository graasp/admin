import type { StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ActionButton, ColorVariants } from '../../types.js';
import { TABLE_CATEGORIES } from '../../utils/storybook.js';
import DeleteButton from './DeleteButton.js';

export default {
  title: 'Buttons/DeleteButton',
  component: DeleteButton,

  args: {
    onClick: fn(),
  },
  argTypes: {
    color: {
      options: Object.values(ColorVariants),
      control: { type: 'radio' },
    },
    title: {
      type: 'string',
    },
    type: {
      options: Object.values(ActionButton),
      control: { type: 'radio' },
    },
    onClick: {
      action: 'click',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('Delete'));

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const MenuItem: Story = {
  args: {
    type: ActionButton.MENU_ITEM,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Delete'));

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Icon: Story = {
  args: {
    type: ActionButton.ICON,
  },
};
