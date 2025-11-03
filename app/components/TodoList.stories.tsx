import type { Meta, StoryObj } from '@storybook/react'
import { TodoList } from './TodoList'

const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TodoList>

export const EmptyList: Story = {
  args: {},
}

export const PreloadedTodos: Story = {
  render: () => (
    <TodoList
      initialTodos={[
        { id: "1", text: 'Storybook 연동 테스트', completed: false },
        { id: "2", text: 'Tailwind 스타일 확인', completed: true },
      ]}
    />
  ),
}
