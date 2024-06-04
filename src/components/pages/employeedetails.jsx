import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'department', headerName: 'Department ', width: 130 },
    { field: 'email', headerName: ' Email', width: 200 },
    {
      field: 'Experience',
      headerName: 'Experience',
      type: 'number',
      
    },
    
  ];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', department:"Mathematics",email:"snowjon@gmail.com", Experience: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', department:"Mathematics",email:"snowjon@gmail.com",Experience: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime',department:"Mathematics",email:"snowjon@gmail.com", Experience: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya',department:"Mathematics",email:"snowjon@gmail.com", Experience: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',department:"Mathematics",email:"snowjon@gmail.com", Experience: null },
    { id: 6, lastName: 'Melisandre', firstName: null, Experience: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara',department:"Mathematics",email:"snowjon@gmail.com", Experience: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini',department:"Mathematics",email:"snowjon@gmail.com", Experience: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', department:"Mathematics",email:"snowjon@gmail.com",Experience: 65 },
  ];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}