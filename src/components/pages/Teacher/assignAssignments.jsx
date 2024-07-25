import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, FormHelperText, Card, CardContent, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import "../style.css"; // Make sure to include your stylesheet
import ReactQuill from 'react-quill'; // Import react-quill for rich text editor
import 'react-quill/dist/quill.snow.css'; // Import quill's styles
// Custom CSS


// Component for assigning assignments
const AssignAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseOffered, setCourseOffered] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCourseOffered, setSelectedCourseOffered] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/util/course')
      .then(response => response.json())
      .then(data => {
        console.log('Courses:', data);
        setCourses(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://localhost:8080/util/section')
      .then(response => response.json())
      .then(data => {
        console.log('Sections:', data);
        setSections(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const courseId = selectedCourse; // courseId is now the selectedCourse
      fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${courseId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Course Offered:', data);
          setCourseOffered(Array.isArray(data) ? data : []); // Ensure data is an array
        })
        .catch(error => console.error('Error fetching course offered:', error));
    }
  }, [selectedCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create an assignment object
    const assignment = {
      course: selectedCourse,
      section: selectedSection,
      courseOffered: selectedCourseOffered,
      title: assignmentTitle,
      description: assignmentDescription,
      instructions: instructions
    };

    // Replace with your actual API endpoint
    axios.post('/api/assignments', assignment)
      .then(response => {
        // Handle successful submission
        alert('Assignment assigned successfully!');
      })
      .catch(error => {
        // Handle errors
        console.error('There was an error assigning the assignment!', error);
      });
  };

  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Assign Course"
        style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '20px' }}
      />
      <Typography variant="h4" gutterBottom>Assign the Assignment</Typography>

      <Card className="assignment-card">
        <CardContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Select Course</InputLabel>
            <Select
              labelId="course-label"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              size="small"
            >
              <MenuItem value="">
                <em>Select Course</em>
              </MenuItem>
              {courses.map(course => (
                <MenuItem key={course.id} value={course.courseOfferedId}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a course</FormHelperText>
          </FormControl>

          

          <FormControl fullWidth margin="normal">
            <InputLabel id="program-label">Select Program</InputLabel>
            <Select
              labelId="program-label"
              value={selectedCourseOffered}
              onChange={(e) => setSelectedCourseOffered(e.target.value)}
              size="small"
            >
              <MenuItem value="">
                <em>Select Program</em>
              </MenuItem>
              {courseOffered.map(courseSubject => (
                <MenuItem key={courseSubject.id} value={courseSubject.courseSubjectId}>
                  {courseSubject.subjectName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a program to assign</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="section-label">Select Section</InputLabel>
            <Select
              labelId="section-label"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              size="small"
            >
              <MenuItem value="">
                <em>Select Section</em>
              </MenuItem>
              {sections.map(section => (
                <MenuItem key={section.id} value={section.sectionId}>
                  {section.section}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a section for the course</FormHelperText>
          </FormControl>
          <TextField
            label="Assignment Title"
            fullWidth
            margin="normal"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            required
          />

          <TextField
            label="Assignment Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
            required
          />

          <TextField
            label="Instructions"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
        <Typography variant="h6" gutterBottom>Comments</Typography>
        <ReactQuill
          value={comments}
          onChange={(value) => setComments(value)}
          theme="snow"
          modules={{ toolbar: true }}
          placeholder="Enter comments here..."
        />
      </FormControl>

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Upload Assignment</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AssignAssignment;
