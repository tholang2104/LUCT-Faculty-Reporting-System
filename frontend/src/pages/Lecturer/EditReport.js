import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const EditReport = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: '',
    faculty_name: '',
    class_name: '',
    week_of_reporting: '',
    date_of_lecture: '',
    actual_students_present: '',
    total_registered_students: '',
    venue: '',
    scheduled_time: '',
    topic_taught: '',
    learning_outcomes: '',
    recommendations: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [reportRes, coursesRes] = await Promise.all([
        axios.get(`/reports/${id}`),
        axios.get('/courses/lecturer/my-courses')
      ]);

      const report = reportRes.data.report;
      setCourses(coursesRes.data.courses);
      
      setFormData({
        course_id: report.course_id,
        faculty_name: report.faculty_name,
        class_name: report.class_name,
        week_of_reporting: report.week_of_reporting,
        date_of_lecture: report.date_of_lecture.split('T')[0],
        actual_students_present: report.actual_students_present,
        total_registered_students: report.total_registered_students,
        venue: report.venue,
        scheduled_time: report.scheduled_time,
        topic_taught: report.topic_taught,
        learning_outcomes: report.learning_outcomes,
        recommendations: report.recommendations || ''
      });
    } catch (err) {
      setError('Failed to load report');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await axios.put(`/reports/${id}`, formData);
      setSuccess('Report updated successfully!');
      setTimeout(() => {
        navigate('/lecturer/reports');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update report');
      setSubmitting(false);
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
          <h2>Edit Report</h2>
          <Button variant="secondary" onClick={() => navigate('/lecturer/reports')}>
            Back to Reports
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Course <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="course_id"
                      value={formData.course_id}
                      onChange={handleChange}
                      required
                      disabled
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.course_code} - {course.course_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-muted">Course cannot be changed</Form.Text>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Faculty Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="faculty_name"
                      value={formData.faculty_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Class Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="class_name"
                      value={formData.class_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Week of Reporting <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="week_of_reporting"
                      value={formData.week_of_reporting}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Week</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Lecture <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_lecture"
                      value={formData.date_of_lecture}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Scheduled Lecture Time <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="time"
                      name="scheduled_time"
                      value={formData.scheduled_time}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Actual Students Present <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="number"
                      name="actual_students_present"
                      min="0"
                      value={formData.actual_students_present}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Total Registered Students <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="number"
                      name="total_registered_students"
                      min="0"
                      value={formData.total_registered_students}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Venue of the Class <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Topic Taught <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="topic_taught"
                      value={formData.topic_taught}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Learning Outcomes of the Topic <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="learning_outcomes"
                      value={formData.learning_outcomes}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Lecturer's Recommendations</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="recommendations"
                      value={formData.recommendations}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => navigate('/lecturer/reports')}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Updating...
                    </>
                  ) : (
                    'Update Report'
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditReport;