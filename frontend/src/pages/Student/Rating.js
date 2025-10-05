import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const StudentRating = () => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ratingType, setRatingType] = useState('');
  const [formData, setFormData] = useState({
    rated_user_id: '',
    course_id: '',
    rating: 0,
    comment: '',
    rating_type: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, lecturersRes] = await Promise.all([
        axios.get('/courses'),
        axios.get('/courses/lecturers/all')
      ]);
      setCourses(coursesRes.data.courses);
      setLecturers(lecturersRes.data.lecturers);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type) => {
    setRatingType(type);
    setFormData({
      ...formData,
      rating_type: type,
      rated_user_id: '',
      course_id: '',
      rating: 0,
      comment: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await axios.post('/ratings', formData);
      setSuccess('Rating submitted successfully!');
      setShowModal(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (currentRating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        size={30}
        className="cursor-pointer"
        color={i < currentRating ? '#ffc107' : '#e4e5e9'}
        onClick={() => setFormData({ ...formData, rating: i + 1 })}
      />
    ));
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
        <h2 className="mb-4">Rate Lecturers & Courses</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <div className="row">
          <div className="col-md-6 mb-4">
            <Card className="h-100 card-hover">
              <Card.Body className="text-center">
                <FaStar size={60} className="text-warning mb-3" />
                <h4>Rate a Lecturer</h4>
                <p className="text-muted">Share your feedback about your lecturers</p>
                <Button variant="primary" onClick={() => handleOpenModal('lecturer')}>
                  Rate Lecturer
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6 mb-4">
            <Card className="h-100 card-hover">
              <Card.Body className="text-center">
                <FaStar size={60} className="text-info mb-3" />
                <h4>Rate a Course</h4>
                <p className="text-muted">Share your feedback about your courses</p>
                <Button variant="info" onClick={() => handleOpenModal('course')}>
                  Rate Course
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Rate {ratingType === 'lecturer' ? 'Lecturer' : 'Course'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {ratingType === 'lecturer' ? (
                <Form.Group className="mb-3">
                  <Form.Label>Select Lecturer</Form.Label>
                  <Form.Select
                    value={formData.rated_user_id}
                    onChange={(e) => setFormData({ ...formData, rated_user_id: e.target.value })}
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
              ) : (
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
              )}

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <div className="d-flex gap-2 justify-content-center">
                  {renderStars(formData.rating)}
                </div>
                <Form.Text className="text-muted d-block text-center mt-2">
                  {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Click to rate'}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comment (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your thoughts..."
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting || formData.rating === 0}>
                  {submitting ? 'Submitting...' : 'Submit Rating'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default StudentRating;