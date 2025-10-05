import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const PRLReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/reports');
      setReports(response.data.reports);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeedback = async () => {
    try {
      await axios.post('/reports/feedback', {
        report_id: selectedReport.id,
        feedback
      });
      alert('Feedback added successfully');
      setShowModal(false);
      setFeedback('');
      fetchReports();
    } catch (err) {
      alert('Failed to add feedback');
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
        <h2 className="mb-4">Lecturer Reports</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Lecturer</th>
                    <th>Course</th>
                    <th>Week</th>
                    <th>Topic</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                      <td>{report.lecturer_name}</td>
                      <td>{report.course_code}</td>
                      <td>Week {report.week_of_reporting}</td>
                      <td className="text-truncate" style={{ maxWidth: '200px' }}>{report.topic_taught}</td>
                      <td>
                        <Badge bg={report.status === 'approved' ? 'success' : report.status === 'reviewed' ? 'info' : 'warning'}>
                          {report.status}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" onClick={() => { setSelectedReport(report); setShowModal(true); }}>
                          Add Feedback
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
            <Modal.Title>Add Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddFeedback}>Submit Feedback</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default PRLReports;