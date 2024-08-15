import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col, Row, Container, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const SubmitAssignmentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseOfferedId = queryParams.get('courseId');
  const sectionId = queryParams.get('sectionId');
  const subjectId = queryParams.get('subjectId');
  const userId = queryParams.get('userId');

  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user/getAssignmentMasterBySubjectSection?subjectId=${subjectId}&sectionId=${sectionId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch assignment details');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.length > 0) {
          setAssignmentDetails(data[0]);
        }
      } catch (error) {
        console.error('Error fetching assignment details:', error);
        toast.error('Failed to fetch assignment details');
      }
    };

    fetchAssignmentDetails();
  }, [courseOfferedId, sectionId, subjectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', file);
    formData.append('courseId', courseOfferedId);
    formData.append('sectionId', sectionId);
    formData.append('subjectId', subjectId);
    formData.append('userId', userId);

    try {
      const response = await fetch('http://localhost:8080/user/submitAssignment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Assignment submitted successfully!');
      } else {
        toast.error('Failed to submit assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('An error occurred while submitting the assignment');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center text-start">
        <Col md={12}>
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h2" className="mb-3">Assignment Details</CardTitle>
              <CardSubtitle tag="h5" className="mb-3">Title:</CardSubtitle>
              <p>{assignmentDetails.name || 'Assignment Name'}</p>
              <CardSubtitle tag="h5" className="mb-3">Instructions:</CardSubtitle>
              <p>{assignmentDetails.assigInstruction || 'Assignment Instructions'}</p>
              <CardSubtitle tag="h5" className="mb-3">
                {assignmentDetails.fileCount ? `Files to submit: ${assignmentDetails.fileCount}` : 'No Files to Submit'}
              </CardSubtitle>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle tag="h2" className="mb-3">Submit Assignment</CardTitle>
              <Form onSubmit={handleSubmit}>
                <h4 className="text-center mt-4 mb-3">
                  After uploading, you must click Submit to complete the submission.
                </h4>

                <FormGroup>
                  <Label for="file">Upload File</Label>
                  <Input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Comment</Label>
                  <Input
                    type="textarea"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter a brief description of your assignment"
                  />
                </FormGroup>

                <Row className="mt-4">
                  <Col className="d-flex justify-content-between">
                    <Button color="primary" type="submit">Submit Assignment</Button>
                    <Button color="secondary" type="button" onClick={() => window.history.back()}>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default SubmitAssignmentPage;
