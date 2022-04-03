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
      /* console.log(resultQuery);
      console.log(req.body.username);
      console.log(req.body.password);
      console.log(req.body.role);
      console.log(resultQuery[0].user_id); */
      if (req.body.role == "patient" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        /* console.log("Success for patient"); */
        res.send(JSON.stringify({
          userID: resultQuery[0].user_id,
          success: true,
          message: "Login Successful",
          patient: true,
          receptionist: false,
          dentist: false
        }));
      } 

      else if (req.body.role == "dentist" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        /* console.log("Success for dentist"); */
        res.send(JSON.stringify({
          success: true,
          message: "Login Successful",
          patient: false,
          receptionist: false,
          dentist: true
        }));
      }

      else if (req.body.role == "receptionist" && req.body.username == resultQuery[0].userName && req.body.password == resultQuery[0].password) {
        /* console.log("Success for receptionist"); */
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


app.post("/handleProfile", (req, res) => {

  var user_ssn = "SELECT SSN FROM User WHERE user_id = " + req.body.user_id;
  var person = "";
  pool.query(user_ssn, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for SSN"); */
      person = "SELECT * FROM Person WHERE SSN = '" + resultQuery[0].SSN + "'";

      pool.query(person, (err, result) => {
        if (!err) {
          var resultQuery = JSON.parse(JSON.stringify(result))
          /* console.log(resultQuery);
          console.log("Success for Person"); */
    
          res.send(JSON.stringify({
            name: resultQuery[0].first_name + " " + resultQuery[0].middle_name + " " + resultQuery[0].last_name,
            age: 'aaa',
            DOB: resultQuery[0].date_of_birth,
            contact: resultQuery[0].phone_number + "\n" + resultQuery[0].email_address,
            address: resultQuery[0].house_number + " " + resultQuery[0].street + ", " + resultQuery[0].city + ", " + resultQuery[0].province
          }));
        } else {
          console.log("Error while performing Person Query.");
        }
      });

    } else {
      console.log("Error while performing SSN Query.");
    }
  });
});


app.post("/handleMedicalRecordsPat", (req, res) => {

  var patient_id = "SELECT patient_id FROM patientrecords WHERE user_id = " + req.body.user_id;
  var slq = "";
  pool.query(user_ssn, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for patient_id");
      slq = "SELECT * FROM patientrecords WHERE patient_id = " + req.body.user_id;
/* 223456789 */
      pool.query(slq, (err, result) => {
        if (!err) {
          var resultQuery = JSON.parse(JSON.stringify(result))
          console.log(resultQuery);
          console.log("Success for patientrecords");
    
          res.send(JSON.stringify({
            name: resultQuery[0].first_name + " " + resultQuery[0].middle_name + " " + resultQuery[0].last_name,
            age: 'aaa',
            DOB: resultQuery[0].date_of_birth,
            contact: resultQuery[0].phone_number + "\n" + resultQuery[0].email_address,
            address: resultQuery[0].house_number + " " + resultQuery[0].street + ", " + resultQuery[0].city + ", " + resultQuery[0].province
          }));
        } else {
          console.log("Error while performing Person Query.");
        }
      });

    } else {
      console.log("Error while performing SSN Query.");
    }
  });
});


app.post("/handlePatientPastAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name , appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE user_id ="+req.body.user_id+" AND appointment_date < '"+req.body.date+"';";

  console.log(req.body.user_id);
  console.log("req.body.user_id");
  console.log(req.body.date);
  console.log("req.body.date");

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for past appts");

      res.send(resultQuery);
    } else {
      console.log("Error while performing Query.");
    }
  });
});


app.post("/handlePatientFutureAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name , appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE user_id ="+req.body.user_id+" AND appointment_date >= '"+req.body.date+"';";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for future appts");

      res.send(resultQuery);
    } else {
      console.log("Error while performing Query.");
    }
  });
});
/* 223456789 */

app.post("/handleReceptionnistAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name , appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy;";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for appts");

      res.send(resultQuery);
    } else {
      console.log("Error while performing Query.");
    }
  });
});







app.listen(port, host, () => {
  console.log(`Server started on port ${port}`);
});
