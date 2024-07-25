import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'; // Make sure to create this CSS file

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function CourseDetails() {
  const [value, setValue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const professorId = localStorage.getItem('userId');
    console.log('Professor ID:', professorId); // Check if professorId is valid

    if (professorId) {
      const fetchCourseDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/util/getProfessorSubjectById?professorId=${professorId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          console.log('API Response:', responseData); // Verify API response

          if (responseData && responseData.length > 0) {
            setCourses(responseData); // Set all courses
          } else {
            setError('No data returned from API');
          }
        } catch (err) {
          console.error('Error fetching course details:', err); // Log detailed error
          setError('An error occurred while fetching course details');
        } finally {
          setLoading(false);
        }
      };

      fetchCourseDetails();
    } else {
      setError('Professor ID not found in local storage');
      setLoading(false);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Card>
        <CardContent>
          <img
            src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Assign Course"
            className="img-fluid"
            style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '20px' }}
          />
          <Typography variant="h3" gutterBottom>
            Welcome to edusys,
          </Typography>
          <Typography variant="body1" gutterBottom>
            Professor Yicha, we're excited to have you join our academic community. Let's get started with your
            teaching journey.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Courses" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <div className="container">
          <div className="row">
            {courses.map((course) => {
              const { courseSubjects, section } = course;
              const courseOffered = courseSubjects?.courseOffered || {};
              const imageUrl = 'https://conestoga.desire2learn.com/d2l/api/lp/1.9/courses/1125430/image?height=230&width=540&t=2024-07-25T06:24:30.784Z'; // Replace with actual image URL

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={course.courseSubjects.courseSubjectId}>
                  <div className="card course-card float-left">
                    <div className="row">
                      <div className="col-sm-7">
                        <div className="card-block">
                          
                          <Typography variant="body2">{courseSubjects.subjectName || 'N/A'}</Typography>
                          <Typography variant="body2">Section: {section?.section || 'N/A'}</Typography>
                          <Typography variant="body2">Semester: {courseSubjects.semester || 'N/A'}</Typography>
                          <Typography variant="body2">Subject Name: {courseSubjects.subjectName || 'N/A'}</Typography>
                         
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <img className="d-block w-100 course-image" src={imageUrl} alt={courseOffered.courseName} />
                      </div>
                      <div>
                      <Typography variant="body2">Course Description: {courseOffered.courseDescrption || 'N/A'}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TabPanel>
    </div>
  );
}

export default CourseDetails;
