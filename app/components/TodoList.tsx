"use client"

import { FormEvent, useState } from "react"
import { TodoItem } from "./TodoItem";
import { useTodoStore } from "../lib/store/useTodoStore";

export function TodoList(){
  console.log("render TodoList");

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const [input, setInput] = useState("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!input.trim()) return;

    addTodo(input);
    setInput("")
  }

  return (

    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">📝 Todo List</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          추가
        </button>
      </form>

      <ul className="space-y-2">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">할 일이 없습니다.</p>
        )}
      </ul>
    </div>
  )
}