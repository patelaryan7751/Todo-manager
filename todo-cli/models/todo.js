"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }

    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueTasks = await Todo.overdue();
      const overdueTodoList = overdueTasks
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(overdueTodoList.trimEnd());

      console.log("\nDue Today");
      // FILL IN HERE
      const dueTodayTasks = await Todo.dueToday();
      const dueTodayTodoList = dueTodayTasks
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueTodayTodoList.trimEnd());

      console.log("\nDue Later");
      // FILL IN HERE
      const dueLaterTasks = await Todo.dueLater();
      const dueLaterTodoList = dueLaterTasks
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueLaterTodoList.trimEnd());
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const todos = await Todo.findAll();
        const overDueTodos = todos.filter(
          (todo) => todo.dueDate < new Date().toISOString().slice(0, 10)
        );
        return overDueTodos;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const todos = await Todo.findAll();
        const dueTodayTodos = todos.filter(
          (todo) => todo.dueDate === new Date().toISOString().slice(0, 10)
        );
        return dueTodayTodos;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const todos = await Todo.findAll();
        const dueLaterTodos = todos.filter(
          (todo) => todo.dueDate > new Date().toISOString().slice(0, 10)
        );
        return dueLaterTodos;
      } catch (error) {
        console.log(error);
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        await Todo.update(
          { completed: true },
          {
            where: {
              id: id,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}${
        this.dueDate === new Date().toISOString().slice(0, 10)
          ? ""
          : ` ${this.dueDate}`
      }`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
