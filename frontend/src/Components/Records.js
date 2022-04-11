import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import NewUserForm from './NewUserForm';

const columns = [
  {
    field: 'person_name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email_address',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  { 
    field: 'phone_number', 
    headerName: 'Phone', 
    width: 150 
  },
  {
    field: 'date_of_birth',
    headerName: 'DOB',
    type: 'number',
    sortable: false,
    width: 100,
  },
  {
    field: 'address',
    headerName: 'Address',
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Branch',
    sortable: false,
    width: 100,
    editable: true,
  },
];

const userColumns = [
  {
    field: 'appointment_id',
    headerName: 'Appointment ID',
    width: 120,
  },
  {
    field: 'record_id',
    headerName: 'Record ID',
    width: 90,
  },
  {
    field: 'patient_name',
    headerName: 'Patient',
    width: 120,
  },
  { 
    field: 'employee_name', 
    headerName: 'Dentist', 
    width: 120 
  },
  {
    field: 'appointment_type',
    headerName: 'Type',
    type: 'number',
    width: 100,
  },
  {
    field: 'appointment_date',
    headerName: 'Date',
    width: 120,
  },
  {
    field: 'start_time',
    headerName: 'start_time',
    width: 100,
  },
  {
    field: 'end_time',
    headerName: 'End Time',
    sortable: false,
    width: 100,
  },
  {
    field: 'treatment_type',
    headerName: 'Treatment Type',
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: 'medication',
    headerName: 'Medication',
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: 'comments',
    headerName: 'Comments',
    sortable: false,
    width: 100,
    editable: true,
  },
  {
    field: 'teeth',
    headerName: 'Teeth',
    sortable: false,
    width: 70,
    editable: true,
  },
  {
    field: 'symptoms',
    headerName: 'Symptoms',
    sortable: false,
    width: 100,
    editable: true,
  },
];

const tempUserRows = [{
  id: 1,
  appointment_id: "appointment_id",
  record_id: "record_id",
  patient_name: "patient name",
  employee_name: "dentist name",
  appointment_type: "appointment_type",
  appointment_date: "appointment_date",
  start_time: "start_time",
  end_time: "end_time",
  treatment_type: "treatment_type",
  medication: "medication",
  comments: "comments",
  teeth: "teeth",
  symptoms: "symptoms",
}];

const tempRows = [{
  id: 1,
  person_name: "name",
  email_address: "address",
  phone_number: "0000000000",
  date_of_birth: "0000-00-00",
  address: "street",
  role: "end_time",
  branch: "end_time",
}];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '60vh',
  bgcolor: 'background.paper',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DataGridRecords() {
  const [rows, setRows] = React.useState(tempRows);
  const [userRows, setUserRows] = React.useState(tempUserRows);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(0);
  const handleClose = () => setOpen(false);

  function handleClick (row) {
    setSelectedUser(row.id-1);
    getUserRecords(row.id-1);
    setOpen(true);
  }

  const getUserRecords = (user) => {
    fetch('https://dental-care-management-system.herokuapp.com/handleUserRecords', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({lookingFor: "CONCAT(person_patient.first_name, ' ', person_patient.last_name)", equals: "'"+rows[Number(user)].person_name.replace('  ', ' ')+"'"})
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setUserRows(data);
    });
  }

  const getUsers = () => {
    fetch('https://dental-care-management-system.herokuapp.com/handleReceptionnistUsers', {
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
    getUsers();
  },[]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
    <Typography variant="h4" align="center" sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly', }}>User Records <NewUserForm/></Typography>
      <DataGrid 
        sx={{ bgcolor: 'background.paper', m: 1 }}
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onRowClick={handleClick}
        editMode="row"
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Records for {rows[Number(selectedUser)].person_name}
          </Typography>
          <DataGrid 
            sx={{ bgcolor: 'background.paper', height: '90%', m: 1 }}
            rows={userRows}
            columns={userColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            editMode="row"
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Fade>
    </Modal>
    </div>
  );
}