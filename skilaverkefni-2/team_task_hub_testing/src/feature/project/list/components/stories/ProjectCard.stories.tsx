import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '../ProjectCard';
import { GlobalProvider } from '@/shared/context';

const meta = {
  component: ProjectCard, 
  title: 'ProjectCard',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GlobalProvider>
        <Story />
      </GlobalProvider>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: '1',
      name: 'Project 1',
      description: 'This is a description of Project 1',
      tasksCount: 0,
    },
  }, 
};
