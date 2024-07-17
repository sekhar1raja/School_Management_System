import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

const AssignCoursetea = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [SelectedClass, setSelectedClass] = useState([]);

  useEffect(() => {
    // Fetch teachers, courses, sections, and classes from the backend
    // Example API calls (replace with your actual API endpoints)
    fetch('/api/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data));
    
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data));
    
    fetch('/api/sections')
      .then(response => response.json())
      .then(data => setSections(data));
    
    fetch('/api/classes')
      .then(response => response.json())
      .then(data => setClasses(data));
  }, []);

  const handleAssign = () => {
   
    console.log('Assigned:', selectedTeacher, selectedCourse, selectedSection, SelectedClass);
  };

  return (
    <Container>
      <img src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Assign Course" style={{ width: '100%', height: '150px',objectFit:'cover', marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>Assign Course to Teacher</Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="teacher-label">Add Teacher</InputLabel>
        <Select
          labelId="teacher-label"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          {teachers.map(teacher => (
            <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="course-label">Add Course</InputLabel>
        <Select
          labelId="course-label"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map(course => (
            <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="section-label">Add Section</InputLabel>
        <Select
          labelId="section-label"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map(section => (
            <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="class-label">Add Class</InputLabel>
        <Select
          labelId="class-label"
          value={SelectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map(classItem => (
            <MenuItem key={classItem.id} value={classItem.id}>{classItem.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAssign}>Assign Course</Button>
      </Box>
    </Container>
  );
};

export default AssignCoursetea;
