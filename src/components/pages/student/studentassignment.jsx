import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import moment from 'moment';

const AssignmentPage = () => {
  const location = useLocation();
  const [assignments, setAssignments] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');
  const sectionId = queryParams.get('sectionId');

  useEffect(() => {
    if (courseId && sectionId) {
      const fetchAssignments = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/getAssignmentBySubjectSection?courseId=${courseId}&sectionId=${sectionId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setAssignments(data);
        } catch (error) {
          console.error("Failed to fetch assignments:", error);
        }
      };

      fetchAssignments();
    }
  }, [courseId, sectionId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Assignments</h2>
      
      <Button color="primary" className="mb-3">
        View History
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Instruction</th>
            <th>Open Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.assignmentName}</td>
              <td>{assignment.assignmentInstruction}</td>
              <td>{assignment.isAssignmentOpen ? 'Open' : 'Closed'}</td>
              <td>{moment(assignment.deadline).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignmentPage;
