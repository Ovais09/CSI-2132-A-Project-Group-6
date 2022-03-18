import React from 'react';
import ReactDOM from 'react-dom';
import Patient from './Patient';
import Receptionist from './Receptionist';
import '@fontsource/roboto/300.css';
import Dentist from './Dentist';
import Login from './LogIn';

ReactDOM.render(
  <React.StrictMode>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    </head>
    <div className="App">
      <Login />
      <Receptionist branchName="Sample Branch" />
      <Dentist branchName="Sample Branch" />
      <Patient branchName="Sample Branch" />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
