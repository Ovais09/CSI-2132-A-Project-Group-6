import '../App.css';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Calendar from './Calendar.js'



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
        <Paper style={{height: "100vh"}}>
          <IconButton color="primary" aria-label="Widgets" id="Menu">
            <WidgetsIcon />
          </IconButton>
          <Typography variant="h1">PATIENT DASHBOARD</Typography>
          <Divider variant="middle" />
          <div className="Body">
            <Grid container id="Grid">
              <Grid item sm={12} md={7} style={{padding: "5vh"}}>
                <Button variant="outlined"><Typography variant="h2">Widget</Typography></Button>
              </Grid>
              <Grid item sm={12} md={5} style={{padding: "5vh"}}>
                <Calendar/>
              </Grid>
              <Grid item sm={12} md={3} style={{padding: "5vh"}}>
                <Button variant="outlined"><Typography variant="h2">Widget</Typography></Button>
              </Grid>
              <Grid item sm={12} md={9} style={{padding: "5vh"}}>
                <Button variant="outlined"><Typography variant="h2">Widget</Typography></Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default Patient;
