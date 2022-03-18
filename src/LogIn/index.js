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
  
  return (
    <div className="Login">
      <ThemeProvider theme = {theme}>
          <Typography variant="h2">Login</Typography>
          
        <FormControl variant="standard">
          {/* <TextField required id="username" label="username" variant="standard" /> */}
          <Grid container >
              <Grid item direction="row" sm={12} md={6}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type='text'
                  value={values.username}
                  onChange={handleChange('username')}
                />
              </Grid>
              <Grid item direction="row" sm={12} md={6}>
                <TextField required id="password" label="Password" variant="standard" type="password" onChange={handleChange('password')}  />
                
            </Grid>
            <Button variant="contained">Contained</Button>
          </Grid>
        </FormControl>

          
      </ThemeProvider>
    </div>
  );
}

export default Login;
