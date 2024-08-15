import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Container, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
  Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const leaveTypes = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick' },
  { value: 'other', label: 'Other' }
];

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDays, setSelectedDays] = useState(0);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/user?roleId=2');
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setSelectedDays(diffDays);
    } else {
      setSelectedDays(0);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const studentId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:8080/util/getStudentLeaveRequest?student_id=${studentId}`);
        const data = await response.json();
        setLeaveHistory(data);
      } catch (error) {
        console.error('Error fetching leave history:', error);
      }
    };

    fetchLeaveHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    const payload = {
      leaveReason: reason,
      fromDate: fromDate || null,
      toDate: toDate || null,
      leaveType: leaveType,
      student_id: {
        userid: userId,
      },
      teacher_id: {
        userid: selectedTeacherId,
      },
      isApproved: 0
    };

    try {
      const response = await fetch('http://localhost:8080/util/leaveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Leave request submitted successfully');
        setFromDate('');
        setToDate('');
        setLeaveType('');
        setSelectedTeacherId('');
        setReason('');
        const studentId = localStorage.getItem('userId');
        const updatedResponse = await fetch(`http://localhost:8080/util/getStudentLeaveRequest?student_id=${studentId}`);
        const updatedData = await updatedResponse.json();
        setLeaveHistory(updatedData);
      } else {
        toast.error('Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      toast.error('An error occurred while submitting the leave request');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/util/deleteLeaveRequest?requestId=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Leave request deleted successfully');
        setLeaveHistory(leaveHistory.filter(leave => leave.leaveRequestId !== id));
      } else {
        toast.error('Failed to delete leave request');
      }
    } catch (error) {
      console.error('Error deleting leave request:', error);
      toast.error('An error occurred while deleting the leave request');
    }
  };

  const calculateDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to - from);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 'N/A';
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Box display="flex" flexDirection="column" mt={4}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1} mr={2}>
            <Typography variant="h4" gutterBottom>Apply Leave</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="From Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="To Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
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
                <InputLabel id="teacher-select-label">Send To</InputLabel>
                <Select
                  labelId="teacher-select-label"
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                >
                  {teachers.map(teacher => (
                    <MenuItem key={teacher.userid} value={teacher.userid}>
                      {teacher.firstName} {teacher.lastName} ({teacher.email})
                    </MenuItem>
                  ))}
                </Select>
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
                  setSelectedTeacherId('');
                  setReason('');
                }}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </Box>
            </form>
          </Box>
          <Box ml={2} flexShrink={0}>
            <Calendar />
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>Leave History</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveHistory.map(leave => (
                  <TableRow key={leave.leaveRequestId}>
                    <TableCell>{leave.leaveRequestId}</TableCell>
                    <TableCell>{leave.leaveType || 'N/A'}</TableCell>
                    <TableCell>{leave.fromDate || 'N/A'}</TableCell>
                    <TableCell>{leave.toDate || 'N/A'}</TableCell>
                    <TableCell>{calculateDays(leave.fromDate, leave.toDate)}</TableCell>
                    <TableCell>{leave.leaveReason}</TableCell>
                    <TableCell>{leave.isApproved === 1 ? 'Approved' : leave.isApproved === 2 ? 'Rejected' : 'Pending'}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => handleDelete(leave.leaveRequestId)}>Delete</Button>
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
