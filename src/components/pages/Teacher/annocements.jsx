import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  FormHelperText,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import ReactQuill from 'react-quill'; // Import react-quill for rich text editor
import 'react-quill/dist/quill.snow.css'; // Import quill's styles
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const Announcements = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [note, setNote] = useState('');

  // Fetch courses and sections on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/util/course')
      .then(response => {
        console.log('Fetched Courses:', response.data); // Debug log
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));

    axios.get('http://localhost:8080/util/section')
      .then(response => {
        console.log('Fetched Sections:', response.data); // Debug log
        setSections(response.data);
      })
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

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
        toast.success('Announcement added successfully!');
        setNote('');
        setSelectedCourse('');
        setSelectedSection('');
      })
      .catch(error => {
        console.error('Error posting announcement:', error);
        toast.error('Error posting announcement. Please try again.');
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Announcements
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box border={1} borderRadius={2} padding={3} sx={{ boxShadow: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
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
                        <MenuItem key={course.courseOfferedId} value={course.courseOfferedId}>
                          {course.courseName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select a course</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
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
                        <MenuItem key={section.sectionId} value={section.sectionId}>
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
                    onChange={(value) => setNote(value)}
                    theme="snow"
                    modules={{ toolbar: true }}
                    placeholder="Enter comments here..."
                    style={{ height: '200px' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
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

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default Announcements;
