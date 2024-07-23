import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

// Example functional component to render tab content
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

const Coursedetails = () => {
  const [value, setValue] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [pastCourses, setPastCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const teacherId = JSON.parse(localStorage.getItem('user'))?.teacherId;

      if (teacherId) {
        try {
          const response = await axios.get('http://localhost:8080/util/course', {
            params: { teacherId } 
          });

          // Assuming the response contains separate arrays for current and past courses
          setCurrentCourses(response.data.currentCourses || []);
          setPastCourses(response.data.pastCourses || []);
        } catch (error) {
          console.error('Error fetching course details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <img
            src="https://images.unsplash.com/photo-1550660473-aed955e2e2a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Assign Course"
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
          <Tab label="Current Courses" />
          <Tab label="Past Courses" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {currentCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{course.courseName}</Typography>
                    <Typography variant="body2">Section: {course.sectionName}</Typography>
                    <Typography variant="body2">Course ID: {course.courseId}</Typography>
                    <Typography variant="body2">Section ID: {course.sectionId}</Typography>
                    <Typography variant="body2">Offered ID: {course.courseOfferedId}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {pastCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{course.courseName}</Typography>
                    <Typography variant="body2">Section: {course.sectionName}</Typography>
                    <Typography variant="body2">Course ID: {course.courseId}</Typography>
                    <Typography variant="body2">Section ID: {course.sectionId}</Typography>
                    <Typography variant="body2">Offered ID: {course.courseOfferedId}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </div>
  );
};

export default Coursedetails;
