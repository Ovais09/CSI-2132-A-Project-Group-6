import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from '../Components/Navbar';
import Appointments from '../Receptionist/Appointments.js'
import Records from '../Components/Records.js'

function Dentist({branchName}) {  
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
    <div className="Dentist">
      <ThemeProvider theme = {theme}>
        <Paper>
          <Typography variant="h2">branchName</Typography>
          <Navbar pageName={"DENTIST"} />
          <Grid container id="Grid">
           <Grid direction="column" sm={12} md={6}>
                <Paper elevation={3} sx={{m:3, height:'782px'}}>
                  <Appointments />
                </Paper>
           </Grid>
           <Grid direction="column" sm={12} md={6}>
              <Paper elevation={3} sx={{m:3, height:'782px'}}>
                <Records />
              </Paper>
           </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default Dentist;
