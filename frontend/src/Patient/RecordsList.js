import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


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

export default function Records({userID}) {
  const [userRows, setUserRows] = React.useState(tempUserRows);
  const [show, setShow] = React.useState(false);
  const [height, setheight] = React.useState('100%');

  function handleClick () {
      setShow(!show);
      if (show){
        setheight('100%');
      }
      else{
        setheight('20%');
      }
  }

  
  const getUserRecords = () => {
    fetch('https://dental-care-management-system.herokuapp.com/handleUserRecords', {
      method: "POST",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({lookingFor: 'user_id', equals: userID})
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw res;
    }).then(data => {
      setUserRows(data);
    });
  }

  useEffect(() => {
    getUserRecords();
  },[]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <CardActionArea sx={{ height: height, display: 'flex', flexDirection: 'column' }} onClick={handleClick}>
          <CardMedia >
            <Typography variant="h4" align="left">Medical Records</Typography>
          </CardMedia>
      </CardActionArea>
      {show ? (
          <CardContent sx={{ width:'100%', height: '100%', p:0 }}>
              <DataGrid 
              sx={{ bgcolor: 'background.paper', m: 1 }}
              rows={userRows}
              columns={userColumns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </CardContent>
      ) : null}
    </div>
  );
}