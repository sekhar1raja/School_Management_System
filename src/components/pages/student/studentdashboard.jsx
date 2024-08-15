import React, { useState, useEffect } from 'react';
import './student.css'; // Import the CSS file

function AnnouncementsPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/individualUser?userId=${userId}`);
      const userData = await response.json();
      setUserDetails(userData);

      // Fetch announcements based on the courseId and sectionId from the user details
      fetchAnnouncements(userData.coursesOffered.courseOfferedId, userData.section.sectionId);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchAnnouncements = async (courseId, sectionId) => {
    try {
      const response = await fetch(`http://localhost:8080/util/announcementByClassAndSec?courseId=${courseId}&secId=${sectionId}`);
      const announcementsData = await response.json();
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <main role="main" className="container d-flex justify-content-center mt-100 mb-100">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Comments</h4>
              <h6 className="card-subtitle">Latest Comments section by users</h6>
            </div>
            <div className="comment-widgets m-b-20">
              {announcements.map((announcement) => (
                <div key={announcement.announcementId} className="d-flex flex-row comment-row">
                  <div className="p-2">
                    <span className="round">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" width="50" />
                    </span>
                  </div>
                  <div className="comment-text w-100">
                    <h5>{announcement.user.firstName} {announcement.user.lastName}</h5>
                    <div className="comment-footer">
                      <span className="date">{announcement.date}</span>
                      <span className={`label ${announcement.status === 'Pending' ? 'label-info' : announcement.status === 'Approved' ? 'label-success' : 'label-danger'}`}>
                        {announcement.status}
                      </span>
                      {/* <span className="action-icons">
                        <a href="#" data-abc="true"><i className="fa fa-pencil"></i></a>
                        <a href="#" data-abc="true"><i className={`fa fa-rotate-right ${announcement.status === 'Approved' ? 'text-success' : ''}`}></i></a>
                        <a href="#" data-abc="true"><i className={`fa fa-heart ${announcement.status === 'Rejected' ? 'text-danger' : ''}`}></i></a>
                      </span> */}
                    </div>
                    <p className="m-b-5 m-t-10">
                      <strong>Course: {announcement.courseoffered.courseName}</strong> <br />
                      <strong>Section: {announcement.section.section}</strong>
                    </p>
                    <h5 className="text-start">Announcement Details</h5>
                    <div className="text-start" dangerouslySetInnerHTML={{ __html: announcement.note }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AnnouncementsPage;
