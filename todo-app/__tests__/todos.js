/* eslint-disable no-undef */
const request = require("supertest");
const cheerio = require("cheerio");

const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCSRFToken(res) {
  let $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCSRFToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });

  test("Marks a todo with the given ID as complete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCSRFToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const groupedTodoResponse = await agent
      .get("/")
      .set("Accept", "application/json");
    const parsedGroupedResponse = JSON.parse(groupedTodoResponse.text);
    const todoCount = parsedGroupedResponse.length;
    const latestTodo = parsedGroupedResponse[todoCount - 1];
    res = await agent.get("/");
    csrfToken = extractCSRFToken(res);
    const markCompleteResponse = await agent
      .put(`/todos/${latestTodo.id}/markAsCompleted`)
      .send({
        _csrf: csrfToken,
      });
    const parsedUpdatedResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdatedResponse.completed).toBe(true);
  });

  test("Fetches all todos in the database using /todos endpoint", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCSRFToken(res);
    const totalTodosCountBefore = await db.Todo.count();
    await agent.post("/todos").send({
      title: "Buy xbox",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    const response = await agent.get("/todos");
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.length).toBe(totalTodosCountBefore + 1);
  });

  // test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
  //   // FILL IN YOUR CODE HERE
  //   await agent.post("/todos").send({
  //     title: "Test for deleting a Todo",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });
  //   const response = await agent.get("/todos");
  //   const parsedResponse = JSON.parse(response.text);
  //   const getNewlyAddedTodo = parsedResponse.filter(
  //     (todo) => todo.title === "Test for deleting a Todo"
  //   );
  //   const getNewlyAddedTodoId = getNewlyAddedTodo[0].id;
  //   const responseAfterDeletingTodo = await agent.delete(
  //     `/todos/${getNewlyAddedTodoId}`
  //   );
  //   const parsedResponseAfterDeletingTodo = JSON.parse(
  //     responseAfterDeletingTodo.text
  //   );
  //   const responseAfterDelete = await agent.get("/todos");
  //   const parsedResponseAfterDelete = JSON.parse(responseAfterDelete.text);
  //   const responseAfterDeletingADeletedTodo = await agent.delete(
  //     `/todos/${getNewlyAddedTodoId}`
  //   );
  //   const parsedResponseAfterDeletingADeletedTodo = JSON.parse(
  //     responseAfterDeletingADeletedTodo.text
  //   );

  //   expect(
  //     parsedResponseAfterDelete.filter((todo) => todo.id === 5).length
  //   ).toBe(0);
  //   expect(
  //     parsedResponseAfterDelete.filter(
  //       (todo) => todo.title === "Test for deleting a Todo"
  //     ).length
  //   ).toBe(0);
  //   expect(parsedResponseAfterDeletingTodo).toBe(true);
  //   expect(parsedResponseAfterDeletingADeletedTodo).toBe(false);
  // });
});
