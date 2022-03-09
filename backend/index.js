const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();


// Create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: ''
});


app.use(express.static(path.join("../frontend/", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(path.join("../frontend", "build", "index.html"));
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});