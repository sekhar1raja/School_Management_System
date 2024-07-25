import React, { useState, useEffect } from 'react';

function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState([]);
  const userName = localStorage.getItem('firstName') || 'User'; // Assuming userName is stored in local storage
  
  useEffect(() => {
    const courseOfferedId = localStorage.getItem('CourseId');

    if (courseOfferedId) {
      const fetchCourseDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/util/subjectByCourseId?courseId=${courseOfferedId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCourseDetails(data);
        } catch (error) {
          console.error("Failed to fetch course details:", error);
        }
      };

      fetchCourseDetails();
    }
  }, []);

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
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/" className="card-img-top" alt={detail.subjectName} />
              <div className="card-body">

                <p className="card-text">
                <h5 className="card-title">{detail.subjectName}</h5>
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
