import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = (handleDelete) => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 160 },
    { field: 'address1', headerName: 'Address 1', width: 200 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'postal_code', headerName: 'Postal Code', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'registrationTime', headerName: 'Registration Time', width: 200 },
    { field: 'aboutMe', headerName: 'About Me', width: 200 },
    { field: 'fees', headerName: 'Fees', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                <Tooltip title="Edit Student">
                    <Link to={`/updatestudent/${params.row.id}`}>
                        <Edit color="primary" />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete Student">
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
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/user/user?roleId=3')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    const users = response.data.map(user => ({
                        id: user.userid || 'N/A',
                        firstName: user.firstName || 'N/A',
                        lastName: user.lastName || 'N/A',
                        email: user.email || 'N/A',
                        contactNumber: user.contactNumber ? user.contactNumber.toString() : 'N/A',
                        address1: user.address1 || 'N/A',
                        city: user.city || 'N/A',
                        state: user.state || 'N/A',
                        country: user.country || 'N/A',
                        postal_code: user.postal_code || 'N/A',
                        gender: user.gender || 'N/A',
                        registrationTime: user.registrationTime || 'N/A',
                        aboutMe: user.aboutMe || 'N/A',
                        fees: user.fees ? user.fees.toString() : 'N/A'
                    }));
                    setRows(users);
                } else {
                    setError('No data returned from the API');
                }
            })
            .catch(err => {
                setError(`Error fetching data: ${err.message}`);
            });
    };

    const handleDelete = (id) => {
        setCurrentId(id);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8080/user/user/${currentId}`)
            .then(() => {
                setRows(rows.filter(row => row.id !== currentId));
                setOpenDialog(false);
            })
            .catch(err => {
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
                        <Link to="/adminform">
                            <Edit fontSize="large" color="primary" />
                        </Link>
                    </Tooltip>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <DataGrid
                rows={rows}
                columns={columns(handleDelete)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this student?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
