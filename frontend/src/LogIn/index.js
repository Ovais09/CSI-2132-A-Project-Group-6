import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import { Button, Paper, TextField, InputLabel, Select, MenuItem } from "@mui/material"
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Receptionist from "../Receptionist";
import Dentist from "../Dentist";
import Patient from "../Patient";

function Login() {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    role: '',
    receptionist: false,
    dentist: false,
    patient: false,
    loggedIn: false,
  });

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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const getUserInfo = () => {
    setValues({ ...values, loggedIn: true });
    fetch('http://localhost:3000/handle', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.username, password: values.password, role: values.role })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      console.log(data);
      
      //BASED ON DATA RESPONSE RENDER PAGE BASED ON USER TYPE
      //BELOW IS AN EXAMPLE OF HOW TO SWITCH PAGES(IN THIS CASE FROM LOGIN TO RECEPTIONIST)
      setValues({ ...values, loggedIn: true, receptionist: data.receptionist, dentist: data.dentist, patient: data.patient });
    });
  }
  
  return (
    <div className="Login" style={{ height:'100%'}}>
      {(values.role === '' || !values.loggedIn) &&
      <ThemeProvider theme = {theme}>
        <Paper>
          <Typography id="logInHeader" variant="h2">Login</Typography>
          
        <FormControl variant="standard">
          <Grid container >
            <Grid item direction="column" sm={12} md={12}>
              <Grid item direction="row" sm={12} md={4}>
                <TextField
                  required
                  id="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange('username')}
                  variant="filled"
                />
              </Grid>
              <Grid item direction="row" sm={12} md={4}>
                <TextField 
                required id="password" 
                label="Password" 
                variant="filled" 
                type="password" 
                onChange={handleChange('password')}  />
                
              </Grid>
              <Grid item direction="row" sm={12} md={4}>
                {/* <InputLabel id="role-label">Role</InputLabel> */}
                <Select
                  labelId="role-label"
                  id="role"
                  value={values.role}
                  label="Role"
                  onChange={handleChange('role')}
                >
                  <MenuItem value={"receptionist"}>Receptionist</MenuItem>
                  <MenuItem value={"dentist"}>Dentist</MenuItem>
                  <MenuItem value={"patient"}>Patient</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item direction="column" sm={12} md={12}>
            <Button 
              id="logInButton"
              variant="contained"
              onClick={getUserInfo}
            >LOGIN</Button>
            </Grid>
          </Grid>
        </FormControl>
        </Paper>
      </ThemeProvider>}
      {values.role === 'receptionist' && values.loggedIn && values.receptionist && 
      <Receptionist />
      }
      {values.role === 'dentist' && values.loggedIn && values.dentist && 
      <Dentist />
      }
      {values.role === 'patient' && values.loggedIn && values.patient &&
      <Patient />
      }
    </div>
  );
}

export default Login;
