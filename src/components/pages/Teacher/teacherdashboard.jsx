import React, { useState, useEffect } from "react";
import { ListGroup, Image } from "react-bootstrap";
import Eventcalander from "./eventcalander";
import "../style.css"; // Include your stylesheet

function MyComponent() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName"); // Get the first name from local storage
    fetch("http://localhost:8080/util/allAnnouncement")
      .then((response) => response.json())
      .then((data) => {
        // Filter announcements based on the first name
        if (Array.isArray(data)) {
          const filteredAnnouncements = data
            .filter((announcement) => announcement.user.firstName === firstName)
            .slice(-2); // Get only the latest 2 announcements
          setAnnouncements(filteredAnnouncements);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  const handleNoteClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  return (
    <main>
      {/* Cover Image with Welcome Message */}
      <div className="cover-image" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681843661864-3f46bfb1a4fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",height:'20vh' }}>
        <div className="cover-content">
          <h1 style={{color:'white'}}>Welcome to Your Dashboard</h1>
          <p style={{color:'white'}}>Today is {currentDate}</p>
        </div>
      </div>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <div className="ag-courses-item_bg"></div>
            <div className="ag-courses-item_title">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/732f2097ee423512ed737963a30fb02d645170333ae420cd3fad7bf791fb3996?"
                className="shrink-0 aspect-square w-[57px]"
                alt="Total students icon"
              />
            </div>
            <div className="ag-courses-item_date-box">
              <span className="ag-courses-item_date">Total Students</span>
            </div>
          </div>
          <div className="ag-courses_item">
          <a href="/leaveaaprove" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>
            <div className="ag-courses-item_title">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df4172d12601b118d5492fae11bf6705e269e1e2c27893dd0076aece43cd4dba?"
                className="shrink-0 aspect-square w-[57px]"
                alt="Student progress icon"
              />
            </div>
            <div className="ag-courses-item_date-box">
              <span className="ag-courses-item_date">Leave Request</span>
            </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="/annocements" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/366badb233e84fc1f073b27648c36fcd07183e175310f11200fbf460e3aa8ddd?"
                  className="shrink-0 aspect-square w-[57px]"
                  alt="Total holidays icon"
                />
              </div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Add Announcements</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 event-calendar_teacher_dashboard">
          <Eventcalander />
        </div>
        <div className="col-lg-4 mt-5">
          <h2>Announcements</h2>
          <ListGroup>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <ListGroup.Item
                  key={announcement.announcementId}
                  onClick={() => handleNoteClick(announcement)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src="https://via.placeholder.com/50" // Static image placeholder
                      roundedCircle
                      className="me-3"
                      alt="Announcement Icon"
                    />
                    <div>
                      <strong>{announcement.title}</strong>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedAnnouncement?.announcementId ===
                            announcement.announcementId
                              ? announcement.note
                              : `${announcement.note.substring(0, 50)}...`,
                        }}
                      />
                      <small className="text-muted">
                        Section: {announcement.section.section}, Posted by:{" "}
                        {announcement.user.firstName} {announcement.user.lastName}
                      </small>
                    </div>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No announcements available</ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </div>
    </main>
  );
}

export default MyComponent;
