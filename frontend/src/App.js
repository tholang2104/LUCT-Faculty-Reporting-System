import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Student pages
import StudentDashboard from './pages/Student/Dashboard';
import StudentMonitoring from './pages/Student/Monitoring';
import StudentRating from './pages/Student/Rating';

// Lecturer pages
import LecturerDashboard from './pages/Lecturer/Dashboard';
import LecturerClasses from './pages/Lecturer/Classes';
import LecturerReports from './pages/Lecturer/Reports';
import LecturerMonitoring from './pages/Lecturer/Monitoring';
import LecturerRating from './pages/Lecturer/Rating';
import CreateReport from './pages/Lecturer/CreateReport';
import EditReport from './pages/Lecturer/EditReport';

// PRL pages
import PRLDashboard from './pages/PRL/Dashboard';
import PRLCourses from './pages/PRL/Courses';
import PRLReports from './pages/PRL/Reports';
import PRLMonitoring from './pages/PRL/Monitoring';
import PRLRating from './pages/PRL/Rating';
import PRLClasses from './pages/PRL/Classes';

// PL pages
import PLDashboard from './pages/PL/Dashboard';
import PLCourses from './pages/PL/Courses';
import PLReports from './pages/PL/Reports';
import PLMonitoring from './pages/PL/Monitoring';
import PLClasses from './pages/PL/Classes';
import PLLecturers from './pages/PL/Lecturers';
import PLRating from './pages/PL/Rating';

// Example pages
import PublicExample from './pages/Example/PublicExample';
import ProtectedExample from './pages/Example/ProtectedExample';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student routes */}
          <Route path="/student" element={<PrivateRoute allowedRoles={['student']} />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="monitoring" element={<StudentMonitoring />} />
            <Route path="rating" element={<StudentRating />} />
          </Route>

          {/* Lecturer routes */}
          <Route path="/lecturer" element={<PrivateRoute allowedRoles={['lecturer']} />}>
            <Route path="dashboard" element={<LecturerDashboard />} />
            <Route path="classes" element={<LecturerClasses />} />
            <Route path="reports" element={<LecturerReports />} />
            <Route path="reports/create" element={<CreateReport />} />
            <Route path="reports/edit/:id" element={<EditReport />} />
            <Route path="monitoring" element={<LecturerMonitoring />} />
            <Route path="rating" element={<LecturerRating />} />
          </Route>

          {/* PRL routes */}
          <Route path="/prl" element={<PrivateRoute allowedRoles={['prl']} />}>
            <Route path="dashboard" element={<PRLDashboard />} />
            <Route path="courses" element={<PRLCourses />} />
            <Route path="reports" element={<PRLReports />} />
            <Route path="monitoring" element={<PRLMonitoring />} />
            <Route path="rating" element={<PRLRating />} />
            <Route path="classes" element={<PRLClasses />} />
          </Route>

          {/* PL routes */}
          <Route path="/pl" element={<PrivateRoute allowedRoles={['pl']} />}>
            <Route path="dashboard" element={<PLDashboard />} />
            <Route path="courses" element={<PLCourses />} />
            <Route path="reports" element={<PLReports />} />
            <Route path="monitoring" element={<PLMonitoring />} />
            <Route path="classes" element={<PLClasses />} />
            <Route path="lecturers" element={<PLLecturers />} />
            <Route path="rating" element={<PLRating />} />
          </Route>

          {/* Default redirect */}
          <Route path="/example/public" element={<PublicExample />} />
          <Route path="/example" element={<PrivateRoute /> }>
            <Route path="protected" element={<ProtectedExample />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;