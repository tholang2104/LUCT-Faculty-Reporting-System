import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const LecturerClasses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses/lecturer/my-courses');
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
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
        <h2 className="mb-4">My Classes</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {courses.length > 0 ? (
          <div className="row">
            {courses.map((course) => (
              <div key={course.id} className="col-md-6 col-lg-4 mb-4">
                <Card className="h-100 card-hover">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge bg="primary">{course.course_code}</Badge>
                      <Badge bg="info">Semester {course.semester}</Badge>
                    </div>
                    <h5 className="card-title">{course.course_name}</h5>
                    <hr />
                    <div className="mb-2">
                      <small className="text-muted">Faculty:</small>
                      <p className="mb-1">{course.faculty}</p>
                    </div>
                    {course.program && (
                      <div className="mb-2">
                        <small className="text-muted">Program:</small>
                        <p className="mb-1">{course.program}</p>
                      </div>
                    )}
                    <div className="mb-2">
                      <small className="text-muted">Total Students:</small>
                      <p className="mb-0">
                        <strong>{course.total_registered_students}</strong>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Alert variant="info">
            No classes assigned yet. Please contact your Program Leader.
          </Alert>
        )}
      </Container>
    </>
  );
};

export default LecturerClasses;