import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const PLCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    faculty: 'Faculty of Information Communication Technology',
    program: '',
    total_registered_students: 0,
    semester: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/courses/${currentCourse.id}`, formData);
        alert('Course updated successfully');
      } else {
        await axios.post('/courses', formData);
        alert('Course created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/courses/${id}`);
        alert('Course deleted successfully');
        fetchCourses();
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setFormData({
      course_code: course.course_code,
      course_name: course.course_name,
      faculty: course.faculty,
      program: course.program || '',
      total_registered_students: course.total_registered_students,
      semester: course.semester
    });
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      course_code: '',
      course_name: '',
      faculty: 'Faculty of Information Communication Technology',
      program: '',
      total_registered_students: 0,
      semester: 1
    });
    setEditMode(false);
    setCurrentCourse(null);
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
          <h2>Manage Courses</h2>
          <Button variant="primary" onClick={() => { resetForm(); setShowModal(true); }}>
            <FaPlus className="me-2" />
            Add Course
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Course Name</th>
                    <th>Faculty</th>
                    <th>Program</th>
                    <th>Students</th>
                    <th>Semester</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td><strong>{course.course_code}</strong></td>
                      <td>{course.course_name}</td>
                      <td>{course.faculty}</td>
                      <td>{course.program}</td>
                      <td>{course.total_registered_students}</td>
                      <td>Semester {course.semester}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(course)}>
                          <FaEdit />
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(course.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Course' : 'Add New Course'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.course_code}
                  onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                  required
                  disabled={editMode}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Faculty</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Program</Form.Label>
                <Form.Select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                >
                  <option value="">Select Program</option>
                  <option value="Diploma in Information Technology">Diploma in Information Technology</option>
                  <option value="Diploma in Business Information Technology">Diploma in Business Information Technology</option>
                  <option value="Bsc Degree in Business Information Technology">Bsc Degree in Business Information Technology</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Total Registered Students</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.total_registered_students}
                  onChange={(e) => setFormData({ ...formData, total_registered_students: parseInt(e.target.value) })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                  required
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="primary" type="submit">{editMode ? 'Update' : 'Create'}</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default PLCourses;