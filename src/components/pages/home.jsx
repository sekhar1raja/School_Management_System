import React, { useState, useEffect } from 'react';
import '../pages/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faGift, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Calander from "./calander";

function Grid({ totalStudents, totalTeachers, totalHolidays }) {
  return (
    <div className="container">
      <div className="row">
        <Card title={totalStudents} description="Total Students" icon={ faGraduationCap} cardClass="icon-1" />
        <Card title={totalTeachers} description="Total Teachers" icon={faUserTie} cardClass="icon-2" />
        <Card title={totalHolidays} description="Total Holidays" icon={faGift} cardClass="icon-3" />
      </div>
    </div>
  );
}

function Card({ title, description, icon, cardClass }) {
  return (
    <div className={`col-md-4 mb-4 ${cardClass}`}>
      <div className="card">
        <div className="card-body">
          <FontAwesomeIcon icon={icon} size="2x" className="mb-3 icon-wrapper" />
          <div className="carddata">
            <p className="card-text">{description}</p>
            <h3 className="card-title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalHolidays, setTotalHolidays] = useState(0);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const studentResponse = await fetch('http://localhost:8080/user/studentCount');
        const studentData = await studentResponse.json();
        setTotalStudents(studentData);

        const teacherResponse = await fetch('http://localhost:8080/user/professorCount');
        const teacherData = await teacherResponse.json();
        setTotalTeachers(teacherData);

        const holidayResponse = await fetch('http://localhost:8080/user/professorCount');
        const holidayData = await holidayResponse.json();
        setTotalHolidays(holidayData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Apps">
      <header className="App-header b">
        <h1>Dashboard</h1>
      </header>
      <main>
        <Grid totalStudents={totalStudents} totalTeachers={totalTeachers} totalHolidays={totalHolidays} />
        <Calander />
    
      </main>
    </div>
  );
}

export default App;
