import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './student.css'; // Import custom CSS for styling

const AssignmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  const courseOfferedId = localStorage.getItem('CourseId');
  const storedUserId = localStorage.getItem('userId');

  const queryParams = new URLSearchParams(location.search);
  const sectionId = queryParams.get('sectionId');
  const subjectId = queryParams.get('subjectId');

  const userId = storedUserId || '';

  useEffect(() => {
    if (subjectId && sectionId) {
      const fetchAssignments = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/user/getAssignmentMasterBySubjectSection?subjectId=${subjectId}&sectionId=${sectionId}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAssignments(data);
        } catch (error) {
          console.error('Failed to fetch assignments:', error);
        }
      };

      fetchAssignments();
    }
  }, [subjectId, sectionId]);

  const handleDownload = (url) => {
    try {
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'assignment_file'); // Optional: Provide a default file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error('Download URL is missing');
      }
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const handleAssignmentClick = (assignmentId) => {
    navigate(
      `/submitassignment?courseId=${courseOfferedId}&sectionId=${sectionId}&subjectId=${subjectId}&userId=${userId}&assignmentId=${assignmentId}`
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Assignments</h2>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/gradelist">
          <Button color="primary">View Grades</Button>
        </Link>
      </div>

      <Table bordered hover responsive className="assignment-table">
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Deadline</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td
                className="assignment-name"
                onClick={() => handleAssignmentClick(assignment.id)}
              >
                {assignment.name}
              </td>
              <td>{moment(assignment.deadline).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>
                {assignment.url ? (
                  <Button
                    color="secondary"
                    onClick={() => handleDownload(assignment.url)}
                  >
                    Download
                  </Button>
                ) : (
                  <span>No File</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignmentPage;
