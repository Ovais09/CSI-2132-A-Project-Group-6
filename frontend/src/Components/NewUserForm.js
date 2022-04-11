import * as React from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const tempValues = [
  {
    SSN: "ssn",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "x",
    email_address: "email@address.com",
    date_of_birth: "DOB",
    phone_number: "phoneNumber",
    house_number: "houseNumber",
    street: "street",
    city: "city",
    province: "province",
    employee_role: "dentist",
    employee_type: "full_time",
    salary: "0",
    branch_id: "patient",
    insurance: ""
  }
];

export default function NewUserForm() {
  const [open, setOpen] = React.useState(false);
  const [patientValues, setPatientValues] = React.useState(tempValues);
  const [showPatient, setShowPatient] = React.useState(false);
  const [showEmployee, setShowEmployee] = React.useState(false);
  
  const submit = () => {
    console.log("Submited");    
    handleClose();
    submitUser();
  };

/*
  const handlePatientFNChange = (event) => {
    console.log(patientFN);
    console.log("patientFN");
    //setPatientFN(event.target.value);
    setPatientValues({...patientValues, first_name: event.target.value});
  };
  const handlePatientMNChange = (event) => {
    console.log(patientMN);
    console.log("patientMN");
    //setPatientMN(event.target.value);
    setPatientValues({...patientValues, middle_name: event.target.value});
  };

  const handlePatientLNChange = (event) => {
    console.log(patientLN);
    console.log("patientLN");
    setPatientLN(event.target.value);
    setPatientValues({...patientValues, last_name: event.target.value});
  };

  const handleInsuranceChange = (event) => {
    setPatientValues({...patientValues, insurance: event.target.value});
  }

   const handlePhoneChange = (event) => {
    setPatientValues({...patientValues, phone_number: event.target.value});
  } 

  const handleEmailChange = (event) => {
    setPatientValues({...patientValues, email_address: event.target.value});
  }

  const handleSalaryChange = (prop) => (event) => {
    setPatientValues({...patientValues, salary: event.target.value});
  };

  const handleGenderChange = (prop) => (event) => {
    setPatientValues({...patientValues, gender: event.target.value});
  };
*/
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const submitUser = () => {
    fetch('http://localhost:3000/handleNewUser', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ SSN: patientValues.SSN, first_name: patientValues.first_name, middle_name: patientValues.middle_name, last_name: patientValues.last_name, gender: patientValues.gender, email_address: patientValues.email_address, date_of_birth: patientValues.date_of_birth, phone_number: patientValues.phone_number, house_number: patientValues.house_number, street: patientValues.street, city: patientValues.city, province: patientValues.province, isPatient: showPatient, isEmployee: showEmployee ,insurance: patientValues.insurance, branch_id: patientValues.branch_id, salary: patientValues.salary, employee_type: patientValues.employee_type, employee_role: patientValues.employee_role })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    });
  };

  return (
    <div Style={{ width: '85vw'}}>
      <IconButton onClick={handleClickOpen}><AddCircleIcon/></IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>New User</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack spacing={3}>
                  {/* first name, middle name */}
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="patient-first-name" label="First Name" variant="outlined" onChange={(e) => setPatientValues({...patientValues, first_name: e.target.value})} />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="patient-middle-name" label="Middle Name" variant="outlined" onChange={(e) => setPatientValues({...patientValues, middle_name: e.target.value})} />
                    </FormControl>
                  </Stack>
                  {/* last name, ssn */}
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField  id="patient-last-name" label="Last Name" variant="outlined" onChange={(e) => setPatientValues({...patientValues, last_name: e.target.value})}/>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="ssn" type="number" label="Social Security Number" variant="outlined" onChange={(e) => setPatientValues({...patientValues, SSN: e.target.value})} />
                    </FormControl>
                  </Stack>
                  {/* DOB */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <CalendarTodayIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Date of birth" placeholder="YYYY-MM-DD" variant="standard" onChange={(e) => setPatientValues({...patientValues, date_of_birth: e.target.value})}/>
                  </Box>
                  {/* phone, mail */}
                  <Stack direction="row" spacing={2}>
                    <FormControl  fullWidth sx={{ m: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" label="Phone Number" placeholder="xxx-xxx-xxxx" variant="standard" onChange={(e) => setPatientValues({...patientValues, phone_number: e.target.value})}/>
                      </Box>
                    </FormControl>
                    <FormControl fullWidth sx={{ mx: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" label="Email Address" placeholder="xxx@xxx.xxx" variant="standard" onChange={(e) => setPatientValues({...patientValues, email_address: e.target.value})}/>
                      </Box>
                    </FormControl>
                  </Stack>
                  {/* house num, street */}
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth sx={{ mx: 1 }}>
                      <TextField id="house-number" type="number" label="House Number" variant="outlined" onChange={(e) => setPatientValues({...patientValues, house_number: e.target.value})} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mx: 1 }}>
                      <TextField id="street-name" label="Street" variant="outlined" onChange={(e) => setPatientValues({...patientValues, street: e.target.value})} />
                    </FormControl>
                  </Stack>
                  {/* city, province */}
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth sx={{ mx: 1 }}>
                      <TextField id="city" label="City" variant="outlined" onChange={(e) => setPatientValues({...patientValues, city: e.target.value})} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mx: 1 }}>
                      <InputLabel id="Dentist-dialog">Province</InputLabel>
                      <Select 
                          labelId="province-label"
                          id="province-dialog"
                          onChange={(e) => setPatientValues({...patientValues, province: e.target.value})}
                          input={<OutlinedInput label="Province" />}
                      >
                          <MenuItem value=""><em>Please Select One</em></MenuItem>
                          <MenuItem value="AB">Alberta</MenuItem>
                          <MenuItem value="BC">British Columbia</MenuItem>
                          <MenuItem value="MB">Manitoba</MenuItem>
                          <MenuItem value="NB">New Brunswick</MenuItem>
                          <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
                          <MenuItem value="NT">Northwest Territories</MenuItem>
                          <MenuItem value="NS">Nova Scotia</MenuItem>
                          <MenuItem value="NU">Nunavut</MenuItem>
                          <MenuItem value="ON">Ontario</MenuItem>
                          <MenuItem value="PE">Prince Edward Island</MenuItem>
                          <MenuItem value="QC">Quebec</MenuItem>
                          <MenuItem value="SK">Saskatchewan</MenuItem>
                          <MenuItem value="YT">Yukon</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }} row aria-labelledby="radio-buttons-label" name="radio-buttons" onChange={(e) => setPatientValues({...patientValues, gender: e.target.value})} >
                    <FormControlLabel value="F" control={<Radio />} label="Female" />
                    <FormControlLabel value="M" control={<Radio />} label="Male" />
                    <FormControlLabel value="X" control={<Radio />} label="Other" />
                  </RadioGroup>
                  <FormLabel id="demo-row-radio-buttons-group-label">User type</FormLabel>
                  <Stack direction="row">
                    <FormControlLabel control={<Checkbox />} onChange={() => setShowPatient(!showPatient)} label="Patient" />
                    <FormControlLabel control={<Checkbox />} onChange={() => setShowEmployee(!showEmployee)} label="Employee" />
                  </Stack>
                    
                    {showPatient ? (
                      <div>
                        <Divider> <Chip label="Patient info" /> </Divider>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <TextField id="patient-first-name" label="Insurance Company" variant="outlined" onChange={(e) => setPatientValues({...patientValues, insurance: e.target.value})} />
                        </FormControl>
                      </div>
                    ) : null}
                    
                    {showEmployee ? (
                      <div>
                        <Divider> <Chip label="Patient info" /> </Divider>
                        {/* Branch id, salary */}
                          <Stack direction="row" spacing={2}>
                          <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel sx={{ width: '120px' }} id="branch-dialog">Branch</InputLabel>
                            <Select
                                labelId="Branch-label"
                                id="Branch-dialog"
                                onChange={(e) => setPatientValues({...patientValues, branch_id: e.target.value})}
                                input={<OutlinedInput label="Branch" />}
                            >
                                <MenuItem value=""><em>Please Select One</em></MenuItem>
                                <MenuItem value="1">Ottawa</MenuItem>
                                <MenuItem value="2">Toronto</MenuItem>
                                <MenuItem value="3">Montreal</MenuItem>
                                <MenuItem value="4">Quebec City</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Salary</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-amount"
                              onChange={(e) => setPatientValues({...patientValues, salary: e.target.value})}
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              label="Salary"
                            />
                          </FormControl>
                          </Stack>
                        {/* employee type */}
                        <FormLabel id="demo-row-radio-buttons-group-label">Employee Type</FormLabel>
                        <RadioGroup row aria-labelledby="radio-buttons-label" name="radio-buttons" onChange={(e) => setPatientValues({...patientValues, employee_type: e.target.value})} >
                          <FormControlLabel value="full_time" control={<Radio />} label="Full time" />
                          <FormControlLabel value="part_time" control={<Radio />} label="Part time" />
                        </RadioGroup>
                        {/* employee role */}
                        <FormLabel id="demo-row-radio-buttons-group-label">Employee Role</FormLabel>
                        <RadioGroup row aria-labelledby="radio-buttons-label" name="radio-buttons" onChange={(e) => setPatientValues({...patientValues, employee_role: e.target.value})} >
                          <FormControlLabel value="receptionnist" control={<Radio />} label="Receptionnist" />
                          <FormControlLabel value="hygenist" control={<Radio />} label="Hygenist" />
                          <FormControlLabel value="dentist" control={<Radio />} label="Dentist" />
                        </RadioGroup>
                      </div>
                    ) : null}
                </Stack>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submit}>Submit</Button>
            </DialogActions>
      </Dialog>
    </div>
  );
}