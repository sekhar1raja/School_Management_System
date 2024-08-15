import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import moment from 'moment';

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId || '';

  useEffect(() => {
    if (userId) {
      const fetchAssignments = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/getAssignmentByStudentId/${userId}`);
          
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
  }, [userId]);

  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Grades</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Instruction</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.name}</td>
              <td>{assignment.assigInstruction}</td>
              <td>{assignment.grades}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignmentPage;
