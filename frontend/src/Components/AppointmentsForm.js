import * as React from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const tempValues = [
  {
    patient_id: "patient_id",
    user_id: "user_id",
    appointment_type: "appointment_type",
    appointment_date: "appointment_date",
    start_time: "start_time",
    end_time: "end_time",
    employee_id: "employee_id"
  }
];

const tempDentists = [
  {
    ID: 1,
    first_name: "name",
    last_name: "name2",
    employee_id: "employee_id"
  },
  {
    ID: 2,
    first_name: "name3",
    last_name: "name4",
    employee_id: "employee_id2"
  }
];

const procedures = [
  {
    procedure_type: "Cleaning"
  },
  {
    procedure_type: "Diagnosis"
  },
  {
    procedure_type: "Surgery"
  }
];

export default function AppointmentsForm() {
  const [open, setOpen] = React.useState(false);
  const [dentist, setDentist] = React.useState('');
  const [procedure, setProcedure] = React.useState('');
  const [patientFN, setPatientFN] = React.useState('');
  const [patientLN, setPatientLN] = React.useState('');
  const [dateValue, setDateValue] = React.useState(new Date());
  const [dentists, setDentists] = React.useState(tempDentists);
  const [patientValues, setPatientValues] = React.useState(tempValues);

  const submit = () => {
    console.log("Submited");    
    handleClose();
    submitAppointment();
  };

  const handleDentistChange = (event) => {
    setDentist(Number(event.target.value) || '');
    console.log('dentists['+Number(Number(event.target.value)-1)+'].employee_id');
    console.log(dentists[Number(Number(event.target.value)-1)].employee_id);
    setPatientValues({...patientValues, employee_id: dentists[Number(Number(event.target.value)-1)].employee_id});
  };

  const handlePatientFNChange = (event) => {
    console.log(patientFN);
    console.log("patientFN");
    console.log(patientLN);
    console.log("patientLN");
    setPatientFN(event.target.value);
  };

  const handlePatientLNChange = (event) => {
    console.log(patientFN);
    console.log("patientFN");
    console.log(patientLN);
    console.log("patientLN");
    setPatientLN(event.target.value);
  };

  const handleProcedureChange = (event) => {
    setProcedure(Number(event.target.value) || '');
    console.log('procedures['+Number(Number(event.target.value)-1)+'].procedure_type');
    console.log(procedures[Number(Number(event.target.value)-1)].procedure_type);
    setPatientValues({...patientValues, appointment_type: procedures[Number(Number(event.target.value)-1)].procedure_type});
  };

  const handleTimeChange = (newValue) => {
    setDateValue(newValue);
    console.log(newValue);
    console.log('newValue');

    var month = dateValue.getMonth()+1;
    if (month < 10){
      month = '0'+month;
    }
    var day = dateValue.getDate();
    if (day < 10){
      day = '0'+day;
    }
    const apDate = dateValue.getFullYear()+'-'+month+'-'+day;
    const apTimeStart = dateValue.getHours()+":"+dateValue.getMinutes()+":00";
    const apTimeEnd = (dateValue.getHours()+1)+":"+dateValue.getMinutes()+":00";

    setPatientValues({...patientValues, appointment_date: apDate, start_time: apTimeStart, end_time: apTimeEnd});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const submitAppointment = () => {

    fetch('http://localhost:3000/handleNewAppointmentReceptionnist', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: patientFN, last_name: patientLN, appointment_type: patientValues.appointment_type, appointment_date: patientValues.appointment_date, start_time: patientValues.start_time, end_time: patientValues.end_time, employee_id: patientValues.employee_id })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    })
  };

  const getValues = () => {

    fetch('http://localhost:3000/handleDoctorList', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify()
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setDentists(data);
    });
  }
  useEffect(() => {
    getValues();
  },[]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}><AddCircleIcon/></IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Please complete the form</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack spacing={3}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <TextField value={patientFN} id="patient-first-name" label="First Name" variant="outlined" onChange={handlePatientFNChange} />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <TextField value={patientLN} id="patient-last-name" label="Last Name" variant="outlined" onChange={handlePatientLNChange}/>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="Dentist-dialog">Dentist</InputLabel>
                        <Select
                            labelId="Dentist-dialog-label"
                            id="Dentist-dialog"
                            value={dentist}
                            onChange={handleDentistChange}
                            input={<OutlinedInput label="Dentist" />}
                        >
                            <MenuItem value="">
                            <em>Please Select One</em>
                            </MenuItem>
                              {dentists.map((d, index) => (
                                <MenuItem value={d.ID}>{d.first_name} {d.last_name}</MenuItem>
                              ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="Procedure-dialog">Procedure</InputLabel>
                        <Select
                            labelId="Procedure-dialog-label"
                            id="Procedure-dialog"
                            value={procedure}
                            onChange={handleProcedureChange}
                            input={<OutlinedInput label="Procedure" />}
                        >
                            <MenuItem value="">
                            <em>Please Select One</em>
                            </MenuItem>
                            <MenuItem value={1}>Cleaning</MenuItem>
                            <MenuItem value={2}>Diagnosis</MenuItem>
                            <MenuItem value={3}>Surgery</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={dateValue}
                            onChange={(newValue) => {
                              handleTimeChange(newValue);
                            }}
                            minDate={new Date()}
                            minTime={new Date(0, 0, 0, 8)}
                            maxTime={new Date(0, 0, 0, 18, 45)}
                        />
                    </LocalizationProvider>
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