import React from 'react';
import ReactDOM from 'react-dom';
import Patient from './Patient';
import Receptionist from './Receptionist';
import '@fontsource/roboto/300.css';
import Dentist from './Dentist';

ReactDOM.render(
  <React.StrictMode>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    </head>
    <div className="App">
      <Receptionist />
      <Dentist />
      <Patient />
    </div>
    <div>Test stuff </div>
  </React.StrictMode>,
  document.getElementById('root')
);
