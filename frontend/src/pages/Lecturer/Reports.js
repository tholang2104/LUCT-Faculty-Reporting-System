import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const LecturerReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWeek, setFilterWeek] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, filterWeek, filterStatus]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/reports');
      setReports(response.data.reports);
    } catch (err) {
      setError('Failed to load reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.topic_taught.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.course_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterWeek) {
      filtered = filtered.filter(report => report.week_of_reporting === parseInt(filterWeek));
    }

    if (filterStatus) {
      filtered = filtered.filter(report => report.status === filterStatus);
    }

    setFilteredReports(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/reports/${id}`);
        setReports(reports.filter(report => report.id !== id));
        alert('Report deleted successfully');
      } catch (err) {
        alert('Failed to delete report');
        console.error(err);
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('/reports/export/excel', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reports_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to export reports');
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Reports</h2>
          <div>
            <Button variant="success" className="me-2" onClick={handleExport}>
              <FaDownload className="me-2" />
              Export to Excel
            </Button>
            <Button as={Link} to="/lecturer/reports/create" variant="primary">
              <FaPlus className="me-2" />
              Create Report
            </Button>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="mb-4">
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by course or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="col-md-3">
                <Form.Select value={filterWeek} onChange={(e) => setFilterWeek(e.target.value)}>
                  <option value="">All Weeks</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-3">
                <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                </Form.Select>
              </div>
            </div>
          </Card.Body>
        </Card>

        {filteredReports.length > 0 ? (
          <Card>
            <Card.Body>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id}>
                        <td>{new Date(report.date_of_lecture).toLocaleDateString()}</td>
                        <td>
                          <strong>{report.course_code}</strong><br />
                          <small className="text-muted">{report.course_name}</small>
                        </td>
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
                        <td>
                          <Button
                            as={Link}
                            to={`/lecturer/reports/edit/${report.id}`}
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(report.id)}
                          >
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
        ) : (
          <Alert variant="info">
            {searchTerm || filterWeek || filterStatus
              ? 'No reports match your search criteria'
              : 'No reports submitted yet. Click "Create Report" to get started.'}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default LecturerReports;