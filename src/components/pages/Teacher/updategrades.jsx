import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const UpdateGrade = () => {
  const [assignments, setAssignments] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [feedback, setFeedback] = useState({ grade: '', remarks: '' });
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const subjectId = queryParams.get('subjectId');
  const sectionId = queryParams.get('sectionId');

  useEffect(() => {
    if (subjectId && sectionId) {
      const fetchAssignments = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/getAssignmentBySubjectSection?courseId=${subjectId}&sectionId=${sectionId}`);
          
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

  const toggleModal = () => setModal(!modal);

  const openModal = (assignment) => {
    setCurrentAssignment(assignment);
    setFeedback({ grade: assignment.grades, remarks: '' });
    toggleModal();
  };

  const handleGradeChange = (e) => {
    setFeedback({
      ...feedback,
      grade: e.target.value
    });
  };

  const handleRemarksChange = (e) => {
    setFeedback({
      ...feedback,
      remarks: e.target.value
    });
  };

  const handleSave = async () => {
    if (currentAssignment) {
      try {
        const response = await fetch('http://localhost:8080/user/grade', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assignmentId: currentAssignment.assignmentId,
            grade: feedback.grade,
            remarks: feedback.remarks
          })
        });

        if (!response.ok) {
          const errorText = await response.text(); // Capture response error message
          console.error('Failed to update grade:', errorText);
          throw new Error('Network response was not ok');
        }

        // Update local state after successful update
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.assignmentId === currentAssignment.assignmentId
              ? { ...assignment, grades: feedback.grade }
              : assignment
          )
        );

        toggleModal();
      } catch (error) {
        console.error('Failed to update grade:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Grades</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment Name</th>
            <th>Grade</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{`${assignment.userId.firstName} ${assignment.userId.lastName}`}</td>
              <td>{assignment.name}</td>
              <td>{assignment.grades}</td>
              <td>
                {assignment.url ? (
                  <Button
                    color="secondary"
                    onClick={() => handleDownload(assignment.url)}
                  >
                    {assignment.name}
                  </Button>
                ) : (
                  <span>No File</span>
                )}
              </td>
              <td>
                <Button color="primary" onClick={() => openModal(assignment)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing grades */}
      <Modal isOpen={modal} toggle={toggleModal} className='mt-5'>
        <ModalHeader toggle={toggleModal}>Edit Grade and Feedback</ModalHeader>
        <ModalBody>
          {currentAssignment && (
            <Form>
              <FormGroup>
                <label htmlFor="grade">Grade</label>
                <Input
                  type="text"
                  id="grade"
                  value={feedback.grade}
                  onChange={handleGradeChange}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="remarks">Overall Feedback</label>
                <Input
                  type="textarea"
                  id="remarks"
                  value={feedback.remarks}
                  onChange={handleRemarksChange}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateGrade;
