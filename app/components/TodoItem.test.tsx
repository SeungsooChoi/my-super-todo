import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import { Todo } from "../hooks/useTodos";

describe("TodoItem", () => {
  const mockTodo: Todo = { 
    id: "1", 
    text: "테스트 할 일", 
    completed: false 
  };
  
  const mockHandlers = {
    onToggle: jest.fn(),
    onRemove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("할 일 텍스트를 렌더링한다", () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    expect(screen.getByText("테스트 할 일")).toBeInTheDocument();
  });

  it("체크박스 클릭 시 onToggle이 호출된다", async () => {
    const user = userEvent.setup();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    const checkbox = screen.getByRole("checkbox", { 
      name: /테스트 할 일/i 
    });
    
    await user.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith("1");
    expect(mockHandlers.onToggle).toHaveBeenCalledTimes(1);
  });

  it("삭제 버튼 클릭 시 onRemove가 호출된다", async () => {
    const user = userEvent.setup();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    const deleteButton = screen.getByRole("button", { 
      name: /삭제/i 
    });
    
    await user.click(deleteButton);
    
    expect(mockHandlers.onRemove).toHaveBeenCalledWith("1");
    expect(mockHandlers.onRemove).toHaveBeenCalledTimes(1);
  });

  it("완료된 할 일은 체크박스가 체크되어 있다", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("완료된 할 일은 line-through 스타일이 적용된다", () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    const text = screen.getByText("테스트 할 일");
    expect(text).toHaveClass("line-through");
  });

  it("미완료 할 일은 체크박스가 체크되어 있지 않다", () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockHandlers.onToggle} 
        onRemove={mockHandlers.onRemove} 
      />
    );
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  describe("접근성 (Accessibility)", () => {
    it("체크박스는 적절한 aria-label을 가진다", () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockHandlers.onToggle} 
          onRemove={mockHandlers.onRemove} 
        />
      );
      
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAccessibleName();
    });

    it("삭제 버튼은 적절한 aria-label을 가진다", () => {
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockHandlers.onToggle} 
          onRemove={mockHandlers.onRemove} 
        />
      );
      
      const deleteButton = screen.getByRole("button", { name: /삭제/i });
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("사용자 상호작용", () => {
    it("체크박스를 두 번 클릭하면 onToggle이 두 번 호출된다", async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockHandlers.onToggle} 
          onRemove={mockHandlers.onRemove} 
        />
      );
      
      const checkbox = screen.getByRole("checkbox");
      
      await user.click(checkbox);
      await user.click(checkbox);
      
      expect(mockHandlers.onToggle).toHaveBeenCalledTimes(2);
    });

    it("키보드로 체크박스를 활성화할 수 있다", async () => {
      const user = userEvent.setup();
      
      render(
        <TodoItem 
          todo={mockTodo} 
          onToggle={mockHandlers.onToggle} 
          onRemove={mockHandlers.onRemove} 
        />
      );
      
      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      
      await user.keyboard(" "); // Space key
      
      expect(mockHandlers.onToggle).toHaveBeenCalledWith("1");
    });
  });
});