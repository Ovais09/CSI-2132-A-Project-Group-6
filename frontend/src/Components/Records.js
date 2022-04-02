import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: true,
  },
  {
    field: 'DOB',
    headerName: 'Date Of Birth',
    type: 'number',
    sortable: false,
    width: 110,
  },
  {
    field: 'Contact',
    headerName: '[email_address, phone number]',
    sortable: false,
    width: 160,
    editable: true,
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', DOB: 35, Contact: 'blablabla'  },
  { id: 2, lastName: 'Snow', firstName: 'meh', DOB: 2, Contact: 'blablabla'  },
  { id: 3, lastName: 'Snow', firstName: 'boop', DOB: 5, Contact: 'blablabla'  },
  { id: 4, lastName: 'Snow', firstName: 'ya', DOB: 456, Contact: 'blablabla'  },
  { id: 5, lastName: 'Snow', firstName: 'nooo', DOB: 8, Contact: 'blablabla'  },
  { id: 6, lastName: 'Snow', firstName: 'pfff', DOB: 7, Contact: 'blablabla'  },
  { id: 7, lastName: 'Snow', firstName: 'hhhhh', DOB: 46, Contact: 'blablabla'  },
  { id: 8, lastName: 'Snow', firstName: 'beep', DOB: 3, Contact: 'blablabla'  },
  { id: 9, lastName: 'Snow', firstName: 'bop', DOB: 35, Contact: 'blablabla'  },
  { id: 10, lastName: 'Snow', firstName: 'kevin', DOB: 87, Contact: 'blablabla'  },
];
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

export default function DataGridDemo() {
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
            {rows[selectedUser].firstName} {rows[selectedUser].lastName} [include all user info] [will be editable]
          </Typography>
          <DataGrid 
            sx={{ bgcolor: 'background.paper', height: '90%', m: 1 }}
            rows={rows}
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