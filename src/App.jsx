// src/App.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';

function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="glass-box">
                <Row className="text-center mb-4">
                    <Col>
                        <img src="/path-to-your-logo.png" alt="SchoolOps Logo" className="logo" />
                    </Col>
                </Row>
                <Row className="text-center mb-4">
                    <Col>
                        <h1>SchoolOps</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formRole" className="mb-3">
                                <Form.Label>Select Role</Form.Label>
                                <Form.Control as="select">
                                    <option>Teacher</option>
                                    <option>Student</option>
                                    <option>Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default App;
