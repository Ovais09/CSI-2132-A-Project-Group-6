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
import Appointments from './Appointments.js';
import RecordsList from './RecordsList.js';
import Rating from './Rating.js';

function Patient() {  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    (mode) =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          
          primary: {
            light: '#474f97',
            main: '#1a237e',
            dark: '#121858',
            contrastText: '#fff',
          },
          secondary: {
            light: '#cb5e3c',
            main: '#bf360c',
            dark: '#852508',
            contrastText: '#000',
          },
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="Patient">
      <ThemeProvider theme = {theme}>
        <Paper>
          <Typography variant="h2">[BranchName]</Typography>
          <Navbar/>
          <Grid container id="Grid">
            <Grid item sm={12} md={6}>
              <Paper elevation={3} sx={{m:3, height:'358px'}}>
                <Profile/>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
              <Paper elevation={3} sx={{m:3, height:'358px'}}>
                <Calendar/>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
              <Paper elevation={3} sx={{m:3, height:'400px'}}>
                <RecordsList/>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
              <Paper elevation={3} sx={{m:3, height:'400px'}}>
                <Appointments/>
              </Paper>
            </Grid>
            <Grid item sx={{ width:'80%', ml: 'auto', mr: 'auto'}}>
              <Paper elevation={3} sx={{ m:3 }}>
                <Rating/>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default Patient;
