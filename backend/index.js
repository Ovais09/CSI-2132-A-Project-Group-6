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
const cors = require("cors");


app.use(express.static(path.join("../frontend/", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
      console.log("Error while performing handle Query.");
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


app.post("/handleDoctorList", (req, res) => {

  var appts = "SELECT  (@cnt := @cnt + 1) AS ID, first_name, last_name FROM employee LEFT JOIN person ON person.SSN = employee.employee_id CROSS JOIN (SELECT @cnt := 0) AS dummy;";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for dentist list"); */

      res.send(resultQuery);
    } else {
      console.log("Error while performing handleDoctorList Query.");
    }
  });
});


app.post("/handlePatientPastAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name , appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE user_id ="+req.body.user_id+" AND appointment_date < '"+req.body.date+"';";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for past appts"); */

      res.send(resultQuery);
    } else {
      console.log("Error while performing handlePatientPastAppointments Query.");
    }
  });
});


app.post("/handlePatientFutureAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name , appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE user_id ="+req.body.user_id+" AND appointment_date >= '"+req.body.date+"';";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for future appts"); */

      res.send(resultQuery);
    } else {
      console.log("Error while performing handlePatientFutureAppointments Query.");
    }
  });
});

app.post("/handleReceptionnistAppointments", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, appointment.appointment_date, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name, appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time FROM appointment LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE appointment.appointment_date >= CURDATE();";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for appts"); */

      res.send(resultQuery);
    } else {
      console.log("Error while performing handleReceptionnistAppointments Query.");
    }
  });
});


app.post("/handleReceptionnistUsers", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, CONCAT(person.first_name, ' ', COALESCE(`middle_name`,''), ' ', person.last_name) AS person_name,   email_address, phone_number, date_of_birth, CONCAT(house_number, ' ', street, ', ', person.city, ', ', province ) AS address, COALESCE(`employee_role`,'') AS role, branch.branch_id FROM person LEFT JOIN  employee ON person.SSN = employee.employee_id LEFT JOIN  branch ON person.city = branch.city CROSS JOIN (SELECT @cnt := 0) AS dummy;";

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      /* console.log(resultQuery);
      console.log("Success for recs"); */

      res.send(resultQuery);
    } else {
      console.log("Error while performing handleReceptionnistUsers Query.");
    }
  });
});


app.post("/handleUserRecords", (req, res) => {

  var appts = "SELECT (@cnt := @cnt + 1) AS id, appointment.appointment_id, patientrecords.record_id, CONCAT(person_patient.first_name, ' ', person_patient.last_name) AS patient_name, CONCAT(person_employee.first_name, ' ', person_employee.last_name) AS employee_name, appointment.appointment_type, appointment.appointment_date, appointment.start_time, appointment.end_time, treatment_type, medication, comments, teeth, symptom FROM appointment LEFT JOIN patientrecords ON appointment.patient_id = patientrecords.patient_id AND CONCAT(appointment.appointment_date, ' ', appointment.end_time ) = patientrecords.records_date LEFT JOIN appointment_employeeid ON appointment.appointment_id = appointment_employeeid.appointment_id LEFT JOIN  person AS person_employee ON person_employee.SSN = appointment_employeeid.employee_id LEFT JOIN  person AS person_patient ON person_patient.SSN = appointment.patient_id LEFT JOIN  treatment ON  treatment.appointment_id = appointment.appointment_id AND treatment.record_id = patientrecords.record_id LEFT JOIN  treatment_teeth ON treatment.patient_id = treatment_teeth.patient_id AND treatment.treatment_id = treatment_teeth.treatment_id LEFT JOIN  treatment_symptoms ON patientrecords.patient_id = treatment.patient_id AND treatment.treatment_id = treatment_symptoms.treatment_id CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE "+ req.body.lookingFor +" = "+req.body.equals+";";
  console.log(appts);
  console.log("appts");

  pool.query(appts, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for recs");

      res.send(resultQuery);
    } else {
      console.log("Error while performing handleUserRecords Query.");
    }
  });
});


app.post("/handlePatientID", (req, res) => {

  var pat_id = "SELECT patient_id FROM patient WHERE user_id = "+req.body.user_id+";";
  console.log(pat_id);
  console.log("pat_id");

  pool.query(pat_id, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery[0].patient_id);
      console.log("Success for pat_id");

      res.send(JSON.stringify({
        patient_id: resultQuery[0].patient_id}));
    } else {
      console.log("Error while performing handlePatientID Query.");
    }
  });
});


app.post("/handleNewAppointment", (req, res) => {

  var insert_appointment = "INSERT INTO appointment (patient_id, user_id, appointment_type, appointment_status, appointment_date, start_time, end_time, room_assigned) VALUES ("+req.body.patient_id+", "+req.body.user_id+", '"+req.body.appointment_type+"', 'scheduled', '"+req.body.appointment_date+"', '"+req.body.start_time+"', '"+req.body.end_time+"', 'H101');";

  console.log(insert_appointment);
  console.log("insert_appointment");

  pool.query(insert_appointment, (err, result) => {
    if (!err) {
      
      var appointment_id = "SELECT appointment_id FROM appointment WHERE patient_id = "+req.body.patient_id+" AND appointment_date = '"+req.body.appointment_date+"' AND start_time = '"+req.body.start_time+"';";

      pool.query(appointment_id, (err, result) => {
        if (!err) {
          var resultQuery = JSON.parse(JSON.stringify(result))
          console.log(resultQuery);
          console.log("Success for appointment_id");

          var insert_appointment_employeeid = "INSERT INTO appointment_employeeid VALUES (123456789, "+resultQuery[0].appointment_id+", "+req.body.patient_id+"); ";
    
          pool.query(insert_appointment_employeeid, (err, result) => {
            if (!err) {
              console.log("Success for insert_appointment_employeeid");
        
              res.send("Success!");
            } else {
              console.log("Error while performing Query 3.");
            }
          });
        } else {
          console.log("Error while performing appointment_id.");
        }
      });

    } else {
      console.log("Error while performing Query 1.");
    }
  });
});
/* 223456789 */

