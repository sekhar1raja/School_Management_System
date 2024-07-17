import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
        Current Courses
      </TabPanel>
      <TabPanel value={value} index={1}>
        Past Courses
      </TabPanel>

    </div>
  );
};

export default Coursedetails;
