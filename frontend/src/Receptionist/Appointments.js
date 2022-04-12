import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import AppointmentsForm from '../Components/AppointmentsForm';

const columns = [
  {
    field: 'patient_name',
    headerName: 'Patient Name',
    width: 150,
    editable: true,
  },
  {
    field: 'employee_name',
    headerName: 'Employee Name',
    width: 150,
    editable: true,
  },
  { 
    field: 'appointment_type', 
    headerName: 'Appointment Type', 
    width: 150,
    editable: true,
  },
  {
    field: 'appointment_date',
    headerName: 'Appointment Date',
    width: 150,
    editable: true,
  },
  {
    field: 'start_time',
    headerName: 'Start Time',
    type: 'number',
    sortable: false,
    width: 100,
  },
  {
    field: 'end_time',
    headerName: 'End Time',
    sortable: false,
    width: 100,
    editable: true,
  },
];

const tempRows = [{
  id: 1,
  patient_name: "name",
  employee_name: "name2",
  appointment_type: "type",
  appointment_date: "date",
  start_time: "start_time",
  end_time: "end_time",
}];

export default function Appointments() {
  const [rows, setRows] = React.useState(tempRows);
  const theme = useTheme();
  
  const getAppointments = () => {
    fetch('https://dental-care-management-system.herokuapp.com/handleReceptionnistAppointments', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify()
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setRows(data);
    });
  }
  useEffect(() => {
    getAppointments();
  },[]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Typography variant="h4" align="center" sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly', }}>Upcoming Appointments <AppointmentsForm/></Typography>
      <DataGrid
        sx={{ bgcolor: 'background.paper', m: 1 }}
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
          />
    </div>
  );
}