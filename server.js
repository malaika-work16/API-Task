
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn JavaScript", done: false },
  { id: 2, title: "Build an API", done: false },
  { id: 3, title: "Write a README", done: true }
];

let nextId = 4;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Task API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    done: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, done } = req.body;

  if (
    (title === undefined && done === undefined) ||
    (title !== undefined &&
      (typeof title !== "string" || title.trim() === "")) ||
    (done !== undefined && typeof done !== "boolean")
  ) {
    return res.status(400).json({ error: "Provide a valid title or done value" });
  }

  if (title !== undefined) task.title = title.trim();
  if (done !== undefined) task.done = done;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});