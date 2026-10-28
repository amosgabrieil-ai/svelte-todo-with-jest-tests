
import { render, screen } from "@testing-library/svelte";
import { fireEvent } from "@testing-library/svelte/node_modules/@testing-library/dom";

// @ts-ignore
import Todo from "./Todo.svelte";

describe("Todo", () => {
  const todoDone = { id: 1, text: "buy milk", done: true };
  const todoNotDone = { id: 2, text: "do laundry", done: false };

  test("shows the todo text when rendered", () => {
    render(Todo, { props: { todo: todoDone } });

    expect(screen.getByLabelText("Done")).toBeInTheDocument();
    expect(screen.getByText(todoDone.text)).toBeInTheDocument();
  });

  test("the checkbox should be checked when a todo is done", () => {
    render(Todo, { props: { todo: todoDone } });

    expect(screen.getByLabelText("Done")).toBeChecked();
  });

  test("a done class should be added when a todo is done", () => {
    render(Todo, { props: { todo: todoDone } });

    expect(screen.getByText(todoDone.text)).toHaveClass("done");
  });

  test("the checkbox should not be checked when a todo is not done", () => {
    render(Todo, { props: { todo: todoNotDone } });

    expect(screen.getByLabelText("Done")).not.toBeChecked();
  });

  test("a done class should not be added when a todo is not done", () => {
    render(Todo, { props: { todo: todoNotDone } });

    expect(screen.getByText(todoNotDone.text)).not.toHaveClass("done");
  });

  test("dispatches toggleDone when the checkbox is clicked", async () => {
    const { component } = render(Todo, {
      props: { todo: todoNotDone },
    });
    const handler = jest.fn();

    component.$on("toggleDone", handler);

    await fireEvent.click(screen.getByLabelText("Done"));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual(todoNotDone);
  });

  test("updates checkbox and done class when todo prop changes", async () => {
    const { component } = render(Todo, {
      props: { todo: todoNotDone },
    });

    expect(screen.getByLabelText("Done")).not.toBeChecked();
    expect(screen.getByText(todoNotDone.text)).not.toHaveClass("done");

    await component.$set({ todo: todoDone });

    expect(screen.getByLabelText("Done")).toBeChecked();
    expect(screen.getByText(todoDone.text)).toHaveClass("done");
  });
});
