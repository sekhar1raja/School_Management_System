import React, { useState, useEffect } from "react";
import "../pages/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faGift,
  faUserTie,
  faSun,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
// import Calander from "./calander";
import DoughnutChart from "./DoughnutChart";
import Eventcalander from './Teacher/eventcalander';
import { Link } from 'react-router-dom'; // Import Link

// Inside your component
<div>
    <Link to="/recipe">
        <button className="button">Recipes</button>
    </Link>
</div>


function App() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalHolidays, setTotalHolidays] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [userName, setUserName] = useState(''); // New state for user name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await fetch(
          "http://localhost:8080/user/studentCount"
        );
        const studentData = await studentResponse.json();
        setTotalStudents(studentData);

        const teacherResponse = await fetch(
          "http://localhost:8080/user/professorCount"
        );
        const teacherData = await teacherResponse.json();
        setTotalTeachers(teacherData);

        const holidayResponse = await fetch(
          "http://localhost:8080/user/holidayCount"
        );
        const holidayData = await holidayResponse.json();
        setTotalHolidays(holidayData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Set current date
    const today = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem('firstName'); // Fetch user name from local storage
    setUserName(storedUserName || 'User'); // Default to 'User' if no name is found
  }, []);

  return (
    <div className="Apps">
      <main>
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0 text-start">
                  <h3 className="font-weight-bold">Welcome {userName}</h3>
                  <h6 className="font-weight-normal mb-0">
                    All systems are running smoothly! You have{" "}
                    <span className="text-primary">3 unread alerts!</span>
                  </h6>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="justify-content-end d-flex">
                    <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                      <button
                        className="btn btn-sm btn-light bg-white dropdown-toggle rounded-pill"
                        type="button"
                        id="dropdownMenuDate2"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <i className="mdi mdi-calendar"></i>{" "}
                        <FontAwesomeIcon icon={faCalendar} className="me-2" />
                        Today ({currentDate})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card tale-bg">
                <div className="card-people mt-auto">
                  <div className="weather-info">
                    <div className="d-flex">
                      <div>
                        <h2 className="mb-0 font-weight-normal">
                          <FontAwesomeIcon icon={faSun} className="me-2" />
                          31<sup>C</sup>
                        </h2>
                      </div>
                      <div className="ms-2">
                        <h4 className="location font-weight-normal">Chicago</h4>
                        <h6 className="font-weight-normal">Illinois</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-tale">
                    <div className="card-body">
                      <p className="mb-4">
                        {" "}
                        <FontAwesomeIcon
                          icon={faGraduationCap}
                          className="me-2"
                        />
                        Add Students
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-dark-blue">
                    <div className="card-body">
                      <p className="mb-4">
                        {" "}
                        <FontAwesomeIcon icon={faUserTie} className="me-2" />
                        Add Teachers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">
                        {" "}
                        <FontAwesomeIcon icon={faGift} className="me-2" />
                        Add Event
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">
                      <Link to="/annocements">               
                        <FontAwesomeIcon icon={faCalendar} className="me-2" />
                        Add Announcements
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-flex mt-3">
            <div className="card flex-item-1 ">
                <Eventcalander />
            </div>
            <div className="card flex-item-2 ">
              <div className="card-body">
                <h4 className="card-title">Teachers, Students, and Holidays Count</h4>
                <DoughnutChart teachers={totalTeachers} employees={totalStudents} holidays={totalHolidays} />
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}

export default App;
