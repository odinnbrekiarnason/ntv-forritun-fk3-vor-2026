import type { Meta, StoryObj } from '@storybook/react-vite'
import AddProject from './AddProject';

const meta = {
  title: 'Components/projectCard',
  component: AddProject,
} satisfies Meta<typeof AddProject>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};