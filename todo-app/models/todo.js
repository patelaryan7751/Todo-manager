"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }

    static getTodos(userId) {
      return this.findAll({
        where: {
          userId,
        },
      });
    }
    static getOverdueTodos(userId) {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
          userId,
          completed: false,
        },
      });
    }
    static getDueTodayTodos(userId) {
      return this.findAll({
        where: {
          dueDate: new Date().toISOString().slice(0, 10),
          completed: false,
        },
        userId,
      });
    }
    static getDueLaterTodos(userId) {
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
          userId,
        },
      });
    }
    static getCompletedTodos(userId) {
      return this.findAll({
        where: {
          completed: true,
        },
        userId,
      });
    }
    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }
    static async remove(id, userId) {
      return this.destroy({ where: { id, userId } });
    }
    setCompletionStatus(status) {
      return this.update({ completed: status });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: 5,
        },
      },
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
