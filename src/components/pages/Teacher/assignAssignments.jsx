import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, FormHelperText, Card, CardContent, TextField, Grid, IconButton, Divider, LinearProgress, Switch, FormControlLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./teastyle.css";

const AssignAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseOffered, setCourseOffered] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCourseOffered, setSelectedCourseOffered] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentInstruction, setAssignmentInstruction] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const professorId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('courseId', selectedCourse);
    formData.append('sectionId', selectedSection);
    formData.append('subjectId', selectedCourseOffered);
    formData.append('assignmentName', assignmentName);
    formData.append('description', assignmentDescription);
    formData.append('assignmentInstruction', assignmentInstruction);
    formData.append('comments', comments);
    formData.append('professorId', professorId);
    
    if (deadline) {
      const formattedDeadline = deadline.toISOString(); // Format the date as 'YYYY-MM-DD'
      formData.append('deadline', formattedDeadline);
    }
    
    formData.append('isAssignmentOpen', isAssignmentOpen ? 1 : 0);
    
    if (file) {
      formData.append('file', file); 
    }
    
    setUploading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/user/publishAssignment', formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      
      alert('Assignment assigned successfully!');
    } catch (error) {
      console.error('There was an error assigning the assignment!', error);
    } finally {
      setUploading(false);
      setSelectedCourse('');
      setSelectedSection('');
      setSelectedCourseOffered('');
      setAssignmentDescription('');
      setAssignmentInstruction('');
      setComments('');
      setDeadline(null);
      setFile(null);
      setUploadProgress(0);
    }
  };
  
  
  

  useEffect(() => {
    fetch('http://localhost:8080/util/course')
      .then(response => response.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://localhost:8080/util/section')
      .then(response => response.json())
      .then(data => {
        setSections(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const courseId = selectedCourse;
      fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${courseId}`)
        .then(response => response.json())
        .then(data => {
          setCourseOffered(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error('Error fetching course offered:', error));
    }
  }, [selectedCourse]);
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
          <Box border={1} borderRadius={4} padding={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Assignment Title"
                    fullWidth
                    margin="normal"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Instructions"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={assignmentInstruction}
                    onChange={(e) => setAssignmentInstruction(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          dateFormat="MMMM d, yyyy time"
          placeholderText="Select a date"
          customInput={
            <TextField
              label="Deadline"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              variant="outlined"
              size="small"
            />
          }
          popperPlacement="bottom-end"
        />
      </Grid>
                <Grid item xs={12}>
                  <div>
                    <input
                      id="file"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file">
                      <IconButton color="primary" component="span">
                        <CloudUploadIcon /> Upload File
                      </IconButton>
                    </label>
                    {file && (
                      <Typography variant="body2" color="textSecondary">
                          <li>Type:  {file.name}</li>
                        <li>Type: {file.type}</li>
                      </Typography>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Comments</Typography>
                  <ReactQuill
                    value={comments}
                    onChange={(value) => setComments(value)}
                    theme="snow"
                    modules={{ toolbar: true }}
                    placeholder="Enter comments here..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider style={{ margin: '20px 0' }} />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAssignmentOpen}
                        onChange={(e) => setIsAssignmentOpen(e.target.checked)}
                        name="isAssignmentOpen"
                        color="primary"
                      />
                    }
                    label="Is Assignment Open"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    {uploading && (
                      <Box width="100%" mr={2}>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                      </Box>
                    )}
                    <Button variant="contained" color="primary" type="submit" disabled={uploading}>
                      {uploading ? 'Uploading...' : 'Upload Assignment'}
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

export default AssignAssignment;
