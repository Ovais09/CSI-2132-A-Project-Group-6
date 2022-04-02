import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'treatmentType',
    headerName: 'Treatment Type',
    width: 150,
  },
  {
    field: 'appointmentType',
    headerName: 'Appointment Type',
    width: 150,
  },
  {
    field: 'medication',
    headerName: 'Medication',
    type: 'number',
    sortable: false,
    width: 110,
    editable: true,
  },
  {
    field: 'comments',
    headerName: 'Comments',
    sortable: false,
    width: 160,
    editable: true,
  },
];

const rows = [
  { id: 1, treatmentType: 'Snow', appointmentType: 'Jon', medication: 35, comments: 'blablabla'  },
  { id: 2, treatmentType: 'Lannister', appointmentType: 'Cersei', medication: 42, comments: 'blablabla' },
  { id: 3, treatmentType: 'Lannister', appointmentType: 'Jaime', medication: 45, comments: 'blablabla'  },
  { id: 4, treatmentType: 'Stark', appointmentType: 'Arya', medication: 16, comments: 'blablabla'  },
  { id: 5, treatmentType: 'Targaryen', appointmentType: 'Daenerys', medication: null, comments: 'blablabla'  },
  { id: 6, treatmentType: 'Melisandre', appointmentType: null, medication: 150, comments: 'blablabla'  },
  { id: 7, treatmentType: 'Clifford', appointmentType: 'Ferrara', medication: 44, comments: 'blablabla'  },
  { id: 8, treatmentType: 'Frances', appointmentType: 'Rossini', medication: 36, comments: 'blablabla'  },
  { id: 9, treatmentType: 'Roxie', appointmentType: 'Harvey', medication: 65, comments: 'blablabla'  },
];

export default function Records() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(0);
  const handleClose = () => setOpen(false);
  const [show, setShow] = React.useState(false);
  const [height, setheight] = React.useState('100%');

  function handleRowClicked (row) {
    setSelectedUser(row.id-1);
    setOpen(true);
  }
  function handleClick () {
      setShow(!show);
      if (show){
        setheight('100%');
      }
      else{
        setheight('20%');
      }
  }

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
              rows={rows}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              onRowClick={handleRowClicked}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </CardContent>
      ) : null}
    </div>
  );
}