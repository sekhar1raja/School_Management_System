import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = (handleDelete) => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'section', headerName: 'Section', flex: 1 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 130 },
    { field: 'aboutMe', headerName: 'About Me', width: 200 },
    { field: 'fees', headerName: 'Fees', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                <Tooltip title="Edit Employee">
                    <Link to={`/updatestudent/${params.row.id}`}>
                        <Edit color="primary" />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete Employee">
                    <Delete
                        color="secondary"
                        style={{ cursor: 'pointer', marginLeft: 16 }}
                        onClick={() => handleDelete(params.row.id)}
                    />
                </Tooltip>
            </div>
        )
    }
];

export default function StudentTable() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [error, setError] = useState(null); // State to hold error messages

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8080/user/user?roleId=2')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const users = data.map(user => ({
                        id: user.userid || 'N/A',
                        firstName: user.firstName || 'N/A',
                        lastName: user.lastName || 'N/A',
                        email: user.email || 'N/A',
                        section: user.section ? user.section.sectionId.toString() : 'N/A',
                        phoneNumber: user.phoneNumber ? user.phoneNumber.toString() : 'N/A',
                        aboutMe: user.aboutMe || 'N/A',
                        fees: user.fees ? user.fees.toString() : 'N/A'
                    }));
                    setRows(users);
                } else {
                    setError('No data returned from the API');
                }
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
                setError(`Error fetching data: ${err.message}`);
            });
    };

    const handleDelete = (id) => {
        setCurrentId(id);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:8080/user/user/${currentId}`, {
            method: 'DELETE',
            origin: '*',

            allowedHeaders: [
              'Content-Type', 'application/json',
            ],
          
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // or response.text() if the server returns text
        })
        .then(() => {
            setRows(rows.filter(row => row.id !== currentId));
            setOpenDialog(false);
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            setError(`Error deleting user: ${err.message}`);
            setOpenDialog(false);
        });
    };

    const handleSearch = () => {
        const filteredRows = rows.filter(row =>
            Object.values(row).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setRows(filteredRows);
    };

    return (
        <div className="container" style={{ height: 500, width: '100%' }}>
            {error && <div className="alert alert-danger">{error}</div>}
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
                columns={columns(handleDelete)} // Pass handleDelete to columns function
                pageSize={5}
                checkboxSelection
            />
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
