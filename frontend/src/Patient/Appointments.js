import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
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

  return (
    <Box>
      <Typography variant="h4" align="left" sx={{ p: 3 }}>Appointments</Typography>
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
 onChangeIndex={handleChangeIndex} id='aaaa'>
        <div style={{ height: '262px'}}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <DataGrid
              sx={{ bgcolor: 'background.paper', m: 1 }}
              rows={rows1}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <DataGrid
              sx={{ bgcolor: 'background.paper', m: 1 }}
              rows={rows2}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
            />
          </div>
        </div>
        
        
      </SwipeableViews>
    </Box>
  );
}