import { Meta, StoryObj } from '@storybook/react';

import { EnumeratedParagraph, ListItem } from './layouts';

const meta = {
  component: EnumeratedParagraph,
} satisfies Meta<typeof EnumeratedParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    children: (
      <>
        <ListItem>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          quasi est quam
        </ListItem>
        <ListItem>
          o alias vero libero accusamus optio, tempora accusantium quae commodi
          necessitatibus dolores voluptatibus consequatur repellat culpa cum.
        </ListItem>
        <ListItem>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          quasi est quam tempore quo alias vero libero accusamus optio, tempora
          accusantium quae commodi necessitatibus dolores voluptatibus
          consequatur repellat culpa cum.
        </ListItem>
      </>
    ),
  },
} satisfies Story;
