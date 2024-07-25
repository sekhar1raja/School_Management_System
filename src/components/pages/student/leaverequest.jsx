import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const leaveTypes = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick' },
  { value: 'other', label: 'Other' }
];

const leaveHistoryData = [
  { id: 1, name: 'John Doe', leaveType: 'Vacation', fromDate: '12-10-2022', toDate: '14-10-2022', days: 3, notes: 'Family vacation', status: 'Approved' },
  { id: 2, name: 'Jane Doe', leaveType: 'Sick', fromDate: '01-10-2022', toDate: '03-10-2022', days: 3, notes: 'Flu', status: 'Approved' }
];

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [userid, setEmployeeType] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDays, setSelectedDays] = useState(0);
  const [leaveHistory, setLeaveHistory] = useState(leaveHistoryData);

  useEffect(() => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setSelectedDays(diffDays);
    }
  }, [fromDate, toDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic here
    console.log('Form submitted', { fromDate, toDate, leaveType, userid, reason });
  };

  const handleDelete = (id) => {
    // handle delete logic here
    setLeaveHistory(leaveHistory.filter(leave => leave.id !== id));
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" mt={4}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box flex={1} mr={2}>
            <Typography variant="h4" gutterBottom>Apply Leave</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="From Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="To Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  {leaveTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Sending to "
                  value={userid}
                  onChange={(e) => setEmployeeType(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </FormControl>
              <Box mt={2} mb={2}>
                <Chip label={`Selected days: ${selectedDays}`} />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={() => {
                  setFromDate('');
                  setToDate('');
                  setLeaveType('');
                  setEmployeeType('');
                  setReason('');
                }}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </Box>
            </form>
          </Box>
          <Box ml={2}>
            <Calendar />
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>Leave History</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveHistory.map(leave => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.fromDate}</TableCell>
                    <TableCell>{leave.toDate}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell>{leave.notes}</TableCell>
                    <TableCell>{leave.status}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(leave.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default ApplyLeave;
