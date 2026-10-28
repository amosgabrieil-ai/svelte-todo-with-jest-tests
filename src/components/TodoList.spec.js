import { screen, render, fireEvent } from "@testing-library/svelte";

import TodoList from "./TodoList.svelte";

describe("TodoList", () => {
  let todos = [
    { id: 1, text: "Create a Svelte starter app", done: true },
    { id: 2, text: "Create your first component", done: false },
  ];

  test("should render todos", () => {
    render(TodoList, { props: { todos } });
    expect(screen.getByText(todos[0].text));
    expect(screen.getByText(todos[1].text));
  });

  test("should show exactly 2 todos", () => {
    render(TodoList, { props: { todos } });
    expect(screen.getAllByRole("listitem").length).toEqual(2);
  });

  test("should show a message when there are no todos", async () => {
    render(TodoList, { props: { todos: [] } });
    await expect(screen.queryByRole("listitem")).toBeNull();
    expect(screen.getByText("Congratulations, all done!"));
  });

  test("should show an empty list when the todos prop is not provided", () => {
    render(TodoList);
    expect(screen.getByText("Congratulations, all done!"));
  });
    test("should forward toggleDone event from Todo", async () => {
    const { component } = render(TodoList, { props: { todos } });
    const handler = jest.fn();

    component.$on("toggleDone", handler);

    const checkbox = screen.getAllByLabelText("Done")[0];
    await fireEvent.click(checkbox);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual(todos[0]);
  });
});
