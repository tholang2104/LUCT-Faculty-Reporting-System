import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaBook, FaFileAlt, FaChartLine, FaStar } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LecturerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, reportsRes, statsRes] = await Promise.all([
        axios.get('/courses/lecturer/my-courses'),
        axios.get('/reports'),
        axios.get('/reports/stats/monitoring')
      ]);

      setStats({
        courses: coursesRes.data.courses,
        reports: reportsRes.data.reports,
        monitoring: statsRes.data.stats
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
        <h2 className="mb-4">Lecturer Dashboard</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaBook size={40} className="text-primary mb-3" />
                <h3>{stats?.courses?.length || 0}</h3>
                <p className="text-muted mb-0">My Courses</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaFileAlt size={40} className="text-success mb-3" />
                <h3>{stats?.reports?.length || 0}</h3>
                <p className="text-muted mb-0">Total Reports</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaChartLine size={40} className="text-warning mb-3" />
                <h3>{stats?.monitoring?.average_attendance?.toFixed(1) || 0}%</h3>
                <p className="text-muted mb-0">Avg Attendance</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaStar size={40} className="text-info mb-3" />
                <h3>{stats?.monitoring?.reports_by_week?.length || 0}</h3>
                <p className="text-muted mb-0">Weeks Reported</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">My Courses</h5>
              </Card.Header>
              <Card.Body>
                {stats?.courses?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Course Name</th>
                          <th>Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.courses.map((course) => (
                          <tr key={course.id}>
                            <td><strong>{course.course_code}</strong></td>
                            <td>{course.course_name}</td>
                            <td>{course.total_registered_students}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-center">No courses assigned yet</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Reports by Week</h5>
              </Card.Header>
              <Card.Body>
                {stats?.monitoring?.reports_by_week?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stats.monitoring.reports_by_week}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week_of_reporting" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Reports', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Number of Reports" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted text-center">No report data available</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recent Reports</h5>
              </Card.Header>
              <Card.Body>
                {stats?.reports?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Course</th>
                          <th>Week</th>
                          <th>Topic</th>
                          <th>Attendance</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.reports.slice(0, 5).map((report) => (
                          <tr key={report.id}>
                            <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                            <td>{report.course_code}</td>
                            <td>Week {report.week_of_reporting}</td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>{report.topic_taught}</td>
                            <td>{report.actual_students_present}/{report.total_registered_students}</td>
                            <td>
                              <span className={`badge badge-${report.status}`}>
                                {report.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-center">No reports submitted yet</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LecturerDashboard;