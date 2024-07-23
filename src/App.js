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
import Adminstudentform from './components/pages/AdminStudentform';
import Events from './components/pages/Teacher/events';
import AssignCoursetea from './components/pages/AssignCoursetea';
import Coursedetails from './components/pages/Teacher/coursedetails';
import Eventcalander from './components/pages/Teacher/eventcalander';
import Attendance from './components/pages/Teacher/attendance';
import Announcements from "./components/pages/Teacher/annocements";
import AddEvent from './components/pages/addevent';
import Layout from './layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Add an index route for the default path */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employeedetails" element={<EmployeeDetails />} />
          <Route path="studentdetails" element={<StudentDetails />} />
          <Route path="studentdetailsform" element={<StudentDetailsForm />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          <Route path="teacherdetails" element={<TeacherDetails />} />
          <Route path="adminform" element={<AdminForm />} />
          <Route path="adminstudentform" element={<Adminstudentform />} />
          <Route path="events" element={<Events />} />
          <Route path="/" element={<AddEvent />} />
          <Route path="assigncourse" element={<AssignCoursetea />} />
          <Route path="coursedetail" element={<Coursedetails/>} />
          <Route path="eventcalander" element={<Eventcalander/>} />
          <Route path="attendance" element={<Attendance/>} />
          <Route path="annocements" element={<Announcements/>} />
          
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
