/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterday = new Date(today.getTime() - 1 * oneDay);
describe("Todolist Test Suite", () => {
  beforeEach(() => {
    all.length = 0;
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Wash all clothes",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    add({
      title: "Complete my project",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    add({
      title: "Go to the barber",
      completed: false,
      dueDate: new Date(yesterday).toISOString().slice(0, 10),
    });
    let overDueTasks = overdue().length;
    let overDueFirstTaskTitle = overdue()[0].title;
    expect(overDueTasks).toBe(1);
    expect(overDueFirstTaskTitle).toBe("Go to the barber");
  });

  test("Retrieval of due today items", () => {
    add({
      title: "Visit Electrician",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    let dueTodayTasks = dueToday().length;
    let dueTodayFirstTaskTitle = dueToday()[0].title;
    expect(dueTodayTasks).toBe(1);
    expect(dueTodayFirstTaskTitle).toBe("Visit Electrician");
  });

  test("Retrieval of due later items", () => {
    add({
      title: "Make food",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
    let dueLaterTasks = dueLater().length;
    let dueLaterFirstTaskTitle = dueLater()[0].title;
    expect(dueLaterTasks).toBe(1);
    expect(dueLaterFirstTaskTitle).toBe("Make food");
  });
});
