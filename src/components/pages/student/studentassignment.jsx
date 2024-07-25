import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button } from 'reactstrap';

const AssignmentPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Select Subject');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const subjects = ['Web Development', '.NET', 'Responsive Site Designing', 'Mobile'];

  const assignments = [
    {
      title: 'Assignment 1: My Career Profile and Labour Market Research (Worth 25% of Final Grade)',
      status: '1 Submission, 1 File',
      score: '56.75 / 100 - 56.75%',
      feedback: 'Read'
    },
    {
      title: 'Assignment 2: My Resume and Cover Letter - Part One (Worth 25% of Final Grade and is comprised of two parts)',
      status: '2 Submissions, 2 Files',
      score: '43 / 60 - 71.67%',
      feedback: 'Read'
    }
  ];

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {selectedSubject}
          </DropdownToggle>
          <DropdownMenu>
            {subjects.map((subject, index) => (
              <DropdownItem key={index} onClick={() => setSelectedSubject(subject)}>
                {subject}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <h2 className="mb-3">Assignment</h2>
      
      <Button color="primary" className="mb-3">
        View History
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Completion Status</th>
            <th>Score</th>
            <th>Evaluation Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.title}</td>
              <td>{assignment.status}</td>
              <td>{assignment.score}</td>
              <td>{assignment.feedback}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignmentPage;
