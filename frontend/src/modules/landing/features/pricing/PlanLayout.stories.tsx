import { Meta, StoryObj } from '@storybook/react';

import { IncludedOption } from './IncludedOption';
import {
  Storage as StorageOption,
  Support as SupportOption,
} from './IncludedOption.stories';
import { PlanLayout } from './PlanLayout';

const meta = {
  component: PlanLayout,
} satisfies Meta<typeof PlanLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'Basic',
    price: '50 CHF/month',
    children: (
      <>
        <IncludedOption {...StorageOption.args} />
        <IncludedOption {...SupportOption.args} />
        <IncludedOption text="Something you really need" />
      </>
    ),
  },
} satisfies Story;
