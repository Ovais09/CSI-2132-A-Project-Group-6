import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Calendar from './Calendar.js';
import Profile from './UserProfile.js';
import Navbar from './Navbar.js';
import AppointmentsList from './AppointmentsList.js';
import RecordsList from './RecordsList.js';

function Patient() {  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="Patient">
      <ThemeProvider theme = {theme}>
        <Paper>
          <Typography variant="h1">PATIENT DASHBOARD</Typography>
          <Navbar/>
          <div className="Body">
            <Grid container id="Grid">
              <Grid item sm={12} md={7} style={{padding:'20px'}}>
                <Profile/>
              </Grid>
              <Grid item sm={12} md={5} style={{padding:'20px'}}>
                <Calendar/>
              </Grid>
              <Grid item sm={12} md={7} style={{padding:'20px'}}>
                <RecordsList/>
              </Grid>
              <Grid item sm={12} md={5} style={{padding:'20px'}}>
                <AppointmentsList/>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default Patient;
