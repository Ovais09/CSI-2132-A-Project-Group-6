import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { Button, Paper, TextField } from "@mui/material"
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Login() {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getUserInfo = () => {
    fetch('http://localhost:3000/handle', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.username, password: values.password })
    });
  }
  
  return (
    <div className="Login" style={{ height:'100%'}}>
      <ThemeProvider theme = {theme}>
        <Paper>
          <Typography variant="h2">Login</Typography>
          
        <FormControl variant="standard">
          <Grid container >
              <Grid item direction="row" sm={12} md={6}>
                <TextField
                  required
                  id="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange('username')}
                  variant="filled"
                />
                {/* <Input
                
                  id="username"
                  type='text'
                  value={values.username}
                  onChange={handleChange('username')}
                /> */}
              </Grid>
              <Grid item direction="row" sm={12} md={6}>
                <TextField 
                required id="password" 
                label="Password" 
                variant="filled" 
                type="password" 
                onChange={handleChange('password')}  />
                
            </Grid>
            <Button 
              variant="contained"
              onClick={getUserInfo}
            >LOGIN</Button>
          </Grid>
        </FormControl>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default Login;
