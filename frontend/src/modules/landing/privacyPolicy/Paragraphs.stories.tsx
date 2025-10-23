import { Typography } from '@mui/material';

import { Meta, StoryObj } from '@storybook/react';

import { Paragraphs } from './layouts';

const meta = {
  component: Paragraphs,
} satisfies Meta<typeof Paragraphs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicParagraph = {
  args: {
    children: (
      <>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          quasi est quam tempore quo alias vero libero accusamus optio, tempora
          accusantium quae commodi necessitatibus dolores voluptatibus
          consequatur repellat culpa cum.
        </Typography>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          quasi est quam tempore quo alias vero libero accusamus optio, tempora
          accusantium quae commodi necessitatibus dolores voluptatibus
          consequatur repellat culpa cum.
        </Typography>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          quasi est quam tempore quo alias vero libero accusamus optio, tempora
          accusantium quae commodi necessitatibus dolores voluptatibus
          consequatur repellat culpa cum.
        </Typography>
      </>
    ),
  },
} satisfies Story;
