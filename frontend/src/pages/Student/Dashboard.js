import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaBook, FaChartLine, FaStar, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, reportsRes] = await Promise.all([
        axios.get('/courses'),
        axios.get('/reports')
      ]);

      setStats({
        courses: coursesRes.data.courses,
        reports: reportsRes.data.reports
      });
    } catch (err) {
      setError('Failed to load dashboard data');
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
        <h2 className="mb-4">Student Dashboard</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaBook size={40} className="text-primary mb-3" />
                <h3>{stats?.courses?.length || 0}</h3>
                <p className="text-muted mb-0">Available Courses</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaFileAlt size={40} className="text-success mb-3" />
                <h3>{stats?.reports?.length || 0}</h3>
                <p className="text-muted mb-0">Lecture Reports</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaChartLine size={40} className="text-warning mb-3" />
                <h3>View</h3>
                <p className="text-muted mb-0">Monitoring</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaStar size={40} className="text-info mb-3" />
                <h3>Rate</h3>
                <p className="text-muted mb-0">Lecturers & Courses</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recent Lecture Reports</h5>
              </Card.Header>
              <Card.Body>
                {stats?.reports?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Course</th>
                          <th>Lecturer</th>
                          <th>Topic</th>
                          <th>Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.reports.slice(0, 10).map((report) => (
                          <tr key={report.id}>
                            <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                            <td>
                              <strong>{report.course_code}</strong><br />
                              <small>{report.course_name}</small>
                            </td>
                            <td>{report.lecturer_name}</td>
                            <td className="text-truncate" style={{ maxWidth: '300px' }}>
                              {report.topic_taught}
                            </td>
                            <td>
                              {report.actual_students_present}/{report.total_registered_students}
                              <br />
                              <small className="text-muted">
                                ({((report.actual_students_present / report.total_registered_students) * 100).toFixed(1)}%)
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Alert variant="info">No lecture reports available yet</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentDashboard;