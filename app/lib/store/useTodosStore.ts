import { Todo } from "@/app/hooks/useTodos";
import { create } from "zustand";

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodosStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (text: string) => {
    set((state) => ({
      todos: [...state.todos, { id: Date.now().toString(), text, completed: false }],
    }));
  },
  removeTodo: (id: string) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
}))