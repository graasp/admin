import { Meta, StoryObj } from '@storybook/react';

import { Default as DefaultImage } from '@/components/ui/images.stories';

import { BasicParagraph } from '~landing/privacyPolicy/Paragraphs.stories';
import { Paragraphs } from '~landing/privacyPolicy/layouts';

import { UserStory } from './UserStory';

const meta = {
  component: UserStory,
} satisfies Meta<typeof UserStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 'test',
    caption: 'Hello',
    title: 'Awesome feature',
    sectionTitle: 'Section title',
    href: '/',
    buttonText: 'Click me',
    children: <Paragraphs {...BasicParagraph.args} />,
    image: <img alt="illustration" {...DefaultImage.args} />,
    imageAttribution: 'some attribution',
  },
} satisfies Story;
