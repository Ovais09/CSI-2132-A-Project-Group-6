import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import AppointmentsForm from './AppointmentsForm';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function Appointments({userID}) {
  const [values, setValues] = React.useState({
    appointment_type: '',
    appointment_date: '',
    duration: '',
    dentist: ''
  });
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(0);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dentist, setDentist] = React.useState('');
  
  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'firstName',
      headerName: 'Appointment',
      width: 130,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Time',
      width: 120,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Duration',
      type: 'number',
      width: 120,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Room',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 70,
    }
  ];
  const rows1 = [
    { id: 1, lastName: '[start_time]', firstName: '[appointment_type]', age: '[end-start]', fullName: '[Room Assigned]' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  ];
  const rows2 = [
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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

  function handleClick (row) {
    setSelectedUser(row.id-1);
    setOpen(true);
  }  

  
const getAppointments = () => {
  fetch('http://localhost:3000/handlePatientAppointments', {
    method: "POST",
    headers: {  'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userID })
  }).then(res => {
    if(res.ok){
      return res.json();
    }
    throw res;
  }).then(data => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"+data.name);
    
    /* setValues({ ...values, userId: userID, userName: data.name, age: 22, DOB: data.DOB, contact: data.contact, address: data.address}); */
  });
}
useEffect(() => {
  getAppointments();
},[]);

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly', }}>Appointments <AppointmentsForm/></Typography>
      
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="upcoming appointments on the left tab and past appointments on the right tab"
        >
          <Tab label="Upcomming Appointments" {...a11yProps(0)} />
          <Tab label="Past Appointments" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value}
 onChangeIndex={handleChangeIndex}>
        <div style={{ height: '262px'}}>
          <div index={0} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <DataGrid
              sx={{ bgcolor: 'background.paper', m: 1 }}
              rows={rows1}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              onRowClick={handleClick}
              editMode="row"
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
          <div index={1} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <DataGrid
              sx={{ bgcolor: 'background.paper', m: 1 }}
              rows={rows2}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              onRowClick={handleClick}
              editMode="row"
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </div>
      </SwipeableViews>
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
              {rows1[selectedUser].firstName} {rows1[selectedUser].lastName} [include all user info] [will be editable]
            </Typography>
            aaa
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}