import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './student.css'; // Import custom CSS for styling

const courseImageMap = {
  "Responsive Site Design": "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Digital Design": "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Database Design": "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "JavaScript Programming": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [sectionId, setSectionId] = useState(null);
  const userName = localStorage.getItem('firstName') || 'User';
  const navigate = useNavigate();

  useEffect(() => {
    const courseOfferedId = localStorage.getItem('CourseId');
    const semesterID = localStorage.getItem('semester');
    const userId = localStorage.getItem('userId');

    if (courseOfferedId && userId) {
      const fetchDetails = async () => {
        try {
          const courseResponse = await fetch(`http://localhost:8080/util/subjectByCourseIdSemId?courseId=${courseOfferedId}&semId=${semesterID}`);
          const userResponse = await fetch(`http://localhost:8080/user/individualUser?userId=${userId}`);
          
          if (!courseResponse.ok || !userResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const courseData = await courseResponse.json();
          const userData = await userResponse.json();
          
          setCourseDetails(courseData);
          setSectionId(userData.section.sectionId);
        } catch (error) {
          console.error("Failed to fetch details:", error);
        }
      };

      fetchDetails();
    }
  }, []);

  const handleCardClick = (courseSubjectId) => {
    if (courseSubjectId && sectionId) {
      navigate(`/getAssignmentMasterBySubjectSection?subjectId=${courseSubjectId}&sectionId=${sectionId}`);
    } else {
      console.error("Missing courseSubjectId or sectionId");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <h2>Welcome, {userName}!</h2>
          <p>Here's the course details you requested.</p>
        </div>
      </div>
      
      <div className="row">
        {courseDetails.map((detail, index) => (
          <div
            key={index}
            className="col-md-4 mb-4"
            onClick={() => handleCardClick(detail.courseSubjectId)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card course-card">
              <img
                src={courseImageMap[detail.subjectName] || "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                className="card-img-top"
                alt={detail.subjectName}
              />
              <div className="card-body">
                <h5 className="card-title">{detail.subjectName}</h5>
                <p className="card-text">
                  <strong>Course Name:</strong> {detail.courseOffered.courseName}<br />
                  <strong>Course Credit:</strong> {detail.courseOffered.courseCredit}<br />
                  <strong>Description:</strong> {detail.courseOffered.courseDescrption}<br />
                  <strong>Semester:</strong> {detail.semester}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;
