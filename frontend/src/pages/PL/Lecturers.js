import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const PLLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    course_id: '',
    lecturer_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lecturersRes, coursesRes] = await Promise.all([
        axios.get('/courses/lecturers/all'),
        axios.get('/courses')
      ]);
      setLecturers(lecturersRes.data.lecturers);
      setCourses(coursesRes.data.courses);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/courses/assign-lecturer', formData);
      alert('Lecturer assigned successfully');
      setShowModal(false);
      setFormData({ course_id: '', lecturer_id: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign lecturer');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="mt-5 text-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Manage Lecturers</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Assign Lecturer to Course
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Header>
            <h5 className="mb-0">All Lecturers</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map((lecturer) => (
                    <tr key={lecturer.id}>
                      <td><strong>{lecturer.full_name}</strong></td>
                      <td>{lecturer.email}</td>
                      <td>{lecturer.contact_number}</td>
                      <td>{lecturer.faculty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Lecturer to Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAssign}>
              <Form.Group className="mb-3">
                <Form.Label>Select Course</Form.Label>
                <Form.Select
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                  required
                >
                  <option value="">Choose...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.course_code} - {course.course_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Lecturer</Form.Label>
                <Form.Select
                  value={formData.lecturer_id}
                  onChange={(e) => setFormData({ ...formData, lecturer_id: e.target.value })}
                  required
                >
                  <option value="">Choose...</option>
                  {lecturers.map(lecturer => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Assign</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default PLLecturers;