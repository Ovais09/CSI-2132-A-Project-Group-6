import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import AppointmentsForm from './AppointmentsForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <Typography sx={{ height:'100%'}}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

export default function Appointments({userID}) {
  const [value, setValue] = React.useState(0);
  const [rowsPast, setRowsPast] = React.useState(tempRows);
  const [rowsFuture, setRowsFuture] = React.useState(tempRows);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAppointments = () => {

    var todayDate = new Date();
    var month = todayDate.getMonth();
    if (month < 10){
      month = '0'+month;
    }
    var day = todayDate.getDate();
    if (day < 10){
      day = '0'+day;
    }
    todayDate = todayDate.getFullYear()+'-'+month+'-'+day;

    fetch('https://dental-care-management-system.herokuapp.com/handlePatientPastAppointments', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userID, date: todayDate })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setRowsPast(data);
    });
    
    fetch('https://dental-care-management-system.herokuapp.com/handlePatientFutureAppointments', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userID, date: todayDate })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setRowsFuture(data);
    });
  }
  useEffect(() => {
    getAppointments();
  },[]);

  return (
    <Box>
        <Typography variant="h4" align="center" sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly', }}>Appointments <AppointmentsForm userID={userID}/></Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="upcoming appointments on the left tab and past appointments on the right tab">
          <Tab label="Upcomming Appointments" {...a11yProps(0)} />
          <Tab label="Past Appointments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} style={{ height: '262px'}} index={0} id='aaa'>
        <DataGrid id='ccc'
                sx={{ bgcolor: 'background.paper', m: 1, height: '100%' }}
                rows={rowsFuture}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
      </TabPanel>
      <TabPanel value={value} style={{ height: '262px'}} index={1} id='bbb'>
        <DataGrid
                sx={{ bgcolor: 'background.paper', m: 1, height: '100%' }}
                rows={rowsPast}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
      </TabPanel>
    </Box>
  );
}