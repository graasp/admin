import { Meta, StoryObj } from '@storybook/react';

import { Basic, Enumerated, Listed, WithSubsection } from './Section.stories';
import { Page, Section } from './layouts';

const meta = {
  component: Page,
  args: {
    children: 'hello',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComplexPage = {
  args: {
    title: 'Page title',
    children: (
      <>
        <Section {...Basic.args} />
        <Section {...Enumerated.args} />
        <Section {...WithSubsection.args} />
        <Section {...Listed.args} />
      </>
    ),
  },
} satisfies Story;
