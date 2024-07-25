import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Typography, Avatar, Box, Grid, Checkbox } from '@mui/material';
import { green, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    // Commented out API call
    // try {
    //   const response = await axios.get('http://localhost:8080/api/courses');
    //   setCourses(response.data);
    // } catch (error) {
    //   console.error('Error fetching courses:', error);
    // }

    // Hardcoded data for courses
    const hardcodedCourses = [
      { id: '1', name: 'Web developement' },
      { id: '2', name: 'Node Js' },
      { id: '3', name: 'Ressponsive web development' },
    ];
    setCourses(hardcodedCourses);
  };

  const fetchSections = async (courseId) => {
    // Commented out API call
    // try {
    //   const response = await axios.get(`http://localhost:8080/api/courses/${courseId}/sections`);
    //   setSections(response.data);
    // } catch (error) {
    //   console.error('Error fetching sections:', error);
    // }

    // Hardcoded data for sections
    const hardcodedSections = [
      { id: 'A', name: 'Section A' },
      { id: 'B', name: 'Section B' },
      { id: 'C', name: 'Section C' },
    ];
    setSections(hardcodedSections);
  };

  const fetchAttendance = async (courseId, sectionId) => {
    // Commented out API call
    // try {
    //   const response = await axios.get(`http://localhost:8080/api/attendance?courseId=${courseId}&sectionId=${sectionId}`);
    //   setAttendance(response.data);
    // } catch (error) {
    //   console.error('Error fetching attendance:', error);
    // }

    // Hardcoded data for attendance
    const hardcodedAttendance = [
      { id: '1', studentName: 'John Doe', studentImage: '', date: '2024-07-21', status: 'Present' },
      { id: '2', studentName: 'Jane Smith', studentImage: '', date: '2024-07-21', status: 'Absent' },
      { id: '3', studentName: 'Sam Wilson', studentImage: '', date: '2024-07-21', status: 'Present' },
    ];
    setAttendance(hardcodedAttendance);
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    fetchSections(courseId);
    setSelectedSection('');
    setAttendance([]);
  };

  const handleSectionChange = (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);
    fetchAttendance(selectedCourse, sectionId);
  };

  const handleCheckboxChange = (id, status) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(record =>
        record.id === id ? { ...record, status } : record
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Attendance</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select value={selectedCourse} onChange={handleCourseChange}>
              {courses.map(course => (
                <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Section</InputLabel>
            <Select value={selectedSection} onChange={handleSectionChange} disabled={!selectedCourse}>
              {sections.map(section => (
                <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map(record => (
              <TableRow key={record.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={record.studentName} src={record.studentImage} sx={{ mr: 2 }} />
                    <Typography variant="body1">{record.studentName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={record.status === 'Present'}
                    onChange={() => handleCheckboxChange(record.id, record.status === 'Present' ? 'Absent' : 'Present')}
                    icon={<CancelIcon sx={{ color: red[500] }} />}
                    checkedIcon={<CheckCircleIcon sx={{ color: green[500] }} />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
