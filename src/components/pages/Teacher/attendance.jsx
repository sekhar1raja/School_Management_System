import { Description } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';

const AttendancePage = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 16)); // Include time in YYYY-MM-DDTHH:MM format
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
    // Initialize attendanceData based on students
    const initialAttendanceData = students.map(student => ({
      student_id: student.userid,
      is_present: 2 // Default to absent
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
    <Container>
      <h1 className="my-4">Attendance Page</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="courseSelect">
            <Form.Label>Course</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.courseOfferedId} value={course.courseOfferedId}>{course.courseName}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="courseSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
              <option value="">Select Subject</option>
              {courseSubjects.map(subject => (
                <option key={subject.courseSubjectId} value={subject.courseSubjectId}>{subject.subjectName}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="sectionSelect">
            <Form.Label>Section</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedSection(e.target.value)} value={selectedSection}>
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section.sectionId} value={section.sectionId}>{section.section}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="attendanceDate">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={attendanceDate} 
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mb-4">
        <h2>Students</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.userid}>
                <td>{`${student.firstName} ${student.lastName}`}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={attendanceData.find(att => att.student_id === student.userid)?.is_present === 1}
                    onChange={(e) => {
                      const isPresent = e.target.checked ? 1 : 2; // 1 for present, 2 for absent
                      setAttendanceData(prev =>
                        prev.map(att => att.student_id === student.userid ? { ...att, is_present: isPresent } : att)
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="primary" onClick={handleAttendanceSubmit}>Submit Attendance</Button>
    </Container>
  );
};

export default AttendancePage;
