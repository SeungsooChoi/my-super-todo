import type { Meta, StoryObj } from '@storybook/react'
import { TodoItem } from './TodoItem'

const meta: Meta<typeof TodoItem> = {
  title: 'Components/TodoItem',
  component: TodoItem,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'toggled' },
    onRemove: { action: 'deleted' },
  },
}

export default meta
type Story = StoryObj<typeof TodoItem>

export const Default: Story = {
  args: {
    todo: {
      id: "1",
      text: '기본 Todo 예시입니다.',
      completed: false,
    },
  },
}

export const Completed: Story = {
  args: {
    todo: {
      id: "2",
      text: '완료된 Todo입니다.',
      completed: true,
    },
  },
}