app.post("/handleNewAppointmentReceptionnist", (req, res) => {
  if(String(req.body.first_name) == '' || String(req.body.last_name) == ''){
    return;
  }

  var pat_id = "SELECT patient.user_id, patient.patient_id FROM person RIGHT JOIN  patient ON person.SSN = patient.patient_id WHERE first_name = '"+req.body.first_name+"' AND last_name = '"+req.body.last_name+"';";
  console.log(pat_id);
  console.log("pat_id");

  pool.query(pat_id, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for patient info");

      const patient_id = resultQuery[0].patient_id

      var insert_appointment = "INSERT INTO appointment (patient_id, user_id, appointment_type, appointment_status, appointment_date, start_time, end_time, room_assigned) VALUES ("+patient_id+", "+resultQuery[0].user_id+", '"+req.body.appointment_type+"', 'scheduled', '"+req.body.appointment_date+"', '"+req.body.start_time+"', '"+req.body.end_time+"', 'H101');";

      console.log(insert_appointment);
      console.log("insert_appointment");

      pool.query(insert_appointment, (err, result) => {
        if (!err) {
          
          var appointment_id = "SELECT appointment_id FROM appointment WHERE patient_id = "+patient_id+" AND appointment_date = '"+req.body.appointment_date+"' AND start_time = '"+req.body.start_time+"';";

          pool.query(appointment_id, (err, result) => {
            if (!err) {
              var resultQuery = JSON.parse(JSON.stringify(result))
              console.log(resultQuery);
              console.log("Success for appointment_id");

              var insert_appointment_employeeid = "INSERT INTO appointment_employeeid VALUES (123456789, "+resultQuery[0].appointment_id+", "+patient_id+"); ";
        
              pool.query(insert_appointment_employeeid, (err, result) => {
                if (!err) {
                  console.log("Success for insert_appointment_employeeid");
            
                  res.send("Success!");
                } else {
                  console.log("Error while performing Query 3.");
                }
              });
            } else {
              console.log("Error while performing Query 2.");
            }
          });
        } else {
          console.log("Error while performing insert_appointment.");
        }
      });

    } else {
      console.log("Error while performing patient info Query.");
    }
  });
});


app.post("/handleNewUser", (req, res) => {
  var insertPerson = "INSERT INTO person VALUES ("+req.body.SSN+", '"+req.body.first_name+"', '"+req.body.middle_name+"', '"+req.body.last_name+"', '"+req.body.gender+"', '"+req.body.email_address+"', '"+req.body.date_of_birth+"', '"+req.body.phone_number+"', "+req.body.house_number+", '"+req.body.street+"', '"+req.body.city+"', '"+req.body.province+"');";
  console.log(insertPerson);
  console.log("insertPerson");

  pool.query(insertPerson, (err, result) => {
    if (!err) {
      var resultQuery = JSON.parse(JSON.stringify(result))
      console.log(resultQuery);
      console.log("Success for insertPerson");

      const SSN = req.body.SSN;
      const firstName = req.body.first_name;

      var selectMaxID = "SELECT MAX(user_id) AS max_id From user;"

      console.log(selectMaxID);
      console.log("selectMaxID");

      pool.query(selectMaxID, (err, result) => {
        if (!err) {
          var resultQuery = JSON.parse(JSON.stringify(result))
          console.log(resultQuery);
          console.log("Success for selectMaxID");

          const max_id = Number(resultQuery[0].max_id)+1;

          var insertUser = "INSERT INTO user VALUES ("+max_id+", '"+firstName+"', "+SSN+", '"+SSN+"');";

          console.log(insertUser);
          console.log("insertUser");
    
          pool.query(insertUser, (err, result) => {
            if (!err) {
              var resultQuery = JSON.parse(JSON.stringify(result))
              console.log(resultQuery);
              console.log("Success for insertUser");
    
              var addPatient = "INSERT INTO patient VALUES("+SSN+", "+max_id+", '"+req.body.insurance+"');";
              var addEmployee = "INSERT INTO employee (employee_id, branch_id, salary, employee_type, employee_role) VALUES("+SSN+", "+req.body.branch_id+", "+req.body.salary+", '"+req.body.employee_type+"', '"+req.body.employee_role+"')";
    
              console.log(req.body.isPatient);
              console.log("req.body.isPatient");
              console.log(req.body.isEmployee);
              console.log("req.body.isEmployee");

              if(req.body.isPatient){
                pool.query(addPatient, (err, result) => {
                  if (!err) {
                    var resultQuery = JSON.parse(JSON.stringify(result))
                    console.log(resultQuery);
                    console.log("Success for addPatient");
                  } else {
                    console.log("Error while performing addPatient.");
                  }
                });
              } 
              if(req.body.isEmployee) {
                pool.query(addEmployee, (err, result) => {
                  if (!err) {
                    var resultQuery = JSON.parse(JSON.stringify(result))
                    console.log(resultQuery);
                    console.log("Success for addEmployee");
                  } else {
                    console.log("Error while performing addEmployee.");
                  }
                });
              }
            } else {
              console.log("Error while performing Query 1.");
            }
          });
        } else {
          console.log("Error while performing Query 1.");
        }
      });

    } else {
      console.log("Error while performing patient info Query.");
    }
  });
});





app.listen(port, host, () => {
  console.log(`Server started on port ${port}`);
});
