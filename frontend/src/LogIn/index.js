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
import Stack from '@mui/material/Stack';

function Login() {
  const [values, setValues] = React.useState({
    userID: '',
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
    fetch('https://dental-care-management-system.herokuapp.com/handle', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.username, password: values.password, role: values.role })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      //BASED ON DATA RESPONSE RENDER PAGE BASED ON USER TYPE
      //BELOW IS AN EXAMPLE OF HOW TO SWITCH PAGES(IN THIS CASE FROM LOGIN TO RECEPTIONIST)
      setValues({ ...values, userID: data.userID, loggedIn: true, receptionist: data.receptionist, dentist: data.dentist, patient: data.patient });
    });
  }
  
  return (
    <div className="Login" style={{ position: 'absolute', height:'100vh', width:'100vw', top: 0 }}>
      {(values.role === '' || !values.loggedIn) &&
      <ThemeProvider theme = {theme}>
        <Paper style={{ height:'100vh', width:'100vw', position: 'relative' }}>
          <div style={{ paddingTop: '20vh' }}>
              <Typography id="logInHeader" variant="h2">Login</Typography>
            <FormControl variant="standard">
              <Stack spacing={3}>
                <TextField
                  required
                  id="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange('username')}
                  variant="filled"
                />
              
                <TextField 
                required id="password" 
                label="Password" 
                variant="filled" 
                type="password" 
                onChange={handleChange('password')}  />
                
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
                <Button 
                  id="logInButton"
                  variant="contained"
                  onClick={getUserInfo}
                >LOGIN</Button>
              </Stack>
            </FormControl>
          </div>
        </Paper>
      </ThemeProvider>}
      {values.role === 'receptionist' && values.loggedIn && values.receptionist && 
      <Receptionist />
      }
      {values.role === 'dentist' && values.loggedIn && values.dentist && 
      <Dentist />
      }
      {values.role === 'patient' && values.loggedIn && values.patient &&
      <Patient userID={values.userID} />
      }
    </div>
  );
}

export default Login;