import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Tabs, Tab, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'; // Ensure this file exists

const courseImageMap = {
  "Mobile Development": "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Digital Design": "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "PHP": "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "JavaScript Programming": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // Add more mappings
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

function CourseDetails() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const professorId = localStorage.getItem('userId');

    if (professorId) {
      const fetchCourseDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/util/getProfessorSubjectById?professorId=${professorId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          if (responseData && responseData.length > 0) {
            setCourses(responseData);
          } else {
            setError('No data returned from API');
          }
        } catch (err) {
          console.error('Error fetching course details:', err);
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

  const handleCardClick = (courseSubjectId, sectionId) => {
    if (courseSubjectId && sectionId) {
      navigate(`/getAssignmentBySubjectSection?subjectId=${courseSubjectId}&sectionId=${sectionId}`);
    } else {
      console.error("Missing courseSubjectId or sectionId");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Card variant="outlined" sx={{ mb: 4, boxShadow: 2 }}>
        <CardContent>
          <img
            src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Course Overview"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <Typography variant="h4" gutterBottom mt={2} sx={{ fontWeight: 'bold' }}>
            Welcome to edusys,
          </Typography>
          <Typography variant="body1" gutterBottom>
            Professor Yicha, we're excited to have you join our academic community. Let's get started with your teaching journey.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="course tabs">
          <Tab label="All Courses" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {courses.map((course) => {
            const { courseSubjects, section } = course;
            const courseOffered = courseSubjects?.courseOffered || {};
            const imageUrl = courseImageMap[courseSubjects.subjectName] || "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.courseSubjects.courseSubjectId}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    boxShadow: 3,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => handleCardClick(course.courseSubjects.courseSubjectId, section?.sectionId)}
                >
                  <img
                    src={imageUrl}
                    alt={courseSubjects.subjectName}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {courseSubjects.subjectName || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Section: {section?.section || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Semester: {courseSubjects.semester || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Course Name: {courseOffered.courseName || 'N/A'}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      Course Description: {courseOffered.courseDescrption || 'N/A'}
                    </Typography> */}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
    </div>
  );
}

export default CourseDetails;
