import { Todo } from "../hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  console.log("render TodoItem");

  return (
    <li
      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 shadow-sm"
      data-testid="todo-item"
    >
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="accent-blue-600"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        삭제
      </button>
    </li>
  )
}