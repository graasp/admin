import { Meta, StoryObj } from '@storybook/react';

import { Basic as BasicEnumeratedParagraph } from './EnumeratedParagraph.stories';
import { Basic as BasicListedParagraph } from './ListedParagraph.stories';
import { BasicParagraph } from './Paragraphs.stories';
import { BasicSubsection } from './SubSection.stories';
import {
  EnumeratedParagraph,
  ListedParagraph,
  Paragraphs,
  Section,
  SubSection,
} from './layouts';

const meta = {
  component: Section,
  decorators: (Story) => (
    <ol>
      <Story />
    </ol>
  ),
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    title: 'Basic text Section',
    children: <Paragraphs {...BasicParagraph.args} />,
  },
} satisfies Story;

export const Listed = {
  args: {
    title: 'Listed Section',
    children: <ListedParagraph {...BasicListedParagraph.args} />,
  },
} satisfies Story;

export const Enumerated = {
  args: {
    title: 'Enumerated Section',
    children: <EnumeratedParagraph {...BasicEnumeratedParagraph.args} />,
  },
} satisfies Story;

export const WithSubsection = {
  args: {
    title: 'Section With Subsection',
    children: (
      <>
        <SubSection {...BasicSubsection.args} />
        <SubSection {...BasicSubsection.args} />
      </>
    ),
  },
} satisfies Story;
