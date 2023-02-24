/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test duetoday task1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test overdue task1",
      completed: false,
      dueDate: new Date("2022-01-01").toISOString().slice(0, 10),
    });
    add({
      title: "Test duelater task1",
      completed: false,
      dueDate: new Date("2023-02-28").toISOString().slice(0, 10),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test duetoday task2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    let overDueTasks = overdue().length;
    let overDueFirstTaskTitle = overdue()[0].title;
    expect(overDueTasks).toBe(1);
    expect(overDueFirstTaskTitle).toBe("Test overdue task1");
  });

  test("Retrieval of due today items", () => {
    let dueTodayTasks = dueToday().length;
    let dueTodayFirstTaskTitle = dueToday()[0].title;
    expect(dueTodayTasks).toBe(2);
    expect(dueTodayFirstTaskTitle).toBe("Test duetoday task1");
  });

  test("Retrieval of due later items", () => {
    let dueLaterTasks = dueLater().length;
    let dueLaterFirstTaskTitle = dueLater()[0].title;
    expect(dueLaterTasks).toBe(1);
    expect(dueLaterFirstTaskTitle).toBe("Test duelater task1");
  });
});
