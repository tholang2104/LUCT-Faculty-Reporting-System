import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaFileAlt, FaChartLine, FaStar } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const PRLDashboard = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="px-4">
        <h2 className="mb-4">Principal Lecturer Dashboard</h2>
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaBook size={40} className="text-primary mb-3" />
                <h3>View</h3>
                <p className="text-muted mb-0">Courses</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaFileAlt size={40} className="text-success mb-3" />
                <h3>Review</h3>
                <p className="text-muted mb-0">Reports</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaChartLine size={40} className="text-warning mb-3" />
                <h3>Monitor</h3>
                <p className="text-muted mb-0">Performance</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card-hover">
              <Card.Body>
                <FaStar size={40} className="text-info mb-3" />
                <h3>View</h3>
                <p className="text-muted mb-0">Ratings</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PRLDashboard;