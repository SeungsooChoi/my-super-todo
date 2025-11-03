
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("할 일을 추가하고 렌더링한다", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "첫 번째 할 일" } });
    fireEvent.click(button);

    expect(screen.getByText("첫 번째 할 일")).toBeInTheDocument();
  });

  it("할 일을 완료 상태로 토글할 수 있다", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "완료 테스트" } });
    fireEvent.click(button);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("할 일을 삭제할 수 있다", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "삭제 테스트" } });
    fireEvent.click(button);

    const deleteButton = screen.getByText("삭제");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("삭제 테스트")).not.toBeInTheDocument();
  });

  it("할 일이 없을 경우 안내 문구를 표시한다", () => {
    render(<TodoList />);
    expect(screen.getByText("할 일이 없습니다.")).toBeInTheDocument();
  });
});