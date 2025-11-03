import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  const setup = () => {
    const user = userEvent.setup();
    const utils = render(<TodoList />);
    
    const getInput = () => screen.getByPlaceholderText("할 일을 입력하세요");
    const getAddButton = () => screen.getByRole("button", { name: /추가/i });
    
    const addTodo = async (text: string) => {
      await user.type(getInput(), text);
      await user.click(getAddButton());
    };
    
    return {
      user,
      getInput,
      getAddButton,
      addTodo,
      ...utils,
    };
  };

  describe("할 일 추가", () => {
    it("할 일을 추가하고 렌더링한다", async () => {
      const { addTodo } = setup();

      await addTodo("첫 번째 할 일");

      expect(screen.getByText("첫 번째 할 일")).toBeInTheDocument();
    });

    it("할 일 추가 후 입력창이 비워진다", async () => {
      const { addTodo, getInput } = setup();

      await addTodo("할 일 추가");

      expect(getInput()).toHaveValue("");
    });

    it("Enter 키로도 할 일을 추가할 수 있다", async () => {
      const { user, getInput } = setup();

      const input = getInput();
      await user.type(input, "키보드 입력{Enter}");

      expect(screen.getByText("키보드 입력")).toBeInTheDocument();
    });
  });

  describe("할 일 완료 토글", () => {
    it("할 일을 완료 상태로 토글할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("완료 테스트");

      const checkbox = screen.getByRole("checkbox", { 
        name: /완료 테스트/i 
      });
      
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
    });

    it("완료된 할 일을 다시 미완료로 변경할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("토글 테스트");

      const checkbox = screen.getByRole("checkbox");
      
      // 완료
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      
      // 미완료
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("완료된 할 일은 line-through 스타일이 적용된다", async () => {
      const { user, addTodo } = setup();

      await addTodo("스타일 테스트");

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const text = screen.getByText("스타일 테스트");
      expect(text).toHaveClass("line-through");
    });

    it("여러 할 일 중 특정 할 일만 완료할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("첫 번째");
      await addTodo("두 번째");
      await addTodo("세 번째");

      const checkboxes = screen.getAllByRole("checkbox");
      
      // 두 번째만 완료
      await user.click(checkboxes[1]);

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });
  });

  describe("할 일 삭제", () => {
    it("할 일을 삭제할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("삭제 테스트");

      const deleteButton = screen.getByRole("button", { name: /삭제/i });
      await user.click(deleteButton);

      expect(screen.queryByText("삭제 테스트")).not.toBeInTheDocument();
    });

    it("여러 할 일 중 특정 할 일만 삭제할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("첫 번째");
      await addTodo("두 번째");
      await addTodo("세 번째");

      const deleteButtons = screen.getAllByRole("button", { name: /삭제/i });
      
      // 두 번째 삭제
      await user.click(deleteButtons[1]);

      expect(screen.getByText("첫 번째")).toBeInTheDocument();
      expect(screen.queryByText("두 번째")).not.toBeInTheDocument();
      expect(screen.getByText("세 번째")).toBeInTheDocument();
    });

    it("완료된 할 일도 삭제할 수 있다", async () => {
      const { user, addTodo } = setup();

      await addTodo("완료 후 삭제");

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const deleteButton = screen.getByRole("button", { name: /삭제/i });
      await user.click(deleteButton);

      expect(screen.queryByText("완료 후 삭제")).not.toBeInTheDocument();
    });

    it("모든 할 일을 삭제하면 안내 문구가 표시된다", async () => {
      const { user, addTodo } = setup();

      await addTodo("삭제될 할 일");

      const deleteButton = screen.getByRole("button", { name: /삭제/i });
      await user.click(deleteButton);

      expect(screen.getByText("할 일이 없습니다.")).toBeInTheDocument();
    });
  });

  describe("빈 상태", () => {
    it("할 일이 없을 경우 안내 문구를 표시한다", () => {
      setup();
      
      expect(screen.getByText("할 일이 없습니다.")).toBeInTheDocument();
    });
  });
});