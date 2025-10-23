import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import CountryForm from './CountryForm';

const meta = {
  component: CountryForm,

  argTypes: {},
} satisfies Meta<typeof CountryForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    onChange: fn(),
  },
} satisfies Story;

export const InitialValue = {
  args: {
    onChange: fn(),
    initialValue: 'CH',
  },
} satisfies Story;

// the popper can overflow
export const TopPlacement = {
  args: {
    onChange: fn(),
    placement: 'top-start',
  },
  decorators: [
    (Story) => (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Story />
      </>
    ),
  ],
} satisfies Story;

// the popper can overflow
export const French = {
  args: {
    onChange: fn(),
    lang: 'fr',
  },
} satisfies Story;
