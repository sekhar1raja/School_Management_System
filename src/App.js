import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/loginpage';
import Registration from './components/registration';
import Dashboard from './components/pages/home';
import EmployeeDetails from './components/pages/employeedetails';
import StudentDetails from './components/pages/studentdetails_table';
import TeacherDashboard from './components/pages/Teacher/teacherdashboard';
import TeacherDetails from './components/pages/Teacher/teacherdetails';
import StudentDetailsForm from './components/pages/student/studentdetails'; 
import AdminForm from './components/pages/Adminform';
import Adminstudentform from './components/pages/AdminStudentform'
import Events from './components/pages/Teacher/events';

import Layout from './layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employeedetails" element={<EmployeeDetails />} />
          <Route path="studentdetails" element={<StudentDetails />} />
          <Route path="studentdetailsform" element={<StudentDetailsForm />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          <Route path="teacherDetails" element={<TeacherDetails />} />
          <Route path="adminform" element={<AdminForm />} />
          <Route path="adminstudentform" element={<Adminstudentform />} />
          <Route path="events" element={<Events />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
