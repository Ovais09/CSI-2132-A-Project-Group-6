const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

//# use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
const port = process.env.PORT || 3000;


// Create connection
const con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'DentalClinicDB'
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting");
  } else {
    console.log("Connection established");
  }
});

var sql = "INSERT INTO Branch (branch_id,city) VALUES (1,'hello')";

con.query(sql, (err, result) => {
  if (!err) {
    console.log("Data inserted");
  } else {
    console.log(err.sqlMessage);
  }
});

var sql = "SELECT * FROM Branch";
con.query(sql, (err, result) => {
  if (!err) {
    console.log(JSON.parse(JSON.stringify(result)));
  } else {
    console.log('Error while performing Query.');
  }
});

app.use(express.static(path.join("../frontend/", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(path.join("../frontend", "build", "index.html"));
});


app.listen(port,host, () => {
    console.log(`Server started on port ${port}`);
});