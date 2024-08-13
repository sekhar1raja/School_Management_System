import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, FormHelperText, Card, CardContent, Grid, Divider } from '@mui/material';
import ReactQuill from 'react-quill'; // Import react-quill for rich text editor
import 'react-quill/dist/quill.snow.css'; // Import quill's styles

const Announcements = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  // const [courseOffered, setCourseOffered] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  // const [selectedCourseOffered, setSelectedCourseOffered] = useState('');
  const [note, setnote] = useState('');

  // Fetch courses and sections on component mount
  useEffect(() => {
    fetch('http://localhost:8080/util/course')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Courses:', data); // Debug log
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://localhost:8080/util/section')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Sections:', data); // Debug log
        setSections(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  // Fetch course offered when a course is selected
  // useEffect(() => {
  //   if (selectedCourse) {
  //     fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${selectedCourse}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Fetched Course Offered:', data); // Debug log
  //         setCourseOffered(Array.isArray(data) ? data : []);
  //       })
  //       .catch(error => console.error('Error fetching course offered:', error));
  //   }
  // }, [selectedCourse]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get userId from local storage
    const userId = localStorage.getItem('userId');

    // Prepare form data
    const formData = {
      courseoffered: {
        courseOfferedId: parseInt(selectedCourse, 10) || null // Ensure it’s an integer
      },
      section: {
        sectionId: parseInt(selectedSection, 10) || null
      },
      note,
      user: {
        userid: userId
      } // Include userId in form data
    };

    console.log('Form Data:', formData); // Debug log

    // Send form data to the server
    axios.post('http://localhost:8080/util/announcement', formData)
      .then(response => {
        alert('Announcement added successfully!');
        setnote('');
        setSelectedCourse('');
        setSelectedSection('');
        // setSelectedCourseOffered('');
      })
      .catch(error => console.error('Error posting announcement:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Announcements</Typography>

      <Card>
        <CardContent>
          <Box border={1} borderRadius={4} padding={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                        <MenuItem key={course.Id} value={course.courseOfferedId}>
                          {course.courseName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select a course</FormHelperText>
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={4}>
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
                    <FormHelperText>Select a program</FormHelperText>
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={4}>
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
                    <FormHelperText>Select a section</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Comments</Typography>
                  <ReactQuill
                    value={note}
                    onChange={(value) => setnote(value)}
                    theme="snow"
                    modules={{ toolbar: true }}
                    placeholder="Enter comments here..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider style={{ margin: '20px 0' }} />
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Announcements;
