import type {Meta, StoryObj} from '@storybook/react';
import { GlobalProvider } from '@/shared/context';
import { fn } from 'storybook/test';


import ProjectList from '../ProjectList';

const meta = {
  component: ProjectList,
  title: 'ProjectList',
  tags: ['autodocs'],
  decorators: [
    (Story) => 
    <GlobalProvider>
      <Story />
    </GlobalProvider>
  ],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
}