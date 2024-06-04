import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'section', headerName: 'Section ' },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'PhoneNumber', headerName: 'PhoneNumber', type: 'number', width: 130 },
];

const StudentDetails = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', section: 'Third', email: 'snowjon@gmail.com', PhoneNumber: 5879589562 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', section: 'Fourth', email: 'cersei@gmail.com', PhoneNumber: 8957158962 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', section: 'Eleventh', email: 'jaime@gmail.com', PhoneNumber: 9856471523 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', section: 'Second', email: 'arya@gmail.com', PhoneNumber: 2299574896 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', section: 'First', email: 'daenerys@gmail.com', PhoneNumber: 8597845612 },
    { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', section: 'Tenth', email: 'melisandre@gmail.com', PhoneNumber: 5896784596 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', section: 'Eleventh', email: 'ferrara@gmail.com', PhoneNumber: 2525645895 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', section: 'Tenth', email: 'rossini@gmail.com', PhoneNumber: 2589456213 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', section: 'Ninth', email: 'harvey@gmail.com', PhoneNumber: 78965452123 },
];


export default function DataTable() {
    const [rows, setRows] = React.useState(StudentDetails);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = () => {
        const filteredRows = StudentDetails.filter(row =>
            Object.values(row).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setRows(filteredRows);
    };

    return (
        <div className="container" style={{ height: 500, width: '100%' }}>
            <div className="row mb-3">
                <div className="col-9">
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="col-3 d-flex">
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>
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
