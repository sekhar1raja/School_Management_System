import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function CourseAndSubject() {
  const [course, setCourse] = useState({
    courseOfferedId: 0,
    courseName: '',
    courseDuration: '',
    courseStartTime: '',
    courseEndTime: '',
    courseCredit: '',
    courseDescrption: ''
  });

  const [subject, setSubject] = useState({
    courseSubjectId: 0,
    subjectName: '',
    courseOfferedId: 0,
    semester: 0
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/util/course');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const result = await response.json();
        setCourses(result);
      } catch (error) {
        toast.error('Error fetching courses');
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/util/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }
      
      const result = await response.json();
      toast.success('Course added successfully');
      setCourse({
        courseOfferedId: 0,
        courseName: '',
        courseDuration: '',
        courseStartTime: '',
        courseEndTime: '',
        courseCredit: '',
        courseDescrption: ''
      });
    } catch (error) {
      toast.error('Error adding course');
    }
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/util/addSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subject),
      });

      if (!response.ok) {
        throw new Error('Failed to add subject');
      }
      
      const result = await response.json();
      toast.success('Subject added successfully');
      setSubject({
        courseSubjectId: 0,
        subjectName: '',
        courseOfferedId: 0,
        semester: 0
      });
    } catch (error) {
      toast.error('Error adding subject');
    }
  };

  return (
    <Container className="mt-5">
      <Row >
        <Col md={6} className="mx-auto">
          <Card className="shadow-lg rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4">Add Course</Card.Title>
              <Form onSubmit={handleCourseSubmit}>
                <Form.Group controlId="courseName" className="mb-3">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleCourseChange}
                    required
                    placeholder="Enter course name"
                  />
                </Form.Group>
                <Form.Group controlId="courseDuration" className="mb-3">
                  <Form.Label>Course Duration</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseDuration"
                    value={course.courseDuration}
                    onChange={handleCourseChange}
                    required
                    placeholder="Enter course duration"
                  />
                </Form.Group>
                <Form.Group controlId="courseStartTime" className="mb-3">
                  <Form.Label>Course Start Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="courseStartTime"
                    value={course.courseStartTime}
                    onChange={handleCourseChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="courseEndTime" className="mb-3">
                  <Form.Label>Course End Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="courseEndTime"
                    value={course.courseEndTime}
                    onChange={handleCourseChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="courseCredit" className="mb-3">
                  <Form.Label>Course Credit</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseCredit"
                    value={course.courseCredit}
                    onChange={handleCourseChange}
                    required
                    placeholder="Enter course credit"
                  />
                </Form.Group>
                <Form.Group controlId="courseDescrption" className="mb-3">
                  <Form.Label>Course Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="courseDescrption"
                    value={course.courseDescrption}
                    onChange={handleCourseChange}
                    required
                    placeholder="Enter course description"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Submit Course
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} >
          <Card className="shadow-lg rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4">Add Subject</Card.Title>
              <Form onSubmit={handleSubjectSubmit}>
                <Form.Group controlId="subjectName" className="mb-3">
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="subjectName"
                    value={subject.subjectName}
                    onChange={handleSubjectChange}
                    required
                    placeholder="Enter subject name"
                  />
                </Form.Group>
                <Form.Group controlId="semester" className="mb-3">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="number"
                    name="semester"
                    value={subject.semester}
                    onChange={handleSubjectChange}
                    required
                    placeholder="Enter semester"
                  />
                </Form.Group>
                <Form.Group controlId="courseOfferedId" className="mb-3">
                  <Form.Label>Select Course</Form.Label>
                  <Form.Control
                    as="select"
                    name="courseOfferedId"
                    value={subject.courseOfferedId}
                    onChange={handleSubjectChange}
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.courseOfferedId} value={course.courseOfferedId}>
                        {course.courseName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Submit Subject
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
      
      </Row>

      <ToastContainer />
    </Container>
  );
}
