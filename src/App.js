import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/loginpage';
import Registration from './components/registration';
import Dashboard from './components/pages/home';
import EmployeeDetails from './components/pages/employeedetails';
import StudentDetails from './components/pages/studentdetails_table';
import TeacherDashboard from './components/pages/Teacher/teacherdashboard';
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
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
