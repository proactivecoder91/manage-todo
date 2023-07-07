const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

//CREATING A CONNECTION TO THE DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "managetododb",
});

//CONNECTING TO THE DATABASE
db.connect((err) => {
  if (err) {
    throw err;
  } else console.log("connected to managetododb");
});

app.use(express.json());

//CREATING THE GET API TO GET THE LIST OF TODOS FROM THE TABLE
app.get("/getTodos", (req, res) => {
  const sql = "SELECT * FROM todos";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else res.json(results);
  });
});

//INSERTING TODOS IN THE TABLE
app.post("/createTodo", (req, res) => {
  const { task_name } = req.body;
  const sql = "INSERT INTO todos(task_name) values(?)";
  db.query(sql, [task_name], (err, _results) => {
    if (err) {
      throw err;
    } else res.json({ message: "todo added" });
  });
});

//UPDATING TASK NAME
app.put("/editTodo/:id", (req, res) => {
  const { id } = req.params;
  const { task_name } = req.body;
  const sql = "UPDATE todos set task_name = ? where id = ?";
  db.query(sql, [task_name, id], (err, results) => {
    if (err) {
      throw err;
    } else res.json({ message: "todo updated" });
  });
});

//SOFT DELETING API
app.put("/softDeleteTodo/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE todos set active_flag = ? where id = ?";
  db.query(sql, ["N", id], (err, results) => {
    if (err) {
      throw err;
    } else res.json({ message: "soft deleted" });
  });
});

//HARD DELETE API
app.delete("/deleteTodo/:id", (req, res) => {
  const { id } = req.params;
  const sql = "delete from todos where id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json({ message: "hard deleted" });
    }
  });
});

//GET SOFT DELETED LIST
app.get("/getSoftDeletedTodos", (req, res) => {
  const sql = "SELECT * from todos where active_flag = ?";
  db.query(sql, ["N"], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

//APP LISTENING ON THE MENTIONED PORT
app.listen(PORT);
