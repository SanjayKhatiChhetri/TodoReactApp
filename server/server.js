//require("dotenv").config();
const PORT = process.env.PORT || 8001;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "https://todo-react-app-client.vercel.app",
  })
);

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
    const todos = await pool.query("SELECT * FROM todos");
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new todo
app.post("/todos", async (req, res) => {
  try {
    const id = uuidv4();
    const { user_email, title, progress, date } = req.body;
    console.log(req.body);
    const newTodo = await pool.query(
      `INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5 );`,
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err);
  }
});

//get all todo for a user with email
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1;",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query(`DELETE FROM todos WHERE id = $1;`, [
      id,
    ]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

//edit a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const updateTodo = await pool.query(
      `UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`,
      [user_email, title, progress, date, id]
    );
    res.json(updateTodo);
  } catch (error) {
    console.error(error);
  }
});

//endpoint for Sign up
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("PASSWORD", password);

    const salt = bcrypt.genSaltSync(10);
    const hasedPassword = bcrypt.hashSync(password, salt);

    const signUp = await pool.query(
      `INSERT INTO users (email, password) VALUES($1, $2);`,
      [email, hasedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

    res.json({ email, token });
    const error = signUp.name === "error";

    if (!error) {
      res.json({ email, token });
    } else {
      res.json({ detail: signUp.detail });
    }
  } catch (err) {
    res.json(err);
    console.error(err);
  }
});

//endpoint for Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);

    console.log(users);

    if (!users.rows.length) return res.json({ detail: "User does not exist" });

    const success = await bcrypt.compare(password, users.rows[0].password);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
  }
});
