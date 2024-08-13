import React, { useState, useEffect } from 'react';

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
    <main role="main" className="container bootdey.com">
      {userDetails && (
        <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-blue rounded box-shadow">
          <img
            className="mr-3"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
            width="48"
            height="48"
          />
          <div className="lh-100">
            <h6 className="mb-0 text-black lh-100">
              {userDetails.firstName} {userDetails.lastName}
            </h6>
            <small>Announcements</small>
          </div>
        </div>
      )}

      <div className="my-3 p-3 bg-white rounded box-shadow text-start">
        <h6 className="border-bottom border-gray pb-2 mb-0">Recent Updates</h6>
        {announcements.map((announcement) => (
          <div key={announcement.announcementId} className="media text-muted pt-3">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt=""
              className="mr-2 rounded"
              width="32"
              height="32"
            />
            <div className='d-flex flex-column text-start'>
                <div>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong className="d-block text-gray-dark">
                      {announcement.user.firstName} {announcement.user.lastName}
                    </strong>
                    </p>
                </div>
                <div>
                  <p>
                      <strong>Course:{announcement.courseoffered.courseName}</strong> <br/>
                      <strong>Section:{announcement.section.section}</strong> 
                  </p>
                </div>
            </div>
            <h5 className='text-start'>Announcement deatils</h5>
            <div dangerouslySetInnerHTML={{ __html: announcement.note }} />
          </div>
        ))}
        
      </div>
    </main>
  );
}

export default AnnouncementsPage;
