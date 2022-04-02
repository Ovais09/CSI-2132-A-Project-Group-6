import * as React from 'react';
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

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [dentist, setDentist] = React.useState('');
  const [procedure, setProcedure] = React.useState('');
  const [value, setValue] = React.useState(new Date());

  const initState = {
    email: "",
    password: "",
    phone: ""
  };
  
  const submit = () => {
    console.log(" Submited");
    handleClose();
  };

  const handleDentistChange = (event) => {
    setDentist(Number(event.target.value) || '');
  };

  const handleProcedureChange = (event) => {
    setProcedure(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
        
      <IconButton color="primary" onClick={handleClickOpen}><AddCircleIcon/></IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Please complete the form</DialogTitle>
            <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Stack spacing={3}>
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
                            <MenuItem value={10}>Dentist1</MenuItem>
                            <MenuItem value={20}>Dentist2</MenuItem>
                            <MenuItem value={30}>Dentist3</MenuItem>
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
                            <MenuItem value={10}>Procedure1</MenuItem>
                            <MenuItem value={20}>Procedure2</MenuItem>
                            <MenuItem value={30}>Procedure3</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
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