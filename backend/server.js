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

//APP LISTENING ON THE MENTIONED PORT
app.listen(PORT);
