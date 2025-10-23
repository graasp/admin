import { ComponentProps } from 'react';

import { AccountType, DiscriminatedItem } from '@graasp/sdk';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { AuthContext } from '@/AuthContext';

import { RightHeader } from './RightHeader';

type RightHeaderProps = ComponentProps<typeof RightHeader> & {
  isAuthenticated: boolean;
};

function getUser(userType: AccountType) {
  if (userType === AccountType.Individual) {
    return {
      id: 'd2bc9358-9a63-49ea-81e0-e314816e482a',
      name: 'Bob',
      lang: 'en',
      type: AccountType.Individual as const,
    };
  }
  return {
    id: 'd2bc9358-9a63-49ea-81e0-e314816e482a',
    name: 'Bob',
    lang: 'en',
    type: AccountType.Guest as const,
    item: {} as DiscriminatedItem,
  };
}

const meta: Meta<RightHeaderProps> = {
  component: RightHeader,
  args: {
    isAuthenticated: true,
    onChangeLang: fn(),
  },
  render: function Render({ isAuthenticated, ...args }) {
    const user = isAuthenticated
      ? {
          user: getUser(AccountType.Individual),
          logout: fn(),
          login: null,
          isAuthenticated: true as const,
        }
      : {
          user: null,
          isAuthenticated,
          logout: null,
          login: fn(),
        };
    return (
      <AuthContext.Provider value={user}>
        <RightHeader {...args} />
      </AuthContext.Provider>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
  parameters: {},

  args: {
    isAuthenticated: true,
  },
};

export const Unauthenticated = {
  args: {
    isAuthenticated: false,
  },
} satisfies Story;
