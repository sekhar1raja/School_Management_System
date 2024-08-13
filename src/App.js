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
import LeaveRequest from './components/pages/student/leaverequest';
import AssignAssignments from './components/pages/Teacher/assignAssignments';
import AttedanceStudent from './components/pages/student/attendancestudent';
import UpdateStudent from './components/pages/updatestudent';
import StudentCourse from './components/pages/student/studentcourses';
import AssignmentsPage from './components/pages/student/studentassignment'; 
import DoughnutChart from './components/pages/DoughnutChart';
import StudentDashboard from './components/pages/student/studentdashboard';
import LeaveApprove from './components/pages/Teacher/leaveapprove';
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
          <Route path="doughnutchart" element={<DoughnutChart />} />
          <Route path="/" element={<AddEvent />} />
          <Route path="assigncourse" element={<AssignCoursetea />} />
          <Route path="coursedetail" element={<Coursedetails/>} />
          <Route path="eventcalander" element={<Eventcalander/>} />
          <Route path="attendance" element={<Attendance/>} />
          <Route path="annocements" element={<Announcements/>} />
          <Route path="assignassignments" element={<AssignAssignments/>} />
          <Route path="leaverequest" element={<LeaveRequest/>} />
          <Route path="attedancestudent" element={<AttedanceStudent/>} />
          <Route path="updatestudent/:userId" element={<UpdateStudent/>} />
          <Route path="studentcourse" element={<StudentCourse/>} />
          <Route path="assignments" element={<AssignmentsPage />}/>
          <Route path="studentannouncements" element={<StudentDashboard/>} />
          <Route path="leaveaaprove" element={<LeaveApprove/>} />

          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
