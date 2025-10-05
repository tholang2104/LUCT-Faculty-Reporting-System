import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const StudentMonitoring = () => {
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      filterReports();
    } else {
      fetchReports();
    }
  }, [selectedCourse]);

  const fetchData = async () => {
    try {
      const [coursesRes, reportsRes] = await Promise.all([
        axios.get('/courses'),
        axios.get('/reports')
      ]);
      setCourses(coursesRes.data.courses);
      setReports(reportsRes.data.reports);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('/reports');
      setReports(response.data.reports);
    } catch (err) {
      console.error(err);
    }
  };

  const filterReports = async () => {
    try {
      const response = await axios.get(`/reports?course_id=${selectedCourse}`);
      setReports(response.data.reports);
    } catch (err) {
      console.error(err);
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
        <h2 className="mb-4">Monitoring</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="mb-4">
          <Card.Body>
            <Form.Group>
              <Form.Label>Filter by Course</Form.Label>
              <Form.Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} - {course.course_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h5 className="mb-0">Lecture Reports</h5>
          </Card.Header>
          <Card.Body>
            {reports.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Lecturer</th>
                      <th>Week</th>
                      <th>Topic</th>
                      <th>Attendance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                        <td>
                          <strong>{report.course_code}</strong><br />
                          <small>{report.course_name}</small>
                        </td>
                        <td>{report.lecturer_name}</td>
                        <td>Week {report.week_of_reporting}</td>
                        <td className="text-truncate" style={{ maxWidth: '250px' }}>
                          {report.topic_taught}
                        </td>
                        <td>
                          {report.actual_students_present}/{report.total_registered_students}
                          <br />
                          <small className="text-muted">
                            ({((report.actual_students_present / report.total_registered_students) * 100).toFixed(1)}%)
                          </small>
                        </td>
                        <td>
                          <Badge bg={
                            report.status === 'approved' ? 'success' :
                            report.status === 'reviewed' ? 'info' : 'warning'
                          }>
                            {report.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Alert variant="info">No reports available</Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentMonitoring;