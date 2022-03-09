import React from 'react';
import ReactDOM from 'react-dom';
import Patient from './Patient';
import '@fontsource/roboto/300.css';

ReactDOM.render(
  <React.StrictMode>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    </head>
    <div className="App">
      <Patient />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
