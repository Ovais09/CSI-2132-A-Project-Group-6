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

  var sql = "SELECT * FROM User WHERE userName = '" + req.body.username + "' AND password = '" + req.body.password + "'";
  pool.query(sql, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log(req.body.username);
      console.log(req.body.password);
      console.log(req.body.role);
      if (req.body.role == "patient" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        console.log("Success for patient");
        res.send(JSON.stringify({
          success: true,
          message: "Login Successful",
          patient: true,
          receptionist: false,
          dentist: false
        }));
      } 

      else if (req.body.role == "dentist" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        console.log("Success for dentist");
        res.send(JSON.stringify({
          success: true,
          message: "Login Successful",
          patient: false,
          receptionist: false,
          dentist: true
        }));
      }

      else if (req.body.role == "receptionist" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        console.log("Success for receptionist");
        res.send(JSON.stringify({
          success: true,
          message: "Login Successful",
          patient: false,
          receptionist: true,
          dentist: false
        }));
      }
    } else {
      console.log("Error while performing Query.");
    }
  });

});











app.listen(port, host, () => {
  console.log(`Server started on port ${port}`);
});
