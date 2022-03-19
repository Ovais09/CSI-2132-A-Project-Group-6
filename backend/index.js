const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();

//# use alternate localhost and the port Heroku assigns to $PORT
const host = "0.0.0.0";
const port = process.env.PORT || 3000;

// Create connection

//mysql://b86ffdd79fbc66:273045b6@us-cdbr-east-05.cleardb.net/heroku_18cb672458b367b?reconnect=true
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-05.cleardb.net",
  port: "3306",
  user: "b86ffdd79fbc66",
  password: "273045b6",
  database: "heroku_18cb672458b367b",
});

// pool.connect((err) => {
//   if (err) {
//     console.log("Error connecting");
//   } else {
//     console.log("Connection established");
//   }
// });



app.use(express.static(path.join("../frontend/", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join("../frontend", "build", "index.html"));
});

app.post("/handle", (req, res) => {
  var sql = "SELECT * FROM User";
  pool.query(sql, (err, result) => {
    if (!err) {
      console.log(result);
      console.log(JSON.parse(JSON.stringify(result))[0].userName);
      if (req.body.username == JSON.parse(JSON.stringify(result))[0].userName && req.body.password == JSON.parse(JSON.stringify(result))[0].password) {
        console.log("jsdhgiujwgnwjkAGN")
      } 
    } else {
      console.log("Error while performing Query.");
    }
  });







});

app.listen(port, host, () => {
  console.log(`Server started on port ${port}`);
});
