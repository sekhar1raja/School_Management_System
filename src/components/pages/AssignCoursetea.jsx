import React, { useState, useEffect } from "react";
import "../pages/responsive.css";
import "react-toastify/dist/ReactToastify.css";
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
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "../pages/Teacher/teastyle.css"; 
import { ToastContainer, toast } from "react-toastify";


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 800,
  },
}));

const AssignCoursetea = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courseOffered, setCourseOffered] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedCourseOffered, setSelectedCourseOffered] = useState("");

  useEffect(() => {
    const roleId = 2;

    fetch(`http://localhost:8080/user/user?roleId=${roleId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Teachers:", data);
        setTeachers(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch((error) => console.error("Error fetching teachers:", error));

    fetch("http://localhost:8080/util/course")
      .then((response) => response.json())
      .then((data) => {
        console.log("Courses:", data);
        setCourses(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch((error) => console.error("Error fetching courses:", error));

    fetch("http://localhost:8080/util/section")
      .then((response) => response.json())
      .then((data) => {
        console.log("Sections:", data);
        setSections(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch((error) => console.error("Error fetching sections:", error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const courseId = selectedCourse; // Ensure selectedCourse is an integer
      fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Course Offered:", data);
          setCourseOffered(Array.isArray(data) ? data : []); // Ensure data is an array
        })
        .catch((error) => console.error("Error fetching course offered:", error));
    }
  }, [selectedCourse]);

  const handleAssign = async () => {
    const assignment = {
      user: {
        userid: selectedTeacher
      },
      section: {
        sectionId: selectedSection
      },
      coursesOffered: {
        courseOfferedId: selectedCourse
      },
      courseSubjects: {
        courseSubjectId: selectedCourseOffered
      }
    };

    try {
      const response = await fetch('http://localhost:8080/util/assignProfessorSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json(); // Parse JSON response
      console.log('Assignment successful:', data);
      toast.success('Course assigned successfully!');
      // Optionally reset state
      setSelectedTeacher('');
      setSelectedCourse('');
      setSelectedSection('');
      setSelectedCourseOffered('');
    } catch (error) {
      console.error('Error assigning course:', error);
      toast.error('Failed to assign course. Please try again.');
    }
  };

  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Assign Course"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <StyledCard>
        <ToastContainer />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Assign Course to Professor
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="teacher-label">Select Teacher</InputLabel>
            <Select
              labelId="teacher-label"
              value={selectedTeacher || ""}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Teacher</em>
              </MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.userid}>
                  {teacher.firstName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a teacher for assignment</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Select Course</InputLabel>
            <Select
              labelId="course-label"
              value={selectedCourse || ""}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Course</em>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.courseOfferedId} value={course.courseOfferedId}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a course to assign</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="program-label">Select Subject</InputLabel>
            <Select
              labelId="program-label"
              value={selectedCourseOffered || ""}
              onChange={(e) => setSelectedCourseOffered(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Subject</em>
              </MenuItem>
              {courseOffered.map((courseSubject) => (
                <MenuItem
                  key={courseSubject.courseSubjectId}
                  value={courseSubject.courseSubjectId}
                >
                  {courseSubject.subjectName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a subject to assign</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="section-label">Select Section</InputLabel>
            <Select
              labelId="section-label"
              value={selectedSection || ""}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Section</em>
              </MenuItem>
              {sections.map((section) => (
                <MenuItem key={section.id} value={section.sectionId}>
                  {section.section}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a section for the course</FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions>
          <Box mt={2} mx="auto">
            <Button variant="contained" color="primary" onClick={handleAssign}>
              Assign Course
            </Button>
          </Box>
        </CardActions>
      </StyledCard>
    </Container>
  );
};

export default AssignCoursetea;
