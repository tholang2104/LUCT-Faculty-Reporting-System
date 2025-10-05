import React from 'react';
import { Navbar as BSNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBasePath = () => {
    switch (user?.role) {
      case 'student': return '/student';
      case 'lecturer': return '/lecturer';
      case 'prl': return '/prl';
      case 'pl': return '/pl';
      default: return '/';
    }
  };

  const getRoleLinks = () => {
    const basePath = getRoleBasePath();
    
    switch (user?.role) {
      case 'student':
        return (
          <>
            <Nav.Link as={Link} to={`${basePath}/dashboard`}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/monitoring`}>Monitoring</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/rating`}>Rating</Nav.Link>
          </>
        );
      case 'lecturer':
        return (
          <>
            <Nav.Link as={Link} to={`${basePath}/dashboard`}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/classes`}>Classes</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/reports`}>Reports</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/monitoring`}>Monitoring</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/rating`}>Rating</Nav.Link>
          </>
        );
      case 'prl':
        return (
          <>
            <Nav.Link as={Link} to={`${basePath}/dashboard`}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/courses`}>Courses</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/reports`}>Reports</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/monitoring`}>Monitoring</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/rating`}>Rating</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/classes`}>Classes</Nav.Link>
          </>
        );
      case 'pl':
        return (
          <>
            <Nav.Link as={Link} to={`${basePath}/dashboard`}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/courses`}>Courses</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/reports`}>Reports</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/monitoring`}>Monitoring</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/classes`}>Classes</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/lecturers`}>Lecturers</Nav.Link>
            <Nav.Link as={Link} to={`${basePath}/rating`}>Rating</Nav.Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <BSNavbar.Brand as={Link} to={getRoleBasePath() + '/dashboard'}>
          <FaHome className="me-2" />
          LUCT Reporting System
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {getRoleLinks()}
          </Nav>
          <Nav>
            <NavDropdown 
              title={
                <>
                  <FaUser className="me-2" />
                  {user?.full_name}
                </>
              } 
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>
                <small className="text-muted">Role: {user?.role?.toUpperCase()}</small>
              </NavDropdown.Item>
              <NavDropdown.Item disabled>
                <small className="text-muted">{user?.email}</small>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;