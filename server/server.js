//require("dotenv").config();
const PORT = process.env.PORT || 8001;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//get all todos
app.get("/todos", async (req, res) => {
  console.log(req);
  try {
    const client = await pool.connect();
    const todos = await client.query("SELECT * FROM todos");
    res.json(todos.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo for a user with email
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  console.log(userEmail);
  try {
    const client = await pool.connect();
    const todos = await client.query(
      "SELECT * FROM todos WHERE user_email = $1;",
      [userEmail]
    );
    res.json(todos.rows);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

//create a new todo
app.post("/todos", async(req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5);",
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err);
  }
});

//edit a todo
app.put("/todos/:id", async(req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  console.log(id, user_email, title, progress, date);
  try {
    const updateTodo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(updateTodo);
  } catch (err) {
    console.error(err);
  }
});

//delete a todo
app.delete("/todos/:id", async(req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1;", [id]);
    res.json(deleteTodo);
  } catch (err) {
    console.error(err);
  }
});