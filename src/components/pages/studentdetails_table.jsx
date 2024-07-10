import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 
import { Edit } from '@mui/icons-material'; 
import Tooltip from '@mui/material/Tooltip';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'section', headerName: 'Section', flex: 1 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 130 },
];

// Mock student data
const initialStudentDetails = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', section: 'Third', email: 'snowjon@gmail.com', phoneNumber: 5879589562 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', section: 'Fourth', email: 'cersei@gmail.com', phoneNumber: 8957158962 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', section: 'Eleventh', email: 'jaime@gmail.com', phoneNumber: 9856471523 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', section: 'Second', email: 'arya@gmail.com', phoneNumber: 2299574896 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', section: 'First', email: 'daenerys@gmail.com', phoneNumber: 8597845612 },
    { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', section: 'Tenth', email: 'melisandre@gmail.com', phoneNumber: 5896784596 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', section: 'Eleventh', email: 'ferrara@gmail.com', phoneNumber: 2525645895 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', section: 'Tenth', email: 'rossini@gmail.com', phoneNumber: 2589456213 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', section: 'Ninth', email: 'harvey@gmail.com', phoneNumber: 78965452123 },
];

const DataTable = () => {
    const [rows, setRows] = useState(initialStudentDetails);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch student details from an API (mocked here)
    const fetchStudentDetails = async () => {
        try {
            // Replace with actual API endpoint
            const response = await fetch('http://localhost:8080/user/user');
            if (!response.ok) {
                throw new Error('Failed to fetch student details');
            }
            const data = await response.json();
            setRows(data.students); // Assuming API returns students array
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    // Fetch student details on component mount
    useEffect(() => {
        fetchStudentDetails();
    }, []);

    const handleSearch = () => {
        const filteredRows = initialStudentDetails.filter(row =>
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
                    <Tooltip title="Add Student">
                        <Link to="/adminstudentform"> {/* Adjust the route to your admin form */}
                            <Edit fontSize="large" color="primary" />
                        </Link>
                    </Tooltip>
                </div>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;
