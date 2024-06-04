import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/loginpage';
import Dashboard from './components/pages/home.jsx';
import EmployeeDetails from './components/pages/employeedetails.jsx';
import StudentDetails from './components/pages/studentdetails_table.jsx';
import TeacherDashboard from './components/pages/Teacher/teacherdashboard.jsx';
import Layout from './layout.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employeedetails" element={<EmployeeDetails />} />
          <Route path="studentdetails" element={<StudentDetails />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
