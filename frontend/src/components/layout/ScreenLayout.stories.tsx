import { Meta, StoryObj } from '@storybook/react';

import { BorderedSection } from './BorderedSection';
import { Default as DefaultBorderedSection } from './BorderedSection.stories';
import { ScreenLayout } from './ScreenLayout';

const meta = {
  component: ScreenLayout,
} satisfies Meta<typeof ScreenLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Screen layout',
    children: (
      <>
        <BorderedSection {...DefaultBorderedSection.args} />
        <BorderedSection {...DefaultBorderedSection.args} />
        <BorderedSection {...DefaultBorderedSection.args} />
      </>
    ),
  },
} satisfies Story;
