import { Meta, StoryObj } from '@storybook/react';

import { BasicParagraph } from './Paragraphs.stories';
import { Paragraphs, SubSection } from './layouts';

const meta = {
  component: SubSection,
  decorators: (Story) => (
    <ol>
      <Story />
    </ol>
  ),
} satisfies Meta<typeof SubSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSubsection = {
  args: {
    title: 'Sub section title',
    children: <Paragraphs {...BasicParagraph.args} />,
  },
} satisfies Story;
