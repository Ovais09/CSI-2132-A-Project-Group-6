const express = require('express');
const mysql = require('mysql');
const app = express();


// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});