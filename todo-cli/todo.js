const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const makeDateComparable = (date) => {
    const format_Date = new Date(`${date}`);
    return format_Date;
  };

  const overdue = () => {
    return all.filter(
      (todo, index) =>
        (makeDateComparable(todo.dueDate) < makeDateComparable(today) &&
          todo.completed === false) === true
    );
  };

  const dueToday = () => {
    return all.filter(
      (todo, index) =>
        +makeDateComparable(todo.dueDate) === +makeDateComparable(today)
    );
  };

  const dueLater = () => {
    return all.filter(
      (todo, index) =>
        (makeDateComparable(todo.dueDate) > makeDateComparable(today) &&
          todo.completed === false) === true
    );
  };

  const toDisplayableList = (list) => {
    let OUTPUT_STRING = "";
    list?.map((todo, index) => {
      OUTPUT_STRING =
        OUTPUT_STRING +
        `${todo.completed === true ? "[x]" : "[ ]"} ${todo.title} ${
          +makeDateComparable(todo.dueDate) === +makeDateComparable(today)
            ? ""
            : todo.dueDate
        }\n`;
      return todo;
    });
    return OUTPUT_STRING.trim();
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
