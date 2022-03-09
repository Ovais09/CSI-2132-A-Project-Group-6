import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pmedicationSize={5}
        rowsPerPmedicationOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}