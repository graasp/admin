import { Meta, StoryObj } from '@storybook/react';

import { NotFoundComponent } from './NotFoundComponent';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pages/NotFound',
  component: NotFoundComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof NotFoundComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
