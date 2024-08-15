import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const AttendancePage = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 16));
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseSubjects(selectedCourse);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse && selectedSection) {
      fetchStudents();
    }
  }, [selectedCourse, selectedSection]);

  useEffect(() => {
    const initialAttendanceData = students.map(student => ({
      student_id: student.userid,
      is_present: 2
    }));
    setAttendanceData(initialAttendanceData);
  }, [students]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/util/course');
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await fetch('http://localhost:8080/util/section');
      const data = await response.json();
      setSections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const fetchCourseSubjects = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${courseId}`);
      const data = await response.json();
      setCourseSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching course subjects:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/user?roleId=3');
      const data = await response.json();
  
      const courseId = parseInt(selectedCourse, 10);
      const sectionId = parseInt(selectedSection, 10);
  
      const filteredStudents = data.filter(user =>
        user.coursesOffered.courseOfferedId === courseId &&
        user.section.sectionId === sectionId
      );
  
      setStudents(Array.isArray(filteredStudents) ? filteredStudents : []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAttendanceSubmit = async () => {
    const professorId = localStorage.getItem('userId');
    
    const attendanceRecords = students.map(student => ({
      description: 'attendance',
      student_id: {
        userid: student.userid,
      },
      courseoffered: {
        courseOfferedId: parseInt(selectedCourse),
      },
      section: {
        sectionId: parseInt(selectedSection),
      },
      professor_id: {
        userid: professorId,
      },
      courseSubjects: {
        courseSubjectId: parseInt(selectedSubject),
      },
      semester: 1,
      present: attendanceData.find(att => att.student_id === student.userid)?.is_present || 2,
      attendDate: attendanceDate,
    }));
  
    try {
      for (const record of attendanceRecords) {
        const response = await fetch('http://localhost:8080/util/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (!response.ok) {
          throw new Error('Failed to submit attendance');
        }
      }
      alert('Attendance submitted successfully');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Failed to submit attendance');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Attendance Page
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Filters</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="course-label">Course</InputLabel>
                <Select
                  labelId="course-label"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
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
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select Subject</em>
                  </MenuItem>
                  {courseSubjects.map(subject => (
                    <MenuItem key={subject.courseSubjectId} value={subject.courseSubjectId}>
                      {subject.subjectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
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
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                type="datetime-local"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" style={{color:'blue'}}>Students List</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Present</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.userid}>
                        <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={attendanceData.find(att => att.student_id === student.userid)?.is_present === 1}
                                onChange={(e) => {
                                  const isPresent = e.target.checked ? 1 : 2;
                                  setAttendanceData(prev =>
                                    prev.map(att => att.student_id === student.userid ? { ...att, is_present: isPresent } : att)
                                  );
                                }}
                              />
                            }
                            label="Present"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions className='text-start col-lg-3'>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAttendanceSubmit}
              >
                Submit Attendance
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendancePage;
