import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 
import { Edit } from '@mui/icons-material'; 
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'experience', headerName: 'Experience', type: 'number', width: 130 },
    { field: 'position', headerName: 'Position', width: 130 },
    { field: 'salary', headerName: 'Salary', width: 130 }
];

const initialRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', department: "Mathematics", email: "snowjon@gmail.com", experience: 35, position: 'Lecturer', salary: '25000' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', department: "Mathematics", email: "cersei@gmail.com", experience: 42, position: 'Lecturer', salary: '25000' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', department: "Mathematics", email: "jaime@gmail.com", experience: 45, position: 'Lecturer', salary: '25000' },
];
export default function DataTable() {
    const [rows, setRows] = React.useState(initialRows);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = () => {
        const filteredRows = initialRows.filter(row =>
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
                <div className="col-3 d-flex align-items-center">
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                    <Tooltip title="Add Employee">
                        <Link to="/adminform"> {/* Adjust the route to your admin form */}
                            <Edit fontSize="large" color="primary" />
                        </Link>
                    </Tooltip>
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
