import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

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
    width: 150 
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
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(0);
  const handleClose = () => setOpen(false);

  function handleClick (row) {
    setSelectedUser(row.id-1);
    setOpen(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Typography variant="h4" align="left" sx={{ p: 3 }}>Patient Records</Typography>
      <DataGrid 
        sx={{ bgcolor: 'background.paper', m: 1 }}
        rows={tempRows}
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
            {tempRows[selectedUser].firstName} {tempRows[selectedUser].lastName} [include all user info] [will be editable]
          </Typography>
          <DataGrid 
            sx={{ bgcolor: 'background.paper', height: '90%', m: 1 }}
            rows={tempRows}
            columns={columns}
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